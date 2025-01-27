import { useSessionStore } from "@/store/useSessionsStore";
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
  const getMessages = useSessionStore((state) => state.getSessionMessages);
  const setMessage = useSessionStore((state) => state.setMessage);
  const getSysMessage = useSessionStore((state) => state.getSystemMessage);
  const getModel = useSessionStore((state) => state.getModel);
  const abortControllerRef = useRef<AbortController | null>(null);

  const ollamaChat = async () => {
    try {
      const messages = getMessages(id) ?? [];
      const model = getModel(id);
      const sysMessage = getSysMessage(id);

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
