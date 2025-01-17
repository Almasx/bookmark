import { db } from "~/lib/db";
import Home from "./page.client";

export default async function Page() {
  const links = await db.link.findMany({
    include: { tags: true },
  });

  return <Home links={links} />;
}
