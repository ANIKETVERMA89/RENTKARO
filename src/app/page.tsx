"use client";

import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import Link from "next/link";

const featuredCars = [
  {
    name: "Lamborghini Huracán",
    model: "EVO Spyder",
    price: "$1,400",
    hp: "640 HP",
    time: "2.9s 0-60",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHdsnhUnDzOm3u8-MVwn04n27QHi1ITKRumjvl8KxjnwCxpAc4RJwjwTNidHSRAvYh7Fogk5JHqltgw0GgIqoGAOqwV9zl8xsAj3fZ2d7Rs5GMl1hAN9vZqFIHLNBS9G3F9GLrzwU1pujA5MtPf-xQYPomIcnuVZccG8sfDZcVhrZBV8_21VKHV3qv2T_OtxpOnblL7UyJo-k0y4j46ZhrLw0mprVlcQ4Afk4qaaWBIH6WdmTwI-84tQYIQ7S142bqpvjF7oQWweWz",
    alt: "Lamborghini Huracán",
    icon1: "speed",
    icon2: "timer",
  },
  {
    name: "Porsche 911",
    model: "GT3 RS",
    price: "$1,800",
    hp: "518 HP",
    time: "3.0s 0-60",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrp63Ll7q9_ko7tu0xJyrgC7Uyi9W2dLGZyJ9cCdk6KrSjyYWIZVSGV-f5CX08H9qhUT3C-Y32sS0Z4v00vK44z67ZrxYrqVfHEjHI6J-mWP6kvNxdD9HHATO_zQtjRPbXJ1ccIUvyrzhl2BrL_c02OWG_ml3TiXUzWbsBBm358GlF4hKkUNw-H_5DJsGyBp0MvTe3RGFU6b6g6mkTOmO2dGvDrvkdHvJ_9FfDnQgm3zKB4pqKnbTxiljQ8az5a92XshYWrPm_Vgza",
    alt: "Porsche 911 GT3",
    icon1: "speed",
    icon2: "timer",
  },
  {
    name: "Rolls Royce",
    model: "Phantom Series II",
    price: "$2,200",
    hp: "Chauffeur",
    time: "V12 Luxury",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYUyXjwuZ5Xi_UhUvcHjegN0gaYBdKVUrU5FjDWJMPDp32EV7iPd2TZGXDtXExwEbVPXksmLFiBwmczT-3h3kpE4avL1ZRch0Y0_OQ6gNapcuHbhVU_o64AynZeaZzAgDRcdBHuEHeL34kFVNHNlDPc63fKIkHYwaqLCibHCDZsNvShKdcnJ45McRcYoNFOMFJA0PnutvCt2STR_NNZwVJQMgap5-5M3t43jgYjEZCDuIB1_edLO9w7_ndUrBCF-oK25mq5tH1LVWt",
    alt: "Rolls Royce Phantom",
    icon1: "chair",
    icon2: "diamond",
  },
];

const stats = [
  { value: "150+", label: "Exotic Vehicles" },
  { value: "12", label: "Global Cities" },
  { value: "24/7", label: "Concierge" },
  { value: "0", label: "Compromise" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#131315", color: "#e5e1e4", minHeight: "100vh" }}>
      <TopNav />

      <main>
        {/* ── Hero Section ── */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "100vh", paddingTop: "80px" }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmjrWNPS8fK8-A6kjfmwCfnxiEtmP0F6DDCfQsLC35zu3rWRAqljkDSCDSQq6BPBD7IIDipsViPV7jv9grpF01jtYCaFu2AR2AINiricpY7utLEee5Ve-jFp9HSnJL2cXntxxoFaNbgeVqzhB3n_r60e7iNtHKSLj2DKxRUygMYFE8oPEPYKYIvM7J2K0bgk8_lo6WZF9Ng4egZ3dKcTKxyOuDpyaeEavE4ysfEUCZNvvjQkMVicLSVGPbMzlhv4NmX5ikdXYF2Dni"
              alt="Luxury vehicle at night"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.6,
                mixBlendMode: "luminosity",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #131315 0%, rgba(19,19,21,0.5) 50%, transparent 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div
            className="relative z-10 w-full flex flex-col items-center text-center"
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", marginTop: "80px" }}
          >
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(4rem, 12vw, 10rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "24px",
                textShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              Elite Motion.
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                color: "#c6c6cb",
                maxWidth: "42rem",
                fontWeight: 300,
                marginBottom: "64px",
              }}
            >
              Curated access to the world&apos;s most definitive automotive masterpieces.
            </p>

            {/* Booking panel */}
            <div
              className="w-full"
              style={{
                maxWidth: "56rem",
                background: "rgba(14,14,16,0.8)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "0.75rem",
                padding: "24px",
                border: "1px solid rgba(71,71,71,0.2)",
                boxShadow: "0px 24px 48px rgba(0,0,0,0.4)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {[
                  { label: "Location", placeholder: "Select City", icon: "location_on" },
                  { label: "Pickup", placeholder: "Date & Time", icon: "calendar_today" },
                  { label: "Return", placeholder: "Date & Time", icon: "calendar_today" },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-2 text-left">
                    <label style={{ fontSize: "0.875rem", color: "#c6c6cb", fontWeight: 500, paddingLeft: "4px" }}>
                      {field.label}
                    </label>
                    <div className="relative">
                      <span
                        className="material-symbols-outlined"
                        style={{
                          position: "absolute",
                          left: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#c6c6cb",
                          fontSize: "20px",
                        }}
                      >
                        {field.icon}
                      </span>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        style={{
                          width: "100%",
                          background: "#1b1b1d",
                          color: "#e5e1e4",
                          borderRadius: "0.5rem",
                          paddingLeft: "48px",
                          paddingRight: "16px",
                          paddingTop: "12px",
                          paddingBottom: "12px",
                          border: "1px solid rgba(71,71,71,0.2)",
                          fontSize: "0.875rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Link
                  href="/vehicles"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "50px",
                    background: "#ffffff",
                    color: "#000000",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <span>Search Fleet</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section
          className="py-20"
          style={{
            borderTop: "1px solid rgba(71,71,71,0.1)",
            borderBottom: "1px solid rgba(71,71,71,0.1)",
            background: "rgba(14,14,16,0.5)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" style={{ divideColor: "rgba(71,71,71,0.1)" }}>
              {stats.map((stat, i) => (
                <div key={i} className="px-4">
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#c6c6cb",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Fleet ── */}
        <section className="py-32" style={{ background: "#131315" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Section Header */}
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "16px",
                  }}
                >
                  Featured Fleet
                </h2>
                <p style={{ color: "#c6c6cb", fontSize: "1.125rem", maxWidth: "36rem" }}>
                  A meticulously curated selection of engineering marvels ready for your command.
                </p>
              </div>
              <Link
                href="/vehicles"
                className="hidden md:flex items-center gap-2"
                style={{ color: "#ffffff", textDecoration: "none", fontWeight: 500 }}
              >
                <span>View Full Fleet</span>
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>east</span>
              </Link>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <div
                  key={car.name}
                  className="group relative rounded-xl overflow-hidden"
                  style={{
                    background: "#0e0e10",
                    border: "1px solid rgba(71,71,71,0.1)",
                    transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                  }}
                >
                  {/* Car image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background: "linear-gradient(to top, #0e0e10, transparent)",
                      }}
                    />
                    <img
                      src={car.img}
                      alt={car.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(100%)",
                        transition: "filter 0.7s ease, transform 0.7s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)";
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)";
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div className="p-8 relative z-20" style={{ marginTop: "-64px" }}>
                    <div
                      style={{
                        background: "rgba(27,27,29,0.8)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        borderRadius: "0.5rem",
                        padding: "24px",
                        border: "1px solid rgba(71,71,71,0.2)",
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: "#ffffff",
                            }}
                          >
                            {car.name}
                          </h3>
                          <p style={{ color: "#c6c6cb", fontSize: "0.875rem" }}>{car.model}</p>
                        </div>
                        <div className="text-right">
                          <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#ffffff" }}>{car.price}</div>
                          <div style={{ fontSize: "0.75rem", color: "#c6c6cb" }}>/ day</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-6" style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{car.icon1}</span>
                          <span>{car.hp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{car.icon2}</span>
                          <span>{car.time}</span>
                        </div>
                      </div>

                      <Link
                        href="/vehicles"
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "12px",
                          borderRadius: "0.25rem",
                          background: "rgba(255,255,255,0.05)",
                          color: "#ffffff",
                          fontWeight: 500,
                          border: "1px solid rgba(71,71,71,0.2)",
                          textAlign: "center",
                          textDecoration: "none",
                          transition: "background 0.3s ease",
                        }}
                      >
                        Reserve
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
