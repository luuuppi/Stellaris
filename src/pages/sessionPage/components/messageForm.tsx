import { useSessionStore } from "@/store/useSessionsStore";
import Button from "@/ui/button";
import Input from "@/ui/input";
import { SendHorizontal } from "lucide-react";
import { type ChangeEvent, type FC, type FormEvent, useCallback, useState } from "react";
import useOllamaChat from "../model/useOllamaChat";
import completionStore from "../store/completionStore";

type MessageFormProps = {
  id: string;
};

const MessageForm: FC<MessageFormProps> = ({ id }) => {
  const [value, setValue] = useState<string>("");
  const setMessage = useSessionStore((state) => state.setMessage);
  const ollamaChat = useOllamaChat({
    id,
    onChunk: (value) => {
      completionStore.completion += value;
    },
  });

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setMessage(id, { role: "user", content: value });
    setValue("");
    ollamaChat();
  };

  return (
    <form className="mx-20 mb-8 flex gap-2" onSubmit={submitHandler}>
      <Input
        className="w-full"
        id="messageInput"
        placeholder="Write a message..."
        value={value}
        onChange={changeHandler}
        autoComplete="off"
      />
      <Button size="icon_md">
        <SendHorizontal />
      </Button>
    </form>
  );
};

export default MessageForm;
