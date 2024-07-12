/**
 * Returns a promise that will resolve after `durationInMs`
 */
export function promiseDelayed(durationInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationInMs));
}

/**
 * Validate password and returns an error message if invalid.
 */
export function validatePassword(password: string): string | undefined {
  if (password.length < 3) {
    return "Password too short";
  }

  if (password.length > 20) {
    return "Password too long";
  }

  return undefined;
}
