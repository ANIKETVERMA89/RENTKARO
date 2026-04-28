"use client";

import { useState } from "react";
import { TopNav } from "@/components/ui/top-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { motion, AnimatePresence } from "framer-motion";

export default function SecuritySettingsPage() {
  const [step, setStep] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const docTypes = [
    { id: "dl", name: "Driving License", icon: "badge" },
    { id: "passport", name: "Passport", icon: "public" },
    { id: "id", name: "National ID", icon: "fingerprint" },
  ];

  const handleVerify = () => {
    setVerifying(true);
    // Simulate AI verification
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setStep(3);
    }, 3000);
  };

  return (
    <div style={{ background: "#0c0c0e", color: "#e5e1e4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav />

      <main style={{ flexGrow: 1, paddingTop: "140px", paddingBottom: "120px", maxWidth: "1000px", margin: "0 auto", width: "100%", paddingLeft: "24px", paddingRight: "24px" }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#71717a", fontSize: "0.875rem", marginBottom: "16px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>security</span>
            <span style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>Security Center</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "12px", letterSpacing: "-0.02em" }}>
            Identity Verification
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.125rem", maxWidth: "600px", lineHeight: "1.6" }}>
            Verify your identity to unlock premium vehicles and establish trust within the RentKaro community.
          </p>
        </header>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "48px", backdropFilter: "blur(20px)" }}>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", marginBottom: "32px" }}>Select Document Type</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                  {docTypes.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => { setSelectedDoc(doc.id); setStep(2); }}
                      style={{
                        padding: "32px",
                        background: selectedDoc === doc.id ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                        border: "1px solid",
                        borderColor: selectedDoc === doc.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                        borderRadius: "16px",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#ffffff", marginBottom: "16px", display: "block" }}>{doc.icon}</span>
                      <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#ffffff", marginBottom: "4px" }}>{doc.name}</div>
                      <div style={{ fontSize: "0.875rem", color: "#71717a" }}>Government-issued ID</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ textAlign: "center" }}
              >
                {!verifying ? (
                  <>
                    <div style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      background: "rgba(255,255,255,0.05)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      margin: "0 auto 32px"
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#ffffff" }}>cloud_upload</span>
                    </div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>Upload your {selectedDoc === "dl" ? "Driving License" : selectedDoc === "passport" ? "Passport" : "National ID"}</h2>
                    <p style={{ color: "#a1a1aa", marginBottom: "40px" }}>Ensure the document is clear and all details are visible.</p>
                    
                    <div style={{ 
                      border: "2px dashed rgba(255,255,255,0.1)", 
                      borderRadius: "16px", 
                      padding: "64px", 
                      marginBottom: "40px",
                      background: "rgba(255,255,255,0.01)"
                    }}>
                      <p style={{ color: "#71717a", fontSize: "0.875rem" }}>Drag and drop files here or click to browse</p>
                    </div>

                    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                      <button 
                        onClick={() => setStep(1)}
                        style={{ padding: "12px 32px", borderRadius: "12px", background: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600, cursor: "pointer" }}
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleVerify}
                        style={{ padding: "12px 48px", borderRadius: "12px", background: "#ffffff", color: "#000000", border: "none", fontWeight: 600, cursor: "pointer" }}
                      >
                        Start Verification
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "64px 0" }}>
                    <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 32px" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#ffffff" }}
                      />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#ffffff" }}>biometrics</span>
                      </div>
                    </div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>Analyzing Document</h2>
                    <p style={{ color: "#a1a1aa" }}>Our AI is verifying your identity credentials...</p>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "32px 0" }}
              >
                <div style={{ 
                  width: "80px", 
                  height: "80px", 
                  borderRadius: "50%", 
                  background: "#10b981", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 32px",
                  boxShadow: "0 0 40px rgba(16, 185, 129, 0.2)"
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#ffffff" }}>check_circle</span>
                </div>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>Verification Complete</h2>
                <p style={{ color: "#a1a1aa", marginBottom: "40px", maxWidth: "400px", margin: "0 auto 40px" }}>
                  Your identity has been successfully verified. You now have full access to the RentKaro elite fleet.
                </p>
                
                <button 
                  onClick={() => window.location.href = "/"}
                  style={{ padding: "12px 48px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600, cursor: "pointer" }}
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Tips */}
        <section style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          <div style={{ padding: "32px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "20px" }}>
            <span className="material-symbols-outlined" style={{ color: "#71717a", marginBottom: "16px" }}>lock</span>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>Data Encryption</h3>
            <p style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: "1.6" }}>
              Your documents are encrypted using AES-256 standards and stored securely. We never share your private data with third parties.
            </p>
          </div>
          <div style={{ padding: "32px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "20px" }}>
            <span className="material-symbols-outlined" style={{ color: "#71717a", marginBottom: "16px" }}>verified_user</span>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>Trust & Safety</h3>
            <p style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: "1.6" }}>
              Verification helps protect our community by ensuring all members are who they say they are, reducing fraud and liability.
            </p>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
