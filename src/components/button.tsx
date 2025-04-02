"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "~/lib/utils";
import { HTMLMotionProps } from "motion/react";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex duration-200 items-center justify-center gap-2 px-3 py-1 whitespace-nowrap rounded-xl font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-100 disabled:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        primary: "bg-primary-500 text-white hover:bg-primary-500/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary: "text-neutral-600 bg-neutral-200/80",
        ghost:
          "text-neutral-400 hover:text-neutral-500 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    HTMLMotionProps<"button"> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, loading = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, className }))}
          ref={ref}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        />
      );
    }
    const content = () => {
      if (loading) {
        return (
          <>
            <Spinner size={14} color="rgba(0, 0, 0, 0.65)" />
            {props.loadingText}
          </>
        );
      }
      return props.children;
    };

    return (
      <motion.button
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className={cn("flex items-center justify-center gap-2")}
            initial={{ opacity: 0, y: -25, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 25, filter: "blur(5px)" }}
            key={loading ? "loading" : "default"}
          >
            {content()}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
