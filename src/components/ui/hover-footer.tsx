"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Car,
  Mail,
  Phone,
  MapPin,
  Globe,
  Rss,
  Share,
  Video,
} from "lucide-react";

/* ─── Text hover SVG effect ─── */
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Ghost stroke (shown on hover) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      {/* Animated draw-in stroke */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Radial gradient reveal on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

/* ─── Ambient background ─── */
export const FooterBackgroundGradient = () => (
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
    }}
  />
);

/* ─── Main Footer Component ─── */
export default function HoverFooter() {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Browse Fleet", href: "/vehicles" },
        { label: "Collections", href: "#" },
        { label: "Memberships", href: "#" },
        { label: "Concierge Service", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About RentKaro", href: "#" },
        { label: "Become a Vendor", href: "#" },
        { label: "Careers", href: "#", pulse: true },
        { label: "Press & Media", href: "#" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "concierge@rentkaro.com",
      href: "mailto:concierge@rentkaro.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "Mumbai · Delhi · Dubai",
    },
  ];

  const socialLinks = [
    { icon: <Globe size={20} />, label: "Website", href: "#" },
    { icon: <Rss size={20} />, label: "Blog", href: "#" },
    { icon: <Share size={20} />, label: "Share", href: "#" },
    { icon: <Video size={20} />, label: "Video", href: "#" },
  ];

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        margin: "0 24px 24px",
        borderRadius: "24px",
        background: "#0a0a0c",
        border: "1px solid rgba(255,255,255,0.07)",
        color: "#71717a",
      }}
    >
      {/* ── Main content grid ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "72px 64px 56px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "64px",
            paddingBottom: "56px",
          }}
        >
          {/* ── Brand ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Car size={26} color="#3ca2fa" strokeWidth={1.5} />
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                RentKaro
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#52525b", maxWidth: "240px" }}>
              The Ethereal Monolith of Motion. Access the world&apos;s most definitive
              automotive experiences — curated, delivered, unforgettable.
            </p>
            <p style={{ fontSize: "0.7rem", color: "#3f3f46", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Est. 2024 · Mumbai, India
            </p>
          </div>

          {/* ── Link sections ── */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "24px",
                }}
              >
                {section.title}
              </h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.9rem",
                        color: "#71717a",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#3ca2fa")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#3ca2fa",
                          flexShrink: 0,
                          animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Concierge ── */}
          <div>
            <h4
              style={{
                color: "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "24px",
              }}
            >
              Concierge
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "18px", listStyle: "none", padding: 0, margin: 0 }}>
              {contactInfo.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{ fontSize: "0.875rem", color: "#71717a", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#3ca2fa")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.875rem" }}>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "32px" }} />

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Social icons */}
          <div style={{ display: "flex", gap: "20px" }}>
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{ color: "#3f3f46", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3ca2fa")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3f3f46")}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", gap: "28px" }}>
            {["Privacy Policy", "Terms of Service", "Fleet Insurance"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ fontSize: "0.75rem", color: "#3f3f46", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#71717a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3f3f46")}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: "0.75rem", color: "#3f3f46" }}>
            &copy; {new Date().getFullYear()} RentKaro. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Big text hover watermark ── */}
      <div
        style={{
          display: "flex",
          height: "240px",
          marginTop: "-40px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <TextHoverEffect text="RentKaro" />
      </div>

      {/* ── Ambient glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(60,162,250,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </footer>
  );
}
