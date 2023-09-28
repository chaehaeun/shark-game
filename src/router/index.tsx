import { RootLayout } from "@/components";
import { Game, Main, NotFound } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "game", element: <Game /> },
    ],
  },
]);

export default router;
