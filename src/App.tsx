import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./interfaces/pages/main_page";
import SignUpPage from "./interfaces/pages/auth/sign_up_page";
import SignInPage from "./interfaces/pages/auth/sign_in_page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
