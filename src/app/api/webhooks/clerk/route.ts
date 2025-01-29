import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "~/env";
import { db } from "~/lib/db";

const handleUserCreated = async (evt: WebhookEvent, clerkUserId: string) => {
  if (evt.type !== "user.created") return;

  const user = await db.user.upsert({
    where: { clerkUserId },
    update: { clerkUserId },
    create: {
      clerkUserId,
      email: evt.data.email_addresses[0].email_address,
    },
  });
  return new Response(JSON.stringify(user), {
    status: 200,
  });
};

const handleUserDeleted = async (evt: WebhookEvent) => {
  if (evt.type !== "user.deleted") return;

  await db.user.delete({
    where: { clerkUserId: evt.data.id },
  });

  return new Response("User deleted", {
    status: 200,
  });
};

export async function POST(req: Request) {
  console.log("RECEIVED WEBHOOK REQUEST");

  const SIGNING_SECRET = env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = (await req.json()) as Record<string, unknown>;
  const body = JSON.stringify(payload);

  const wh = new Webhook(SIGNING_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id: clerkUserId } = evt.data;

  if (!clerkUserId)
    return new Response("Error occured -- no user ID provided", {
      status: 400,
    });

  try {
    switch (evt.type) {
      case "user.created":
        return await handleUserCreated(evt, clerkUserId);
      case "user.deleted":
        return await handleUserDeleted(evt);
    }
  } catch (err) {
    console.error(err);
    return new Response(
      `Error occured -- failed to upsert user ${clerkUserId}`,
      { status: 500 }
    );
  }
}
