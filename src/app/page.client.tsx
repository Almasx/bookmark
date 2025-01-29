"use client";

import { useAction } from "next-safe-action/hooks";
import { AddLink, LinkList } from "~/features/link";
import { addLink } from "./action";
import type { LinkWithTags } from "~/lib/types";
import { createContext, useState } from "react";
import { toast } from "sonner";

export interface LinksContextProps {
  links: LinkWithTags[];
  setLinks: React.Dispatch<React.SetStateAction<LinkWithTags[]>>;
}

export const LinksContext = createContext<LinksContextProps>({
  links: [],
  setLinks: () => {},
});

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
    onError: (error) => {
      console.log(error);
      toast.error("Oops! Something went wrong");
    },
  });

  const handleAddLink = async (url: string) => {
    execute({ url });
  };

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      <div className="max-w-80 mx-auto pt-24">
        <LinkList links={links} isLoading={isExecuting} />
        <AddLink onAdd={handleAddLink} />
      </div>
    </LinksContext.Provider>
  );
}
