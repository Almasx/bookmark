import { NextResponse } from "next/server";
import { z } from "zod";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { JSDOM } from "jsdom";
import { db } from "~/lib/db";

const linkSchema = z.object({
  metadata: z.object({
    title: z.string(),
    summary: z.string().max(1000),
    content: z.string(),
    readingTime: z.number(),
    suggestedTags: z.array(
      z.object({
        title: z.string(),
        emoji: z.string(),
      })
    ),
  }),
});

const inputSchema = z.object({
  url: z.string(),
});

export async function POST(req: Request) {
  try {
    const { url } = inputSchema.parse(await req.json());

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Extract content from URL
    const content = await extractContent(url);
    console.log(`DEBUG: Loaded content: ${content}`);

    // Use AI to analyze content and generate structured data
    const { object } = await generateObject({
      model: groq("llama-3.1-8b-instant"),
      schema: linkSchema,
      prompt: `Analyze this content from ${url} and extract:
      1. A concise title
      2. A brief summary like cheatsheet (max 1000 characters)
      3. The main content
      4. Estimated reading time in minutes (for videos, use the duration)
      5. Suggest relevant tags with appropriate emojis (max 5 tags)

      Content:
      ${content.slice(0, 2000)}...`,
    });

    console.log(`DEBUG: Generated object: ${object}`);

    // Save to database
    const savedLink = await db.link.create({
      data: {
        url,
        title: object.metadata.title,
        summary: object.metadata.summary + "\n\n",
        content: object.metadata.content,
        readingTime: object.metadata.readingTime,
        tags: {
          connectOrCreate: object.metadata.suggestedTags.map((tag) => ({
            where: { title: tag.title },
            create: {
              title: tag.title,
              emoji: tag.emoji,
            },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: savedLink,
    });
  } catch (error) {
    console.error("Error processing URL:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

async function extractContent(url: string): Promise<string> {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  if (!document) {
    throw new Error("No document found");
  }

  // Handle YouTube videos
  if (
    document.querySelector('meta[property="og:site_name"][content="YouTube"]')
  ) {
    return handleYoutube(dom);
  }

  // Handle regular articles
  return handleRegular(dom);
}

const handleYoutube = (dom: JSDOM) => {
  const document = dom.window.document;
  const title =
    document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content") || "";
  const description =
    document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content") || "";
  const duration =
    document
      .querySelector('meta[itemprop="duration"]')
      ?.getAttribute("content") || "";

  return JSON.stringify({
    title,
    description,
    duration,
  });
};

const handleRegular = (dom: JSDOM) => {
  const document = dom.window.document;
  const article = document.querySelector("article") || document.body;
  return article.textContent?.replace(/\s+/g, " ").trim() || "";
};
