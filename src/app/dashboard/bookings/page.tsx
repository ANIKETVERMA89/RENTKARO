"use client";

import { SideNav } from "@/components/ui/side-nav";
import Link from "next/link";
import { useState } from "react";

const userDashboardNav = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "calendar_today", label: "My Bookings", href: "/dashboard/bookings" },
  { icon: "directions_car", label: "Fleet", href: "/vehicles" },
  { icon: "support_agent", label: "Concierge", href: "#" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

const bookings = [
  {
    id: "RX-7892",
    car: "Porsche 911 Carrera S",
    detail: "2023 · Silver Metallic",
    status: "In Progress",
    statusDot: "#34d399",
    period: "Oct 15 – Oct 18, 2023",
    duration: "3 Days",
    location: "Dubai International Airport",
    amount: "$2,450",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4dyieFQltQJAxjynRu1ck8kq8Gt1sME0tKjmUqMHuF8MGRBvyylrXrbrN6lkMYwsj47cBVfIXLVX-uEloHbt1aHQ-f7elx_7k6iioR8_YpbQyhl5rPNeOPdQ2_vF1XkrSAWrwNPh_5Gto-Y_M99roRIetDslnRdZaX50PH1BXZJL5BgyEOEfMj2Kmtny_YoMzFPUvKipUJo9m4SUnfy7_PQ803OvxDLPLQU7GyPI91eJHhPgFTM8-2hI5x1M5VikLiZHl82m8IwrO",
    ctaLabel: "Manage",
    ctaPrimary: true,
  },
  {
    id: "RX-7841",
    car: "Lamborghini Urus",
    detail: "2024 · Matte Black",
    status: "Upcoming",
    statusDot: "#60a5fa",
    period: "Nov 10 – Nov 12, 2023",
    duration: "2 Days",
    location: "The Ritz-Carlton, DIFC",
    amount: "$3,800",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_lPKUpi7DhS_9k1DeoY2fuPIFW1ir_9ACZUVVfyQT4kApiaIwazbv3Ys9nO6tCDmMfBdPy0-rrkj_f00aUjPTrSxzWuX67NJfFkSX-xFjmGbJCesWWAfKX-kkunk0OuT3pY6Y0USHBtx1e05Y4UdN90xt-7NMZ7hwOZTKqg_k_LWVwWsKtgveItNEJXA-JPxLge4D-pesNokpuftxh4IeaqsWAdSOd6jwyUQY5Lup7K8R8vPQ4tZ8evhHQyuaMzziQLn54GKYhpjA",
    ctaLabel: "View",
    ctaPrimary: false,
  },
  {
    id: "RX-7790",
    car: "Mercedes-AMG G 63",
    detail: "2023 · Alpine White",
    status: "Completed",
    statusDot: "#3f3f46",
    period: "Sep 01 – Sep 05, 2023",
    duration: "5 Days",
    location: "",
    amount: "$4,200",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHxcmyC7yct8jMHNZFzGHffdV-gqpOkPzVs0sRgCxraPSMcYAqCYj3AP9goe3oT1PowU_LXqMI5TcezGS8zIXcMokFQ1DAMco4OyjCz0uCNv815uRkGUc0-SWbKOz8ZqwodLFlkgtfmxbpE4y1kSXOMk3AKn9iIwRpdPaVgL3FjtKkP3_bzjMc2QffmgYcRcl4Dk9Z8KjTS685wHVgheP3V6aYEV1mDG48QvjYbLghL-5J8sfTU8l8ESRA2Qr4sCpGDih5s6aqc2LD",
    ctaLabel: "Invoice",
    ctaPrimary: false,
  },
];

const tabs = ["All", "Active", "Upcoming", "Past"];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div style={{ background: "#0c0c0e", color: "#e5e1e4", minHeight: "100vh" }}>
      <SideNav items={userDashboardNav} ctaLabel="Book a Ride" ctaHref="/vehicles" />

      {/* ── Top Header ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "calc(100% - 288px)",
          height: "72px",
          background: "rgba(12,12,14,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          zIndex: 50,
        }}
      >
        {/* Search */}
        <div
          style={{
            position: "relative",
            width: "240px",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#52525b", fontSize: "18px" }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search bookings..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "9999px",
              padding: "8px 16px 8px 38px",
              color: "#e5e1e4",
              fontSize: "0.8125rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "#71717a",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Concierge
          </button>
          {["notifications", "account_circle"].map((icon) => (
            <button
              key={icon}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#71717a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{icon}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={{ marginLeft: "288px", paddingTop: "72px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px 96px" }}>

          {/* Page title */}
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}
            >
              My Bookings
            </h1>
            <p style={{ color: "#52525b", fontSize: "0.9375rem" }}>
              Manage reservations, review past journeys, track upcoming experiences.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "#0e0e10",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "4px",
              width: "fit-content",
              marginBottom: "36px",
            }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    border: "none",
                    background: active ? "#ffffff" : "transparent",
                    color: active ? "#000000" : "#52525b",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Booking Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bookings.map((b) => {
              const isCompleted = b.status === "Completed";
              return (
                <div
                  key={b.id}
                  style={{
                    background: "#0e0e10",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    opacity: isCompleted ? 0.65 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {/* ── Car thumbnail ── */}
                  <div
                    style={{
                      width: "220px",
                      flexShrink: 0,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={b.img}
                      alt={b.car}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: isCompleted ? "grayscale(80%)" : "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to right, transparent 60%, #0e0e10 100%)",
                      }}
                    />
                  </div>

                  {/* ── Main info ── */}
                  <div
                    style={{
                      flex: 1,
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minWidth: 0,
                    }}
                  >
                    {/* Top row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                      <div>
                        {/* Status pill */}
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "3px 10px",
                            borderRadius: "9999px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: b.statusDot,
                              boxShadow: b.status === "In Progress" ? `0 0 6px ${b.statusDot}` : "none",
                            }}
                          />
                          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#a1a1aa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {b.status}
                          </span>
                        </div>

                        <h2
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "1.375rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "-0.01em",
                            marginBottom: "4px",
                          }}
                        >
                          {b.car}
                        </h2>
                        <p style={{ color: "#52525b", fontSize: "0.8125rem" }}>{b.detail}</p>
                      </div>

                      {/* Booking ref */}
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            color: "#3f3f46",
                            fontFamily: "monospace",
                            letterSpacing: "0.08em",
                          }}
                        >
                          #{b.id}
                        </span>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        flexWrap: "wrap",
                        padding: "16px 0",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        marginBottom: "20px",
                      }}
                    >
                      {[
                        { icon: "calendar_month", label: b.period, sub: b.duration },
                        ...(b.location ? [{ icon: "location_on", label: b.location, sub: "Pickup & Drop-off" }] : []),
                      ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span className="material-symbols-outlined" style={{ color: "#3f3f46", fontSize: "18px" }}>{item.icon}</span>
                          <div>
                            <p style={{ fontSize: "0.8125rem", color: "#ffffff", fontWeight: 500, marginBottom: "2px" }}>{item.label}</p>
                            <p style={{ fontSize: "0.6875rem", color: "#52525b" }}>{item.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row: amount + CTA */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "0.6875rem", color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Total</p>
                        <p
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {b.amount}
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        {!isCompleted && (
                          <button
                            style={{
                              padding: "9px 20px",
                              borderRadius: "9999px",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              border: "none",
                              background: b.ctaPrimary ? "#ffffff" : "rgba(255,255,255,0.07)",
                              color: b.ctaPrimary ? "#000000" : "#a1a1aa",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {b.ctaLabel}
                          </button>
                        )}
                        {isCompleted && (
                          <button
                            style={{
                              padding: "9px 20px",
                              borderRadius: "9999px",
                              fontSize: "0.8125rem",
                              fontWeight: 500,
                              cursor: "pointer",
                              border: "1px solid rgba(255,255,255,0.08)",
                              background: "transparent",
                              color: "#52525b",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>receipt_long</span>
                            Invoice
                          </button>
                        )}
                        <button
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#52525b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>more_horiz</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
