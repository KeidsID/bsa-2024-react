import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLoggedUser } from "~/interfaces/providers/logged_user_provider";

/**
 * Hook that check user data from session storage.
 *
 * If `isAuthPage` is `true`, redirect to main page when user is logged.
 * Otherwise, redirect to sign up page when user is not logged.
 */
export default function useSimpleAuth({
  isAuthPage = false,
}: {
  isAuthPage?: boolean;
} = {}) {
  const navigate = useNavigate();

  const loggedUser = getLoggedUser();

  useEffect(() => {
    if (isAuthPage) {
      if (loggedUser) navigate("/");
    } else {
      if (!loggedUser) navigate("/sign-up");
    }
  });

  return loggedUser;
}
