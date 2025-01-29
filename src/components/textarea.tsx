import { motion } from "motion/react";
import { HTMLMotionProps } from "motion/react";
import { cn } from "~/lib/utils";

type TextAreaProps = Omit<
  HTMLMotionProps<"textarea">,
  "onChange" | "onPaste"
> & {
  onPaste?: (text: string) => void;
  onChange?: (text: string) => void;
};

export const TextArea = (props: TextAreaProps) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    props.onPaste?.(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;

    props.onChange?.(target.value);
  };

  return (
    <motion.textarea
      {...props}
      className={cn(
        "w-full resize-none overflow-hidden outline-none placeholder:text-neutral-400",
        props.className
      )}
      onPaste={handlePaste}
      onChange={handleInputChange}
      ref={(el) => {
        if (el) {
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        }
      }}
    />
  );
};
