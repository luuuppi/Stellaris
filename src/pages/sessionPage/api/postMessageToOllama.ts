import { Message } from "@/store/useSessionsStore";
import axios from "axios";
import { ChatResponse } from "ollama/browser";

const postMessageToOllama = async (
  id: string,
  server: string,
  model: string,
  getMessages: (id: string) => Message[] | undefined,
  setMessage: (id: string, value: Message) => void,
) => {
  const messages: Message[] = getMessages(id) ?? [];

  try {
    const res = await axios.post<ChatResponse>(`${server}/api/chat`, {
      model,
      messages,
      stream: false,
    });
    setMessage(id, { role: "assistant", content: res.data.message.content });
  } catch (e) {
    throw new Error("Message send failed");
  }
};

export default postMessageToOllama;
