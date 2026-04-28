"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { API_BASE_URL } from "@/lib/api";

const supabase = createClient(
  "https://hdujjdioyxnrtbgxiqeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw"
);

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "processing" | "success" | "error">("idle");

  useEffect(() => {
    // Get logged-in user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionEmail(session?.user?.email ?? null);
    });

    if (id) {
      fetch(`${API_BASE_URL}/get-vehicle/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setVehicle(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching vehicle:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleReserve = async () => {
    if (!sessionEmail) {
      alert("Please log in to book this vehicle.");
      window.location.href = "/login";
      return;
    }

    setBookingStatus("processing");
    try {
      const response = await fetch(`${API_BASE_URL}/book-vehicle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: sessionEmail,
          vehicle_id: id,
          start_date: "2026-05-01", // Placeholder dates
          end_date: "2026-05-03",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setBookingStatus("success");
      } else {
        setBookingStatus("error");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus("error");
    }
  };

  if (loading) {
    return (
      <div style={{ background: "#131315", color: "#e5e1e4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading masterpiece...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div style={{ background: "#131315", color: "#e5e1e4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Vehicle not found.</p>
      </div>
    );
  }

  const specs = [
    { icon: "speed", value: vehicle.time || "3.5s", label: "0-60 mph" },
    { icon: "local_gas_station", value: vehicle.power || "443", label: "Horsepower" },
    { icon: "settings_input_component", value: vehicle.transmission || "PDK", label: "Transmission" },
    { icon: "airline_seat_recline_normal", value: vehicle.seats || "2+2", label: "Seating" },
  ];

  return (
    <div style={{ background: "#131315", color: "#e5e1e4", minHeight: "100vh" }}>
      <TopNav />

      {/* ── Cinematic Hero ── */}
      <header
        className="relative w-full flex items-end justify-center overflow-hidden"
        style={{ height: "820px" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={vehicle.image_url}
            alt={vehicle.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.8,
              mixBlendMode: "luminosity",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #131315 0%, rgba(19,19,21,0.4) 50%, transparent 100%)" }}
          />
        </div>

        <div
          className="relative z-10 w-full text-center"
          style={{ maxWidth: "1440px", padding: "0 48px 96px" }}
        >
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            {vehicle.name}
          </h1>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              color: "#c6c6cb",
              maxWidth: "42rem",
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            {vehicle.category || vehicle.vehicle_type || "Exotic performance and luxury refined."}
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "64px 24px 64px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "64px",
        }}
        className="lg:grid lg:grid-cols-12"
      >
        {/* Left Column: Details */}
        <div className="lg:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
          {/* Technical Specs */}
          <section>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.5rem",
                color: "#ffffff",
                marginBottom: "48px",
                paddingBottom: "16px",
                borderBottom: "1px solid #2a2a2c",
              }}
            >
              Technical Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-center justify-center text-center group"
                  style={{
                    background: "rgba(14,14,16,0.8)",
                    backdropFilter: "blur(20px)",
                    padding: "32px",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "background 0.5s ease",
                    cursor: "default",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#919191", fontSize: "30px", marginBottom: "16px", transition: "color 0.3s ease" }}
                  >
                    {spec.icon}
                  </span>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.875rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "4px",
                    }}
                  >
                    {spec.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#c6c6cb",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* The Experience */}
          <section>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.5rem",
                color: "#ffffff",
                marginBottom: "32px",
                paddingBottom: "16px",
                borderBottom: "1px solid #2a2a2c",
              }}
            >
              The Experience
            </h2>
            <p style={{ color: "#c6c6cb", lineHeight: "1.8", marginBottom: "24px", fontSize: "1.0625rem" }}>
              Driving the {vehicle.name} is a masterclass in balance and precision. The engineering excellence 
              delivers relentless power, while the perfectly tuned chassis ensures it feels planted on every corner.
              It&apos;s a vehicle that communicates clearly with the driver, offering a visceral connection to the road
              without sacrificing touring comfort.
            </p>
            <p style={{ color: "#c6c6cb", lineHeight: "1.8", fontSize: "1.0625rem" }}>
              Inside, the cabin is a blend of heritage and modernity. The driving position is flawless,
              materials are top-tier, and the focus remains entirely on the art of driving. This is not just a rental;
              it is an event.
            </p>
          </section>
        </div>

        {/* Right Column: Booking Panel */}
        <div className="lg:col-span-4">
          <div
            style={{
              position: "sticky",
              top: "128px",
              background: "rgba(14,14,16,0.9)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "0.75rem",
              padding: "32px",
              boxShadow: "0px 24px 48px rgba(0,0,0,0.4)",
              border: "1px solid rgba(71,71,71,0.2)",
            }}
          >
            {/* Price + Rating */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  ₹{vehicle.daily_rate || vehicle.price}
                </span>
                <span style={{ color: "#c6c6cb", fontSize: "0.875rem", marginLeft: "4px" }}>/ day</span>
              </div>
              <div className="flex items-center gap-1" style={{ color: "#ffffff", fontSize: "0.875rem", fontWeight: 500 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>star</span>
                4.9 (124 reviews)
              </div>
            </div>

            {/* Date pickers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              {[
                { label: "Pick-up", value: "Oct 24, 10:00 AM" },
                { label: "Drop-off", value: "Oct 26, 10:00 AM" },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{ display: "block", color: "#c6c6cb", fontSize: "0.875rem", marginBottom: "8px" }}>
                    {field.label}
                  </label>
                  <div
                    className="flex items-center justify-between"
                    style={{
                      background: "#1b1b1d",
                      border: "1px solid rgba(71,71,71,0.2)",
                      borderRadius: "0.5rem",
                      padding: "16px",
                      cursor: "pointer",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <span style={{ color: "#ffffff" }}>{field.value}</span>
                    <span className="material-symbols-outlined" style={{ color: "#c6c6cb", fontSize: "20px" }}>calendar_today</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Logged-in user email indicator */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", color: "#c6c6cb", fontSize: "0.875rem", marginBottom: "8px" }}>
                Booking As
              </label>
              <div
                style={{
                  width: "100%",
                  background: "#1b1b1d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "0.5rem",
                  padding: "16px",
                  color: sessionEmail ? "#ffffff" : "#71717a",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.875rem",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px", color: sessionEmail ? "#34d399" : "#52525b" }}>
                  {sessionEmail ? "verified_user" : "lock"}
                </span>
                {sessionEmail ?? "Not logged in — please sign in to book"}
              </div>
            </div>

            <button
              onClick={handleReserve}
              disabled={bookingStatus === "processing"}
              style={{
                display: "block",
                width: "100%",
                padding: "16px",
                borderRadius: "0.75rem",
                background: bookingStatus === "success" ? "#10b981" : "#ffffff",
                color: "#000000",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textAlign: "center",
                border: "none",
                cursor: bookingStatus === "processing" ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                opacity: bookingStatus === "processing" ? 0.7 : 1,
              }}
            >
              {bookingStatus === "idle" && "Reserve Now"}
              {bookingStatus === "processing" && "Processing..."}
              {bookingStatus === "success" && "Booking Confirmed!"}
              {bookingStatus === "error" && "Try Again"}
            </button>

            {bookingStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: "#10b981", fontSize: "0.875rem", textAlign: "center", marginTop: "16px" }}
              >
                Confirmation email sent successfully!
              </motion.p>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
