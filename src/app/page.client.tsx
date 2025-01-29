"use client";

import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/button";
import { AddLink, LinkList, LinksProvider } from "~/features/link";

import type { Link as LinkType } from "~/features/link/types";

interface HomeProps {
  links: LinkType[];
}

export default function Home({ links }: HomeProps) {
  return (
    <LinksProvider links={links}>
      <div className="sm:max-w-80 sm:mx-auto sm:pt-16 pt-6">
        <HomeHeader />
        <LinkList />
        <AddLink />
      </div>
    </LinksProvider>
  );
}

const HomeHeader = () => {
  return (
    <div className="flex justify-between h-8 mb-4 sm:mb-8 mx-4 sm:mx-0">
      <Link href="/forgotten">
        <Button
          variant="secondary"
          className="text-neutral-400 hover:text-neutral-500 h-full hover:after:content-['→']"
        >
          Forgotten links
        </Button>
      </Link>
      <ClerkSignOutButton>
        <Button
          variant="secondary"
          className="text-neutral-400 hover:text-neutral-500 h-full"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </ClerkSignOutButton>
    </div>
  );
};
