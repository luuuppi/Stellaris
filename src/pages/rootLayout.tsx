import { Outlet } from "@tanstack/react-router";
import { lazy, type FC } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const RootLayout: FC = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export default RootLayout;
