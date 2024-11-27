import { useSessionStore } from "@/store/useSessionsStore";
import { useParams } from "@tanstack/react-router";
import { type FC } from "react";
import MessagesList from "./components/messagesList";
import Header from "./components/header";
import MessageForm from "./components/messageForm";

const SessionPage: FC = () => {
  const { sessionId } = useParams({ from: "/_sessions-layout/sessions/$sessionId" });
  const session = useSessionStore((state) =>
    state.sessions.find((session) => session.id === sessionId),
  );

  return (
    <section className="flex w-full min-w-0 flex-col">
      <Header name={session?.name ?? sessionId} id={sessionId} />
      <MessagesList messages={session?.messages ?? []} />
      <MessageForm id={sessionId} />
    </section>
  );
};

export default SessionPage;
