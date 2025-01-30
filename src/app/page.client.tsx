"use client";

import { use } from "react";
import { AddLink, LinkList, LinksProvider } from "~/features/link";

import type { Link as LinkType } from "~/features/link/types";

interface HomeProps {
  links: Promise<LinkType[]>;
}

export default function Home({ links: linksPromise }: HomeProps) {
  const links = use(linksPromise);

  return (
    <LinksProvider links={links}>
      <LinkList showEmptyState={true} />
      <AddLink />
    </LinksProvider>
  );
}
