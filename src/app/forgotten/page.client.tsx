"use client";

import Link from "next/link";
import { Button } from "~/components/button";
import { LinkList, LinksProvider } from "~/features/link";

import type { Link as LinkType } from "~/features/link/types";

interface ForgottenProps {
  links: LinkType[];
}

export default function Forgotten({ links }: ForgottenProps) {
  return (
    <LinksProvider links={links}>
      <div className="sm:max-w-80 sm:mx-auto pt-16">
        <ForgottenHeader />
        <LinkList />
      </div>
    </LinksProvider>
  );
}

const ForgottenHeader = () => {
  return (
    <div className="flex justify-between h-8 mb-8">
      <Link href="/" prefetch={true}>
        <Button variant="ghost" className="h-full hover:before:content-['←']">
          Back to home
        </Button>
      </Link>
    </div>
  );
};
