import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_OLLAMA_SERVER = "http://127.0.0.1:11434";

type SettingsState = {
  model: string;
  ollamaServer: string;
  serverStatus: "connected" | "disconnected";
  setModel: (newModel: string) => void;
  setOllamaServer: (newServer: string) => void;
  setServerStatus: (value: "connected" | "disconnected") => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      model: "",
      ollamaServer: DEFAULT_OLLAMA_SERVER,
      serverStatus: "disconnected",
      setModel: (newModel) => set(() => ({ model: newModel })),
      setOllamaServer: (newServer) => set(() => ({ ollamaServer: newServer })),
      setServerStatus: (newStatus) => set(() => ({ serverStatus: newStatus })),
      resetSettings: () => set(() => ({ model: "", ollamaServer: DEFAULT_OLLAMA_SERVER })),
    }),
    { name: "settings" },
  ),
);
