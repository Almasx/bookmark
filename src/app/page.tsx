import { db } from "~/lib/db";
import Home from "./page.client";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/button";
import { LogOut } from "lucide-react";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const links = db.link.findMany({
    where: {
      user: { clerkUserId: userId },
      isArchived: false,
    },
    include: { tags: true },
  });

  return (
    <div className="sm:max-w-80 sm:mx-auto sm:pt-16 pt-6">
      <HomeHeader />
      <Suspense>
        <Home links={links} />
      </Suspense>
    </div>
  );
}

const HomeHeader = () => {
  return (
    <div className="flex justify-between h-8 mb-4 sm:mb-8 mx-2 sm:mx-0">
      <Link href="/forgotten" prefetch={true}>
        <Button variant="ghost" className="h-full ">
          Forgotten links
        </Button>
      </Link>
      <ClerkSignOutButton redirectUrl="/">
        <Button variant="ghost" className="h-full">
          <LogOut className="w-4 h-4" />
        </Button>
      </ClerkSignOutButton>
    </div>
  );
};
