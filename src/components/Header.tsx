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
    <header className="w-full bg-white">
      {/* Top Header Bar */}
      <div className="w-full bg-white border-b border-white">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          {/* Left: Social Media Icons */}
          <div className="flex items-center gap-2">
            <a
              href={companyInfo.facebookUrl || "#"}
              className="flex items-center justify-center"
              target={companyInfo.facebookUrl ? "_blank" : undefined}
              rel={companyInfo.facebookUrl ? "noopener noreferrer" : undefined}
            >
              <Image 
                src="/svg/fb-logo.svg" 
                alt="Facebook" 
                width={20} 
                height={20}
                className="w-5 h-5"
              />
            </a>
          </div>

         

          {/* Right: Contact Info */}
          <div className="flex items-center gap-2 justify-end whitespace-nowrap">
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-1 text-gray-700 hover:underline"
            >
              <Image 
                src="/svg/email-logo.svg" 
                alt="Email" 
                width={16} 
                height={16}
                className="w-4 h-4"
              />
              <span className="max-sm:text-[10px]">{companyInfo.email}</span>
            </a>
            <span className="text-gray-300 px-1">|</span>
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-1 text-gray-700 hover:underline"
            >
              <Image 
                src="/svg/phone-logo.svg" 
                alt="Phone" 
                width={16} 
                height={16}
                className="w-4 h-4"
              />
              <span className="max-sm:text-[10px]">{companyInfo.phone}</span>
            </a>
            {companyInfo.mobilePhone ? (
              <>
                <span className="text-gray-300 px-1">|</span>
                <a
                  href={`tel:${companyInfo.mobilePhone}`}
                  className="flex items-center gap-1 text-gray-700 hover:underline"
                >
                  <Image 
                    src="/svg/phone-logo.svg" 
                    alt="Mobile phone" 
                    width={16} 
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="max-sm:text-[10px]">{companyInfo.mobilePhone}</span>
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-white border-b border-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-[180px] sm:h-12 sm:w-[220px]">
              <Image
                src="/images/main-logo.png"
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
            <NavLink href="/news">МЭДЭЭ</NavLink>
            <NavLink href="/about">БИДНИЙ ТУХАЙ</NavLink>
            <NavLink href="/contact">ХОЛБОО БАРИХ</NavLink>
            <NavLink href="/special-order">Бүртгүүлэх</NavLink>
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
              <NavLink href="/news" onClick={() => setIsMenuOpen(false)}>
                МЭДЭЭ
              </NavLink>
              <NavLink href="/about" onClick={() => setIsMenuOpen(false)}>
                БИДНИЙ ТУХАЙ
              </NavLink>
              <NavLink href="/contact" onClick={() => setIsMenuOpen(false)}>
                ХОЛБОО БАРИХ
              </NavLink>
              <NavLink href="/special-order" onClick={() => setIsMenuOpen(false)}>
                Бүртгүүлэх
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

