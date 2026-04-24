"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/vehicles", label: "Fleet" },
  { href: "/collections", label: "Collections" },
  { href: "/concierge", label: "Concierge" },
  { href: "/membership", label: "Membership" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        background: "rgba(10,10,12,0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0px 24px 48px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex justify-between items-center w-full px-8 md:px-12 h-20 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          RentKaro
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  color: isActive ? "#ffffff" : "#71717a",
                  borderBottom: isActive ? "1px solid rgba(255,255,255,0.2)" : "none",
                  paddingBottom: isActive ? "4px" : "0",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              color: "#71717a",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Sign In
          </Link>
          <Link
            href="/vehicles"
            style={{
              background: "#39393b",
              color: "#ffffff",
              padding: "10px 24px",
              borderRadius: "9999px",
              fontWeight: 500,
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "filter 0.2s ease",
            }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
