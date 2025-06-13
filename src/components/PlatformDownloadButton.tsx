import { useEffect, useState } from "react";

type Platform = "mac" | "windows" | "linux" | "unknown";

const DOWNLOAD_LINKS: Record<Platform, string> = {
  mac: "/downloads/handy-mac.dmg",
  windows: "/downloads/handy-windows.exe",
  linux: "/downloads/handy-linux.AppImage",
  unknown: "/download", // generic / fallback
};

const friendlyName = (p: Platform) => (p === "unknown" ? "your OS" : p); // “download handy for your OS” as a last resort

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
    >
      {`download handy for ${friendlyName(platform)}`}
    </a>
  );
};

export default PlatformDownloadButton;
