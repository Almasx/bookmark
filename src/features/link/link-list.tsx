"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LinkCard } from "./link-card";
import { LoadingLinkCard } from "./link-card.loading";
import type { LinkWithTags } from "~/lib/types";
import type { Tag } from "@prisma/client";

interface LinkListProps {
  links: LinkWithTags[];
  isLoading: boolean;
  finalTags?: Tag[];
}

const TRANSITION = { type: "spring", duration: 0.5, bounce: 0.4 };
const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export const LinkList = ({ links, isLoading, finalTags }: LinkListProps) => {
  return (
    <div className="flex gap-1 flex-col">
      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            key="loading"
            variants={ANIMATION_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={TRANSITION}
          >
            <LoadingLinkCard finalTags={finalTags} />
          </motion.div>
        )}
        {links.map((link, index) => (
          <motion.div
            key={link.id}
            variants={ANIMATION_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              ...TRANSITION,
              delay: index * 0.01,
            }}
          >
            <LinkCard {...link} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
