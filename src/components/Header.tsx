"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import NavLink from "./NavLink";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { companyInfo } = useCompanyInfo();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  const panoramaTargets: Record<
    string,
    { yaw: number; pitch: number; fov?: number; openHotspotTitle?: string }
  > = {
    news: { yaw: -1.6, pitch: 0.25, openHotspotTitle: "Бүртгэлийн мэдээлэл" },
    about: { yaw: 1.25, pitch: 0.2, openHotspotTitle: "Тэмцээний мэдээлэл" },
    contact: { yaw: 2.4, pitch: 0.1, openHotspotTitle: "Холбоо барих" },
  };
  const handlePanoramaNav =
    (targetKey: keyof typeof panoramaTargets) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isHome || typeof window === "undefined") return;
      const iframe = document.getElementById("panorama-frame") as HTMLIFrameElement | null;
      if (!iframe?.contentWindow) return;
      event.preventDefault();
      iframe.contentWindow.postMessage(
        { type: "panorama:lookAt", ...panoramaTargets[targetKey] },
        "*"
      );
    };
  const handlePanoramaNavAndClose =
    (targetKey: keyof typeof panoramaTargets) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      handlePanoramaNav(targetKey)(event);
      setIsMenuOpen(false);
    };
  return (
    <header className={`w-full glass-header ${isHome ? "glass-header--home" : ""}`}>
      {/* Top Header Bar */}
   

      {/* Main Navigation Bar */}
      <div className="w-full">
        <div className="container mx-auto px-3 sm:px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative h-10 w-[180px] sm:h-12 sm:w-[220px]">
              <Image
                src="/images/logo.png"
                alt="Tarialan cup - 2026"
                fill
                sizes="(max-width: 640px) 180px, 220px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Middle: Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink href="/">НҮҮР</NavLink>
            <div className="relative group">
              <NavLink href="/#chapter-1" onClick={handlePanoramaNav("news")}>
                МЭДЭЭ
              </NavLink>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 absolute left-0 top-full z-20 mt-2 w-64 translate-x-0 rounded-xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_20px_40px_rgba(15,23,42,0.18)]">
                <Link
                  href="/speakers"
                  className="block px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:text-[#1f632b]"
                >
                  Сурагчдад зориулсан арга хэмжээ
                </Link>
                <Link
                  href="/news"
                  className="block px-4 pb-4 text-sm font-medium text-gray-800 transition-colors hover:text-[#1f632b]"
                >
                  Мэдээ мэдээлэл
                </Link>
                <Link
                  href="/sponsors"
                  className="block px-4 pb-4 text-sm font-medium text-gray-800 transition-colors hover:text-[#1f632b]"
                >
                  Ивээн тэтгэгчид
                </Link>
              </div>
            </div>
            <NavLink href="/#chapter-2" onClick={handlePanoramaNav("about")}>
              Тэмцээний тухай
            </NavLink>
            <NavLink href="/#chapter-3" onClick={handlePanoramaNav("contact")}>
              ХОЛБОО БАРИХ
            </NavLink>
            <NavLink href="/teams">Бүртгэгдсэн багууд</NavLink>
            <NavLink href="/register" className="register-highlight">
              Бүртгүүлэх
            </NavLink>
          </nav>

          {/* Right: Burger Menu */}
          <div className="flex items-center gap-4">
            {/* Burger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors hover:text-[#8DC63F] ${
                isHome ? "text-white" : "text-gray-800"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isHome ? "text-white" : "text-gray-800"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isHome ? "text-white" : "text-gray-800"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fullscreen Modal */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[100] w-screen h-[100dvh] bg-black/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="absolute inset-0 w-full h-full bg-white shadow-[0_30px_90px_rgba(15,23,42,0.35)] flex flex-col overflow-hidden"
              style={{
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Logo and Close Button */}
              <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-gray-200 bg-white">
                <Link
                  href="/"
                  className="flex min-w-0 items-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative h-10 w-[calc(100vw-104px)] max-w-[180px] sm:max-w-[220px]">
                    <Image
                      src="/images/logo.png"
                      alt="Tarialan cup - 2026"
                      fill
                      sizes="(max-width: 640px) 160px, 220px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-shrink-0 rounded-full p-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Content - Scrollable */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 text-gray-900">
                <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
                  НҮҮР
                </NavLink>
                <NavLink href="/#chapter-1" onClick={handlePanoramaNavAndClose("news")}>
                  МЭДЭЭ
                </NavLink>
                <div className="ml-4 flex flex-col gap-2 text-sm">
                  <NavLink href="/news" onClick={() => setIsMenuOpen(false)}>
                    Мэдээ мэдээлэл
                  </NavLink>
                  <NavLink href="/speakers" onClick={() => setIsMenuOpen(false)}>
                    Мэргэжил сонголтын талаар
                  </NavLink>
                  <NavLink href="/sponsors" onClick={() => setIsMenuOpen(false)}>
                    Ивээн тэтгэгчид
                  </NavLink>
                </div>
                <NavLink href="/#chapter-2" onClick={handlePanoramaNavAndClose("about")}>
                  Тэмцээний тухай
                </NavLink>
                <NavLink href="/#chapter-3" onClick={handlePanoramaNavAndClose("contact")}>
                  ХОЛБОО БАРИХ
                </NavLink>
                <NavLink href="/teams" onClick={() => setIsMenuOpen(false)}>
                  Бүртгэгдсэн багууд
                </NavLink>
                <NavLink
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="register-highlight"
                >
                  Бүртгүүлэх
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

