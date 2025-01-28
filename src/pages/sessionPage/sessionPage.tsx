import { useSessionStore } from "@/store/useSessionsStore";
import { Outlet, useParams } from "@tanstack/react-router";
import { type FC } from "react";
import MessagesList from "./components/messagesList";
import Header from "./components/header";
import MessageForm from "./components/messageForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@api/config/queryClient";

const SessionPage: FC = () => {
  const { sessionId } = useParams({ from: "/_sessions-layout/sessions/$sessionId" });
  const session = useSessionStore((state) =>
    state.sessions.find((session) => session.id === sessionId),
  );

  return (
    <section className="flex w-full min-w-0 flex-col">
      <Header name={session?.name ?? sessionId} model={session?.model ?? ""} id={sessionId} />
      <MessagesList messages={session?.messages ?? []} />
      <MessageForm id={sessionId} />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </section>
  );
};

export default SessionPage;
