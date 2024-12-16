import generateId from "@/utils/generateId";
import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Session = {
  id: string;
  name: string;
  messages: Message[];
  model: string;
  systemMessage: string;
};

type SessionsState = {
  sessions: Session[];
  createSession: (model: string) => string;
  deleteSession: (id: string) => void;
  setMessage: (id: string, message: Message) => void;
  renameSession: (id: string, name: string) => void;
  getSessionName: (id: string) => string | undefined;
  clearSessions: () => void;
  getSessionMessages: (id: string) => Message[] | undefined;
  getModel: (id: string) => string;
  getSystemMessage: (id: string) => string;
  setSystemMessage: (id: string, value: string) => void;
};

export const useSessionStore = create<SessionsState>()(
  persist(
    (set, get) => ({
      sessions: [],
      createSession: (model) => {
        const id = generateId();

        set(
          produce((state: SessionsState) => {
            state.sessions.push({ id, name: "", messages: [], model, systemMessage: "" });
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
      clearSessions: () => {
        return set(() => ({ sessions: [] }));
      },
      getSessionMessages: (id) => {
        return get().sessions.find((session) => session.id === id)?.messages;
      },
      getModel: (id) => {
        return get().sessions.find((session) => session.id === id)?.model ?? "";
      },
      getSystemMessage: (id) => {
        return get().sessions.find((session) => session.id === id)?.systemMessage ?? "";
      },
      setSystemMessage: (id, value) => {
        return set(
          produce((state: SessionsState) => {
            const neededSession = state.sessions.find((session) => session.id === id);

            if (neededSession?.systemMessage === undefined) throw new Error("Wrong id");

            neededSession.systemMessage = value;
          }),
        );
      },
    }),
    { name: "sessions" },
  ),
);
