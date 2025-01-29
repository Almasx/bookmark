"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "~/lib/safe-action";
import { z } from "zod";
import { db } from "~/lib/db";

const addLinkSchema = z.object({
  url: z.string().url(),
});

export const addLink = actionClient
  .schema(addLinkSchema)
  .action(async ({ parsedInput: { url } }) => {
    try {
      // Call our summarize API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to summarize link");
      }

      const { data } = await response.json();

      revalidatePath("/");
      return { link: data };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add link");
    }
  });

const addTagSchema = z.object({
  title: z.string(),
});

export const addTag = actionClient
  .schema(addTagSchema)
  .action(async ({ parsedInput: { title } }) => {
    const tag = await db.tag.create({
      data: { title, emoji: "🔥" },
    });

    return { tag };
  });

const deleteLinkSchema = z.object({
  id: z.string(),
});

export const deleteLink = actionClient
  .schema(deleteLinkSchema)
  .action(async ({ parsedInput: { id } }) => {
    const link = await db.link.delete({ where: { id } });
    return { link };
  });

const updateLinkSummarySchema = z.object({
  id: z.string(),
  summary: z.string(),
});

export const updateLinkSummary = actionClient
  .schema(updateLinkSummarySchema)
  .action(async ({ parsedInput: { id, summary } }) => {
    const link = await db.link.update({ where: { id }, data: { summary } });
    return { link };
  });
