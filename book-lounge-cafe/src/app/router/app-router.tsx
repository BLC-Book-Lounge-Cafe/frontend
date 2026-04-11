import { createBrowserRouter, Outlet } from "react-router"
import { HomePage } from "pages/home"

export function AppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ])
}
