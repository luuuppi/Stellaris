import { useSessionStore } from "@/store/useSessionsStore";
import Button from "@/ui/button";
import { SendHorizontal } from "lucide-react";
import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import completionStore from "../model/store/completionStore";
import useOllamaChat from "../model/useOllamaChat";

type MessageFormProps = {
  id: string;
};

const MessageForm: FC<MessageFormProps> = ({ id }) => {
  const [value, setValue] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const setMessage = useSessionStore((state) => state.setMessage);
  const ollamaChat = useOllamaChat({
    id,
    onChunk: (value) => {
      completionStore.completion += value;
    },
  });

  const changeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && formRef.current) {
        e.preventDefault();
        formRef.current.requestSubmit();
      }
    },
    [formRef],
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setMessage(id, { role: "user", content: value });
    setValue("");
    ollamaChat();
  };

  return (
    <form
      className="mx-20 mb-8 flex rounded-xl border border-night-600 bg-night-800 contain-inline-size"
      onSubmit={submitHandler}
      ref={formRef}
    >
      <div className="flex w-full items-center gap-1 p-1 pl-2">
        <textarea
          className="field-sizing-content better-scrollbar max-h-[10rem] w-full resize-none bg-night-800 leading-[160%] focus:outline-none"
          rows={1}
          id="messageInput"
          placeholder="Write a message..."
          value={value}
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
        />
        <Button
          className="h-full"
          size="icon_sm"
          type="submit"
          disabled={value === "" ? true : false}
        >
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
};

export default MessageForm;
