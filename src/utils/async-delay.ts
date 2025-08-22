import { SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE } from "@/lib/constants";

export async function asyncDelay(ms: number, verbose = false) {
  if (ms <= 0) return;

  if (verbose) {
    console.log(`Delay of ${ms / 1000}`);
  }

  await new Promise((resolve) =>
    setTimeout(resolve, SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE)
  );
}
