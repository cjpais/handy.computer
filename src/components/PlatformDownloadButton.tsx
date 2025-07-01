import { useEffect, useState } from "react";
import {
  DOWNLOAD_LINKS,
  detectPlatform,
  friendlyName,
  type Platform,
} from "../config/downloads";

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
