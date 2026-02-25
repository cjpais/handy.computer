import { useState, useEffect } from "react";
import { platformStore, type PlatformTab } from "../lib/platformStore";

export function usePlatform(): PlatformTab {
  const [platform, setPlatform] = useState<PlatformTab>(platformStore.get());

  useEffect(() => platformStore.subscribe(setPlatform), []);

  return platform;
}
