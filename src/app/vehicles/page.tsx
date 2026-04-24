"use client";

import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import Link from "next/link";

const vehicles = [
  {
    id: "porsche-911-gt3",
    name: "Porsche 911 GT3",
    category: "Supercar • 2 Seats",
    price: "$1,200",
    power: "502 HP",
    time: "3.2s",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDam5XrjrnIdIHxbcMtUaTjVot11N9BoP_x2NEtne4IfkTOa0DdWF2Er_lJdUuuYpXQqZKFjY4J-nskzoPyTVhmVKNHo-YARr3c2Ax8MRT8NmFvTXLCtDAXYJA4qOX7mStvdaNIQWi3ugBaqjXalz7IVntdqVSnQDOF7L3EKZL7ZGmmk6f3Gl1maQIp0pAcNxbLINhIKZ1S0BpJ_c8pi0HTVdLgz-6CVXMlBbHkNMkIDoWKaPjzhW_2O9GDPwcHE3T2rtAlhzAJS1GI",
    alt: "Porsche 911 GT3",
  },
  {
    id: "lamborghini-huracan",
    name: "Lamborghini Huracán",
    category: "Supercar • 2 Seats",
    price: "$1,800",
    power: "631 HP",
    time: "2.9s",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCekgUYwRwQ6ySg9nlLDkiWjuuq9iTeo-w3dyLW5a_gTaF9aJ9jaajA0_bW9CwC1jqxSsVW0QyICBUvfxyjveDWU0xl8g8hbATuoknWqBzxK9vBKO6C1dkH6bpuNKlCs_sLNnUOqaskMiYcdaYu-BPsAJhyXXyPtKFkLAdIM1dOaa_KmvXUCmXHLadzMRxHblfxKvGCJyjTw-Av8-gK5reLyZrCnRSIqgurPaxbixfZKKilYQRVmZ8q73eLCXMiPLGA0c5ZjAKJNJch",
    alt: "Lamborghini Huracán",
  },
  {
    id: "mercedes-g63",
    name: "Mercedes-AMG G 63",
    category: "Luxury SUV • 5 Seats",
    price: "$900",
    power: "577 HP",
    time: "4.5s",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEHesC5jd2NXJBtyaf9YdfMUEKVjCs-7SB4_pFsVT_JYKqVrplL_rPLmt1AS4TomUNHS0v16hMSZz4OlteMipHR21Qi2AayX27dKxbKtyOBxH8igvp65TLe53Cu_cHNDA8hi60gGUuiuxzvoH3gKBfMIO0vEjg117rpW_WVj0QqPp5Dr_E5eMDFZzrRMQlRqfaxphz0t45hom6ot6F17Ataiph45EnnuzYF7IIfMegSc1Swj_Zd6xzEZEIgT90Nj2SQSCEM0vql4R_",
    alt: "Mercedes G63 AMG",
  },
];

export default function BrowseVehiclesPage() {
  return (
    <div style={{ background: "#131315", color: "#e5e1e4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav />

      <main
        style={{
          flexGrow: 1,
          paddingTop: "128px",
          paddingBottom: "96px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        <div className="flex flex-col md:flex-row gap-12">
          {/* ── Sidebar Filters ── */}
          <aside className="w-full md:w-64 shrink-0 space-y-10">
            {/* Search */}
            <div className="relative">
              <span
                className="material-symbols-outlined"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#919191",
                  fontSize: "20px",
                }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search fleet..."
                style={{
                  width: "100%",
                  background: "rgba(27,27,29,0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(71,71,71,0.2)",
                  borderRadius: "0.75rem",
                  padding: "12px 16px 12px 48px",
                  color: "#e5e1e4",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#c6c6cb", fontWeight: 500 }}>Categories</h3>
              {["Supercar", "Luxury Sedan", "SUV"].map((cat, i) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: i === 0 ? "none" : "1px solid rgba(71,71,71,0.5)",
                      background: i === 0 ? "#39393b" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i === 0 && (
                      <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#ffffff" }}>check</span>
                    )}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: i === 0 ? "#e5e1e4" : "#c6c6cb" }}>{cat}</span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#c6c6cb", fontWeight: 500 }}>Daily Rate</h3>
              <div className="flex justify-between" style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>
                <span>$500</span>
                <span>$5000+</span>
              </div>
              <div className="relative" style={{ height: "4px", background: "#2a2a2c", borderRadius: "2px" }}>
                <div style={{ position: "absolute", left: "25%", right: "25%", height: "100%", background: "#ffffff", borderRadius: "2px" }} />
                <div style={{ width: "16px", height: "16px", background: "#ffffff", borderRadius: "50%", position: "absolute", top: "50%", left: "25%", transform: "translate(-50%, -50%)", boxShadow: "0 2px 8px rgba(0,0,0,0.4)", cursor: "pointer" }} />
                <div style={{ width: "16px", height: "16px", background: "#ffffff", borderRadius: "50%", position: "absolute", top: "50%", right: "25%", transform: "translate(50%, -50%)", boxShadow: "0 2px 8px rgba(0,0,0,0.4)", cursor: "pointer" }} />
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-4">
              <h3 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#c6c6cb", fontWeight: 500 }}>Marque</h3>
              {["Porsche", "Lamborghini", "Ferrari"].map((brand, i) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: i === 0 ? "none" : "1px solid rgba(71,71,71,0.5)",
                      background: i === 0 ? "#39393b" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i === 0 && (
                      <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#ffffff" }}>check</span>
                    )}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: i === 0 ? "#e5e1e4" : "#c6c6cb" }}>{brand}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* ── Vehicle Grid ── */}
          <div className="flex-grow">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  The Fleet
                </h1>
                <p style={{ color: "#c6c6cb", fontSize: "0.875rem" }}>Showing 24 curated vehicles</p>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: "0.875rem" }}>
                <span style={{ color: "#c6c6cb" }}>Sort by:</span>
                <button
                  className="flex items-center gap-1"
                  style={{ color: "#ffffff", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span>Relevance</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>keyboard_arrow_down</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <Link
                  key={v.id}
                  href={`/vehicles/${v.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="group relative rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(14,14,16,0.4)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(71,71,71,0.1)",
                      transition: "background 0.5s ease, border-color 0.5s ease",
                      cursor: "pointer",
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={v.img}
                        alt={v.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: 0.9,
                          transition: "transform 0.7s ease, opacity 0.3s ease",
                        }}
                      />
                      {/* Price badge */}
                      <div
                        className="absolute top-4 right-4"
                        style={{
                          background: "rgba(14,14,16,0.8)",
                          backdropFilter: "blur(12px)",
                          padding: "4px 12px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ffffff", letterSpacing: "0.05em" }}>
                          {v.price} <span style={{ color: "#c6c6cb", fontWeight: 400 }}>/ day</span>
                        </span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div style={{ padding: "24px" }}>
                      <div className="mb-4">
                        <h3
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            color: "#ffffff",
                            marginBottom: "4px",
                          }}
                        >
                          {v.name}
                        </h3>
                        <p style={{ color: "#c6c6cb", fontSize: "0.875rem" }}>{v.category}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6" style={{ fontSize: "0.875rem", color: "#e5e1e4" }}>
                        <div>
                          <span style={{ color: "#919191", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>Power</span>
                          <span>{v.power}</span>
                        </div>
                        <div>
                          <span style={{ color: "#919191", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>0-60 MPH</span>
                          <span>{v.time}</span>
                        </div>
                      </div>

                      <button
                        style={{
                          width: "100%",
                          padding: "12px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(71,71,71,0.2)",
                          borderRadius: "0.5rem",
                          color: "#ffffff",
                          fontWeight: 500,
                          transition: "background 0.3s ease, border-color 0.3s ease",
                          cursor: "pointer",
                        }}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load more */}
            <div className="mt-16 text-center">
              <button
                style={{
                  padding: "12px 32px",
                  background: "transparent",
                  border: "1px solid rgba(71,71,71,0.3)",
                  borderRadius: "9999px",
                  color: "#ffffff",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
