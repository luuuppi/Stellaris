import { Ollama } from "ollama/browser";

const DEFAULT_OLLAMA_SERVER = "http://127.0.0.1:11434";

const ollama = new Ollama({ host: DEFAULT_OLLAMA_SERVER });

export default ollama;
