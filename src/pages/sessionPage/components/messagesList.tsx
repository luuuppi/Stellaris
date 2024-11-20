import { type Message } from "@/store/useSessionsStore";
import MessageComponent from "@/ui/messageComponent";
import { type FC } from "react";
import { StickToBottom } from "use-stick-to-bottom";
import { useSnapshot } from "valtio";
import completionStore from "../model/store/completionStore";

type MessagesListProps = {
  messages: Message[];
};

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  const completionSnap = useSnapshot(completionStore);

  return (
    <StickToBottom className="flex flex-1 overflow-auto" resize="smooth" initial="smooth">
      <StickToBottom.Content className="mx-auto flex max-w-[50rem] flex-col gap-5 px-3 py-8">
        {messages.map((message, index) => (
          <MessageComponent key={index} role={message.role === "user" ? "user" : "assistant"}>
            {message.content}
          </MessageComponent>
        ))}
        {completionSnap.isCompletionInProgress && (
          <MessageComponent role="assistant">
            {completionSnap.completion === "" ? "Loading model..." : completionSnap.completion}
          </MessageComponent>
        )}
      </StickToBottom.Content>
    </StickToBottom>
  );
};

export default MessagesList;
