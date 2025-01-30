"use client";

import Link from "next/link";
import { use } from "react";
import { Button } from "~/components/button";
import { FlushButton } from "~/features/delete/flush-button";
import { LinkList, LinksProvider } from "~/features/link";

import type { Link as LinkType } from "~/features/link/types";

interface ForgottenProps {
  links: Promise<LinkType[]>;
}

export default function Forgotten({ links: initialLinks }: ForgottenProps) {
  const links = use(initialLinks);

  return (
    <div className="sm:max-w-80 sm:mx-auto sm:pt-16 pt-6">
      <LinksProvider links={links}>
        <ForgottenHeader />
        <LinkList />
      </LinksProvider>
    </div>
  );
}

const ForgottenHeader = () => {
  return (
    <div className="flex justify-between h-8 mb-8 ml-2 mr-4 sm:mx-0">
      <Link href="/" prefetch={true}>
        <Button variant="ghost" className="h-full">
          Back to home
        </Button>
      </Link>
      <FlushButton />
    </div>
  );
};
