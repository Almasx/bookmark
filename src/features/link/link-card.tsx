import { TagChip } from "~/features/tag";
import { motion } from "framer-motion";
import { Icon, ICONS } from "~/components/icon";
import NextLink from "next/link";
import { LinkWithTags } from "~/lib/types";

const TRANSITION = { type: "spring", duration: 0.15, bounce: 0 };

type LinkCardProps = LinkWithTags;

export const LinkCard = ({ title, url, readingTime, tags }: LinkCardProps) => {
  return (
    <motion.div
      className="max-w-96 bg-white px-3 rounded-3xl group space-y-5"
      layout
      transition={TRANSITION}
      initial={{
        paddingBlockStart: "0.625rem",
        paddingBlockEnd: "0.375rem",
      }}
      whileHover={{
        paddingBlockStart: "0.875rem",
        paddingBlockEnd: "0.625rem",
      }}
    >
      <div className="flex justify-between">
        <div className="space-y-2">
          <p className="font-medium text-neutral-800 text-xl leading-5 w-44 text-pretty">
            {title}
          </p>
        </div>
        <div className="flex gap-1">
          <TagChip tags={tags} />
        </div>
      </div>

      <div className="flex justify-between">
        <NextLink href={url} target="_blank" rel="noopener noreferrer">
          <motion.div
            className="chip text-neutral-500 group-hover:text-white group-hover:scale-105 group-hover:bg-primary-500"
            transition={TRANSITION}
            layout
          >
            <Icon path={ICONS.play} />
          </motion.div>
        </NextLink>

        <div className="chip w-fit px-2 font-medium">{readingTime}mins</div>
      </div>
    </motion.div>
  );
};
