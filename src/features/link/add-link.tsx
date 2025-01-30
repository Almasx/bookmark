"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogFooter } from "~/components/dialog";
import { Button } from "~/components/button";
import { TextArea } from "~/components/textarea";
import { EVENTS, isValidUrl } from "./utils";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useLinks } from "./link-store";
import { addLink as addLinkAction } from "./api.action";

const DEMO_LINK = "https://emilkowal.ski/ui/great-animations";

export const AddLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const addLink = useLinks((state) => state.addLink);
  const updateStatus = useLinks((state) => state.updateStatus);

  const { execute } = useAction(addLinkAction, {
    onSuccess: (result) => {
      if (result?.data) {
        addLink(result.data.link);
        updateStatus("idle");
        setIsOpen(false);
        setUrl("");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Oops! Something broke");
    },
  });

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    const handleDemoLink = () => {
      updateStatus("adding_link");
      execute({ url: DEMO_LINK });
    };

    window.addEventListener(EVENTS.OPEN_ADD_LINK, handleOpenModal);
    window.addEventListener(EVENTS.ADD_DEMO_LINK, handleDemoLink);

    return () => {
      window.removeEventListener(EVENTS.OPEN_ADD_LINK, handleOpenModal);
      window.removeEventListener(EVENTS.ADD_DEMO_LINK, handleDemoLink);
    };
  }, [execute, updateStatus]);

  const handleAddLink = () => {
    setIsOpen(true);
  };

  const handlePaste = (text: string) => {
    setUrl(text);
    setIsOpen(true);
  };

  const handleInputChange = (text: string) => {
    setUrl(text);
  };

  const handleSubmit = () => {
    if (!url.trim()) return;
    if (!isValidUrl(url.trim())) return;

    updateStatus("adding_link");
    execute({ url: url.trim() });
    setIsOpen(false);
    setUrl("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const linkValid = useMemo(() => {
    return isValidUrl(url.trim());
  }, [url]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-80">
          <TextArea
            value={url}
            onChange={handleInputChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
            className="rounded-lg pt-0.5 pl-1 min-h-[100px]"
            autoFocus
          />

          <DialogFooter>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!linkValid}
            >
              Add link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        className="flex flex-col group items-center fixed -bottom-10 sm:w-80 w-full sm:px-0 px-4"
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
