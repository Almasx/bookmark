import { createContext, useContext, use, useState } from "react";
import { LinkWithTags } from "~/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMeasure } from "react-use";
import * as React from "react";
import { TextArea } from "~/components/textarea";
import { Tag } from "~/features/tag";
import { useAction } from "next-safe-action/hooks";
import { updateLinkSummary } from "~/app/action";
import { LinksContextProps } from "~/app/page.client";
import { LinksContext } from "~/app/page.client";

const LinkContext = createContext<{
  link: LinkWithTags | null;
}>({ link: null });

interface EditLinkProps {
  link: LinkWithTags;
  children: (props: { editing: boolean }) => React.ReactNode;
}

export const EditLink = ({ link, children }: EditLinkProps) => {
  const [editing, setEditing] = useState(false);
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  return (
    <LinkContext.Provider value={{ link }}>
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
              <LinkSummary />
            </motion.div>
          )}

          {/* Tags */}
          {editing && (
            <motion.div
              key="tags"
              className="absolute z-20 top-0 w-full flex-col flex gap-2 py-1"
              initial={{ x: 12 + bounds.width, opacity: 0 }}
              animate={{
                x: 12 + bounds.width,
                opacity: 1,
                transition: { delay: 0.15 },
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
    </LinkContext.Provider>
  );
};

const LinkSummary = () => {
  const { link } = use(LinkContext);
  const [summary, setSummary] = useState(link?.summary || "");

  const { execute: updateLink } = useAction(updateLinkSummary);
  const { setLinks } = useContext<LinksContextProps>(LinksContext);

  if (!link) return null;

  const handleChange = (text: string) => {
    setSummary(text);
  };

  const handlePaste = (text: string) => {
    setSummary((t) => t + text);
  };

  const handleBlur = () => {
    if (summary === link.summary) return;
    updateLink({ id: link.id, summary });
    setLinks((links) =>
      links.map((l) => (l.id === link.id ? { ...l, summary } : l))
    );
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
        rows={4}
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
