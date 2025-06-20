import { useEffect, useState } from "react";

type Platform = "mac" | "windows" | "linux" | "unknown";

const DOWNLOAD_LINKS: Record<Platform, string> = {
  mac: "https://github.com/cjpais/Handy/releases/download/0.1.0/Handy_0.1.0_aarch64.dmg",
  windows:
    "https://github.com/cjpais/Handy/releases/download/0.1.0/Handy_0.1.0_x64-setup.exe",
  linux:
    "https://github.com/cjpais/Handy/releases/download/0.1.0/Handy_0.1.0_amd64.AppImage",
  unknown: "/download", // generic / fallback
};

const friendlyName = (p: Platform) => (p === "unknown" ? "" : `for ${p}`); // “download handy for your OS” as a last resort

const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "unknown"; // safety for SSR
  const { userAgent, platform } = window.navigator;

  if (/Win/i.test(platform) || /Windows NT/i.test(userAgent)) return "windows";
  if (/Mac/i.test(platform) || /Mac OS X/i.test(userAgent)) return "mac";
  if (/Linux/i.test(platform)) return "linux";

  return "unknown";
};

const PlatformDownloadButton = () => {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return (
    <a
      href={DOWNLOAD_LINKS[platform]}
      className="text-base sm:text-xl px-6 py-4 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink"
      aria-label={`Download Handy ${platform === "unknown" ? "for your operating system" : `for ${platform}`}`}
      role="button"
    >
      {`download handy ${friendlyName(platform)}`}
    </a>
  );
};

export default PlatformDownloadButton;
