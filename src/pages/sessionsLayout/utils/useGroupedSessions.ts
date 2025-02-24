import { type Session } from "@/store/useSessionsStore";

const GROUP_RULES = [
  { maxDiff: 0, group: "Today" },
  { maxDiff: 1, group: "Yesterday" },
  { maxDiff: 7, group: "Previous 7 days" },
  { maxDiff: 30, group: "Previous 30 days" },
  { maxDiff: 365, group: "Previous year" },
];

type SessionGroup = {
  label: string;
  sessions: Session[];
};

const useGroupedSessions = (sessions: Session[]): SessionGroup[] => {
  const todaysDate = new Date().setHours(0, 0, 0, 0);

  const getGroup = (inputDate: number) => {
    const difference = Math.floor((todaysDate - inputDate) / (1000 * 60 * 60 * 24));

    for (const rule of GROUP_RULES) {
      if (difference <= rule.maxDiff) return rule.group;
    }

    return "Later";
  };

  const sortedSessions = [...sessions].sort((a, b) => b.lastMessageDate - a.lastMessageDate);
  const groupedSessions: SessionGroup[] = [];

  for (const session of sortedSessions) {
    const groupName = getGroup(session.lastMessageDate);
    const group = groupedSessions.find((t) => t.label === groupName);

    if (group) {
      group.sessions.push(session);
    } else {
      groupedSessions.push({ label: groupName, sessions: [session] });
    }
  }

  return groupedSessions;
};

export default useGroupedSessions;
