import {
  selectSessionMessages,
  selectSessionModel,
  selectSessionName,
  useSessionStore,
} from "@/store/useSessionsStore";
import { Outlet, useParams } from "@tanstack/react-router";
import { type FC } from "react";
import MessagesList from "./components/messagesList";
import Header from "./components/header";
import MessageForm from "./components/messageForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@api/config/queryClient";
import { useShallow } from "zustand/react/shallow";

const SessionPage: FC = () => {
  const { sessionId } = useParams({ from: "/_sessions-layout/sessions/$sessionId" });

  const sessionName = useSessionStore(selectSessionName(sessionId));
  const sessionModel = useSessionStore(selectSessionModel(sessionId));
  const sessionMessages = useSessionStore(useShallow(selectSessionMessages(sessionId)));

  return (
    <section className="flex w-full min-w-0 flex-col">
      <Header name={sessionName || sessionId} model={sessionModel} id={sessionId} />
      <MessagesList messages={sessionMessages} />
      <MessageForm id={sessionId} />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </section>
  );
};

export default SessionPage;
