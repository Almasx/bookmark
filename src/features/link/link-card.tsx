import { TagChip } from "~/features/tag";
import { motion, MotionConfig } from "framer-motion";
import { Icon, ICONS } from "~/components/icon";
import NextLink from "next/link";
import { LinkWithTags } from "~/lib/types";
import { EditLink } from "./edit-link";

type LinkCardProps = LinkWithTags;

const cardVariants = {
  extended: {
    paddingBlockStart: "0.875rem",
    paddingBlockEnd: "0.625rem",
  },
  squished: {
    paddingBlockStart: "0.625rem",
    paddingBlockEnd: "0.375rem",
  },
};

export const LinkCard = (link: LinkCardProps) => {
  const { title, url, readingTime, tags } = link;

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.15, bounce: 0 }}>
      <EditLink link={link}>
        {({ editing }) => (
          <motion.div
            className="max-w-96 bg-white px-3 rounded-3xl group space-y-5"
            layout
            initial={cardVariants.squished}
            animate={editing ? cardVariants.extended : undefined}
            whileHover={editing ? undefined : cardVariants.extended}
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
                  layout
                >
                  <Icon path={ICONS.play} />
                </motion.div>
              </NextLink>

              <div className="chip w-fit px-2 font-medium">
                {readingTime}mins
              </div>
            </div>
          </motion.div>
        )}
      </EditLink>
    </MotionConfig>
  );
};
