import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { currentUser } from "@clerk/nextjs/server";

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  console.log(`DEBUG: User ID: ${user.id}`);

  return next({
    ctx: { user },
  });
});

export const actionClient = createSafeActionClient().use(authMiddleware);
