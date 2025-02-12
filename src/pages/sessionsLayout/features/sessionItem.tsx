import { useSessionStore, selectSessionName } from "@/store/useSessionsStore";
import { Link } from "@tanstack/react-router";
import SessionActionsDropdown from "./sessionActionsDropdown";
import { motion } from "framer-motion";
import { forwardRef, memo } from "react";

type SessionItemProps = {
  title: string;
  sessionId: string;
  isSelected: boolean;
};

const SessionItem = memo(
  forwardRef<HTMLDivElement, SessionItemProps>(({ title, sessionId, isSelected }, ref) => {
    const sessionName = useSessionStore(selectSessionName(sessionId));

    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={ref}
      >
        <Link
          to={`/sessions/${sessionId}`}
          params={{ sessionId }}
          data-selected={isSelected}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-night-700/50 active:bg-night-700/30 data-[selected=true]:bg-accent-500/30 data-[selected=true]:hover:bg-accent-500/25 data-[selected=true]:active:bg-accent-500/20"
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-neutral-300">
            {sessionName || title}
          </span>
          <SessionActionsDropdown sessionId={sessionId} sessionName={sessionName ?? title} />
        </Link>
      </motion.div>
    );
  }),
);

export default SessionItem;
