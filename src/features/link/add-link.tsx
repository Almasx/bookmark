"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "motion/react";
import { Button } from "~/components/button";
import { TextArea } from "~/components/textarea";
import { EVENTS, isValidUrl } from "./utils";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useLinks } from "./link-store";
import { addLink as addLinkAction } from "./api.action";
import { KeyStroke } from "~/components/key-stroke";
import { useIsMobile } from "~/hooks/useBreakPoints";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
const DEMO_LINK = "https://emilkowal.ski/ui/great-animations";

export const AddLink = () => {
  const isMobile = useIsMobile();
  const [url, setUrl] = useState("");

  const addLink = useLinks((state) => state.addLink);
  const updateStatus = useLinks((state) => state.updateStatus);

  const { execute } = useAction(addLinkAction, {
    onSuccess: (result) => {
      if (result?.data) {
        addLink(result.data.link);
        updateStatus("idle");
        setUrl("");
      }
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Oops! Something broke");
    },
  });

  const handlePaste = (text: string) => {
    setUrl(text);
  };

  const handleInputChange = (text: string) => {
    setUrl(text);
  };

  const handleSubmit = useCallback(() => {
    if (!url.trim()) return;
    if (!isValidUrl(url.trim())) return;

    updateStatus("adding_link");
    execute({ url: url.trim() });
    setUrl("");
  }, [execute, updateStatus, url]);

  useEffect(() => {
    const handleDemoLink = () => {
      updateStatus("adding_link");
      execute({ url: DEMO_LINK });
    };

    const handleGlobalPaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text");
      if (text && isValidUrl(text.trim())) {
        e.preventDefault();
        setUrl(text);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener(EVENTS.ADD_DEMO_LINK, handleDemoLink);
    window.addEventListener("paste", handleGlobalPaste);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(EVENTS.ADD_DEMO_LINK, handleDemoLink);
      window.removeEventListener("paste", handleGlobalPaste);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [execute, updateStatus, handleSubmit]);

  const linkValid = useMemo(() => {
    return isValidUrl(url.trim());
  }, [url]);

  const headerText = useMemo(() => {
    if (isMobile)
      return (
        <>
          <ChevronUpIcon className="w-4 h-4" /> Swipe up to add your link
        </>
      );

    return (
      <>
        Press <KeyStroke keys={["Enter"]} /> for new entry
      </>
    );
  }, [isMobile]);

  return (
    <>
      <motion.div
        className={cn(
          "group/add-link flex flex-col  group items-center fixed bottom-0 sm:w-80 w-full sm:px-0 px-4"
        )}
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="flex justify-center items-center pt-4 w-full bg-gradient-to-t via-neutral-100 from-neutral-100 to-transparent text-sm gap-1.5 text-neutral-400 group-hover:text-neutral-500 duration-100">
          {headerText}
        </div>
        <div className="bg-neutral-100 pb-3 pt-2 w-full h-full">
          <div className="shadow-sm w-full h-full  bg-white flex flex-col px-3 py-2.5 rounded-2xl ">
            <TextArea
              className="px-1 py-2.5"
              placeholder="Add a link"
              value={url}
              onPaste={handlePaste}
              onChange={handleInputChange}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            <Button
              className="ml-auto mt-auto origin-bottom-right group-hover/add-link:scale-100 group-hover/add-link:opacity-100 scale-90 opacity-0 ease-out duration-100 "
              disabled={!linkValid}
              variant="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
