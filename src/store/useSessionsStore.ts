import generateId from "@/utils/generateId";
import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Session = {
  id: string;
  name: string;
  messages: Message[];
  model: string;
};

type SessionsState = {
  sessions: Session[];
  createSession: (model: string) => void;
  deleteSession: (id: string) => void;
  setMessage: (id: string, message: Message) => void;
  renameSession: (id: string, name: string) => void;
  getSessionName: (id: string) => string | undefined;
};

export const useSessionStore = create<SessionsState>()(
  persist(
    (set, get) => ({
      sessions: [],
      createSession: (model) => {
        return set(
          produce((state: SessionsState) => {
            state.sessions.push({ id: generateId(), name: "", messages: [], model });
          }),
        );
      },
      deleteSession: (id) => {
        return set((state) => ({
          sessions: [...state.sessions.filter((session) => session.id !== id)],
        }));
      },
      setMessage: (id, message) => {
        return set(
          produce((state: SessionsState) => {
            state.sessions.find((session) => session.id === id)?.messages.push(message);
          }),
        );
      },
      renameSession: (id, name) => {
        return set(
          produce((state: SessionsState) => {
            const neededSession = state.sessions.find((session) => session.id === id);

            if (neededSession?.name === undefined) {
              console.log("Wrong id");
            } else {
              neededSession.name = name;
            }
          }),
        );
      },
      getSessionName: (id) => {
        const name = get().sessions.find((session) => session.id === id)?.name;

        if (name === "") return undefined;

        return name;
      },
    }),
    { name: "sessions" },
  ),
);
