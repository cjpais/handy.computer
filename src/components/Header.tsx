import React, { useState, useEffect } from "react";
import HandyTextLogo from "./logo/HandyTextLogo";

interface HeaderProps {
  currentPath?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const getNavLinkClass = (path: string) => {
    return currentPath === path ? "!text-handy-pink" : "";
  };

  const navItems = [
    { href: "/download", label: "download", path: "download" },
    { href: "/about", label: "about", path: "about" },
    { href: "/buttons", label: "buttons", path: "buttons" },
    {
      href: "https://github.com/cjpais/Handy",
      label: "github",
      external: true,
    },
  ];

  return (
    <header
      className="flex justify-between w-full sm:pt-8 pt-4 items-center relative"
      role="banner"
    >
      <a href="/">
        <HandyTextLogo className="h-10 sm:h-16" />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-4 items-center">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={item.path ? getNavLinkClass(item.path) : ""}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </a>
        ))}
        <a
          href="https://donate.stripe.com/6oU4gz8762g9790c8Vffy0j"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-[6px] rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink"
        >
          donate
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
        />
        <span
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && isMobile && (
        <div
          id="mobile-menu"
          className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
        >
          <div className="py-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-4 py-2 hover:bg-gray-50 ${item.path ? getNavLinkClass(item.path) : ""}`}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://donate.stripe.com/6oU4gz8762g9790c8Vffy0j"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 my-2 px-5 py-2 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              donate
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
