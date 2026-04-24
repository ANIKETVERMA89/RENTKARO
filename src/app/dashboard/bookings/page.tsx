"use client";

import { SideNav } from "@/components/ui/side-nav";
import Link from "next/link";

const userDashboardNav = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "calendar_today", label: "My Bookings", href: "/dashboard/bookings" },
  { icon: "directions_car", label: "Fleet", href: "/vehicles" },
  { icon: "support_agent", label: "Concierge", href: "#" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

const bookings = [
  {
    id: 1,
    car: "Porsche 911 Carrera S",
    detail: "2023 Model • Silver Metallic",
    status: "In Progress",
    statusColor: "#34d399",
    statusBg: "rgba(52,211,153,0.15)",
    period: "Oct 15 - Oct 18, 2023",
    location: "Dubai International Airport (DXB)",
    amount: "$2,450",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4dyieFQltQJAxjynRu1ck8kq8Gt1sME0tKjmUqMHuF8MGRBvyylrXrbrN6lkMYwsj47cBVfIXLVX-uEloHbt1aHQ-f7elx_7k6iioR8_YpbQyhl5rPNeOPdQ2_vF1XkrSAWrwNPh_5Gto-Y_M99roRIetDslnRdZaX50PH1BXZJL5BgyEOEfMj2Kmtny_YoMzFPUvKipUJo9m4SUnfy7_PQ803OvxDLPLQU7GyPI91eJHhPgFTM8-2hI5x1M5VikLiZHl82m8IwrO",
    ctaLabel: "Manage Booking",
    ctaStyle: { background: "#39393b", color: "#ffffff" },
  },
  {
    id: 2,
    car: "Lamborghini Urus",
    detail: "2024 Model • Matte Black",
    status: "Upcoming",
    statusColor: "#60a5fa",
    statusBg: "rgba(96,165,250,0.15)",
    period: "Nov 10 - Nov 12, 2023",
    location: "The Ritz-Carlton, DIFC",
    amount: "$3,800",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_lPKUpi7DhS_9k1DeoY2fuPIFW1ir_9ACZUVVfyQT4kApiaIwazbv3Ys9nO6tCDmMfBdPy0-rrkj_f00aUjPTrSxzWuX67NJfFkSX-xFjmGbJCesWWAfKX-kkunk0OuT3pY6Y0USHBtx1e05Y4UdN90xt-7NMZ7hwOZTKqg_k_LWVwWsKtgveItNEJXA-JPxLge4D-pesNokpuftxh4IeaqsWAdSOd6jwyUQY5Lup7K8R8vPQ4tZ8evhHQyuaMzziQLn54GKYhpjA",
    ctaLabel: "View Details",
    ctaStyle: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" },
  },
  {
    id: 3,
    car: "Mercedes-AMG G 63",
    detail: "2023 Model • Alpine White",
    status: "Completed",
    statusColor: "#c6c6cb",
    statusBg: "rgba(198,198,203,0.1)",
    period: "Sep 01 - Sep 05, 2023",
    location: "",
    amount: "$4,200",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHxcmyC7yct8jMHNZFzGHffdV-gqpOkPzVs0sRgCxraPSMcYAqCYj3AP9goe3oT1PowU_LXqMI5TcezGS8zIXcMokFQ1DAMco4OyjCz0uCNv815uRkGUc0-SWbKOz8ZqwodLFlkgtfmxbpE4y1kSXOMk3AKn9iIwRpdPaVgL3FjtKkP3_bzjMc2QffmgYcRcl4Dk9Z8KjTS685wHVgheP3V6aYEV1mDG48QvjYbLghL-5J8sfTU8l8ESRA2Qr4sCpGDih5s6aqc2LD",
    ctaLabel: "Invoice",
    ctaStyle: { background: "transparent", color: "#c6c6cb" },
    icon: "receipt_long",
  },
];

export default function UserDashboardPage() {
  return (
    <div style={{ background: "#0c0c0e", color: "#e5e1e4", minHeight: "100vh" }}>
      <SideNav items={userDashboardNav} ctaLabel="Book a Ride" ctaHref="/vehicles" />

      {/* Top Header */}
      <header
        className="fixed top-0 right-0 z-50 flex justify-between items-center"
        style={{
          width: "calc(100% - 18rem)",
          height: "80px",
          background: "rgba(12,12,14,0.8)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0 48px",
          transition: "all 0.3s ease",
        }}
      >
        {/* Mobile brand */}
        <div className="md:hidden">
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em" }}>
            RentKaro
          </h1>
        </div>

        {/* Search */}
        <div
          className="hidden md:flex items-center"
          style={{
            background: "rgba(14,14,16,0.5)",
            border: "1px solid rgba(71,71,71,0.2)",
            borderRadius: "9999px",
            padding: "8px 16px",
            width: "256px",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="material-symbols-outlined" style={{ color: "#c6c6cb", fontSize: "20px", marginRight: "8px" }}>search</span>
          <input
            type="text"
            placeholder="Search bookings..."
            style={{ background: "transparent", border: "none", outline: "none", color: "#ffffff", fontSize: "0.875rem", width: "100%" }}
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block" style={{ background: "none", border: "none", color: "#c6c6cb", fontSize: "0.875rem", cursor: "pointer" }}>
            Contact Concierge
          </button>
          <div className="flex items-center gap-2">
            {["notifications", "account_circle"].map((icon) => (
              <button
                key={icon}
                style={{ background: "none", border: "none", color: "#8e8e93", cursor: "pointer", padding: "8px", borderRadius: "8px" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ paddingTop: "112px", paddingLeft: "0", marginLeft: "288px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px 96px" }}>
          {/* Page header */}
          <div style={{ marginBottom: "48px" }}>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              My Bookings
            </h1>
            <p style={{ color: "#c6c6cb", fontSize: "1.125rem", maxWidth: "42rem" }}>
              Manage your active reservations, review past journeys, and prepare for upcoming elite experiences.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
            style={{
              marginBottom: "40px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {["All Bookings", "Active", "Upcoming", "Past"].map((tab, i) => (
              <button
                key={tab}
                style={{
                  padding: "12px 24px",
                  color: i === 0 ? "#ffffff" : "#8e8e93",
                  fontWeight: i === 0 ? 500 : 400,
                  borderBottom: i === 0 ? "2px solid #ffffff" : "2px solid transparent",
                  background: "none",
                  border: "none",
                  borderBottom: i === 0 ? "2px solid #ffffff" : "2px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontSize: "0.9375rem",
                  transition: "color 0.3s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Booking cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group flex flex-col md:flex-row relative rounded-2xl overflow-hidden"
                style={{
                  background: "#0e0e10",
                  border: "1px solid rgba(71,71,71,0.2)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
                  transition: "background 0.5s ease",
                  opacity: booking.status === "Completed" ? 0.8 : 1,
                }}
              >
                {/* Image */}
                <div className="md:w-2/5 relative overflow-hidden" style={{ minHeight: "256px" }}>
                  <img
                    src={booking.img}
                    alt={booking.car}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.7s ease",
                      filter: booking.status === "Completed" ? "grayscale(30%)" : "none",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #0e0e10, transparent)", opacity: 0.8 }}
                  />
                  {/* Status badge */}
                  <div
                    className="absolute top-4 left-4 flex items-center gap-2"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "6px 12px",
                      borderRadius: "9999px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: booking.statusColor,
                        boxShadow: booking.status === "In Progress" ? `0 0 8px ${booking.statusColor}` : "none",
                      }}
                    />
                    <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="md:w-3/5 flex flex-col justify-between relative z-10"
                  style={{ padding: "24px" }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                          {booking.car}
                        </h2>
                        <p style={{ color: "#c6c6cb", fontSize: "0.875rem" }}>{booking.detail}</p>
                      </div>
                      <span className="material-symbols-outlined" style={{ color: "#c6c6cb", fontSize: "20px" }}>more_vert</span>
                    </div>

                    <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                      {[
                        { icon: "calendar_month", label: "Rental Period", value: booking.period },
                        ...(booking.location ? [{ icon: "location_on", label: "Pickup & Drop-off", value: booking.location }] : []),
                      ].map((item) => (
                        <div key={item.icon} className="flex items-center gap-3">
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.05)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ color: "#ffffff", fontSize: "20px" }}>{item.icon}</span>
                          </div>
                          <div>
                            <p style={{ fontSize: "0.75rem", color: "#c6c6cb", marginBottom: "2px" }}>{item.label}</p>
                            <p style={{ fontSize: "0.875rem", color: "#ffffff", fontWeight: 500 }}>{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between"
                    style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div>
                      <p style={{ fontSize: "0.75rem", color: "#c6c6cb", marginBottom: "2px" }}>Total Amount</p>
                      <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>{booking.amount}</p>
                    </div>
                    <button
                      style={{
                        padding: "10px 20px",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "none",
                        ...booking.ctaStyle,
                      }}
                    >
                      {booking.icon && <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{booking.icon}</span>}
                      {booking.ctaLabel}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
