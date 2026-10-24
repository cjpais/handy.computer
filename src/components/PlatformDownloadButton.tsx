import { useEffect, useRef, useState } from "react";
import {
  DOWNLOAD_LINKS,
  PLATFORM_DOWNLOADS,
  VERSION_TAG,
  detectIntelMac,
  detectPlatform,
  friendlyName,
  type Platform,
} from "../config/downloads";

type KnownPlatform = Exclude<Platform, "unknown">;

type Link = { href: string; extension: string };

// Adds menu copy ([label, hint], in config order) to a PLATFORM_DOWNLOADS list.
// `name` is the label with its arch, shown under the main button.
const builds = (links: Link[], copy: string[][], arch?: string) =>
  links.map(({ href, extension }, i) => {
    const [label, hint] = copy[i];
    const name = arch ? `${arch} ${label}` : label;
    return { href, extension, label, hint, name };
  });

const WINDOWS_COPY = [
  ["installer", "most people"],
  ["msi", "managed installs"],
];
const LINUX_COPY = [
  ["AppImage", "any distro"],
  ["deb", "ubuntu, debian"],
  ["rpm", "fedora, rhel"],
];

const GROUPS: Record<
  KnownPlatform,
  { title?: string; note?: string; builds: ReturnType<typeof builds> }[]
> = {
  mac: [
    {
      builds: builds(PLATFORM_DOWNLOADS.mac, [
        ["apple silicon", "M1 and newer"],
        ["intel", "older intel macs"],
      ]),
    },
  ],
  windows: [
    {
      title: "x64",
      note: "most pcs",
      builds: builds(PLATFORM_DOWNLOADS.windowsX64, WINDOWS_COPY, "x64"),
    },
    {
      title: "arm",
      note: "snapdragon pcs",
      builds: builds(PLATFORM_DOWNLOADS.windowsArm, WINDOWS_COPY, "arm"),
    },
  ],
  linux: [
    {
      title: "x64",
      note: "most pcs",
      builds: builds(PLATFORM_DOWNLOADS.linuxX64, LINUX_COPY, "x64"),
    },
    {
      title: "arm",
      note: "raspberry pi, arm boards",
      builds: builds(PLATFORM_DOWNLOADS.linuxArm, LINUX_COPY, "arm"),
    },
  ],
};

const PLATFORM_TABS: KnownPlatform[] = ["mac", "windows", "linux"];

const RELEASE_NOTES = `https://github.com/cjpais/Handy/releases/tag/${VERSION_TAG}`;

const PlatformDownloadButton = () => {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [intelMac, setIntelMac] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<KnownPlatform>("mac");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);

    if (detected === "mac") {
      detectIntelMac()
        .then((intel) => intel && setIntelMac(true))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) =>
      !menuRef.current?.contains(e.target as Node) && setMenuOpen(false);
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const known = platform === "unknown" ? null : platform;
  // The first build of a platform is the default; intelMac is only set on macs.
  const current = known ? GROUPS[known][0].builds[intelMac ? 1 : 0] : null;
  const href = current?.href ?? DOWNLOAD_LINKS.unknown;

  const toggle = () => {
    if (!menuOpen && known) setTab(known);
    setMenuOpen((o) => !o);
  };

  return (
    <div ref={menuRef} className="relative flex">
      <a
        href={href}
        // Tighter vertical padding keeps the two-line button the same height as a one-line one.
        className="flex flex-col items-center justify-center text-base sm:text-xl leading-tight px-6 py-2.5 sm:py-2 rounded-lg rounded-r-none bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink"
        aria-label={`Download Handy ${known ? `for ${known} (${current?.name})` : "for your operating system"}`}
        role="button"
      >
        <span>{`download handy ${friendlyName(platform)}`}</span>
        {/* Before detection this renders invisibly with a stand-in, so the button doesn't shift. */}
        <span
          className={`mt-0.5 flex items-center text-[11px] sm:text-xs font-medium text-handy-dark-pink/65 ${known ? "" : "invisible"}`}
        >
          {(current ?? GROUPS.mac[0].builds[0]).name}
          <span
            className="mx-2 size-[3px] rounded-full bg-current opacity-70"
            aria-hidden="true"
          />
          {VERSION_TAG}
        </span>
      </a>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-controls="download-menu"
        aria-label="Choose a build or platform"
        onClick={toggle}
        className="flex items-center cursor-pointer rounded-r-lg border-l border-handy-dark-pink/15 bg-handy-pink px-3.5 text-handy-dark-pink hover:bg-handy-light-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-handy-dark-pink"
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`shrink-0 ${menuOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {menuOpen && (
        <div
          id="download-menu"
          className="absolute top-full right-0 z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <div className="flex items-end justify-between border-b border-gray-200 px-4 pt-3">
            <div role="tablist" className="flex gap-4">
              {PLATFORM_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`text-sm pb-2 -mb-px border-b-2 cursor-pointer bg-transparent ${
                    tab === t
                      ? "text-handy-pink border-handy-pink font-semibold"
                      : "font-normal text-handy-text/80 hover:text-handy-pink border-transparent hover:border-handy-pink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <a
              href={RELEASE_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              title="release notes"
              // Same box as a tab (line height, padding, border), so it lines up with the tab labels.
              className="pb-2 -mb-px border-b-2 border-transparent text-xs leading-5 !font-normal !text-handy-text/40 hover:!text-handy-text"
            >
              {VERSION_TAG}
            </a>
          </div>

          <div role="tabpanel" className="py-2">
            {GROUPS[tab].map((group, i) => (
              <div key={group.title ?? i} className={i > 0 ? "mt-2" : ""}>
                {group.title && (
                  <div className="px-4 pt-2 pb-1 text-xs">
                    <span className="font-semibold text-handy-text">
                      {group.title}
                    </span>
                    <span className="ml-1.5 text-handy-text/50">
                      {group.note}
                    </span>
                  </div>
                )}
                {group.builds.map((build) => (
                  <a
                    key={build.href}
                    href={build.href}
                    onClick={() => setMenuOpen(false)}
                    // Builds under an arch header are indented so they read as part of it.
                    className={`flex items-center justify-between gap-4 ${group.title ? "pl-8" : "pl-4"} pr-4 py-2 hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none`}
                  >
                    <span className="flex flex-col">
                      <span className="text-sm">{build.label}</span>
                      <span className="text-xs !font-normal text-handy-text/50">
                        {build.hint}
                      </span>
                    </span>
                    <span className="text-xs !font-normal text-handy-text/40">
                      {build.extension}
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformDownloadButton;
