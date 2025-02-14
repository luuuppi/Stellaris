import { useSessionStore } from "@/store/useSessionsStore";
import { useShallow } from "zustand/react/shallow";
import useGroupedSessions from "../utils/useGroupedSessions";
import { useParams } from "@tanstack/react-router";
import SessionItem from "../features/sessionItem";
import { AnimatePresence, motion } from "framer-motion";
import { type FC } from "react";

const SessionsList: FC = () => {
  const sessions = useSessionStore(useShallow((state) => state.sessions));
  const groupedSessions = useGroupedSessions(sessions);
  const { sessionId: currentId } = useParams({ strict: false });

  return (
    <nav className="better-scrollbar flex h-full w-full flex-col gap-6 overflow-y-auto overflow-x-hidden">
      {groupedSessions.map((gp) => (
        <div key={gp.label}>
          <motion.span layout className="mb-3 ml-2 inline-block text-base font-semibold">
            {gp.label}
          </motion.span>
          <div className="flex flex-col gap-1">
            <AnimatePresence initial={false} mode="popLayout">
              {gp.sessions.map((session) => (
                <SessionItem
                  title={session.messages[0] ? session.messages[0].content : session.id}
                  sessionId={session.id}
                  key={session.id}
                  isSelected={currentId === session.id}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default SessionsList;
