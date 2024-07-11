/**
 * Returns a promise that will resolve after `durationInMs`
 */
export function promiseDelayed(durationInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationInMs));
}
