import User from "~/data/models/user";

const CACHE_KEY = "logged_user";

export function getLoggedUser(): User | undefined {
  const loggedUserStr = sessionStorage.getItem(CACHE_KEY);

  if (!loggedUserStr) return undefined;

  return JSON.parse(loggedUserStr) as User;
}

export function setLoggedUser(user: User) {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(user));
}

export function clearLoggedUser() {
  sessionStorage.removeItem(CACHE_KEY);
}
