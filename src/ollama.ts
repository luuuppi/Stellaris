import { Ollama } from "ollama/browser";
import { useSettingsStore } from "./store/useSettingsStore";

const ollamaServer = useSettingsStore((state) => state.ollamaServer);

const ollama = new Ollama({ host: ollamaServer });

export default ollama;
