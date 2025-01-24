import cn from "@/utils/cn";
import {
  Content as ContentPrimitive,
  Icon as IconPrimitive,
  ItemIndicator as ItemIndicatorPrimitive,
  Item as ItemPrimitive,
  ItemText as ItemTextPrimitive,
  Portal as PortalPrimitive,
  Root as RootPrimitive,
  Trigger as TriggerPrimitive,
  Value as ValuePrimitive,
  Viewport as ViewportPrimitive,
} from "@radix-ui/react-select";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
} from "react";

type SelectContextType = {
  isOpen: boolean;
};

const SelectContext = createContext<SelectContextType>({ isOpen: false });

const Select: FC<ComponentPropsWithoutRef<typeof RootPrimitive>> = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SelectContext.Provider value={{ isOpen: open ?? isOpen }}>
      <RootPrimitive open={open ?? isOpen} onOpenChange={onOpenChange ?? setIsOpen} {...props}>
        {children}
      </RootPrimitive>
    </SelectContext.Provider>
  );
};

type SelectTriggerProps = {
  label: string;
} & ComponentPropsWithoutRef<typeof TriggerPrimitive>;

const SelectTrigger = forwardRef<ElementRef<typeof TriggerPrimitive>, SelectTriggerProps>(
  ({ label, value, className, ...props }, ref) => {
    const { isOpen } = useContext(SelectContext);

    return (
      <TriggerPrimitive
        className={cn(
          "flex w-full justify-between rounded-xl border border-night-600 bg-night-800 p-2 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
        ref={ref}
      >
        <ValuePrimitive placeholder={label}>{value}</ValuePrimitive>
        <IconPrimitive asChild>
          <ChevronDown
            data-open={isOpen}
            className="duraiton-200 transition-all ease-in-out data-[open=true]:rotate-180"
          />
        </IconPrimitive>
      </TriggerPrimitive>
    );
  },
);

const contentAnimation: Variants = {
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

const SelectContent = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(SelectContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <PortalPrimitive>
          <ContentPrimitive
            className="rounded-xl border border-night-600 bg-night-800 text-white"
            position="popper"
            align="center"
            sideOffset={5}
            asChild
            ref={ref}
            {...props}
          >
            <motion.div
              className="origin-[var(--radix-select-content-transform-origin)]"
              variants={contentAnimation}
              initial="closed"
              animate="opened"
              exit="closed"
            >
              <ViewportPrimitive className="min-w-[var(--radix-select-trigger-width)] p-2">
                {children}
              </ViewportPrimitive>
            </motion.div>
          </ContentPrimitive>
        </PortalPrimitive>
      )}
    </AnimatePresence>
  );
});

const SelectItem = forwardRef<
  ElementRef<typeof ItemPrimitive>,
  ComponentPropsWithoutRef<typeof ItemPrimitive>
>(({ children, value, ...props }, ref) => {
  return (
    <ItemPrimitive
      className="flex cursor-pointer items-center rounded-md py-1 pl-7 font-medium outline-none transition-colors duration-200 ease-in-out data-[highlighted]:bg-night-700"
      value={value}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      {...props}
    >
      <ItemIndicatorPrimitive className="absolute left-3" asChild>
        <Check size={20} />
      </ItemIndicatorPrimitive>
      <ItemTextPrimitive>{children}</ItemTextPrimitive>
    </ItemPrimitive>
  );
});

export { Select, SelectContent, SelectItem, SelectTrigger };
