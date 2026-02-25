export type PlatformTab = "mac" | "windows" | "linux";

type Listener = (platform: PlatformTab) => void;

const listeners = new Set<Listener>();
let current: PlatformTab = "mac";

export const platformStore = {
  get: () => current,
  set: (p: PlatformTab) => {
    current = p;
    listeners.forEach((l) => l(p));
  },
  subscribe: (l: Listener) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};
