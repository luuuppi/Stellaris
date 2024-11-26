import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import ollamaChatRequest from "../api/ollamaChatRequest";
import completionStore from "../model/store/completionStore";

type useOllamaChatArgs = {
  id: string;
  onChunk: (value: string) => void;
};

const useOllamaChat = (args: useOllamaChatArgs) => {
  const { id, onChunk } = args;
  const server = useSettingsStore((state) => state.ollamaServer);
  const getMessages = useSessionStore((state) => state.getSessionMessages);
  const setMessage = useSessionStore((state) => state.setMessage);
  const getModel = useSessionStore((state) => state.getModel);

  const ollamaChat = async () => {
    try {
      const messages = getMessages(id);
      const model = getModel(id);

      completionStore.isCompletionInProgress = true;
      await ollamaChatRequest(server, messages ?? [], model, onChunk);

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

  return ollamaChat;
};

export default useOllamaChat;
