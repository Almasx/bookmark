import { Link } from "@prisma/client";
import { Icon } from "~/components/icon";
import { ICONS } from "~/components/icon";
import { howManyDaysAgo } from "./utils";
import { motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { deleteLink as deleteLinkAction } from "./api.action";
import { useLinks } from "../link/link-store";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface DeleteChipProps {
  link: Link;
}

export const DeleteChip = ({ link }: DeleteChipProps) => {
  const daysAgo = howManyDaysAgo(new Date(link.createdAt));
  const deleteLink = useLinks((state) => state.deleteLink);
  const [active, setActive] = useState(false);

  const { execute } = useAction(deleteLinkAction);

  const handleDelete = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    execute({ id: link.id });

    deleteLink(link.id);
  };

  return (
    <motion.div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(true)}
      onTap={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn(
        "chip relative px-2 duration-200 font-medium text-neutral-500 w-14 hover:w-11 overflow-hidden",
        active && "bg-red-500 "
      )}
    >
      <span
        className={cn(
          " whitespace-nowrap  duration-200 ease-in-out peer absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
          active && "text-white -top-1/2"
        )}
      >
        {daysAgo} 💣
      </span>
      <span
        className={cn(
          "absolute left-1/2 w-11 h-6 grid  place-items-center duration-200 ease-in-out -translate-x-1/2 top-[150%] -translate-y-1/2",
          active && "top-1/2"
        )}
        onClick={handleDelete}
      >
        <Icon path={ICONS.delete} className="text-white" />
      </span>
    </motion.div>
  );
};
