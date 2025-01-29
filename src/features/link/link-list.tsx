"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LinkCard } from "./link-card";
import { LoadingLinkCard } from "./link-card.loading";
import type { LinkWithTags } from "~/lib/types";

interface LinkListProps {
  links: LinkWithTags[];
  isLoading: boolean;
}

const TRANSITION = { type: "spring", duration: 0.5, bounce: 0.4 };
const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 1 },
  },
  exitLoader: {
    opacity: 0,
    y: -50,
  },
};

export const LinkList = ({ links, isLoading }: LinkListProps) => {
  return (
    <div className="flex gap-1 flex-col">
      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            key="loading"
            variants={ANIMATION_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exitLoader"
            transition={TRANSITION}
          >
            <LoadingLinkCard />
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
