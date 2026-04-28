"use client";

import { useState, useEffect } from "react";
import { SideNav } from "@/components/ui/side-nav";

const vendorNav = [
  { icon: "dashboard", label: "Dashboard", href: "/vendor" },
  { icon: "directions_car", label: "Fleet Status", href: "/vendor/fleet" },
  { icon: "calendar_today", label: "Bookings", href: "/vendor/bookings", badge: 3 },
  { icon: "analytics", label: "Analytics", href: "/vendor/analytics" },
  { icon: "payments", label: "Revenue", href: "/vendor/revenue" },
];

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("rk_user") || "{}");
        const res = await fetch(`http://localhost:5000/get-provider-bookings/${user.email}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#131315", color: "#e5e1e4" }}>
      <SideNav items={vendorNav} title="RentKaro" subtitle="Vendor" />

      <main style={{ flex: 1, height: "100%", overflowY: "auto", background: "#131315", marginLeft: "288px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 48px" }}>
          <header style={{ marginBottom: "48px" }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
              Bookings
            </h1>
            <p style={{ color: "#c6c6cb" }}>Active and upcoming rental requests for your vehicles.</p>
          </header>

          {loading ? (
            <div style={{ color: "#c6c6cb" }}>Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl">
              <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#39393b", marginBottom: "16px" }}>calendar_today</span>
              <p style={{ fontSize: "1.125rem", color: "#ffffff", fontWeight: 500 }}>No bookings yet.</p>
              <p style={{ color: "#c6c6cb" }}>Your vehicles are ready for the next deployment.</p>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl overflow-hidden">
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.02)", color: "#919191", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    <th style={{ padding: "20px 24px", fontWeight: 500 }}>Vehicle</th>
                    <th style={{ padding: "20px 24px", fontWeight: 500 }}>Client</th>
                    <th style={{ padding: "20px 24px", fontWeight: 500 }}>Date</th>
                    <th style={{ padding: "20px 24px", fontWeight: 500 }}>Amount</th>
                    <th style={{ padding: "20px 24px", fontWeight: 500 }}>Status</th>
                    <th style={{ padding: "20px 24px", fontWeight: 500 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "20px 24px" }}>
                        <div className="flex items-center gap-4">
                          <img src={b.vehicle_img} style={{ width: "40px", height: "28px", borderRadius: "4px", objectFit: "cover" }} />
                          <p style={{ fontWeight: 600, color: "#ffffff" }}>{b.vehicle_name}</p>
                        </div>
                      </td>
                      <td style={{ padding: "20px 24px", color: "#ffffff" }}>{b.user_id}</td>
                      <td style={{ padding: "20px 24px", color: "#c6c6cb" }}>{new Date(b.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: "20px 24px", color: "#ffffff", fontWeight: 600 }}>₹{b.amount}</td>
                      <td style={{ padding: "20px 24px" }}>
                        <span style={{ padding: "4px 10px", background: "#39393b", color: "#ffffff", borderRadius: "9999px", fontSize: "0.625rem", fontWeight: 700 }}>{b.status}</span>
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <button style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
