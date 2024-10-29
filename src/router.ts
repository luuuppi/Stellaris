import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import IndexPage from "./pages/indexPage";
import RootLayout from "./pages/rootLayout";
import SessionPage from "./pages/sessionPage/sessionPage";
import SessionsLayout from "./pages/sessionsLayout";
import SessionsPage from "./pages/sessionsPage";
import SettingsPage from "./pages/settingsPage/settingsPage";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
  beforeLoad: () => {
    throw redirect({ to: "/sessions/settings" });
  },
});

const sessionsLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "_sessions-layout",
  component: SessionsLayout,
});

const sessionsRoute = createRoute({
  getParentRoute: () => sessionsLayout,
  path: "sessions",
  component: SessionsPage,
});

const sessionRoute = createRoute({
  getParentRoute: () => sessionsLayout,
  path: "sessions/$sessionId",
  component: SessionPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => sessionsRoute,
  path: "settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  sessionsLayout.addChildren([sessionsRoute.addChildren([settingsRoute]), sessionRoute]),
]);

export default routeTree;
