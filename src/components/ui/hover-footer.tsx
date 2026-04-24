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
    <footer className="relative h-fit rounded-3xl overflow-hidden mx-6 mb-6 mt-0 text-zinc-400">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Car size={28} className="text-[#3ca2fa]" strokeWidth={1.5} />
              <span className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                RentKaro
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              The Ethereal Monolith of Motion. Access the world&apos;s most
              definitive automotive experiences — curated, delivered, unforgettable.
            </p>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              Est. 2024 · Mumbai, India
            </p>
          </div>

          {/* Link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm font-semibold mb-6 uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-sm hover:text-[#3ca2fa] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1 right-0 w-1.5 h-1.5 rounded-full bg-[#3ca2fa] animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-6 uppercase tracking-widest">
              Concierge
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="text-sm hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/5 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-5 text-zinc-600">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6 text-zinc-600 text-xs">
            {["Privacy Policy", "Terms of Service", "Fleet Insurance"].map((l) => (
              <a key={l} href="#" className="hover:text-zinc-300 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} RentKaro. All rights reserved.
          </p>
        </div>
      </div>

      {/* Big text hover watermark */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="RentKaro" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
