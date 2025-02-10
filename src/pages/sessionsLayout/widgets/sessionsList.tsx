import { useSessionStore } from "@/store/useSessionsStore";
import { useShallow } from "zustand/react/shallow";
import useGroupedSessions from "../utils/useGroupedSessions";
import { useParams } from "@tanstack/react-router";
import SessionItem from "../features/sessionItem";
import { type FC } from "react";

const SessionsList: FC = () => {
  const sessions = useSessionStore(useShallow((state) => state.sessions));
  const groupedSessions = useGroupedSessions(sessions);
  const { sessionId: currentId } = useParams({ strict: false });

  return (
    <nav className="better-scrollbar mb-auto flex w-full flex-col gap-6 overflow-auto">
      {groupedSessions.map((gp) => (
        <div key={gp.label}>
          <span className="mb-3 ml-2 inline-block text-base font-semibold">{gp.label}</span>
          <div className="flex flex-col gap-1">
            {gp.sessions.map((session) => (
              <SessionItem
                title={session.messages[0] ? session.messages[0].content : session.id}
                sessionId={session.id}
                key={session.id}
                isSelected={currentId === session.id}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default SessionsList;
