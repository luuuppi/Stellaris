import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@/ui/button";
import Input from "@/ui/input";
import { SendHorizontal } from "lucide-react";
import { type ChangeEvent, type FC, type FormEvent, useCallback, useState } from "react";
import postMessageToOllama from "../api/postMessageToOllama";

type MessageFormProps = {
  id: string;
};

const MessageForm: FC<MessageFormProps> = ({ id }) => {
  const [value, setValue] = useState<string>("");
  const model = useSessionStore((state) => state.sessions.find((s) => s.id === id)?.model);
  const server = useSettingsStore((state) => state.ollamaServer);
  const setMessage = useSessionStore((state) => state.setMessage);
  const getMessages = useSessionStore((state) => state.getSessionMessages);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setMessage(id, { role: "user", content: value });
    setValue("");
    postMessageToOllama(id, server, model as string, getMessages, setMessage);
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
