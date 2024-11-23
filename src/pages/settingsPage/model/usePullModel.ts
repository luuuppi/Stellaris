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

      const normalizedModelName = model.replace(/\s+/g, "").toLowerCase();

      try {
        await pullOllamaModel(server, normalizedModelName, onChunk, abortController.signal);
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
    pullingStore.data.status = "";
    pullingStore.data.digest = "";
    pullingStore.data.total = 0;
    pullingStore.data.completed = 0;

    setTimeout(() => {
      pullingStore.data.error = "";
    }, 2500);
  }, []);

  return { pullModel, abortPulling };
};

export default usePullOllamaModel;
