"use client";

import { useAction } from "next-safe-action/hooks";
import { AddLink, LinkList } from "~/features/link";
import { addLink } from "./action";
import type { LinkWithTags } from "~/lib/types";
import { useState } from "react";

interface HomeProps {
  links: LinkWithTags[];
}

export default function Home({ links: initialLinks }: HomeProps) {
  const [links, setLinks] = useState<LinkWithTags[]>(initialLinks);

  const { execute, isExecuting } = useAction(addLink, {
    onSuccess: (result) => {
      const link = result.data?.link;
      if (link?.tags) {
        setLinks((prevLinks) => [link!, ...prevLinks]);
      }
    },
  });

  const handleAddLink = async (url: string) => {
    execute({ url });
  };

  return (
    <div className="max-w-80 mx-auto pt-24">
      <LinkList links={links} isLoading={isExecuting} />
      <AddLink onAdd={handleAddLink} />
    </div>
  );
}
