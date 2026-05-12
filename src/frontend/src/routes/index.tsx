import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import BlogPage from "../pages/BlogPage";
import LandingPage from "../pages/LandingPage";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

export const routeTree = rootRoute.addChildren([landingRoute, blogRoute]);
