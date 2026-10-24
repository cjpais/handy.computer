export const VERSION = "0.9.8";
export const VERSION_TAG = `v${VERSION}`;
export const GITHUB_RELEASE_BASE = `https://github.com/cjpais/Handy/releases/download/${VERSION_TAG}`;

export type Platform = "mac" | "windows" | "linux" | "unknown";

export const DOWNLOAD_LINKS: Record<Platform, string> = {
  mac: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_aarch64.dmg`,
  windows: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64-setup.exe`,
  linux: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_amd64.AppImage`,
  unknown: "/download", // fallback to download page
};

export const INTEL_MAC_DOWNLOAD = `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64.dmg`;

export const PLATFORM_DOWNLOADS = {
  mac: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_aarch64.dmg`,
      label: "Apple Silicon",
      extension: ".dmg",
    },
    {
      href: INTEL_MAC_DOWNLOAD,
      label: "Intel (x86)",
      extension: ".dmg",
    },
  ],
  windowsX64: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64-setup.exe`,
      label: "Installer",
      extension: ".exe",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_x64_en-US.msi`,
      label: "MSI",
      extension: ".msi",
    },
  ],
  windowsArm: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_arm64-setup.exe`,
      label: "Installer",
      extension: ".exe",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_arm64_en-US.msi`,
      label: "MSI",
      extension: ".msi",
    },
  ],
  linuxX64: [
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
  linuxArm: [
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_aarch64.AppImage`,
      label: "Most Distros",
      extension: ".AppImage",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy_${VERSION}_arm64.deb`,
      label: "Ubuntu/Debian",
      extension: ".deb",
    },
    {
      href: `${GITHUB_RELEASE_BASE}/Handy-${VERSION}-1.aarch64.rpm`,
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

export async function detectIntelMac(): Promise<boolean> {
  if (typeof window === "undefined" || detectPlatform() !== "mac") return false;

  const uaData = (
    navigator as Navigator & {
      userAgentData?: {
        getHighEntropyValues(
          hints: string[],
        ): Promise<{ architecture?: string }>;
      };
    }
  ).userAgentData;

  try {
    const architecture = (
      await uaData?.getHighEntropyValues(["architecture"])
    )?.architecture;
    if (architecture === "x86") return true;
    if (architecture === "arm") return false;
  } catch {}

  let gl: WebGLRenderingContext | null = null;
  try {
    gl = document.createElement("canvas").getContext("webgl");
    const info = gl?.getExtension("WEBGL_debug_renderer_info");
    if (!gl || !info) return false;
    const renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? "");
    if (/Apple/i.test(renderer)) return false;
    return /Intel|AMD|Radeon|NVIDIA|GeForce/i.test(renderer);
  } catch {
    return false;
  } finally {
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
