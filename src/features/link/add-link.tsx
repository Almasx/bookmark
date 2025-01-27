"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogFooter } from "~/components/dialog";
import { Button } from "~/components/button";
import { TextArea } from "~/components/textarea";

interface AddLinkProps {
  onAdd: (url: string) => void;
}

export const AddLink = ({ onAdd }: AddLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleAddLink = () => {
    setIsOpen(true);
  };

  const handlePaste = (text: string) => {
    setUrl((t) => t + text);
    setIsOpen(true);
  };

  const handleInputChange = (text: string) => {
    setUrl(text);
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
          <TextArea
            value={url}
            onChange={handleInputChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            placeholder="Add here a link or something"
            className="rounded-lg pt-0.5 pl-1 min-h-[100px]"
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
        transition={{ type: "spring", duration: 0.2, bounce: 0 }}
      >
        <div className="flex justify-center items-center pb-1 pt-4 w-full bg-gradient-to-t via-neutral-100 from-neutral-100 to-transparent text-sm gap-1.5 text-neutral-400 group-hover:text-neutral-500 duration-100">
          <ChevronUp size={16} />
          Swipe up to add link
        </div>
        <div className="bg-neutral-100 shadow-sm w-full">
          <div className="bg-white w-full px-4 py-5 rounded-t-2xl h-52">
            <TextArea
              placeholder="Add a link"
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
