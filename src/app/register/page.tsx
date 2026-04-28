"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formFields = [
  { id: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", icon: "person" },
  { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com", icon: "mail" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••", icon: "lock" },
  { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••", icon: "verified_user" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "renter" as "renter" | "provider",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: formData.role,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Redirect to verify page with email
        router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
      } else {
        setErrorMessage(result.message || "Registration failed.");
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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfE_MmmEeKgv90tMhHSrvPUZSaqyyeML1TaNhEG5hJRaudxCUvDZu21b_eTydPpHKEgobq8PZTlYifo8LNCEqdXtWjWpdTst3pa6EXmdXTfUvKIUjZzw6nAWHFxBuJzE1H2mTWruCsCasXdXio_BUUjq2Yfaqmy93hgYKlqjjjczq7g09cB6gHvluUF7TEnREJJUyv8EPX8u-IGP6-3_uUXbRFRe_LiFu0daBehjkcOHkGe2TB0VCbelMCPHaNtq39hRBah4kJhN9g"
          alt="Luxury car night"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #131315 0%, rgba(19,19,21,0.8) 50%, rgba(19,19,21,0.4) 100%)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(19,19,21,0.5)", backdropFilter: "blur(2px)" }} />
      </div>

      {/* Container */}
      <main
        className="relative z-10 w-full"
        style={{ maxWidth: "440px", padding: "48px 24px" }}
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            RentKaro
          </h1>
          <p style={{ color: "#c6c6cb", fontSize: "0.875rem", letterSpacing: "0.05em" }}>
            The Ethereal Fleet Awaits.
          </p>
        </div>

        {/* Glass Card */}
        <div
          style={{
            background: "rgba(14,14,16,0.7)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(71,71,71,0.2)",
            borderRadius: "2rem",
            padding: "32px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Internal glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.02), transparent)",
              borderRadius: "2rem",
            }}
          />

          <div className="relative z-10">
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.75rem",
                lineHeight: 1.2,
                fontWeight: 500,
                color: "#ffffff",
                marginBottom: "32px",
                letterSpacing: "-0.02em",
              }}
            >
              Create an account
            </h2>

            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontSize: "0.875rem", color: "#c6c6cb", marginBottom: "12px", letterSpacing: "0.02em" }}>
                I want to join as:
              </p>
              <div className="flex gap-4">
                {[
                  { id: "renter", label: "Renter", icon: "person" },
                  { id: "provider", label: "Provider", icon: "storefront" },
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: role.id as any }))}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: formData.role === role.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      border: formData.role === role.id ? "1px solid #ffffff" : "1px solid rgba(71,71,71,0.2)",
                      borderRadius: "0.75rem",
                      color: formData.role === role.id ? "#ffffff" : "#c6c6cb",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>{role.icon}</span>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {formFields.map((field) => (
                <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    htmlFor={field.id}
                    style={{ fontSize: "0.875rem", color: "#c6c6cb", letterSpacing: "0.02em" }}
                  >
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
                        color: "#919191",
                        fontSize: "20px",
                      }}
                    >
                      {field.icon}
                    </span>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "1px solid rgba(71,71,71,0.2)",
                        borderRadius: "0.75rem",
                        padding: "14px 16px 14px 48px",
                        color: "#ffffff",
                        fontSize: "0.9375rem",
                        outline: "none",
                        transition: "border-color 0.3s ease, background 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}

              {status === "error" && (
                <div style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>
                  {errorMessage}
                </div>
              )}

              <div style={{ paddingTop: "16px" }}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "16px",
                    background: status === "loading" ? "#a1a1aa" : "#ffffff",
                    color: "#000000",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {status === "loading" ? "Creating Account..." : "Create Account"}
                  {status !== "loading" && <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>}
                </button>
              </div>
            </form>

            {/* Social */}
            <div
              style={{
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(71,71,71,0.1)",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#c6c6cb",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Or continue with
              </p>
              <div className="flex gap-4">
                {[
                  { name: "Google", svg: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )},
                  { name: "Apple", svg: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.22-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                    </svg>
                  )},
                ].map(({ name, svg }) => (
                  <button
                    key={name}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(71,71,71,0.2)",
                      borderRadius: "9999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {svg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sign in link */}
        <div className="mt-8 text-center">
          <p style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#ffffff", fontWeight: 500, textDecoration: "none" }}>
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
