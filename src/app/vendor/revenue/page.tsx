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

export default function VendorRevenuePage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("rk_user") || "{}");
        const res = await fetch(`http://localhost:5000/get-provider-bookings/${user.email}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch revenue", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenueData();
  }, []);

  const completedBookings = bookings.filter(b => b.status === "Completed");
  const inProgressBookings = bookings.filter(b => b.status === "Active" || b.status === "In Progress");

  const totalEarnings = completedBookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const pendingRevenue = inProgressBookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const commission = Math.round(totalEarnings * 0.10); // 10% commission
  const netEarnings = totalEarnings - commission;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#131315", color: "#e5e1e4" }}>
      <SideNav items={vendorNav} title="RentKaro" subtitle="Vendor" />

      <main style={{ flex: 1, height: "100%", overflowY: "auto", background: "#131315", marginLeft: "288px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 48px" }}>
          <header style={{ marginBottom: "48px" }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
              Revenue
            </h1>
            <p style={{ color: "#c6c6cb" }}>Track your earnings and payout history.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Total Earnings", value: `₹${totalEarnings.toLocaleString()}`, icon: "payments" },
              { label: "Pending (In Ride)", value: `₹${pendingRevenue.toLocaleString()}`, icon: "pending" },
              { label: "Commission Paid", value: `₹${commission.toLocaleString()}`, icon: "account_balance" },
            ].map((card, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl">
                <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#919191", marginBottom: "16px" }}>{card.icon}</span>
                <p style={{ fontSize: "0.875rem", color: "#c6c6cb", marginBottom: "4px" }}>{card.label}</p>
                <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff" }}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-8">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "24px" }}>Recent Transactions</h3>
            <div className="flex flex-col gap-4">
              {loading ? (
                <p style={{ color: "#c6c6cb" }}>Loading transactions...</p>
              ) : bookings.length === 0 ? (
                <p style={{ color: "#c6c6cb" }}>No transactions found.</p>
              ) : (
                bookings.map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div>
                      <p style={{ fontWeight: 600, color: "#ffffff" }}>{tx.vehicle_name}</p>
                      <p style={{ fontSize: "0.75rem", color: "#c6c6cb" }}>{new Date(tx.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 600, color: "#ffffff" }}>₹{tx.amount}</p>
                      <p style={{ fontSize: "0.75rem", color: tx.status === "Completed" ? "#34d399" : "#fbbf24" }}>
                        {tx.status === "Completed" ? "Success" : "In Ride"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
