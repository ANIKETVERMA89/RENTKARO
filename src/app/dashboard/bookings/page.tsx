"use client";

import { SideNav } from "@/components/ui/side-nav";
import { useState, useEffect } from "react";
import { ConditionVerificationModal } from "@/components/ui/condition-verification-modal";
import { createClient } from "@supabase/supabase-js";
import { generateInvoicePDF, getInvoiceBase64 } from "@/lib/invoice-generator";

const supabase = createClient(
  "https://hdujjdioyxnrtbgxiqeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw"
);

// Dummy pickup image baseline for AI comparison
const MOCK_PICKUP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC4dyieFQltQJAxjynRu1ck8kq8Gt1sME0tKjmUqMHuF8MGRBvyylrXrbrN6lkMYwsj47cBVfIXLVX-uEloHbt1aHQ-f7elx_7k6iioR8_YpbQyhl5rPNeOPdQ2_vF1XkrSAWrwNPh_5Gto-Y_M99roRIetDslnRdZaX50PH1BXZJL5BgyEOEfMj2Kmtny_YoMzFPUvKipUJo9m4SUnfy7_PQ803OvxDLPLQU7GyPI91eJHhPgFTM8-2hI5x1M5VikLiZHl82m8IwrO";

const userDashboardNav = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "calendar_today", label: "My Bookings", href: "/dashboard/bookings" },
  { icon: "directions_car", label: "Fleet", href: "/vehicles" },
  { icon: "support_agent", label: "Concierge", href: "/dashboard/concierge" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

const tabs = ["All", "Active", "Upcoming", "Past"];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [verifyingBooking, setVerifyingBooking] = useState<any>(null);

  // Fetch user session and then their bookings
  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      try {
        // Get the current logged-in user
        const { data: { session } } = await supabase.auth.getSession();
        let email = session?.user?.email;

        // Fallback to localStorage if Supabase session is not ready yet
        if (!email) {
          const savedUser = localStorage.getItem('rk_user');
          if (savedUser) {
            try {
              const parsed = JSON.parse(savedUser);
              email = parsed.email;
            } catch (e) {
              console.error("Failed to parse rk_user from localStorage", e);
            }
          }
        }

        setUserEmail(email || null);

        if (!email) {
          setLoading(false);
          return;
        }

        // Fetch their actual bookings from our backend
        const res = await fetch(`http://localhost:5000/get-bookings/${encodeURIComponent(email)}`);
        const data = await res.json();
        setBookingsList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load bookings:", err);
        setBookingsList([]);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const handleEndRide = (booking: any) => {
    setVerifyingBooking(booking);
  };

  const handleVerificationComplete = async (images: string[], damageData?: any) => {
    const targetBooking = verifyingBooking;
    
    // 1. Update UI locally
    setBookingsList((prev) =>
      prev.map((b) =>
        b.id === targetBooking.id
          ? { ...b, status: "Completed", statusDot: "#3f3f46", ctaLabel: "Invoice", ctaPrimary: false }
          : b
      )
    );
    setVerifyingBooking(null);

    // 2. Persist to Database
    try {
      console.log("📨 Finalizing booking in database...");
      await fetch("http://localhost:5000/end-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: targetBooking.id,
          vehicle_id: targetBooking.vehicle_id
        })
      });

      console.log("📨 Generating invoice PDF for email...");
      // We need the updated booking object (marked as Completed) for the PDF
      const completedBooking = { ...targetBooking, status: "Completed" };
      const pdfBase64 = getInvoiceBase64(completedBooking, userEmail);
      
      console.log("📨 Sending invoice email to:", userEmail);
      const res = await fetch("http://localhost:5000/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
          booking_id: targetBooking.id,
          car_name: targetBooking.car,
          pdf_base64: pdfBase64
        })
      });
      
      const result = await res.json();
      if (result.success) {
        console.log("✅ Invoice sent successfully to", userEmail);
      } else {
        console.error("❌ Failed to send invoice email:", result.message);
      }
    } catch (err) {
      console.error("❌ Error in post-verification flow:", err);
    }
  };

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
        <div style={{ position: "relative", width: "240px" }}>
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button style={{ padding: "8px 16px", borderRadius: "9999px", fontSize: "0.8125rem", fontWeight: 500, color: "#71717a", background: "none", border: "none", cursor: "pointer" }}>
            Concierge
          </button>
          {["notifications", "account_circle"].map((icon) => (
            <button
              key={icon}
              style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#71717a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
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
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              My Bookings
            </h1>
            <p style={{ color: "#52525b", fontSize: "0.9375rem" }}>
              {userEmail ? `Showing bookings for ${userEmail}` : "Manage reservations, review past journeys, track upcoming experiences."}
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: "4px", background: "#0e0e10", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "4px", width: "fit-content", marginBottom: "36px" }}>
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ padding: "8px 20px", borderRadius: "8px", fontSize: "0.875rem", fontWeight: active ? 600 : 400, cursor: "pointer", border: "none", background: active ? "#ffffff" : "transparent", color: active ? "#000000" : "#52525b", transition: "all 0.2s ease" }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Booking Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Loading state */}
            {loading && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#ffffff", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                <p style={{ color: "#52525b", fontSize: "0.875rem" }}>Loading your bookings...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {/* Not logged in */}
            {!loading && !userEmail && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#3f3f46", marginBottom: "16px", display: "block" }}>lock</span>
                <h3 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>Please Sign In</h3>
                <p style={{ color: "#52525b", fontSize: "0.875rem" }}>You need to be logged in to view your bookings.</p>
                <a href="/login" style={{ display: "inline-block", marginTop: "24px", background: "#ffffff", color: "#000000", padding: "10px 24px", borderRadius: "9999px", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
                  Go to Login
                </a>
              </div>
            )}

            {/* Empty state */}
            {!loading && userEmail && bookingsList.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#3f3f46", marginBottom: "16px", display: "block" }}>directions_car</span>
                <h3 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>No Bookings Yet</h3>
                <p style={{ color: "#52525b", fontSize: "0.875rem" }}>You haven't booked any vehicles. Browse the fleet to get started.</p>
                <a href="/vehicles" style={{ display: "inline-block", marginTop: "24px", background: "#ffffff", color: "#000000", padding: "10px 24px", borderRadius: "9999px", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
                  Browse Fleet
                </a>
              </div>
            )}

            {/* Live Booking Cards */}
            {!loading && bookingsList.map((b) => {
              const isCompleted = b.status === "Completed";
              return (
                <div
                  key={b.id}
                  style={{ background: "#0e0e10", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden", display: "flex", opacity: isCompleted ? 0.65 : 1, transition: "opacity 0.3s ease" }}
                >
                  {/* ── Car thumbnail ── */}
                  <div style={{ width: "220px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                    <img src={b.img} alt={b.car} style={{ width: "100%", height: "100%", objectFit: "cover", filter: isCompleted ? "grayscale(80%)" : "none" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #0e0e10 100%)" }} />
                  </div>

                  {/* ── Main info ── */}
                  <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                    {/* Top row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                      <div>
                        {/* Status pill */}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: "10px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: b.statusDot, boxShadow: b.status === "In Progress" ? `0 0 6px ${b.statusDot}` : "none" }} />
                          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#a1a1aa", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{b.status}</span>
                        </div>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.375rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em", marginBottom: "4px" }}>{b.car}</h2>
                        <p style={{ color: "#52525b", fontSize: "0.8125rem" }}>{b.detail}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "0.6875rem", color: "#3f3f46", fontFamily: "monospace", letterSpacing: "0.08em" }}>#{String(b.id).slice(0, 8)}</span>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" as const, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "20px" }}>
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

                    {/* Bottom row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "0.6875rem", color: "#52525b", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "4px" }}>Total/day</p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>{b.amount}</p>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {!isCompleted && (
                          <button
                            onClick={() => b.status === "In Progress" && handleEndRide(b)}
                            style={{ padding: "9px 20px", borderRadius: "9999px", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", border: "none", background: b.ctaPrimary ? "#ffffff" : "rgba(255,255,255,0.07)", color: b.ctaPrimary ? "#000000" : "#a1a1aa", transition: "all 0.2s ease" }}
                          >
                            {b.status === "In Progress" ? "End Ride" : b.ctaLabel}
                          </button>
                        )}
                        {isCompleted && (
                          <button 
                            onClick={() => generateInvoicePDF(b, userEmail)}
                            style={{ padding: "9px 20px", borderRadius: "9999px", fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#e5e1e4", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s ease" }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>receipt_long</span>
                            Invoice
                          </button>
                        )}
                        <button style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#52525b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
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

      {/* AI Verification Modal */}
      {verifyingBooking && (
        <ConditionVerificationModal
          bookingId={verifyingBooking.id}
          vehicleName={verifyingBooking.car}
          phase="return"
          existingPickupImages={[MOCK_PICKUP_IMAGE]}
          onComplete={handleVerificationComplete}
          onClose={() => setVerifyingBooking(null)}
        />
      )}
    </div>
  );
}
