import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import IndexPage from "./pages/indexPage";
import RootLayout from "./pages/rootLayout";
import SessionPage from "./pages/sessionPage/sessionPage";
import SessionSettingsPage from "./pages/sessionSettingsPage";
import SessionsLayout from "./pages/sessionsLayout";
import SessionsPage from "./pages/sessionsPage";
import { GeneralSettingsPage, ModelsSettingsPage, SettingsLayout } from "./pages/settingsPage";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
  beforeLoad: () => {
    throw redirect({ to: "/sessions/settings/general" });
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

const sessionSettingsRoute = createRoute({
  getParentRoute: () => sessionRoute,
  path: "settings",
  component: SessionSettingsPage,
});

const settingsLayout = createRoute({
  getParentRoute: () => sessionsRoute,
  id: "_settings-layout",
  component: SettingsLayout,
});

const generalSettingsRoute = createRoute({
  getParentRoute: () => settingsLayout,
  path: "settings/general",
  component: GeneralSettingsPage,
});

const modelsSettingsRoute = createRoute({
  getParentRoute: () => settingsLayout,
  path: "settings/models",
  component: ModelsSettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  sessionsLayout.addChildren([
    sessionsRoute.addChildren([
      settingsLayout.addChildren([generalSettingsRoute, modelsSettingsRoute]),
    ]),
    sessionRoute.addChildren([sessionSettingsRoute]),
  ]),
]);

export default routeTree;
