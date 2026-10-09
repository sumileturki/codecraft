"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => undefined;
}

/** True after hydration on the client, false during SSR/prerender. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
