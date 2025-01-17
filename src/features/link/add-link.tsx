"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogFooter } from "~/components/dialog";
import { Button } from "~/components/button";

interface AddLinkFormData {
  content: string;
}

export const AddLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AddLinkFormData>({ content: "" });

  const handleAddLink = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;

    setFormData((prev) => ({ ...prev, content: target.value }));
  };

  const handleSubmit = () => {
    // TODO: Implement link submission logic
    setIsOpen(false);
    setFormData({ content: "" });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-80">
          <textarea
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Add here a link or something"
            className="w-full resize-none overflow-hidden outline-none  rounded-lg pt-0.5 pl-1 min-h-[100px]"
            autoFocus
          />

          <DialogFooter>
            <Button variant="primary" onClick={handleSubmit}>
              Add layer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        className="flex flex-col gap-2 group items-center fixed -bottom-10 w-80"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        whileHover={{ y: -40 }}
        transition={{ type: "spring", duration: 0.2, bounce: 0 }}
      >
        <div className="flex items-center text-sm gap-1.5 text-neutral-400 group-hover:text-neutral-500 duration-100">
          <ChevronUp size={16} />
          Swipe up to add link
        </div>
        <div className="bg-white shadow-sm px-4 py-5 rounded-t-2xl h-52 w-full">
          <textarea
            placeholder="Add resource"
            className="w-full resize-none overflow-hidden outline-none placeholder:text-neutral-400"
            value={""}
            onChange={handleAddLink}
          />
        </div>
      </motion.div>
    </>
  );
};
