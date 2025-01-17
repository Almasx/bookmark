"use client";

import { LinkCard } from "./link-card";

export const LinkList = () => {
  return (
    <div className="flex gap-1 flex-col">
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
    </div>
  );
};
