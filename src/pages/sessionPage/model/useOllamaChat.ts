import { selectSession, useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import ollamaChatRequest from "@api/ollamaChatRequest";
import completionStore from "../model/store/completionStore";
import { useRef } from "react";

type useOllamaChatArgs = {
  id: string;
  onChunk: (value: string) => void;
};

const useOllamaChat = (args: useOllamaChatArgs) => {
  const { id, onChunk } = args;
  const server = useSettingsStore((state) => state.ollamaServer);
  const setMessage = useSessionStore((state) => state.setMessage);
  const abortControllerRef = useRef<AbortController | null>(null);

  const ollamaChat = async () => {
    try {
      const sessionState = useSessionStore.getState();
      const session = selectSession(id)(sessionState);
      const messages = session?.messages ?? [];
      const sysMessage = session?.systemMessage ?? "";
      const model = session?.model ?? "";

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      completionStore.isCompletionInProgress = true;
      await ollamaChatRequest(
        server,
        [{ role: "system", content: sysMessage }, ...messages],
        model,
        onChunk,
        abortController.signal,
      );

      setMessage(id, { role: "assistant", content: completionStore.completion });
      completionStore.isCompletionInProgress = false;
      completionStore.completion = "";
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    } finally {
      completionStore.isCompletionInProgress = false;
    }
  };

  const abortChat = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setMessage(id, { role: "assistant", content: completionStore.completion });
    completionStore.isCompletionInProgress = false;
    completionStore.completion = "";
  };

  return { ollamaChat, abortChat };
};

export default useOllamaChat;
