import { Link, Tag } from "@prisma/client";

export type LinkWithTags = Link & {
  tags: Tag[];
};

export type LinkWithTagsClient = LinkWithTags | { url: string };
