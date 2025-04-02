import { Button } from "~/components/button";
import { addDemoLink } from "./utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BombAnimation = () => {
  return (
    <motion.div
      animate={{ y: 300, opacity: 0 }}
      transition={{ duration: 1.2, ease: "linear" }}
      className="absolute left-0 top-0 text-2xl pointer-events-none"
    >
      💣
    </motion.div>
  );
};

export const EmptyState = () => {
  const [bombs, setBombs] = useState<number[]>([]);

  const handleBombClick = () => {
    setBombs((prev) => [...prev, Date.now()]);

    setTimeout(() => {
      setBombs((prev) => prev.slice(1));
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-20rem)] px-4 w-full justify-center flex-col gap-8 items-center">
      <h1 className="group sm:text-3xl text-4xl font-bold text-neutral-400 text-center select-none">
        Start{" "}
        <span
          onClick={handleBombClick}
          className="opacity-50 duration-200 ease-in-out group-hover:opacity-100 relative inline-block cursor-pointer hover:opacity-100"
        >
          💣
          <AnimatePresence>
            {bombs.map((id) => (
              <BombAnimation key={id} />
            ))}
          </AnimatePresence>
        </span>{" "}
        your bookmarks
      </h1>
      <div className="flex gap-2">
        <Button variant="primary" onClick={addDemoLink}>
          Demo
        </Button>
        <Button variant="secondary">Ctrl + V</Button>
      </div>
    </div>
  );
};
