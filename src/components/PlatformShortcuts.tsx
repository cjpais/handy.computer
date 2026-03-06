import { usePlatform } from "../hooks/usePlatform";
import type { PlatformTab } from "../lib/platformStore";

const SHORTCUTS: Record<PlatformTab, { action: string; keys: string }[]> = {
  mac: [
    { action: "Transcribe", keys: "Option + Space" },
    {
      action: "Transcribe with Post-Processing",
      keys: "Option + Shift + Space",
    },
    { action: "Cancel", keys: "Escape" },
  ],
  windows: [
    { action: "Transcribe", keys: "Ctrl + Space" },
    { action: "Transcribe with Post-Processing", keys: "Ctrl + Shift + Space" },
    { action: "Cancel", keys: "Escape" },
  ],
  linux: [
    { action: "Transcribe", keys: "Ctrl + Space" },
    { action: "Transcribe with Post-Processing", keys: "Ctrl + Shift + Space" },
    { action: "Cancel", keys: "Escape" },
  ],
};

const REMAPPING: Record<PlatformTab, string> = {
  mac: "On macOS, a lot of people like using the fn key",
  windows:
    "On Windows, shortcuts require at least one modifier key (Ctrl, Alt, Shift) plus a regular key. Modifier-only shortcuts are not supported by default. You can enable the experimental Handy Keys implementation in settings for more flexible bindings.",
  linux:
    "On Linux, shortcuts require at least one modifier key (Ctrl, Alt, Shift) plus a regular key. Modifier-only shortcuts are not supported by default. You can enable the experimental Handy Keys implementation in settings for more flexible bindings.",
};

export default function PlatformShortcuts() {
  const platform = usePlatform();
  const shortcuts = SHORTCUTS[platform];

  return (
    <div className="not-prose">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left pb-2 pr-4 font-semibold border-b border-handy-text/10">
              Action
            </th>
            <th className="text-left pb-2 font-semibold border-b border-handy-text/10">
              Shortcut
            </th>
          </tr>
        </thead>
        <tbody>
          {shortcuts.map((s) => (
            <tr key={s.action}>
              <td className="py-1.5 pr-4 border-b border-handy-text/5">
                {s.action}
              </td>
              <td className="py-1.5 border-b border-handy-text/5">
                <code className="text-xs bg-handy-text/5 px-1.5 py-0.5 rounded">
                  {s.keys}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-sm leading-relaxed text-handy-text/60 !mb-0">
        You can remap shortcuts in Handy's settings by clicking on a shortcut
        and pressing your preferred key combination. {REMAPPING[platform]}
      </p>
    </div>
  );
}
