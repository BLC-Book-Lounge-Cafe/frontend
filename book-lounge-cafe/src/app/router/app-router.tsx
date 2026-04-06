import { createBrowserRouter, Outlet } from "react-router";
import { ROUTER_PATHS } from "shared/model/router-paths";
import { HomePage } from "pages/home";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Layout } from "../layout/layout";

export function AppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout topBarSlot={<Header />} contentSlot={<Outlet />} bottomBarSlot={<Footer />} />,
      children: [
        {
          index:true,
          path: ROUTER_PATHS.HOME,
          element: <HomePage />,
        },
      ],
    },
  ])
}