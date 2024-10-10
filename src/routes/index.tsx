import { type FC } from "react";
import { createFileRoute } from "@tanstack/react-router";

const IndexPage: FC = () => {
  return (
    <div className="flex h-full items-center justify-center text-3xl font-semibold">
      Hello OllamaHub!
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: IndexPage,
});
