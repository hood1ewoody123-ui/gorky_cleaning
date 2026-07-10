declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "init" | "reachGoal" | "hit" | "params",
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}

export {};
