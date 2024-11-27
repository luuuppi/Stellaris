import { cva, type VariantProps } from "class-variance-authority";
import { Bot, UserRound } from "lucide-react";
import { memo, type FC, type ReactNode } from "react";
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

type MessageComponentProps = {
  children: ReactNode;
} & VariantProps<typeof messageStyles>;

const MessageComponent: FC<MessageComponentProps> = memo(({ children, role }) => {
  return (
    <div className={messageStyles({ role })}>
      <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-night-50 text-black">
        {role === "assistant" ? <Bot /> : <UserRound />}
      </div>
      {role === "assistant" ? (
        <AssistantMarkdown children={children as string} />
      ) : (
        <UserMarkdown children={children as string} />
      )}
    </div>
  );
});

const UserMarkdown = ({ children }: { children: string }) => {
  return (
    <Markdown
      className="max-w-[70%] whitespace-pre-wrap break-words rounded-lg rounded-tr-sm bg-night-800 px-5 py-3 leading-[200%]"
      children={children as string}
      components={{
        code: ({ children }) => {
          return (
            <div className="better-scrollbar overflow-x-auto">
              <code>{children}</code>
            </div>
          );
        },
        ol: ({ children }) => (
          <ol className="mb-4 flex list-inside list-decimal flex-col gap-2">{children}</ol>
        ),
        p: "span",
      }}
    />
  );
};

const AssistantMarkdown = ({ children }: { children: string }) => {
  return (
    <Markdown
      className="break-words rounded-lg rounded-tl-sm bg-night-800 px-5 py-3 leading-[200%]"
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
  );
};

export default MessageComponent;
