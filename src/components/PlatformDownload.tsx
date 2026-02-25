import { useEffect } from "react";
import {
  PLATFORM_DOWNLOADS,
  VERSION_TAG,
  detectPlatform,
  type Platform,
} from "../config/downloads";
import { platformStore, type PlatformTab } from "../lib/platformStore";
import { usePlatform } from "../hooks/usePlatform";

const TABS: { id: PlatformTab; label: string }[] = [
  { id: "mac", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" },
];

const platformToTab = (p: Platform): PlatformTab => {
  if (p === "mac") return "mac";
  if (p === "windows") return "windows";
  if (p === "linux") return "linux";
  return "mac";
};

interface DownloadItem {
  href: string;
  label: string;
  extension: string;
}

interface DownloadGroup {
  arch: string;
  items: DownloadItem[];
}

const DOWNLOADS: Record<PlatformTab, DownloadGroup[]> = {
  mac: [
    {
      arch: "Download",
      items: [
        {
          href: PLATFORM_DOWNLOADS.mac[0].href,
          label: "Apple Silicon",
          extension: ".dmg",
        },
        {
          href: PLATFORM_DOWNLOADS.mac[1].href,
          label: "Intel Mac",
          extension: ".dmg",
        },
      ],
    },
  ],
  windows: [
    {
      arch: "Download",
      items: [
        {
          href: PLATFORM_DOWNLOADS.windowsX64[0].href,
          label: "x64",
          extension: ".exe",
        },
        {
          href: PLATFORM_DOWNLOADS.windowsX64[1].href,
          label: "x64",
          extension: ".msi",
        },
      ],
    },
    {
      arch: "",
      items: [
        {
          href: PLATFORM_DOWNLOADS.windowsArm[0].href,
          label: "ARM",
          extension: ".exe",
        },
        {
          href: PLATFORM_DOWNLOADS.windowsArm[1].href,
          label: "ARM",
          extension: ".msi",
        },
      ],
    },
  ],
  linux: [
    { arch: "x64", items: PLATFORM_DOWNLOADS.linuxX64 },
    { arch: "ARM", items: PLATFORM_DOWNLOADS.linuxArm },
  ],
};

function Instructions({ platform }: { platform: PlatformTab }) {
  const codeStyle = "text-xs bg-handy-text/5 px-1.5 py-0.5 rounded font-mono";
  const preStyle =
    "!text-xs !leading-relaxed !bg-handy-text/5 px-3 py-2 !rounded-lg font-mono overflow-x-auto my-2 select-all";
  const noteStyle = "text-xs text-handy-text/50 mt-2";

  if (platform === "mac") {
    return (
      <div className="text-sm leading-relaxed text-handy-text/70 mt-3">
        <p className="m-0 !mb-0">
          Open the <code className={codeStyle}>.dmg</code> and drag Handy to
          your Applications folder.
        </p>
      </div>
    );
  }

  if (platform === "windows") {
    return (
      <div className="text-sm leading-relaxed text-handy-text/70 mt-3">
        <p className="m-0 !mb-0">
          Run the <code className={codeStyle}>.exe</code> or{" "}
          <code className={codeStyle}>.msi</code> installer and follow the
          prompts. Handy will be available from the Start menu.
        </p>
      </div>
    );
  }

  return (
    <div className="text-sm leading-relaxed text-handy-text/70 mt-3">
      <p className="m-0 mb-1">
        For the <code className={codeStyle}>.AppImage</code>, make it executable
        and run it:
      </p>
      <pre className={preStyle}>
        {"chmod +x Handy_*.AppImage\n./Handy_*.AppImage"}
      </pre>
      <p className="!mb-0">
        For Ubuntu/Debian or Fedora/RHEL, you can also install the{" "}
        <code className={codeStyle}>.deb</code> or{" "}
        <code className={codeStyle}>.rpm</code> directly with your package
        manager.
      </p>
    </div>
  );
}

export default function PlatformDownload() {
  const active = usePlatform();

  useEffect(() => {
    platformStore.set(platformToTab(detectPlatform()));
  }, []);

  const groups = DOWNLOADS[active];

  return (
    <div className="not-prose my-4 rounded-xl border border-handy-text/8 bg-handy-text/[0.02] p-4 sm:p-5">
      {/* Version tag + platform selector */}
      <div className="flex items-end justify-between border-b-2 border-handy-text/10 mb-4">
        <div className="flex gap-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => platformStore.set(tab.id)}
              className={`text-sm pb-2 -mb-[2px] border-b-2 cursor-pointer transition-colors bg-transparent ${
                active === tab.id
                  ? "text-handy-pink border-handy-pink font-semibold"
                  : "font-normal text-handy-text/80 hover:text-handy-pink border-transparent hover:border-handy-pink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-handy-text/35 pb-2">{VERSION_TAG}</span>
      </div>

      {/* Download buttons */}
      {active === "windows" ? (
        <div>
          <div className="text-xs font-semibold text-handy-text/50 uppercase tracking-wider mb-1.5">
            Download
          </div>
          <div className="flex flex-wrap gap-2">
            {groups[0].items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink text-sm font-semibold !no-underline"
              >
                {item.label}
                <span className="opacity-60 text-xs">{item.extension}</span>
              </a>
            ))}
            <div className="w-2" />
            {groups[1].items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink text-sm font-semibold !no-underline"
              >
                {item.label}
                <span className="opacity-60 text-xs">{item.extension}</span>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`flex ${active === "linux" ? "flex-col gap-4" : "flex-col"}`}
        >
          {groups.map((group) => (
            <div key={group.arch || "default"}>
              {group.arch && (
                <div className="text-xs font-semibold text-handy-text/50 uppercase tracking-wider mb-1.5">
                  {group.arch}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink text-sm font-semibold !no-underline"
                  >
                    {item.label}
                    <span className="opacity-60 text-xs">{item.extension}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Instructions platform={active} />
    </div>
  );
}
