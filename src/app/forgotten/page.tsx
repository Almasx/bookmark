import { db } from "~/lib/db";
import { auth } from "@clerk/nextjs/server";
import Home from "./page.client";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const links = await db.link.findMany({
    where: {
      user: { clerkUserId: userId },
      isArchived: true,
    },
    include: { tags: true },
  });

  return <Home links={links} />;
}
