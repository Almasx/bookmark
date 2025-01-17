import { Link, Tag } from "@prisma/client";

export type LinkWithTags = Link & {
  tags: Tag[];
};
