import cn from "@/utils/cn";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

const Input = forwardRef<ElementRef<"input">, ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "rounded-xl border border-night-600 bg-night-800 p-2 focus:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
