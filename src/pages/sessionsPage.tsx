import { Outlet } from "@tanstack/react-router";
import { type FC } from "react";

const SessionsPage: FC = () => {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-center">
        <h1 className="mb-5 text-4xl font-bold">Welcome to the Project Stellaris!</h1>
        <h2 className="text-center text-2xl font-semibold">
          Create a new chat and feel free to ask about anything you want. Because it's{" "}
          <span className="font-black underline">private</span>
        </h2>
      </main>
      <Outlet />
    </>
  );
};

export default SessionsPage;
