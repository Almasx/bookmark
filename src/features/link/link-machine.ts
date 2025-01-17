import { setup } from "xstate";
import type { Tag } from "@prisma/client";
import type { LinkWithTags } from "~/lib/types";

export const linkMachine = setup({
  types: {
    context: {} as {
      tags?: Tag[];
      link?: LinkWithTags;
    },
    events: {} as
      | { type: "ADD_LINK" }
      | { type: "LINK_LOADED"; link: LinkWithTags; tags: Tag[] }
      | { type: "ERROR" },
  },
}).createMachine({
  id: "link",
  initial: "idle",
  context: {
    tags: undefined,
    link: undefined,
  },
  states: {
    idle: {
      on: {
        ADD_LINK: {
          target: "loading",
        },
      },
    },
    loading: {
      on: {
        LINK_LOADED: {
          target: "transitioning",
          actions: ({ context, event }) => {
            context.tags = event.tags;
            context.link = event.link;
          },
        },
        ERROR: {
          target: "idle",
          actions: ({ context }) => {
            context.tags = undefined;
            context.link = undefined;
          },
        },
      },
    },
    transitioning: {
      after: {
        2000: {
          target: "complete",
        },
      },
    },
    complete: {
      on: {
        ADD_LINK: {
          target: "loading",
          actions: ({ context }) => {
            context.tags = undefined;
            context.link = undefined;
          },
        },
      },
    },
  },
});
