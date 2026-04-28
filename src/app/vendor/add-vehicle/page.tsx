"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SideNav } from "@/components/ui/side-nav";

import { API_BASE_URL } from "@/lib/api";

const vendorNav = [
  { icon: "dashboard", label: "Dashboard", href: "/vendor" },
  { icon: "directions_car", label: "Fleet Status", href: "/vendor/fleet" },
  { icon: "calendar_today", label: "Bookings", href: "/vendor/bookings", badge: 3 },
  { icon: "analytics", label: "Analytics", href: "/vendor/analytics" },
  { icon: "payments", label: "Revenue", href: "/vendor/revenue" },
];

export default function AddVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    type: "car",
    subType: "Standard",
    price: "",
    hourlyPrice: "",
    location: "Delhi, India",
    image: "",
    specs: {
      year: "2024",
      fuel: "Petrol",
      transmission: "Automatic",
      seats: "5",
      mileage: "15 kmpl",
      km: "0",
    },
    features: ["GPS", "Bluetooth", "Air Conditioning"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("spec_")) {
      const specName = name.split("_")[1];
      setFormData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [specName]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("rk_user") || "{}");
      const payload = {
        ...formData,
        providerEmail: user.email,
        owner: { name: user.name },
      };

      const res = await fetch(`${API_BASE_URL}/add-vehicle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        router.push("/vendor");
      } else {
        alert("Error adding vehicle: " + result.message);
      }
    } catch (err) {
      console.error("Failed to add vehicle", err);
      alert("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#131315", color: "#e5e1e4" }}>
      <SideNav items={vendorNav} title="RentKaro" subtitle="Vendor" />

      <main style={{ flex: 1, height: "100%", overflowY: "auto", background: "#131315", marginLeft: "288px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 48px" }}>
          <header style={{ marginBottom: "48px" }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
              Add New Vehicle
            </h1>
            <p style={{ color: "#c6c6cb" }}>List your luxury asset in the ethereal fleet.</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Basic Info */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>Basic Information</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Brand</label>
                  <input name="brand" placeholder="e.g. Porsche" value={formData.brand} onChange={handleChange} required className="noir-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Model Name</label>
                  <input name="name" placeholder="e.g. 911 GT3" value={formData.name} onChange={handleChange} required className="noir-input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Vehicle Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="noir-input">
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Variant/SubType</label>
                  <input name="subType" placeholder="e.g. GT Edition" value={formData.subType} onChange={handleChange} className="noir-input" />
                </div>
              </div>
            </div>

            {/* Pricing & Location */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>Pricing & Location</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Daily Rate (₹)</label>
                  <input name="price" type="number" placeholder="5000" value={formData.price} onChange={handleChange} required className="noir-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Hourly Rate (₹)</label>
                  <input name="hourlyPrice" type="number" placeholder="500" value={formData.hourlyPrice} onChange={handleChange} className="noir-input" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Primary Location</label>
                <input name="location" placeholder="e.g. Delhi, India" value={formData.location} onChange={handleChange} className="noir-input" />
              </div>
            </div>

            {/* Specs */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>Specifications</h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Year</label>
                  <input name="spec_year" type="number" value={formData.specs.year} onChange={handleChange} className="noir-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Fuel Type</label>
                  <select name="spec_fuel" value={formData.specs.fuel} onChange={handleChange} className="noir-input">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Transmission</label>
                  <select name="spec_transmission" value={formData.specs.transmission} onChange={handleChange} className="noir-input">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Seats</label>
                  <input name="spec_seats" type="number" value={formData.specs.seats} onChange={handleChange} className="noir-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Mileage</label>
                  <input name="spec_mileage" value={formData.specs.mileage} onChange={handleChange} className="noir-input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>KM Driven</label>
                  <input name="spec_km" type="number" value={formData.specs.km} onChange={handleChange} className="noir-input" />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>Media</h2>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>Main Image URL</label>
                <input name="image" placeholder="https://..." value={formData.image} onChange={handleChange} required className="noir-input" />
                <p style={{ fontSize: "0.75rem", color: "#919191" }}>Provide a high-quality URL for the vehicle thumbnail.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => router.back()}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.05)",
                  color: "#ffffff",
                  border: "1px solid rgba(71,71,71,0.2)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 2,
                  padding: "16px",
                  borderRadius: "9999px",
                  background: loading ? "#52525b" : "#ffffff",
                  color: "#000000",
                  fontWeight: 600,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 8px 30px rgba(255,255,255,0.12)",
                }}
              >
                {loading ? "Adding Vehicle..." : "Broadcast Vehicle"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        .noir-input {
          width: 100%;
          background: rgba(14,14,16,0.5);
          border: 1px solid rgba(71,71,71,0.2);
          border-radius: 0.75rem;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 0.9375rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .noir-input:focus {
          border-color: rgba(255,255,255,0.4);
          background: rgba(14,14,16,0.8);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
