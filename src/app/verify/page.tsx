"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { motion } from "framer-motion";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResend = async () => {
    if (!email) return;
    
    setResendStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setResendStatus("success");
      } else {
        setErrorMessage(data.message || "Failed to resend email.");
        setResendStatus("error");
      }
    } catch (err) {
      setErrorMessage("Network error occurred.");
      setResendStatus("error");
    }
  };

  return (
    <main
      className="relative z-10 w-full flex flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 140px)", padding: "0 24px" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(14,14,16,0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(71,71,71,0.2)",
          borderRadius: "1rem",
          padding: "48px 40px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <div 
          style={{ 
            width: "64px", 
            height: "64px", 
            borderRadius: "50%", 
            background: "rgba(255,255,255,0.05)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            margin: "0 auto 24px"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#ffffff" }}>mark_email_unread</span>
        </div>

        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Verify your email
        </h1>
        
        <p style={{ color: "#a1a1aa", fontSize: "1rem", lineHeight: "1.6", marginBottom: "32px" }}>
          We've sent a verification link to <br/>
          <strong style={{ color: "#ffffff", fontWeight: 600 }}>{email || "your email address"}</strong>.<br/>
          Please check your inbox to activate your RentKaro account.
        </p>

        <Link
          href="/login"
          style={{
            display: "block",
            width: "100%",
            padding: "16px",
            background: "#ffffff",
            color: "#000000",
            fontWeight: 600,
            borderRadius: "9999px",
            textDecoration: "none",
            marginBottom: "24px",
            transition: "opacity 0.3s ease",
          }}
        >
          Proceed to Login
        </Link>

        <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: "0.875rem", color: "#71717a", marginBottom: "12px" }}>
            Didn't receive the email? Check your spam folder or
          </p>
          <button
            onClick={handleResend}
            disabled={resendStatus === "loading" || resendStatus === "success" || !email}
            style={{
              background: "transparent",
              border: "none",
              color: resendStatus === "success" ? "#10b981" : "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: (resendStatus === "loading" || resendStatus === "success" || !email) ? "default" : "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            {resendStatus === "idle" && "Click here to resend"}
            {resendStatus === "loading" && "Resending..."}
            {resendStatus === "success" && "Verification email resent!"}
            {resendStatus === "error" && "Failed to resend. Try again."}
          </button>
          
          {resendStatus === "error" && (
            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "8px" }}>{errorMessage}</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <div style={{ background: "#0c0c0e", minHeight: "100vh", color: "#e5e1e4", display: "flex", flexDirection: "column" }}>
      <TopNav />
      <Suspense fallback={<div style={{ display: "flex", flexGrow: 1, alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
        <VerifyContent />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
