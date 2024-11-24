import type { ErrorResponse, ProgressResponse } from "ollama/browser";

const pullOllamaModel = async (
  server: string,
  payload: string,
  onChunk: (value: ProgressResponse & ErrorResponse) => void,
  signal: AbortSignal,
) => {
  const response = await fetch(`${server}/api/pull`, {
    method: "POST",
    headers: { "Content-Type": "text/event-stream" },
    body: JSON.stringify({
      model: payload,
      stream: true,
    }),
    signal,
  });

  if (!response.body) return;

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;
    if (!value) continue;

    const progress = value.split("\n").filter((line) => line);

    for (const update of progress) {
      const progressResponse = JSON.parse(update) as ProgressResponse & ErrorResponse;

      onChunk(progressResponse);
    }
  }
};

export default pullOllamaModel;
