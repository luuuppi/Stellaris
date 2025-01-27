import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ElementRef,
  type FC,
  forwardRef,
  useContext,
  useState,
} from "react";

type AlertDialogContextType = {
  isOpen: boolean;
};

const AlertDialogContext = createContext<AlertDialogContextType>({ isOpen: false });

const AlertDialog: FC<ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>> = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AlertDialogContext.Provider value={{ isOpen: open ?? isOpen }}>
      <AlertDialogPrimitive.Root
        open={open ?? isOpen}
        onOpenChange={onOpenChange ?? setIsOpen}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Trigger
      onClick={(e) => e.stopPropagation()}
      asChild
      ref={ref}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Trigger>
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

const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(AlertDialogContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialogPrimitive.Portal forceMount>
          <AlertDialogPrimitive.Overlay
            asChild
            className="fixed inset-0 bg-night-900/40 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key="overlay"
              variants={contentAnimation}
              initial="closed"
              animate="opened"
              exit="closed"
            >
              <AlertDialogPrimitive.Content
                className="fixed left-1/2 top-1/2 max-w-[600px] !translate-x-[-50%] !translate-y-[-50%] rounded-xl border border-night-700 bg-night-900 p-6 text-white shadow-xl shadow-night-950"
                asChild
                ref={ref}
                {...props}
              >
                <motion.div
                  key="content"
                  variants={contentAnimation}
                  initial="closed"
                  animate="opened"
                  exit="closed"
                >
                  {children}
                </motion.div>
              </AlertDialogPrimitive.Content>
            </motion.div>
          </AlertDialogPrimitive.Overlay>
        </AlertDialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});

const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Title className="text-lg font-semibold" ref={ref} {...props}>
      {children}
    </AlertDialogPrimitive.Title>
  );
});

const AlertDialogDescription = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description className="my-3" ref={ref} {...props}>
      {children}
    </AlertDialogPrimitive.Description>
  );
});

const AlertDialogCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Cancel className="text-white" asChild ref={ref} {...props}>
      {children}
    </AlertDialogPrimitive.Cancel>
  );
});

const AlertDialogAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Action className="text-white" asChild ref={ref} {...props}>
      {children}
    </AlertDialogPrimitive.Action>
  );
});

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
};
