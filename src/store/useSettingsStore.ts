import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_OLLAMA_SERVER = "http://127.0.0.1:11434";

type SettingsState = {
  model: string;
  ollamaServer: string;
  setModel: (newModel: string) => void;
  setOllamaServer: (newServer: string) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      model: "",
      ollamaServer: DEFAULT_OLLAMA_SERVER,
      setModel: (newModel) => set(() => ({ model: newModel })),
      setOllamaServer: (newServer) => set(() => ({ ollamaServer: newServer })),
      resetSettings: () => set(() => ({ model: "", ollamaServer: DEFAULT_OLLAMA_SERVER })),
    }),
    { name: "settings" },
  ),
);
