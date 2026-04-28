"use client";

import { useState } from "react";
import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { motion } from "framer-motion";

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState({
    bookingConfirm: true,
    priceAlerts: false,
    newFleet: true,
    marketing: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationOptions = [
    { key: "bookingConfirm", label: "Booking Confirmations", desc: "Receive real-time updates and digital keys when your booking is confirmed.", icon: "task_alt" },
    { key: "priceAlerts", label: "Price Drop Alerts", desc: "Get notified when your favorite exotic vehicles are available at a lower rate.", icon: "trending_down" },
    { key: "newFleet", label: "New Fleet Arrivals", desc: "Be the first to know when we add new masterpieces to our curated collection.", icon: "auto_awesome" },
    { key: "marketing", label: "Exclusive Offers", desc: "Receive invitations to private events and member-only pricing.", icon: "card_giftcard" },
  ];

  return (
    <div style={{ background: "#0c0c0e", color: "#e5e1e4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav />

      <main style={{ flexGrow: 1, paddingTop: "140px", paddingBottom: "120px", maxWidth: "800px", margin: "0 auto", width: "100%", paddingLeft: "24px", paddingRight: "24px" }}>
        
        <header style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#71717a", fontSize: "0.875rem", marginBottom: "16px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>notifications</span>
            <span style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>Preferences</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "12px", letterSpacing: "-0.02em" }}>
            Notification Settings
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.125rem", maxWidth: "600px", lineHeight: "1.6" }}>
            Manage how you receive updates and communications from RentKaro.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {notificationOptions.map((opt) => (
            <motion.div
              key={opt.key}
              whileHover={{ scale: 1.01 }}
              style={{
                padding: "32px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px", 
                  background: "rgba(255,255,255,0.04)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span className="material-symbols-outlined" style={{ color: "#ffffff", fontSize: "24px" }}>{opt.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#ffffff", marginBottom: "4px" }}>{opt.label}</h3>
                  <p style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: "1.5", maxWidth: "400px" }}>{opt.desc}</p>
                </div>
              </div>

              <button
                onClick={() => toggleSetting(opt.key as keyof typeof settings)}
                style={{
                  width: "56px",
                  height: "28px",
                  borderRadius: "14px",
                  background: settings[opt.key as keyof typeof settings] ? "#ffffff" : "rgba(255,255,255,0.1)",
                  border: "none",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: settings[opt.key as keyof typeof settings] ? "#000000" : "#71717a",
                  position: "absolute",
                  top: "3px",
                  left: settings[opt.key as keyof typeof settings] ? "31px" : "3px",
                  transition: "all 0.3s ease",
                }} />
              </button>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "48px", padding: "32px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h4 style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 600, marginBottom: "12px" }}>Real-time Delivery Channel</h4>
          <p style={{ color: "#71717a", fontSize: "0.875rem", marginBottom: "24px" }}>
            We use high-priority SMTP channels to ensure your booking confirmations arrive within seconds of transaction completion.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981", fontSize: "0.875rem", fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
            System Status: Operational
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
