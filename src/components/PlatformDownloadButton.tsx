import { useEffect, useState } from "react";
import {
  DOWNLOAD_LINKS,
  INTEL_MAC_DOWNLOAD,
  detectIntelMac,
  detectPlatform,
  friendlyName,
  type Platform,
} from "../config/downloads";

const PlatformDownloadButton = () => {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [href, setHref] = useState(DOWNLOAD_LINKS.unknown);

  useEffect(() => {
    const detected = detectPlatform();
    detectIntelMac().then((intelMac) => {
      setPlatform(detected);
      setHref(intelMac ? INTEL_MAC_DOWNLOAD : DOWNLOAD_LINKS[detected]);
    });
  }, []);

  return (
    <a
      href={href}
      className="text-base sm:text-xl px-6 py-4 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink"
      aria-label={`Download Handy ${platform === "unknown" ? "for your operating system" : `for ${platform}`}`}
      role="button"
    >
      {`download handy ${friendlyName(platform)}`}
    </a>
  );
};

export default PlatformDownloadButton;
