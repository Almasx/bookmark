"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LinkCard } from "./link-card";
import { LoadingLinkCard } from "./link-card.loading";
import { useLinks } from "./link-store";
import { EmptyState } from "./link-list.empty";

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

interface LinkListProps {
  showEmptyState?: boolean;
}

export const LinkList = ({ showEmptyState: showEmpty }: LinkListProps) => {
  const links = useLinks((state) => state.links);
  const isAddingLink = useLinks((state) => state.status === "adding_link");

  const showEmptyState = links.length === 0 && !isAddingLink && showEmpty;

  return (
    <div className="flex gap-1 flex-col sm:mx-0 mx-4">
      <AnimatePresence mode="popLayout">
        {showEmptyState && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
          >
            <EmptyState />
          </motion.div>
        )}
        {isAddingLink && (
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
