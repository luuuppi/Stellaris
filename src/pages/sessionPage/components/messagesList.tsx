import { type Message } from "@/store/useSessionsStore";
import MessageComponent from "@/ui/messageComponent";
import { type FC } from "react";

type MessagesListProps = {
  messages: Message[];
};

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  return (
    <div className="flex flex-1 flex-col gap-5 overflow-y-scroll px-20 py-8">
      {messages.map((message, index) => (
        <MessageComponent key={index} role={message.role === "user" ? "user" : "assistant"}>
          {message.content}
        </MessageComponent>
      ))}
    </div>
  );
};

export default MessagesList;
