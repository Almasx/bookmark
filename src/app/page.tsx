import { db } from "~/lib/db";
import Home from "./page.client";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const links = await db.link.findMany({
    where: {
      user: { id: userId },
    },
    include: { tags: true },
  });

  return <Home links={links} />;
}
