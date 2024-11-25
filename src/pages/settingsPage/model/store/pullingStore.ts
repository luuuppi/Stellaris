import type { ErrorResponse, ProgressResponse } from "ollama/browser";
import { proxy } from "valtio";

type PullingState = {
  data: ProgressResponse & ErrorResponse;
  isPullingInProgress: boolean;
};

const pullingStore = proxy<PullingState>({
  data: {
    status: "",
    digest: "",
    total: 0,
    completed: 0,
    error: "",
  },
  isPullingInProgress: false,
});

export default pullingStore;
