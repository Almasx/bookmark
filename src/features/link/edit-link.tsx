import { useState } from "react";
import { LinkWithTags } from "~/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMeasure } from "react-use";
import * as React from "react";
import { TextArea } from "~/components/textarea";
import { Tag } from "~/features/tag";

interface EditLinkProps {
  link: LinkWithTags;
  children: (props: { editing: boolean }) => React.ReactNode;
}

export const EditLink = ({ link, children }: EditLinkProps) => {
  const [editing, setEditing] = useState(false);
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  return (
    <div className="relative" onClick={() => setEditing(true)}>
      <motion.div
        ref={ref}
        className="relative"
        animate={{ zIndex: editing ? 30 : 0 }}
        transition={{ delay: editing ? 0 : 0.15 }}
      >
        {children({ editing })}
      </motion.div>

      <AnimatePresence>
        {editing && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-20 inset-0 bg-neutral-100/80 backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(false);
            }}
          />
        )}

        {/* Summary */}
        {editing && (
          <motion.div
            key="summary"
            className="absolute z-20 top-0 w-full"
            initial={{ y: 4 + bounds.height, opacity: 0 }}
            animate={{
              y: 8 + bounds.height,
              opacity: 1,
              transition: { delay: 0.15 },
            }}
            exit={{ opacity: 0 }}
          >
            <LinkNote />
          </motion.div>
        )}

        {/* Tags */}
        {editing && (
          <motion.div
            key="tags"
            className="absolute z-20 top-0 w-full flex-col flex gap-2 py-1"
          >
            {link.tags.map((tag, index) => (
              <Tag
                initial={{ x: 12 + bounds.width, opacity: 0 }}
                animate={{
                  x: 12 + bounds.width,
                  opacity: 1,
                  transition: { delay: 0.15 + 0.01 * index },
                }}
                exit={{ opacity: 0 }}
                key={tag.id}
                tag={tag}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LinkNote = () => {
  const [note, setNote] = useState("");

  return (
    <div className="bg-white p-4 rounded-3xl w-full">
      <TextArea
        value={note}
        rows={4}
        onChange={setNote}
        className="bg-white"
        placeholder="Add a note here..."
      />
    </div>
  );
};
