import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
} from "react";

type TooltipContextType = {
  isOpen: boolean;
};

const TooltipContext = createContext<TooltipContextType>({ isOpen: false });

const Tooltip: FC<ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>> = ({
  children,
  delayDuration = 300,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <TooltipContext.Provider value={{ isOpen }}>
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          delayDuration={delayDuration}
          {...props}
        >
          {children}
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = forwardRef<
  ElementRef<typeof TooltipPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <TooltipPrimitive.Trigger ref={ref} asChild {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  );
});

const tooltipAnimation: Variants = {
  visible: {
    opacity: 1,
    scale: "100%",
    transition: { type: "spring", duration: 0.2 },
  },
  invisible: {
    opacity: 0,
    scale: "50%",
    transition: { type: "spring", duration: 0.5 },
  },
};

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(TooltipContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrimitive.Portal forceMount>
          <TooltipPrimitive.Content ref={ref} asChild sideOffset={5} {...props}>
            <motion.div
              className="origin-[var(--radix-tooltip-content-transform-origin)] rounded-lg bg-night-500 p-1 text-sm text-white"
              variants={tooltipAnimation}
              initial="invisible"
              animate="visible"
              exit="invisible"
            >
              {children}
            </motion.div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});

export { Tooltip, TooltipContent, TooltipTrigger };
