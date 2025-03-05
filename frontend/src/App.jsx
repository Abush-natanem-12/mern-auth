import { createBrowserRouter, RouterProvider } from "react-router-dom";

// NOTE: PAGES
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./pages/Layout";
import AuthWrapper from "./pages/AuthWrapper";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import EnterEmailPage from "./pages/EnterEmailPage";
import EnterNewPasswordPage from "./pages/EnterNewPasswordPage";

import { AuthProvider } from "./features/context";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <AuthWrapper />,
        children: [
          {
            path: "/auth/sign-in",
            element: <SignIn />,
          },
          {
            path: "/auth/sign-up",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "/auth/verify-account",
        element: <VerifyAccountPage />,
      },
      {
        path: "/auth/reset-password/enter-email",
        element: <EnterEmailPage />,
      },

      {
        path: "/auth/reset-password/new-password",
        element: <EnterNewPasswordPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>;
    </AuthProvider>
  );
}
