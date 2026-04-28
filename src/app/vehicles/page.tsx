"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

const CATEGORIES = ["All", "Supercar", "Luxury Sedan", "SUV", "Electric"];
const MARQUES = ["All Marques", "Porsche", "Lamborghini", "Ferrari", "Rolls Royce", "Bentley"];

function FilterSection({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: "2px" }}>
      <p
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#52525b",
          marginBottom: "12px",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default function BrowseVehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMarque, setSelectedMarque] = useState("All Marques");

  useEffect(() => {
    fetch(`${API_BASE_URL}/get-vehicles`)
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
        setLoading(false);
      });
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    const categoryMatch = selectedCategory === "All" || (v.category && v.category.includes(selectedCategory));
    const marqueMatch = selectedMarque === "All Marques" || (v.brand && v.brand.toLowerCase() === selectedMarque.toLowerCase());
    return categoryMatch && marqueMatch;
  });

  return (
    <div style={{ background: "#0c0c0e", color: "#e5e1e4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav />

      <main
        style={{
          flexGrow: 1,
          paddingTop: "112px",
          paddingBottom: "96px",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          padding: "112px 48px 96px",
        }}
      >
        <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

          {/* ── Sidebar Panel ── */}
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              position: "sticky",
              top: "96px",
            }}
          >
            {/* Panel container */}
            <div
              style={{
                background: "#0e0e10",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              {/* Search */}
              <div style={{ position: "relative" }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#52525b",
                    fontSize: "18px",
                    pointerEvents: "none",
                  }}
                >
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search fleet..."
                  style={{
                    width: "100%",
                    background: "#131315",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "10px 14px 10px 42px",
                    color: "#e5e1e4",
                    fontSize: "0.875rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

              {/* Category filter */}
              <div>
                <FilterSection title="Category" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CATEGORIES.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "9999px",
                          fontSize: "0.8125rem",
                          fontWeight: active ? 600 : 400,
                          cursor: "pointer",
                          border: "none",
                          background: active ? "#ffffff" : "rgba(255,255,255,0.05)",
                          color: active ? "#000000" : "#8e8e93",
                          transition: "all 0.2s ease",
                          letterSpacing: active ? "0" : "0.01em",
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

              {/* Daily Rate */}
              <div>
                <FilterSection title="Daily Rate" />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8125rem",
                    color: "#ffffff",
                    fontWeight: 500,
                    marginBottom: "16px",
                  }}
                >
                  <span>₹500</span>
                  <span>₹5,000+</span>
                </div>
                {/* Track */}
                <div style={{ position: "relative", height: "3px", background: "#27272a", borderRadius: "2px" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "20%",
                      right: "20%",
                      height: "100%",
                      background: "#ffffff",
                      borderRadius: "2px",
                    }}
                  />
                  {/* Thumb left */}
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "#ffffff",
                      borderRadius: "50%",
                      border: "3px solid #0c0c0e",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.3)",
                      position: "absolute",
                      top: "50%",
                      left: "20%",
                      transform: "translate(-50%, -50%)",
                      cursor: "grab",
                    }}
                  />
                  {/* Thumb right */}
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "#ffffff",
                      borderRadius: "50%",
                      border: "3px solid #0c0c0e",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.3)",
                      position: "absolute",
                      top: "50%",
                      right: "20%",
                      transform: "translate(50%, -50%)",
                      cursor: "grab",
                    }}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

              {/* Marque */}
              <div>
                <FilterSection title="Marque" />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {MARQUES.map((brand) => {
                    const active = selectedMarque === brand;
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedMarque(brand)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: active ? 600 : 400,
                          cursor: "pointer",
                          border: "none",
                          background: active ? "rgba(255,255,255,0.08)" : "transparent",
                          color: active ? "#ffffff" : "#71717a",
                          textAlign: "left",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span>{brand}</span>
                        {active && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#ffffff",
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset filters */}
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  color: "#52525b",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.04em",
                }}
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* ── Vehicle Grid ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "32px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    marginBottom: "6px",
                  }}
                >
                  The Fleet
                </h1>
                <p style={{ color: "#52525b", fontSize: "0.875rem" }}>24 curated vehicles</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}>
                <span style={{ color: "#52525b" }}>Sort:</span>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#ffffff",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  <span>Relevance</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>expand_more</span>
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredVehicles.map((v) => (
                <Link
                  key={v.id}
                  href={`/vehicles/${v.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "#0e0e10",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "border-color 0.3s ease, transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <img
                        src={v.image_url || v.img}
                        alt={v.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s ease",
                        }}
                      />
                      {/* Gradient overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(14,14,16,0.8) 0%, transparent 60%)",
                        }}
                      />
                      {/* Price badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(8px)",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ffffff" }}>
                          ₹{v.daily_rate || v.price}<span style={{ color: "#71717a", fontWeight: 400 }}>/day</span>
                        </span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div style={{ padding: "20px" }}>
                      <div style={{ marginBottom: "16px" }}>
                        <h3
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            marginBottom: "4px",
                          }}
                        >
                          {v.name}
                        </h3>
                        <p style={{ color: "#52525b", fontSize: "0.8125rem" }}>{v.category || v.vehicle_type}</p>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "12px",
                          marginBottom: "20px",
                          padding: "12px",
                          background: "#131315",
                          borderRadius: "10px",
                        }}
                      >
                        <div>
                          <span style={{ color: "#52525b", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>Power</span>
                          <span style={{ color: "#e5e1e4", fontSize: "0.9375rem", fontWeight: 600 }}>{v.power || "400 HP"}</span>
                        </div>
                        <div>
                          <span style={{ color: "#52525b", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>0-60 mph</span>
                          <span style={{ color: "#e5e1e4", fontSize: "0.9375rem", fontWeight: 600 }}>{v.time || "4.2s"}</span>
                        </div>
                      </div>

                      <button
                        style={{
                          width: "100%",
                          padding: "11px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          color: "#ffffff",
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
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
            <div style={{ marginTop: "64px", textAlign: "center" }}>
              <button
                style={{
                  padding: "12px 40px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "9999px",
                  color: "#71717a",
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
