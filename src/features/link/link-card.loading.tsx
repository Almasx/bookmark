import { motion } from "motion/react";
import { TagShipLoading } from "~/features/tag";

export const LoadingLinkCard = () => {
  return (
    <motion.div className="max-w-96 bg-white px-3 rounded-3xl group space-y-5 min-h-[120px] flex items-center justify-center">
      <TagShipLoading />
    </motion.div>
  );
};
