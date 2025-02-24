import {
  Content as ContentPrimitive,
  Item as ItemPrimitive,
  Portal as PortalPrimitive,
  Root as RootPrimitive,
  Trigger as TriggerPrimitive,
} from "@radix-ui/react-dropdown-menu";
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

type DropdownMenuContextType = {
  isOpen: boolean;
};

const DropdownMenuContext = createContext<DropdownMenuContextType>({ isOpen: false });

const DropdownMenu: FC<ComponentPropsWithoutRef<typeof RootPrimitive>> = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen: open ?? isOpen }}>
      <RootPrimitive
        open={open ?? isOpen}
        onOpenChange={onOpenChange ?? setIsOpen}
        defaultOpen={false}
        {...props}
      >
        {children}
      </RootPrimitive>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof TriggerPrimitive>,
  ComponentPropsWithoutRef<typeof TriggerPrimitive>
>(({ children, ...props }, ref) => {
  return (
    <TriggerPrimitive asChild ref={ref} {...props}>
      {children}
    </TriggerPrimitive>
  );
});

const dropdownMenuContentAnimation: Variants = {
  opened: {
    opacity: 1,
    scale: "100%",
    transition: {
      type: "spring",
      duration: 0.2,
      bounce: 0,
      staggerChildren: 0.05,
    },
  },
  closed: {
    opacity: 0,
    scale: "50%",
    transition: { type: "spring", duration: 0.3, bounce: 0 },
  },
};

const DropdownMenuContent = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(DropdownMenuContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <PortalPrimitive forceMount>
          <ContentPrimitive
            onCloseAutoFocus={(e) => e.preventDefault()}
            align="start"
            loop
            asChild
            ref={ref}
            {...props}
          >
            <motion.div
              className="flex origin-[var(--radix-dropdown-menu-content-transform-origin)] flex-col justify-center gap-1 rounded-xl border border-night-700 bg-night-900 p-1"
              variants={dropdownMenuContentAnimation}
              initial="closed"
              animate="opened"
              exit="closed"
            >
              {children}
            </motion.div>
          </ContentPrimitive>
        </PortalPrimitive>
      )}
    </AnimatePresence>
  );
});

const dropdownMenuItemAnimation: Variants = {
  opened: { opacity: 1 },
  closed: { opacity: 0 },
};

const DropdownMenuItem = forwardRef<
  ElementRef<typeof ItemPrimitive>,
  ComponentPropsWithoutRef<typeof ItemPrimitive>
>(({ children, ...props }, ref) => {
  return (
    <ItemPrimitive
      className="flex cursor-pointer items-center justify-start gap-3 rounded-md px-2 py-1 text-white outline-none transition-colors duration-200 ease-in-out active:bg-red-700 data-[highlighted]:bg-night-700/30"
      onClick={(e) => e.stopPropagation()}
      asChild
      ref={ref}
      {...props}
    >
      <motion.div variants={dropdownMenuItemAnimation}>{children}</motion.div>
    </ItemPrimitive>
  );
});

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
