import type { Tag } from "@prisma/client";

interface TagChipProps {
  tags: Tag[];
  id?: string;
}

export const TagChip = ({ tags, id }: TagChipProps) => {
  const displayEmojis = tags.slice(0, 3).map((tag) => tag);

  return (
    <div className="chip px-2 w-12 duration-100 gap-x-1">
      {displayEmojis.map((tag, index) => (
        <span
          key={`tag-${id}-${index}`}
          className={`-mx-1 ${
            index % 2 === 0
              ? "rotate-6 group-hover:-rotate-6"
              : "-rotate-6 group-hover:rotate-6"
          } duration-100`}
        >
          {tag.emoji}
        </span>
      ))}
    </div>
  );
};
