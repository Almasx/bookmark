import { Tag as TagType } from "@prisma/client";
import { motion } from "motion/react";
import { HTMLMotionProps } from "motion/react";

type TagProps = HTMLMotionProps<"div"> & {
  tag: TagType;
};

export const Tag = ({ tag, ...props }: TagProps) => (
  <motion.div
    className="flex w-fit items-center gap-2 px-3 py-1 bg-white rounded-xl"
    {...props}
  >
    {tag.emoji}
    <span className="text-neutral-500 font-medium leading-4">{tag.title}</span>
  </motion.div>
);
