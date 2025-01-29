import { Link as PrismaLink, Tag } from "@prisma/client";

export type Link = PrismaLink & {
  tags: Tag[];
};
