import { Link } from "@prisma/client";
import { Icon } from "~/components/icon";
import { ICONS } from "~/components/icon";
import { howManyDaysAgo } from "./utils";
import { motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { deleteLink } from "~/app/action";
import { useContext } from "react";
import { LinksContext, type LinksContextProps } from "~/app/page.client";

interface DeleteChipProps {
  link: Link;
}

export const DeleteChip = ({ link }: DeleteChipProps) => {
  const daysAgo = howManyDaysAgo(new Date(link.createdAt));
  const { setLinks } = useContext<LinksContextProps>(LinksContext);

  const { execute } = useAction(deleteLink);

  const handleDelete = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    execute({ id: link.id });

    setLinks((prevLinks) => prevLinks.filter((l) => l.id !== link.id));
  };

  return (
    <motion.div className="chip relative px-2 group/delete hover:bg-red-500  duration-200 font-medium text-neutral-500 w-14 hover:w-11 overflow-hidden">
      <span className=" whitespace-nowrap group-hover/delete:-top-1/2 duration-200 ease-in-out peer absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        {daysAgo} 💣
      </span>
      <span
        className="group-hover/delete:top-1/2 absolute left-1/2 w-11 h-6 grid  place-items-center duration-200 ease-in-out -translate-x-1/2 top-[150%] -translate-y-1/2"
        onClick={handleDelete}
      >
        <Icon path={ICONS.delete} className="text-white" />
      </span>
    </motion.div>
  );
};
