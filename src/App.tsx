import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import MainPage from "./interfaces/pages/main_page";
import SignUpPage from "./interfaces/pages/auth/sign_up_page";
import SignInPage from "./interfaces/pages/auth/sign_in_page";
import TripPage from "./interfaces/pages/trip_page";

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
  {
    path: "trip/:tripId",
    element: <TripPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
