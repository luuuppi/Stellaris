import { proxy } from "valtio";

type CompletionState = {
  isCompletionInProgress: boolean;
  completion: string;
};

const completionStore = proxy<CompletionState>({
  isCompletionInProgress: false,
  completion: "",
});

export default completionStore;
