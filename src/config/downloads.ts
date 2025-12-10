export const VERSION = "0.6.5";
export const VERSION_TAG = `v${VERSION}`;
export const GITHUB_RELEASE_BASE = `https://github.com/cjpais/Handy/releases/download/${VERSION_TAG}`;

export type Platform = "mac" | "windows" | "linux" | "unknown";

export const DOWNLOAD_LINKS: Record<Platform, string> = {
  mac: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_aarch64.dmg`,
  windows: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64-setup.exe`,
  linux: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_amd64.AppImage`,
  unknown: "/download", // fallback to download page
};

export const PLATFORM_DOWNLOADS = {
  mac: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_aarch64.dmg`,
      label: "Apple Silicon",
      extension: ".dmg",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64.dmg`,
      label: "Intel (x86)",
      extension: ".dmg",
    },
  ],
  windows: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64-setup.exe`,
      label: "Windows x64",
      extension: ".exe",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_arm64-setup.exe`,
      label: "Windows ARM",
      extension: ".exe",
    },
  ],
  linux: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_amd64.AppImage`,
      label: "Most Distros",
      extension: ".AppImage",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_amd64.deb`,
      label: "Ubuntu/Debian",
      extension: ".deb",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy-${VERSION}-1.x86_64.rpm`,
      label: "RHEL/Fedora",
      extension: ".rpm",
    },
  ],
};

export const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "unknown"; // safety for SSR
  const { userAgent, platform } = window.navigator;

  if (/Win/i.test(platform) || /Windows NT/i.test(userAgent)) return "windows";
  if (/Mac/i.test(platform) || /Mac OS X/i.test(userAgent)) return "mac";
  if (/Linux/i.test(platform)) return "linux";

  return "unknown";
};

export const friendlyName = (p: Platform) =>
  p === "unknown" ? "" : `for ${p}`;
