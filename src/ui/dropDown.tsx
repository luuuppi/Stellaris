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

type DropDownMenuContextType = {
  isOpen: boolean;
};

const DropDownMenuContext = createContext<DropDownMenuContextType>({ isOpen: false });

const DropDownMenu: FC<ComponentPropsWithoutRef<typeof RootPrimitive>> = ({
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropDownMenuContext.Provider value={{ isOpen }}>
      <RootPrimitive open={isOpen} onOpenChange={setIsOpen} defaultOpen={false} {...props}>
        {children}
      </RootPrimitive>
    </DropDownMenuContext.Provider>
  );
};

const DropDownMenuTrigger = forwardRef<
  ElementRef<typeof TriggerPrimitive>,
  ComponentPropsWithoutRef<typeof TriggerPrimitive>
>(({ children, ...props }, ref) => {
  return (
    <TriggerPrimitive asChild ref={ref} {...props}>
      {children}
    </TriggerPrimitive>
  );
});

const dropDownMenuContentAnimation: Variants = {
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

const DropDownMenuContent = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(DropDownMenuContext);

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
              className="flex origin-[var(--radix-dropdown-menu-content-transform-origin)] flex-col justify-center gap-1 rounded-lg bg-night-700 p-2"
              variants={dropDownMenuContentAnimation}
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

const dropDownMenuItemAnimation: Variants = {
  opened: { opacity: 1 },
  closed: { opacity: 0 },
};

const DropDownMenuItem = forwardRef<
  ElementRef<typeof ItemPrimitive>,
  ComponentPropsWithoutRef<typeof ItemPrimitive>
>(({ children, ...props }, ref) => {
  return (
    <ItemPrimitive
      className="flex cursor-pointer items-center justify-start gap-1 rounded-md p-1 text-white outline-none transition-colors duration-200 ease-in-out active:bg-night-500 data-[highlighted]:bg-night-600"
      asChild
      ref={ref}
      {...props}
    >
      <motion.div variants={dropDownMenuItemAnimation}>{children}</motion.div>
    </ItemPrimitive>
  );
});

export { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTrigger };
