import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

const Input = forwardRef<ElementRef<"input">, ComponentPropsWithoutRef<"input">>(
  ({ ...props }, ref) => {
    return (
      <input
        className="rounded-xl border border-night-600 bg-night-800 p-2 focus:outline-none"
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
