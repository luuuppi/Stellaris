import { cva, type VariantProps } from "class-variance-authority";
import { Bot, UserRound } from "lucide-react";
import { type FC, type ReactNode } from "react";

const messageStyles = cva("flex  gap-5", {
  variants: {
    role: {
      assistant: "flex-row",
      user: "flex-row-reverse",
    },
  },
});

const messageBodyStyles = cva("rounded-lg bg-night-800 px-5 py-3", {
  variants: {
    role: {
      assistant: "rounded-tl-sm",
      user: "rounded-tr-sm",
    },
  },
});

type MessageProps = {
  children: ReactNode;
} & VariantProps<typeof messageStyles>;

const Message: FC<MessageProps> = ({ children, role }) => {
  return (
    <div className={messageStyles({ role })}>
      <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-night-50 text-black">
        {role === "assistant" ? <Bot /> : <UserRound />}
      </div>
      <p className={messageBodyStyles({ role })}>{children}</p>
    </div>
  );
};

export default Message;
