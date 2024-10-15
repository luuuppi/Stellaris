import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";

const buttonStyles = cva("transition-colors duration-150 ease-in-out", {
  variants: {
    variant: {
      primary: "bg-accent-600 hover:bg-accent-700 active:bg-accent-800",
      tertiary: "text-night-300 hover:bg-night-700/30 active:bg-night-700/50",
    },
    size: {
      md: "flex gap-1 rounded-xl px-6 py-3",
      icon_md: "rounded-xl px-3 py-3",
      icon_sm: "rounded-lg px-2 py-2",
      icon_xs: "rounded-lg px-1 py-1",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = {
  leadingIcon?: ReactNode;
} & ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonStyles>;

const Button: FC<ButtonProps> = ({ children, className, variant, size, leadingIcon }) => {
  return (
    <button className={buttonStyles({ variant, size, className })}>
      {leadingIcon}
      {children}
    </button>
  );
};

export default Button;
