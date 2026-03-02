import { usePlatform } from "../hooks/usePlatform";
import type { PlatformTab } from "../lib/platformStore";

const DEFAULT_SHORTCUT: Record<PlatformTab, string> = {
  mac: "Option + Space",
  windows: "Ctrl + Space",
  linux: "Ctrl + Space",
};

export default function DefaultShortcut() {
  const platform = usePlatform();
  return <code className="text-xs bg-handy-text/5 px-1.5 py-0.5 rounded">{DEFAULT_SHORTCUT[platform]}</code>;
}
