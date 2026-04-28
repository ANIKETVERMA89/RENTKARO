"use client";

import { SideNav } from "@/components/ui/side-nav";

const vendorNav = [
  { icon: "dashboard", label: "Dashboard", href: "/vendor" },
  { icon: "directions_car", label: "Fleet Status", href: "/vendor/fleet" },
  { icon: "calendar_today", label: "Bookings", href: "/vendor/bookings", badge: 3 },
  { icon: "analytics", label: "Analytics", href: "/vendor/analytics" },
  { icon: "payments", label: "Revenue", href: "/vendor/revenue" },
];

export default function VendorAnalyticsPage() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#131315", color: "#e5e1e4" }}>
      <SideNav items={vendorNav} title="RentKaro" subtitle="Vendor" />

      <main style={{ flex: 1, height: "100%", overflowY: "auto", background: "#131315", marginLeft: "288px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 48px" }}>
          <header style={{ marginBottom: "48px" }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
              Analytics
            </h1>
            <p style={{ color: "#c6c6cb" }}>Performance insights for your vehicle portfolio.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Usage Chart Mockup */}
            <div className="glass-panel p-8 rounded-3xl">
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "32px" }}>Fleet Utilization</h3>
              <div style={{ height: "300px", display: "flex", alignItems: "end", gap: "12px" }}>
                {[65, 45, 78, 90, 85, 70, 95].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "8px 8px 0 0", height: `${h}%`, position: "relative" }}>
                    <div style={{ position: "absolute", top: "-24px", left: "50%", transform: "translateX(-50%)", fontSize: "0.75rem", color: "#919191" }}>
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Models Mockup */}
            <div className="glass-panel p-8 rounded-3xl">
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "32px" }}>Most Booked Models</h3>
              <div className="flex flex-col gap-6">
                {[
                  { name: "Porsche 911 GT3", percentage: 85 },
                  { name: "Tesla Model S Plaid", percentage: 72 },
                  { name: "BMW M5 Competition", percentage: 58 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span style={{ fontSize: "0.875rem", color: "#ffffff" }}>{item.name}</span>
                      <span style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>{item.percentage}%</span>
                    </div>
                    <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${item.percentage}%`, background: "#ffffff", borderRadius: "4px" }} />
                    </div>
                  </div>
                ))}
              </div>
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
