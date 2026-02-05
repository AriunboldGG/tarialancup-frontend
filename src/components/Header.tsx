"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLink from "./NavLink";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { companyInfo } = useCompanyInfo();
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
            <NavLink href="/#chapter-1">МЭДЭЭ</NavLink>
            <NavLink href="/#chapter-2">Тэмцээний тухай</NavLink>
            <NavLink href="/#chapter-3">ХОЛБОО БАРИХ</NavLink>
            <NavLink href="/register">Бүртгүүлэх</NavLink>
          </nav>

          {/* Right: Burger Menu */}
          <div className="flex items-center gap-4">
            {/* Burger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-800 hover:text-[#8DC63F] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
                НҮҮР
              </NavLink>
              <NavLink href="/#chapter-1" onClick={() => setIsMenuOpen(false)}>
                МЭДЭЭ
              </NavLink>
              <NavLink href="/#chapter-2" onClick={() => setIsMenuOpen(false)}>
                Тэмцээний тухай
              </NavLink>
              <NavLink href="/#chapter-3" onClick={() => setIsMenuOpen(false)}>
                ХОЛБОО БАРИХ
              </NavLink>
              <NavLink href="/register" onClick={() => setIsMenuOpen(false)}>
                Бүртгүүлэх
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

