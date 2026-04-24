"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

interface SideNavProps {
  items: SideNavItem[];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function SideNav({ items, title = "RentKaro", subtitle, ctaLabel, ctaHref }: SideNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-72 z-40"
      style={{
        background: "#0e0e10",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "24px 0 48px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center px-8 h-20 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span
              className="ml-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#c6c6cb",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </span>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 active:scale-95"
              style={{
                color: isActive ? "#ffffff" : "#8e8e93",
                background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                fontWeight: isActive ? 600 : 400,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className="ml-auto"
                  style={{
                    background: "#39393b",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "9999px",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      {ctaLabel && (
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link
            href={ctaHref || "#"}
            style={{
              display: "block",
              width: "100%",
              padding: "12px 16px",
              background: "#39393b",
              color: "#ffffff",
              borderRadius: "0.75rem",
              fontWeight: 500,
              fontSize: "0.875rem",
              textAlign: "center",
              textDecoration: "none",
              transition: "filter 0.3s ease",
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
