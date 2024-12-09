import cn from "@/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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

type DialogContextType = {
  isOpen: boolean;
};

const DialogContext = createContext<DialogContextType>({ isOpen: false });

const Dialog: FC<ComponentPropsWithoutRef<typeof DialogPrimitive.Root>> = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ isOpen: open ?? isOpen }}>
      <DialogPrimitive.Root
        open={open ?? isOpen}
        onOpenChange={onOpenChange ?? setIsOpen}
        {...props}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};

const DialogTrigger = forwardRef<
  ElementRef<typeof DialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <DialogPrimitive.Trigger onClick={(e) => e.stopPropagation()} asChild ref={ref} {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
});

const contentAnimation: Variants = {
  opened: {
    opacity: 1,
    transition: { type: "spring", bounce: 0, duration: 0.3 },
  },
  closed: {
    opacity: 0,
    transition: { type: "spring", bounce: 0, duration: 0.3 },
  },
};

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  const { isOpen } = useContext(DialogContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay
            className="fixed inset-0 bg-night-900/40 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col rounded-xl border border-night-700 bg-night-900 p-6 text-white shadow-xl shadow-night-950",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
            asChild
            ref={ref}
            {...props}
          >
            <motion.div
              variants={contentAnimation}
              initial="closed"
              animate="opened"
              exit="closed"
            >
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  );
});

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ children, className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description className={cn("my-3", className)} ref={ref} {...props}>
      {children}
    </DialogPrimitive.Description>
  );
});

const DialogClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ children, ...props }, ref) => {
  return (
    <DialogPrimitive.Close asChild ref={ref} {...props}>
      {children}
    </DialogPrimitive.Close>
  );
});

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger };
