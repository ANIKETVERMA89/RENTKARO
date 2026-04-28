"use client";

import { useState, useEffect } from "react";
import { SideNav } from "@/components/ui/side-nav";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

const vendorNav = [
  { icon: "dashboard", label: "Dashboard", href: "/vendor" },
  { icon: "directions_car", label: "Fleet Status", href: "/vendor/fleet" },
  { icon: "calendar_today", label: "Bookings", href: "/vendor/bookings", badge: 3 },
  { icon: "analytics", label: "Analytics", href: "/vendor/analytics" },
  { icon: "payments", label: "Revenue", href: "/vendor/revenue" },
];

const metrics = [
  {
    icon: "account_balance_wallet",
    label: "Total Revenue",
    value: "₹42,850",
    badge: "+12.5%",
    trendIcon: "trending_up",
    sparkPath1: "M0,50 Q20,30 40,40 T80,20 T100,10 L100,50 Z",
    sparkPath2: "M0,50 Q20,30 40,40 T80,20 T100,10",
    gradId: "grad1",
  },
  {
    icon: "key",
    label: "Active Bookings",
    value: "18",
    badge: "+4.2%",
    trendIcon: "trending_up",
    sparkPath1: "M0,50 Q10,40 30,45 T70,30 T100,15 L100,50 Z",
    sparkPath2: "M0,50 Q10,40 30,45 T70,30 T100,15",
    gradId: "grad2",
  },
  {
    icon: "local_shipping",
    label: "Fleet Utilization",
    value: "82%",
    sub: "of 45 units",
    badge: "Stable",
    trendIcon: null,
    sparkPath1: null,
    sparkPath2: null,
    gradId: null,
    isDonut: true,
  },
];

const bookingRows = [
  {
    carName: "Tesla Model S Plaid",
    carLic: "LIC-8849",
    carImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl94vmmvoEIS7fF8LMrahbIRQ1CDB3ZAyRBKz6nvsTjfRBkrN929bXeSKc7uXQ7hNPJ6qxhUjkmUcZnAtjNZ_q1hEYcVklOwVJKQaY5VYWxRXhe6nniRWTg1RuTB9Zxdzb7X9Kh59G1390ILKzLLQnPjP7S9p8lL5pQzqfSyn1n6Y0E661gGzXclxZ7A2hVUV6ES1uIyCgf6BflPOowX6I8Sg5gBR_blp0DOJshIdjnugqhusHLUXweTT7yiTseSoDMcQl1pQtpb4p",
    client: "Elena Rostova",
    clientType: "Verified Member",
    dates: "Oct 12 - Oct 15",
    days: "3 Days",
    value: "₹1,250",
    status: "Pending",
    statusBg: "#ffffff",
    statusText: "#000000",
  },
  {
    carName: "Porsche 911 GT3",
    carLic: "LIC-4021",
    carImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWI-45qdSQodBFgJx9jVDXUk4YIiOPtUea7Zp78xc4o3LB4j8i3T9d-SuMm9FiGF-4GdIAdgnO-QDjfaffYaXg_Fs0KFyurrGzEmaWTpfTpxRdnQSiP0fhtLbrImp5D5fCNlsQaaLywoLaYviaNYcuzRAOtTByRAbWMoUMLh998IURouotlcHOMx3DEztsIeVL9s1JqjhuOxZR9G6B-4HLcUBQf8mgIJ0Dv12jksoQt3ohuN6R5GucNfioMhzPvoPFTBOQIm7qkJMM",
    client: "Marcus Chen",
    clientType: "Corporate Account",
    dates: "Oct 14 - Oct 20",
    days: "6 Days",
    value: "₹4,800",
    status: "Confirmed",
    statusBg: "#39393b",
    statusText: "#ffffff",
    statusBorder: "1px solid rgba(71,71,71,0.3)",
  },
  {
    carName: "Range Rover Autobiography",
    carLic: "LIC-9930",
    carImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmzGM1hiUY1n88nDXNlEes10kIsBa9DduRH0Hm9KBNuBx5o9FtU6oHhHf6rzoKcCCCsmLL-W7ENy5EkESugPTuLeq2mWHw1EI0_ogvToHloNhlk4X2YXnsYqYle7NuA6pO9p5X2_15qhUpNI1iookOIxFGkeoz-JG_DHcSr0av6lPV9B6dYUlF9gdiUMeek_Ski_OC-17S7dTu6ik6oAZLeYuj_37UYr3V6F9lsJ9zfpIpWP_tgsD6Fq9G97hAtbtcUr_v-0P5G41H",
    client: "Sarah Jenkins",
    clientType: "First Time",
    dates: "Oct 15 - Oct 16",
    days: "1 Day",
    value: "₹650",
    status: "In Progress",
    statusBg: "#2a2a2c",
    statusText: "#c6c6cb",
    statusBorder: "1px solid rgba(71,71,71,0.2)",
  },
];

export default function VendorDashboardPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("rk_user") || "{}");
        const [fleetRes, bookingsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/get-provider-vehicles/${user.email}`),
          fetch(`${API_BASE_URL}/get-provider-bookings/${user.email}`)
        ]);
        
        const fleetData = await fleetRes.json();
        const bookingsData = await bookingsRes.json();
        
        setVehicles(fleetData);
        setBookings(bookingsData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completedBookings = bookings.filter(b => b.status === "Completed");
  const inProgressBookings = bookings.filter(b => b.status !== "Completed");

  const totalRevenue = completedBookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const activeBookings = inProgressBookings.length;
  const fleetUtilization = vehicles.length > 0 ? Math.round((activeBookings / vehicles.length) * 100) : 0;

  const dynamicMetrics = [
    {
      icon: "account_balance_wallet",
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      badge: "+12.5%",
      trendIcon: "trending_up",
      sparkPath1: "M0,50 Q20,30 40,40 T80,20 T100,10 L100,50 Z",
      sparkPath2: "M0,50 Q20,30 40,40 T80,20 T100,10",
      gradId: "grad1",
    },
    {
      icon: "key",
      label: "Active Bookings",
      value: activeBookings.toString(),
      badge: "+4.2%",
      trendIcon: "trending_up",
      sparkPath1: "M0,50 Q10,40 30,45 T70,30 T100,15 L100,50 Z",
      sparkPath2: "M0,50 Q10,40 30,45 T70,30 T100,15",
      gradId: "grad2",
    },
    {
      icon: "local_shipping",
      label: "Fleet Utilization",
      value: `${fleetUtilization}%`,
      sub: `of ${vehicles.length} units`,
      badge: "Stable",
      trendIcon: null,
      sparkPath1: null,
      sparkPath2: null,
      gradId: null,
      isDonut: true,
    },
  ];

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#131315", color: "#e5e1e4" }}
    >
      <SideNav items={vendorNav} title="RentKaro" subtitle="Vendor" />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          height: "100%",
          overflowY: "auto",
          background: "#131315",
          position: "relative",
          marginLeft: "288px",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "#39393b",
            opacity: 0.2,
            filter: "blur(120px)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 48px", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <header
            style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "48px" }}
            className="md:flex-row md:items-end md:justify-between"
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "8px",
                }}
              >
                Overview
              </h1>
              <p style={{ color: "#c6c6cb", fontSize: "0.9375rem", fontWeight: 500 }}>
                Real-time metrics for your fleet performance.
              </p>
            </div>
            <Link href="/vendor/add-vehicle" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 30px rgba(255,255,255,0.12)",
                  alignSelf: "flex-start",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}>add</span>
                Add Vehicle
              </button>
            </Link>
          </header>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: "48px" }}>
            {dynamicMetrics.map((m) => (
              <div
                key={m.label}
                className="glass-panel rounded-xl relative overflow-hidden group"
                style={{ padding: "24px", transition: "background 0.5s ease" }}
              >
                <div className="flex justify-between items-start" style={{ marginBottom: "32px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#39393b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{m.icon}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      background: m.gradId ? "rgba(255,255,255,0.1)" : "#2a2a2c",
                      color: m.gradId ? "#ffffff" : "#c6c6cb",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {m.trendIcon && <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>{m.trendIcon}</span>}
                    {m.badge}
                  </span>
                </div>
                <div>
                  <p style={{ color: "#c6c6cb", fontSize: "0.875rem", fontWeight: 500, marginBottom: "4px" }}>{m.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "2.25rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {m.value}
                    </p>
                    {m.sub && <p style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>{m.sub}</p>}
                  </div>
                </div>

                {/* Sparkline */}
                {m.sparkPath1 && (
                  <svg
                    style={{ position: "absolute", bottom: 0, right: 0, width: "128px", height: "64px", opacity: 0.3 }}
                    preserveAspectRatio="none"
                    viewBox="0 0 100 50"
                  >
                    <defs>
                      <linearGradient id={m.gradId!} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={m.sparkPath1} fill={`url(#${m.gradId})`} />
                    <path d={m.sparkPath2!} fill="none" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                )}

                {/* Donut indicator */}
                {m.isDonut && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "24px",
                      right: "24px",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      border: "4px solid #39393b",
                      borderTopColor: "#ffffff",
                      opacity: 0.8,
                      transform: "rotate(45deg)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Booking requests table */}
          <section
            className="glass-panel rounded-xl"
            style={{ padding: "4px 8px" }}
          >
            <div
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              style={{
                padding: "24px",
                borderBottom: "1px solid rgba(71,71,71,0.1)",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.01em" }}>
                Current Booking Requests
              </h2>
              <button
                style={{
                  fontSize: "0.875rem",
                  color: "#c6c6cb",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View All <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#c6c6cb",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      borderBottom: "1px solid rgba(71,71,71,0.05)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {["Vehicle", "Client", "Dates", "Value", "Status", "Action"].map((h) => (
                      <th key={h} style={{ padding: "16px 24px", fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(71,71,71,0.05)",
                        transition: "background 0.2s ease",
                      }}
                    >
                      <td style={{ padding: "20px 24px" }}>
                        <div className="flex items-center gap-4">
                          <div style={{ width: "48px", height: "32px", borderRadius: "4px", background: "#2a2a2c", overflow: "hidden", flexShrink: 0 }}>
                            <img src={row.vehicle_img} alt={row.vehicle_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div>
                            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>{row.vehicle_name}</p>
                            <p style={{ fontSize: "0.75rem", color: "#c6c6cb" }}>{String(row.vehicle_id).slice(0,8)}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#ffffff" }}>{row.user_id}</p>
                        <p style={{ fontSize: "0.75rem", color: "#c6c6cb" }}>Member</p>
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#ffffff" }}>{new Date(row.created_at).toLocaleDateString()}</p>
                        <p style={{ fontSize: "0.75rem", color: "#c6c6cb" }}>1 Day</p>
                      </td>
                      <td style={{ padding: "20px 24px", fontSize: "0.875rem", fontWeight: 500, color: "#ffffff" }}>₹{row.amount}</td>
                      <td style={{ padding: "20px 24px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            background: "#39393b",
                            color: "#ffffff",
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: "20px 24px", textAlign: "right" }}>
                        <button
                          style={{
                            padding: "8px",
                            borderRadius: "0.5rem",
                            background: "rgba(255,255,255,0.05)",
                            border: "none",
                            color: "#c6c6cb",
                            cursor: "pointer",
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ padding: "48px", textAlign: "center", color: "#919191" }}>
                        No booking requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
