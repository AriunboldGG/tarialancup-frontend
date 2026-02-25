"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import NavLink from "./NavLink";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { companyInfo } = useCompanyInfo();
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header className="w-full glass-header">
      {/* Top Header Bar */}
   

      {/* Main Navigation Bar */}
      <div className="w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-[180px] sm:h-12 sm:w-[220px]">
              <Image
                src="/images/logo.png"
                alt="Tarialan cup - 2026"
                fill
                sizes="(max-width: 640px) 180px, 220px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Middle: Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink href="/">НҮҮР</NavLink>
            <div className="relative group">
              <NavLink href="/#chapter-1">МЭДЭЭ</NavLink>
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
              </div>
            </div>
            <NavLink href="/#chapter-2">Тэмцээний тухай</NavLink>
            <NavLink href="/#chapter-3">ХОЛБОО БАРИХ</NavLink>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.25)]">
            <nav className="container mx-auto px-4 py-5 flex flex-col gap-4 text-gray-900">
              <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
                НҮҮР
              </NavLink>
              <NavLink href="/#chapter-1" onClick={() => setIsMenuOpen(false)}>
                МЭДЭЭ
              </NavLink>
              <div className="ml-4 flex flex-col gap-2 text-sm">
                <NavLink href="/news" onClick={() => setIsMenuOpen(false)}>
                  Мэдээ мэдээлэл
                </NavLink>
                <NavLink href="/speakers" onClick={() => setIsMenuOpen(false)}>
                  Мэргэжил сонголтын талаар
                </NavLink>
              </div>
              <NavLink href="/#chapter-2" onClick={() => setIsMenuOpen(false)}>
                Тэмцээний тухай
              </NavLink>
              <NavLink href="/#chapter-3" onClick={() => setIsMenuOpen(false)}>
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
        )}
      </div>
    </header>
  );
}

