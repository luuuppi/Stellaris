import { useSettingsStore } from "@/store/useSettingsStore";
import type { ErrorResponse, ProgressResponse } from "ollama/browser";
import { useCallback, useRef } from "react";
import pullOllamaModel from "../api/pullOllamaModel";
import pullingStore from "./store/pullingStore";

const usePullOllamaModel = (onChunk: (value: ProgressResponse & ErrorResponse) => void) => {
  const server = useSettingsStore((state) => state.ollamaServer);
  const abortControllerRef = useRef<AbortController | null>(null);

  const pullModel = useCallback(
    async (model: string) => {
      pullingStore.isPullingInProgress = true;
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        await pullOllamaModel(server, model, onChunk, abortController.signal);
      } catch (e) {
        if (e instanceof Error) {
          pullingStore.data.error = e.message;
        }
      } finally {
        pullingStore.isPullingInProgress = false;
      }
    },
    [server],
  );

  const abortPulling = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    pullingStore.isPullingInProgress = false;
  }, []);

  return { pullModel, abortPulling };
};

export default usePullOllamaModel;
