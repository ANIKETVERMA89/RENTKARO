"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SideNav } from "@/components/ui/side-nav";
import { API_BASE_URL } from "@/lib/api";

const vendorNav = [
  { icon: "dashboard", label: "Dashboard", href: "/vendor" },
  { icon: "directions_car", label: "Fleet Status", href: "/vendor/fleet" },
  { icon: "calendar_today", label: "Bookings", href: "/vendor/bookings", badge: 3 },
  { icon: "analytics", label: "Analytics", href: "/vendor/analytics" },
  { icon: "payments", label: "Revenue", href: "/vendor/revenue" },
];

export default function FleetStatusPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("rk_user") || "{}");
        const res = await fetch(`${API_BASE_URL}/get-provider-vehicles/${user.email}`);
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Failed to fetch fleet", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#131315", color: "#e5e1e4" }}>
      <SideNav items={vendorNav} title="RentKaro" subtitle="Vendor" />

      <main style={{ flex: 1, height: "100%", overflowY: "auto", background: "#131315", marginLeft: "288px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 48px" }}>
          <header style={{ display: "flex", justifyContent: "between", alignItems: "end", marginBottom: "48px" }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
                Fleet Status
              </h1>
              <p style={{ color: "#c6c6cb" }}>Manage and monitor your active vehicle listings.</p>
            </div>
            <Link href="/vendor/add-vehicle">
              <button style={{ background: "#ffffff", color: "#000000", padding: "12px 24px", borderRadius: "9999px", fontWeight: 600, border: "none", cursor: "pointer" }}>
                + Add Vehicle
              </button>
            </Link>
          </header>

          {loading ? (
            <div style={{ color: "#c6c6cb" }}>Loading fleet data...</div>
          ) : vehicles.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl">
              <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#39393b", marginBottom: "16px" }}>directions_car</span>
              <p style={{ fontSize: "1.125rem", color: "#ffffff", fontWeight: 500 }}>No vehicles found in your fleet.</p>
              <p style={{ color: "#c6c6cb", marginBottom: "24px" }}>Start by adding your first luxury vehicle.</p>
              <Link href="/vendor/add-vehicle">
                 <button style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "12px 24px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
                    Broadcast Vehicle
                 </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <div key={v.id} className="glass-panel rounded-2xl overflow-hidden group">
                  <div style={{ height: "200px", background: "#2a2a2c", position: "relative" }}>
                    <img src={v.image_url} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "12px", right: "12px", padding: "4px 12px", background: v.available ? "#34d399" : "#f87171", borderRadius: "9999px", fontSize: "0.625rem", fontWeight: 700, color: "#000" }}>
                      {v.available ? "AVAILABLE" : "RENTED"}
                    </div>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "4px" }}>{v.name}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#c6c6cb", marginBottom: "16px" }}>{v.variant} · {v.manufacture_year}</p>
                    
                    <div className="flex justify-between items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
                      <div>
                        <p style={{ fontSize: "0.75rem", color: "#919191", textTransform: "uppercase" }}>Daily Rate</p>
                        <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "#ffffff" }}>₹{v.daily_rate}</p>
                      </div>
                      <button className="material-symbols-outlined" style={{ background: "none", border: "none", color: "#919191", cursor: "pointer" }}>more_vert</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .glass-panel:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
