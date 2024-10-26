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
>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(DialogContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay
            className="fixed inset-0 bg-night-900/40 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            asChild
          >
            <motion.div
              variants={contentAnimation}
              initial="closed"
              animate="opened"
              exit="closed"
            >
              <DialogPrimitive.Content
                className="fixed left-1/2 top-1/2 max-w-[600px] !translate-x-[-50%] !translate-y-[-50%] rounded-xl border border-night-700 bg-night-900 p-6 text-white shadow-xl shadow-night-950"
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
            </motion.div>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, ...props }, ref) => {
  return (
    <DialogPrimitive.Title className="text-lg font-semibold" ref={ref} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
});

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ children, ...props }, ref) => {
  return (
    <DialogPrimitive.Description className="my-3" ref={ref} {...props}>
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
