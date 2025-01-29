"use client";

import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";
import { Button } from "~/components/button";
import { AddLink, LinkList, LinksProvider } from "~/features/link";

import type { Link } from "~/features/link/types";

interface HomeProps {
  links: Link[];
}

export default function Home({ links }: HomeProps) {
  return (
    <LinksProvider links={links}>
      <div className="sm:max-w-80 sm:mx-auto pt-24">
        <LinkList />
        <AddLink />
      </div>

      <SignOutButton />
    </LinksProvider>
  );
}

const SignOutButton = () => (
  <div className="fixed sm:bottom-4 sm:top-auto right-4 top-4">
    <ClerkSignOutButton>
      <Button variant="secondary" className="text-neutral-500">
        Sign Out
      </Button>
    </ClerkSignOutButton>
  </div>
);
