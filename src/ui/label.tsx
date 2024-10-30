import cn from "@/utils/cn";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ children, className, ...props }, ref) => {
  return (
    <LabelPrimitive.Root className={cn("text-sm font-medium", className)} ref={ref} {...props}>
      {children}
    </LabelPrimitive.Root>
  );
});

export default Label;
