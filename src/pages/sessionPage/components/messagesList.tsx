import { type Message } from "@/store/useSessionsStore";
import MessageComponent from "@/ui/messageComponent";
import { type FC } from "react";
import { useStickToBottom } from "use-stick-to-bottom";
import { useSnapshot } from "valtio";
import completionStore from "../model/store/completionStore";
import { ArrowDown } from "lucide-react";
import Button from "@/ui/button";

type MessagesListProps = {
  messages: Message[];
};

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  const completionSnap = useSnapshot(completionStore);
  const { scrollRef, contentRef, scrollToBottom, isAtBottom } = useStickToBottom({
    resize: "smooth",
    initial: "smooth",
  });

  return (
    <div className="relative flex flex-1 overflow-auto">
      <div className="better-scrollbar h-full w-full overflow-auto" ref={scrollRef}>
        <div className="mx-auto flex max-w-[50rem] flex-col gap-5 px-3 py-8" ref={contentRef}>
          {messages.map((message, index) => (
            <MessageComponent
              key={index}
              role={message.role === "user" ? "user" : "assistant"}
            >
              {message.content}
            </MessageComponent>
          ))}
          {completionSnap.isCompletionInProgress && (
            <MessageComponent role="assistant">
              {completionSnap.completion === ""
                ? "Loading model..."
                : completionSnap.completion}
            </MessageComponent>
          )}
        </div>
        {!isAtBottom && (
          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            <Button variant="secondary" size="icon_xs" onClick={() => scrollToBottom()}>
              <ArrowDown size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;
