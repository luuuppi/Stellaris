import { cva, type VariantProps } from "class-variance-authority";
import { Bot, UserRound } from "lucide-react";
import { type FC, type ReactNode } from "react";
import Markdown from "react-markdown";
import CodeBlock from "./codeBlock";

const messageStyles = cva("flex gap-5", {
  variants: {
    role: {
      assistant: "flex-row",
      user: "flex-row-reverse",
    },
  },
});

const messageBodyStyles = cva("rounded-lg bg-night-800 px-5 py-3 leading-[200%]", {
  variants: {
    role: {
      assistant: "rounded-tl-sm",
      user: "rounded-tr-sm",
    },
  },
});

type MessageComponentProps = {
  children: ReactNode;
} & VariantProps<typeof messageStyles>;

const MessageComponent: FC<MessageComponentProps> = ({ children, role }) => {
  return (
    <div className={messageStyles({ role })}>
      <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-night-50 text-black">
        {role === "assistant" ? <Bot /> : <UserRound />}
      </div>
      <Markdown
        className={messageBodyStyles({ role })}
        children={children as string}
        components={{
          code: ({ children, className, ...props }) => {
            // No className === not a fancy-code-block
            if (!className) {
              return (
                <code className="rounded-md bg-night-900 p-1" {...props}>
                  {children}
                </code>
              );
            }

            // Waiting for the children prop to prevent undefined being passed to the syntax highlighting function
            if (children) {
              return (
                <CodeBlock className={className} {...props}>
                  {children}
                </CodeBlock>
              );
            }
          },
          ol: ({ children }) => (
            <ol className="mb-4 flex list-inside list-decimal flex-col gap-2">{children}</ol>
          ),
          p: "span",
        }}
      />
    </div>
  );
};

export default MessageComponent;
