"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogFooter } from "~/components/dialog";
import { Button } from "~/components/button";

interface AddLinkProps {
  onAdd: (url: string) => void;
}

const TRANSITION = { type: "spring", duration: 0.2, bounce: 0 };

export const AddLink = ({ onAdd }: AddLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleAddLink = () => {
    setIsOpen(true);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData("text");
    setUrl(text);
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;

    setUrl(target.value);
  };

  const handleSubmit = () => {
    if (!url.trim()) return;

    onAdd(url.trim());
    setIsOpen(false);
    setUrl("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-80">
          <textarea
            value={url}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Add here a link or something"
            className="w-full resize-none overflow-hidden outline-none rounded-lg pt-0.5 pl-1 min-h-[100px]"
            autoFocus
          />

          <DialogFooter>
            <Button variant="primary" onClick={handleSubmit}>
              Add link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        className="flex flex-col group items-center fixed -bottom-10 w-80"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        whileHover={{ y: -40 }}
        transition={TRANSITION}
      >
        <div className="flex justify-center items-center pb-1 pt-4 w-full bg-gradient-to-t via-neutral-100 from-neutral-100 to-transparent text-sm gap-1.5 text-neutral-400 group-hover:text-neutral-500 duration-100">
          <ChevronUp size={16} />
          Swipe up to add link
        </div>
        <div className="bg-neutral-100 shadow-sm w-full">
          <div className="bg-white w-full px-4 py-5 rounded-t-2xl h-52">
            <textarea
              placeholder="Add a link"
              className="w-full resize-none overflow-hidden outline-none placeholder:text-neutral-400"
              value={""}
              onPaste={handlePaste}
              onChange={handleAddLink}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
