import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLoggedUser } from "~/interfaces/providers/logged_user_provider";

/**
 * Hook that check user data from session storage.
 *
 * If return `undefined`, redirect to sign up page.
 */
export default function useLoggedUser() {
  const navigate = useNavigate();

  const loggedUser = getLoggedUser();

  useEffect(() => {
    if (!loggedUser) navigate("/sign-up");
  });

  return loggedUser;
}
