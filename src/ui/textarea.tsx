import cn from "@/utils/cn";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

const Textarea = forwardRef<ElementRef<"textarea">, ComponentPropsWithoutRef<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("w-full rounded-xl border border-night-600 bg-night-800 p-1", className)}
      >
        <textarea
          className="better-scrollbar max-h-[20rem] min-h-[5rem] w-full bg-night-800 p-2 focus:outline-none"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

export default Textarea;
