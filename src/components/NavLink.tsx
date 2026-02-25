"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function NavLink({ href, children, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const hideActiveUnderline = href === "/register";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative font-medium uppercase transition-colors ${
        isActive
          ? "text-[#1f632b] hover:text-[#1f632b]"
          : "text-gray-800 hover:text-[#1f632b]"
      } ${className ?? ""}`}
    >
      {children}
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] rounded-full bg-[#1f632b] shadow-[0_2px_6px_rgba(31,99,43,0.35)] transition-all duration-200 ${
          hideActiveUnderline ? "w-0 group-hover:w-0" : isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

