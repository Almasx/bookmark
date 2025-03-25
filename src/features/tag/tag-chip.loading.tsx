import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { EMOJIS } from "./utils";

const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 50, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -50, filter: "blur(4px)" },
};
const SHUFFLE_INTERVAL = 1000;

const initialEmojis = [EMOJIS[0], EMOJIS[1], EMOJIS[2]];

export const LOADING_TAG_SHIP_ID = "loading";

export const TagShipLoading = () => {
  const [currentEmojis, setCurrentEmojis] = useState<string[]>(initialEmojis);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojis([
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      ]);
    }, SHUFFLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      className="chip h-12 w-24 flex justify-center items-center overflow-clip"
      layoutId={`tag-chip-${LOADING_TAG_SHIP_ID}`}
    >
      <AnimatePresence mode="popLayout">
        {currentEmojis.map((emoji, index) => (
          <motion.span
            key={`loading-${emoji}-${index}`}
            className="text-2xl -mx-0.5 will-change-transform"
            variants={ANIMATION_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.2,
              delay: index * 0.1,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
