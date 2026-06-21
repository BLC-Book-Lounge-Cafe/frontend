import { createBrowserRouter, Outlet } from "react-router"
import { HomePage } from "pages/home"
import { AdminSignInPage } from "pages/admin-sign-in"

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "admin-signin",
        element: <AdminSignInPage />,
      },
    ],
  },
])
