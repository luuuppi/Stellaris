import axios from "axios";
import { type ListResponse } from "ollama/browser";

const getOllamaTags = async (ollamaServer: string) => {
  try {
    const res = await axios.get<ListResponse>(`${ollamaServer}/api/tags`);
    return res.data.models;
  } catch (e) {
    throw new Error("Ollama tags fetching error");
  }
};

export default getOllamaTags;
