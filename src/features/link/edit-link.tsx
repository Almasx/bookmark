import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMeasure } from "react-use";
import * as React from "react";
import { TextArea } from "~/components/textarea";
import { Tag } from "~/features/tag";
import { useAction } from "next-safe-action/hooks";
import { updateLink as updateLinkAction } from "~/features/link/api.action";
import { Link } from "./types";
import { useLinks } from "./link-store";
import { useIsMobile } from "~/hooks";
import { cn } from "~/lib/utils";

interface EditLinkProps {
  link: Link;
  children: (props: { editing: boolean }) => React.ReactNode;
}

export const EditLink = ({ link, children }: EditLinkProps) => {
  const [editing, setEditing] = useState(false);
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  const isMobile = useIsMobile();

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
            animate={{ y: 8 + bounds.height, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LinkSummary link={link} />
          </motion.div>
        )}

        {/* Tags */}
        {editing && (
          <motion.div
            key="tags"
            className={cn(
              "absolute z-20 flex gap-2 py-1",
              isMobile
                ? "bottom-5 fixed inset-x-4 flex-col pointer-events-none"
                : "top-0 flex-wrap w-16 "
            )}
            initial={{ x: isMobile ? 0 : 16 + bounds.width, opacity: 0 }}
            animate={{
              x: isMobile ? 0 : 12 + bounds.width,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
          >
            {link.tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface LinkSummaryProps {
  link: Link;
}

const LinkSummary = ({ link }: LinkSummaryProps) => {
  const [summary, setSummary] = useState(link?.summary || "");

  const { execute } = useAction(updateLinkAction);
  const updateLink = useLinks((state) => state.updateLink);

  if (!link) return null;

  const handleChange = (text: string) => {
    setSummary(text);
  };

  const handlePaste = (text: string) => {
    setSummary((t) => t + text);
  };

  const handleBlur = () => {
    if (summary === link.summary) return;
    execute({ id: link.id, summary });
    updateLink({ id: link.id, summary });
  };

  const handleFocus = (el: HTMLTextAreaElement | null) => {
    if (!el) return;

    el.focus();
    el.selectionStart = el.value.length;
    el.selectionEnd = el.value.length;
  };

  return (
    <div className="bg-white p-3 pt-[10px] rounded-3xl w-full">
      <p className="chip px-2 w-fit text-neutral-500 mb-2 text-sm">Summary</p>
      <TextArea
        value={summary}
        onChange={handleChange}
        onPaste={handlePaste}
        onBlur={handleBlur}
        ref={handleFocus}
        className="bg-white text-neutral-600 "
        placeholder="Add a note here..."
      />
    </div>
  );
};
