import { createBrowserRouter } from "react-router";
import { ROUTER_PATHS } from "shared/model/router-paths";
import { HomePage } from "pages/home";

export function AppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: ROUTER_PATHS.HOME,
          element: <HomePage />,
        },
      ],
    },
  ])
}