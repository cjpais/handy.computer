import { usePlatform } from "../hooks/usePlatform";

export default function PlatformPermissions() {
  const platform = usePlatform();

  if (platform !== "mac") {
    return null;
  }

  return (
    <div className="not-prose">
      <h3 className="text-lg font-semibold mb-2">Permissions</h3>
      <p className="text-sm leading-relaxed mb-2">
        On macOS, Handy will ask for two permissions:
      </p>
      <ol className="text-sm leading-relaxed list-decimal pl-5 mb-2">
        <li className="mb-1">
          <strong>Microphone</strong> — needed to capture your voice
        </li>
        <li className="mb-1">
          <strong>Accessibility</strong> — needed to type transcribed text into
          other apps
        </li>
      </ol>
      <p className="text-sm leading-relaxed text-handy-text/60 !mb-0">
        Grant both through the system dialogs. You may need to open{" "}
        <strong>System Settings → Privacy & Security</strong> to toggle them on.
      </p>
    </div>
  );
}
