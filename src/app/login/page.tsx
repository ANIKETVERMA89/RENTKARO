"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { API_BASE_URL } from "@/lib/api";

const supabase = createClient(
  "https://hdujjdioyxnrtbgxiqeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw"
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true"
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // 1. Sync Supabase Session
        if (result.session) {
          await supabase.auth.setSession(result.session);
        }
        
        // 2. Sync Custom App Store (localStorage)
        if (result.user) {
          const userRole = result.user.user_metadata?.role || 'renter';
          localStorage.setItem('rk_user', JSON.stringify({
            id: result.user.id,
            email: result.user.email,
            name: result.user.user_metadata?.full_name || result.user.email?.split('@')[0] || "User",
            role: userRole
          }));

          // Redirect based on role
          if (userRole === 'provider') {
            router.push("/vendor");
          } else {
            router.push("/dashboard/bookings");
          }
        }
      } else {
        setErrorMessage(result.message || "Invalid email or password.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Network error occurred.");
      setStatus("error");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: "#131315", minHeight: "100vh", color: "#e5e1e4" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm62WF198EP3mBKRC4rkYCk4KxgpWKbHLWuFSNlQdzXvBX8lBvfnQgQMyBHNRV-dbnlA9BD7yH89NoaAcX19v8us93TAc6amzIF-CVpmZruhD25nok4-gRP1FaWiHmaKT0jsxrR2mS1R8GCUL4cgX-CGjSAOM08RA1p8cTz-NaCLjXxyIAAIkZ3V1EJ4otefCH_ZIB2Ldqku3TSsUTZHEA-Lkjr1FZqx0QzrCN9UeOA3FHGlv5Ss0EJLZoUkWbikYnYVPmktZByXOM"
          alt="Luxury car interior"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #131315 0%, rgba(19,19,21,0.8) 50%, transparent 100%)" }}
        />
      </div>

      {/* Form */}
      <main className="relative z-10 w-full flex flex-col items-center" style={{ maxWidth: "448px", padding: "0 24px" }}>
        {/* Brand */}
        <div className="text-center mb-10" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.25rem, 5vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            RentKaro
          </h1>
          <p style={{ color: "#c6c6cb", fontWeight: 500, letterSpacing: "0.05em" }}>
            Enter the ethereal fleet.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            background: "rgba(14,14,16,0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(71,71,71,0.2)",
            borderRadius: "0.75rem",
            padding: "40px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          }}
        >
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                htmlFor="email"
                style={{ fontSize: "0.75rem", color: "#c6c6cb", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "4px" }}
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <span
                  className="material-symbols-outlined"
                  style={{ position: "absolute", left: "16px", color: "#919191", fontSize: "20px" }}
                >
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    background: "rgba(14,14,16,0.5)",
                    border: "1px solid rgba(71,71,71,0.2)",
                    borderRadius: "0.5rem",
                    padding: "14px 16px 14px 48px",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div className="flex justify-between items-end" style={{ marginBottom: "4px" }}>
                <label
                  htmlFor="password"
                  style={{ fontSize: "0.75rem", color: "#c6c6cb", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "4px" }}
                >
                  Password
                </label>
                <a href="#" style={{ fontSize: "0.75rem", color: "#c6c6cb", textDecoration: "none" }}>Forgot?</a>
              </div>
              <div className="relative flex items-center">
                <span
                  className="material-symbols-outlined"
                  style={{ position: "absolute", left: "16px", color: "#919191", fontSize: "20px" }}
                >
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    background: "rgba(14,14,16,0.5)",
                    border: "1px solid rgba(71,71,71,0.2)",
                    borderRadius: "0.5rem",
                    padding: "14px 16px 14px 48px",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                  }}
                />
              </div>
            </div>

            {status === "error" && (
              <div style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px" }}>
                {errorMessage}
                {errorMessage.includes("Email not confirmed") && (
                  <div style={{ marginTop: "8px" }}>
                    <Link href={`/verify?email=${encodeURIComponent(email)}`} style={{ color: "#ffffff", textDecoration: "underline" }}>
                      Resend Verification Email
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                display: "block",
                width: "100%",
                marginTop: "16px",
                padding: "16px",
                background: status === "loading" ? "#52525b" : "#39393b",
                color: "#ffffff",
                fontWeight: 500,
                borderRadius: "9999px",
                border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                textAlign: "center",
                transition: "background 0.3s ease",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            >
              {status === "loading" ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Social */}
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <span style={{ fontSize: "0.75rem", color: "#919191", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Or continue with
            </span>
            <div className="flex w-full gap-4">
              {["Google", "Apple"].map((provider) => (
                <button
                  key={provider}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(71,71,71,0.2)",
                    borderRadius: "9999px",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p style={{ marginTop: "40px", fontSize: "0.875rem", color: "#c6c6cb" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#ffffff", fontWeight: 500, textDecoration: "none" }}>
            Sign Up
          </Link>
        </p>
      </main>
    </div>
  );
}
