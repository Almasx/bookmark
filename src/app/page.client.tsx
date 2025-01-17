"use client";

import { useAction } from "next-safe-action/hooks";
import { AddLink, LinkList } from "~/features/link";
import { addLink } from "./action";
import type { LinkWithTags } from "~/lib/types";
import { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { linkMachine } from "~/features/link/link-machine";

interface HomeProps {
  links: LinkWithTags[];
}

export default function Home({ links: initialLinks }: HomeProps) {
  const [links, setLinks] = useState<LinkWithTags[]>(initialLinks);
  const [state, send] = useMachine(linkMachine);

  // Watch for state changes to handle link addition
  useEffect(() => {
    if (state.matches("complete") && state.context.link) {
      setLinks((prevLinks) => [state.context.link!, ...prevLinks]);
    }
  }, [state]); // Only depend on state changes

  const { execute } = useAction(addLink, {
    onSuccess: (result) => {
      const link = result.data?.link;
      if (link?.tags) {
        send({ type: "LINK_LOADED", link, tags: link.tags });
      }
    },
    onError: () => {
      send({ type: "ERROR" });
    },
  });

  const handleAddLink = async (url: string) => {
    send({ type: "ADD_LINK" });
    execute({ url });
  };

  return (
    <div className="max-w-80 mx-auto pt-24">
      <LinkList
        links={links}
        isLoading={!state.matches("idle") && !state.matches("complete")}
        finalTags={state.context.tags}
      />
      <AddLink onAdd={handleAddLink} />
    </div>
  );
}
