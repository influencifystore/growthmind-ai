import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import BlogPage from "../pages/BlogPage";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BlogPage,
});

export const routeTree = rootRoute.addChildren([blogRoute]);

export const router = createRouter({ routeTree });
