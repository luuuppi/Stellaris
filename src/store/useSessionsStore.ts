import generateId from "@/utils/generateId";
import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Session = {
  id: string;
  name: string;
  messages: Message[];
  model: string;
  systemMessage: string;
  lastMessageDate: number;
};

type SessionsState = {
  sessions: Session[];
  createSession: (model: string) => string;
  deleteSession: (id: string) => void;
  setMessage: (id: string, message: Message) => void;
  setSessionName: (id: string, name: string) => void;
  setSystemMessage: (id: string, sysMessage: string) => void;
  setSessionModel: (id: string, model: string) => void;
  clearSessions: () => void;
};

export const useSessionStore = create<SessionsState>()(
  persist(
    (set) => {
      const findSession = (draft: SessionsState, id: string) => {
        return draft.sessions.find((session) => session.id === id);
      };

      return {
        sessions: [],
        createSession: (model) => {
          const id = generateId();
          const currentDate = new Date().setHours(0, 0, 0, 0);

          set(
            produce((state: SessionsState) => {
              state.sessions.push({
                id,
                name: "",
                messages: [],
                model,
                systemMessage: "",
                lastMessageDate: currentDate,
              });
            }),
          );

          return id;
        },
        deleteSession: (id) => {
          return set((state) => ({
            sessions: [...state.sessions.filter((session) => session.id !== id)],
          }));
        },
        setMessage: (id, message) => {
          return set(
            produce((state: SessionsState) => {
              const session = findSession(state, id);

              if (session) {
                session.messages.push(message);
                session.lastMessageDate = new Date().setHours(0, 0, 0, 0);
              }
            }),
          );
        },
        setSessionName: (id, name) => {
          return set(
            produce((state: SessionsState) => {
              const session = findSession(state, id);

              if (session) session.name = name;
            }),
          );
        },
        setSystemMessage: (id, sysMessage) => {
          return set(
            produce((state: SessionsState) => {
              const session = findSession(state, id);

              if (session) session.systemMessage = sysMessage;
            }),
          );
        },
        setSessionModel: (id, model) => {
          return set(
            produce((state: SessionsState) => {
              const session = findSession(state, id);

              if (session) session.model = model;
            }),
          );
        },
        clearSessions: () => {
          return set(() => ({ sessions: [] }));
        },
      };
    },
    { name: "sessions" },
  ),
);

export const selectSession = (id: string) => (state: SessionsState) =>
  state.sessions.find((s) => s.id === id);

export const selectSessionName = (id: string) => (state: SessionsState) =>
  selectSession(id)(state)?.name ?? "";

export const selectSessionMessages = (id: string) => (state: SessionsState) =>
  selectSession(id)(state)?.messages ?? [];

export const selectSessionModel = (id: string) => (state: SessionsState) =>
  selectSession(id)(state)?.model ?? "";

export const selectSessionSysMessage = (id: string) => (state: SessionsState) =>
  selectSession(id)(state)?.systemMessage ?? "";
