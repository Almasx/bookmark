"use server";

import { actionClient } from "~/lib/safe-action";
import { z } from "zod";
import { db } from "~/lib/db";

const deleteLinkSchema = z.object({
  id: z.string(),
});

export const deleteLink = actionClient
  .schema(deleteLinkSchema)
  .action(async ({ parsedInput: { id } }) => {
    const link = await db.link.update({
      where: { id },
      data: { isArchived: true },
    });

    return { link };
  });
