import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Programmatically generate emoji ranges
const generateEmojis = () => {
  const ranges = [
    [0x1f300, 0x1f320], // Misc symbols
    [0x1f330, 0x1f335], // Plant symbols
    [0x1f400, 0x1f43c], // Animal symbols
    [0x1f440, 0x1f444], // Face symbols
    [0x1f600, 0x1f636], // Additional emoticons
    [0x1f680, 0x1f6a0], // Transport symbols
    [0x1f4a0, 0x1f4b0], // Misc symbols
  ];

  return ranges
    .flatMap(([start, end]) =>
      Array.from({ length: end - start + 1 }, (_, i) =>
        String.fromCodePoint(start + i)
      )
    )
    .filter((emoji) => emoji.length === 2); // Filter valid emojis
};

const EMOJIS = generateEmojis();
const TRANSITION = { type: "spring", duration: 0.6, bounce: 0.2 };
const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 50, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -50, filter: "blur(4px)" },
};
const SHUFFLE_INTERVAL = 1000;

export const LoadingLinkCard = () => {
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([
    EMOJIS[0],
    EMOJIS[1],
    EMOJIS[2],
  ]);

  useEffect(() => {
    // Otherwise keep shuffling
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
      className="max-w-96 bg-white px-3 rounded-3xl group space-y-5 min-h-[120px] flex items-center justify-center"
      layout
      transition={TRANSITION}
    >
      <motion.div
        className="chip h-12 w-24 flex justify-center items-center overflow-hidden"
        layout="position"
        layoutId="tag-chip"
      >
        <AnimatePresence mode="popLayout">
          {currentEmojis.map((emoji, index) => (
            <motion.span
              key={`${emoji}-${index}`}
              className="text-2xl -mx-0.5"
              variants={ANIMATION_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                ...TRANSITION,
                delay: index * 0.1,
                duration: TRANSITION.duration,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
