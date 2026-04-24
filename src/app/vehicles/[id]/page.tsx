import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import Link from "next/link";

const specs = [
  { icon: "speed", value: "3.5s", label: "0-60 mph" },
  { icon: "local_gas_station", value: "443", label: "Horsepower" },
  { icon: "settings_input_component", value: "PDK", label: "Transmission" },
  { icon: "airline_seat_recline_normal", value: "2+2", label: "Seating" },
];

export default function VehicleDetailPage() {
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_NafghYh1aUu79XrwBjH6wTOcrIv2XP_y1QROwpM2D-47cXFLpE_qRQOW9ysBLD6CH7Qxb1dFy8ZGvrIj52-JNuvl6bYPJeXZQdaSI218geHySoovIYS9Sd0Q7zmZDDw7fp8TZDjdO6_jJAs-IOPUtDwC06rhyV5OK3hX4iM36KW5iUrQGkhaAy3ehGwv_OwRORaXaVKujxvaolBulB6JWJW1A-K-y387I-6Q1X3VDGugtRHRjdTf_Ojrg3t3IsA_GAyxywp1TSkL"
            alt="Porsche 911 Carrera S"
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
            Porsche 911 Carrera S
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
            The quintessential sports car, refined for the modern era.
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
              Driving the 911 Carrera S is a masterclass in balance and precision. The twin-turbo flat-six engine
              delivers relentless power, while the perfectly tuned chassis ensures it feels planted on every corner.
              It&apos;s a vehicle that communicates clearly with the driver, offering a visceral connection to the road
              without sacrificing touring comfort.
            </p>
            <p style={{ color: "#c6c6cb", lineHeight: "1.8", fontSize: "1.0625rem" }}>
              Inside, the cabin is a blend of analog heritage and digital modernity. The driving position is flawless,
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
                  $850
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

            {/* Price breakdown */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "32px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                { label: "$850 x 2 days", value: "$1,700" },
                { label: "Concierge Fee", value: "$150" },
                { label: "Insurance (Premium)", value: "$200" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between" style={{ color: "#c6c6cb" }}>
                  <span>{item.label}</span>
                  <span style={{ color: "#ffffff" }}>{item.value}</span>
                </div>
              ))}
              <div
                className="flex justify-between"
                style={{
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span style={{ color: "#ffffff" }}>Total</span>
                <span style={{ color: "#ffffff" }}>$2,050</span>
              </div>
            </div>

            <Link
              href="/login"
              style={{
                display: "block",
                width: "100%",
                padding: "16px",
                borderRadius: "0.75rem",
                background: "#39393b",
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textAlign: "center",
                textDecoration: "none",
                transition: "filter 0.3s ease",
              }}
            >
              Reserve Now
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
