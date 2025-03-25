import type { Tag } from "@prisma/client";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Tags as TagIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface TagChipProps {
  tags: Tag[];
  id?: string;
  variant?: "primary" | "condensed";
}

const TRANSITION = {
  type: "spring",
  duration: 0.6,
  bounce: 0.3,
};

export const TagChip = ({ tags, id, variant = "primary" }: TagChipProps) => {
  const displayEmojis = tags.slice(0, 3).map((tag) => tag);

  return (
    <div className="chip px-2 w-12 duration-100 gap-x-1 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        {variant === "primary" &&
          displayEmojis.map((tag, index) => (
            <motion.span
              key={`tag-${id}-${index}`}
              transition={{
                ...TRANSITION,
                delay: 0.05 * index,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className={cn(
                "-mx-1 will-change-transform",
                index % 2 === 0
                  ? "rotate-6 group-hover:-rotate-6"
                  : "-rotate-6 group-hover:rotate-6"
              )}
            >
              {tag.emoji}
            </motion.span>
          ))}

        {variant === "condensed" && (
          <motion.span
            className="flex items-center will-change-transform gap-x-1 text-neutral-500"
            transition={TRANSITION}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
          >
            {tags.length}
            <TagIcon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
