import { SideNav } from "@/components/ui/side-nav";
import Link from "next/link";

const settingsNav = [
  { icon: "person", label: "Profile", href: "/settings" },
  { icon: "security", label: "Security", href: "/settings/security" },
  { icon: "notifications_active", label: "Notifications", href: "/settings/notifications" },
  { icon: "card_membership", label: "Membership", href: "/settings/membership" },
];

export default function SettingsPage() {
  return (
    <div style={{ background: "#131315", color: "#e5e1e4", minHeight: "100vh", display: "flex" }}>
      <SideNav items={settingsNav} subtitle="User Settings" ctaLabel="Upgrade Plan" ctaHref="#" />

      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between px-6 fixed top-0 w-full z-50"
        style={{ height: "64px", background: "rgba(12,12,14,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff" }}>RentKaro</span>
        <button style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer" }}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: "288px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto", padding: "64px 24px 96px" }}>
          {/* Header */}
          <header style={{ marginBottom: "48px" }}>
            <nav style={{ display: "flex", fontSize: "0.875rem", color: "#c6c6cb", marginBottom: "12px" }}>
              <ol className="flex items-center gap-2">
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</a></li>
                <li><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span></li>
                <li style={{ color: "#ffffff", fontWeight: 500 }}>Settings</li>
              </ol>
            </nav>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Profile Details
            </h2>
          </header>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile image */}
            <div className="lg:col-span-1">
              <div
                className="group relative flex flex-col items-center text-center gap-6 overflow-hidden"
                style={{
                  background: "rgba(14,14,16,0.5)",
                  backdropFilter: "blur(20px)",
                  padding: "32px",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(71,71,71,0.2)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
                    transition: "opacity 0.7s ease",
                  }}
                />
                {/* Avatar */}
                <div
                  className="relative overflow-hidden group"
                  style={{
                    width: "128px",
                    height: "128px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvjib6hJr1ZVOh_p5dm4fX-Qv_dLO9gCxviS-EwJgFzs6HkdzBi29vjdLlJoq18gJqcnbOiIYhwfCQfLcYwo5rxkgPQ-PGLCDRxBIYki0pIbq8g80NTpXVeugTE3gwdDFdHreXq3z9y2f-tTPfgmip9YvQtYbKFbrC1ePck3eeHUdAN4e-d_QO2CwYtmObbebp0pkt8uP-F_wHxyr3qIlTc92wEPAcrjl0U5XkZC0aXZEm5O9I1ocxMhz-8sXtCDwWu7I4a9IUqz2V"
                    alt="User avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.25)" }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.6)", transition: "opacity 0.3s ease", cursor: "pointer" }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#ffffff", fontSize: "28px" }}>photo_camera</span>
                  </div>
                </div>

                <div className="z-10" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 500, color: "#ffffff" }}>Avatar</h3>
                  <p style={{ fontSize: "0.875rem", color: "#c6c6cb" }}>JPG, GIF or PNG. Max size of 800K</p>
                </div>

                <button
                  className="z-10"
                  style={{
                    width: "100%",
                    padding: "10px 24px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(71,71,71,0.2)",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                >
                  Upload New
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div
                style={{
                  background: "rgba(14,14,16,0.8)",
                  backdropFilter: "blur(20px)",
                  padding: "32px",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(71,71,71,0.2)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", type: "text", value: "Elena Rostova" },
                      { label: "Email Address", type: "email", value: "elena.rostova@example.com" },
                    ].map((f) => (
                      <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#c6c6cb", marginLeft: "4px" }}>{f.label}</label>
                        <input
                          type={f.type}
                          defaultValue={f.value}
                          style={{
                            width: "100%",
                            background: "rgba(27,27,29,0.5)",
                            border: "1px solid rgba(71,71,71,0.2)",
                            borderRadius: "0.75rem",
                            padding: "14px 16px",
                            color: "#ffffff",
                            fontSize: "0.9375rem",
                            outline: "none",
                            transition: "border-color 0.3s ease",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    { label: "Phone Number", type: "tel", value: "+1 (555) 019-2834", isTextarea: false },
                  ].map((f) => (
                    <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#c6c6cb", marginLeft: "4px" }}>{f.label}</label>
                      <input
                        type={f.type}
                        defaultValue={f.value}
                        style={{
                          width: "100%",
                          background: "rgba(27,27,29,0.5)",
                          border: "1px solid rgba(71,71,71,0.2)",
                          borderRadius: "0.75rem",
                          padding: "14px 16px",
                          color: "#ffffff",
                          fontSize: "0.9375rem",
                          outline: "none",
                          transition: "border-color 0.3s ease",
                        }}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#c6c6cb", marginLeft: "4px" }}>Bio</label>
                    <textarea
                      rows={4}
                      defaultValue="Freelance digital artist and motion designer based in neo-Tokyo. Passionate about minimalist architecture and generative art."
                      style={{
                        width: "100%",
                        background: "rgba(27,27,29,0.5)",
                        border: "1px solid rgba(71,71,71,0.2)",
                        borderRadius: "0.75rem",
                        padding: "14px 16px",
                        color: "#ffffff",
                        fontSize: "0.9375rem",
                        outline: "none",
                        resize: "none",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                </div>

                {/* Action bar */}
                <div
                  className="flex items-center justify-end gap-4"
                  style={{ paddingTop: "16px", marginTop: "16px", borderTop: "1px solid rgba(71,71,71,0.1)" }}
                >
                  <button style={{ background: "none", border: "none", color: "#c6c6cb", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>
                    Cancel
                  </button>
                  <button
                    style={{
                      padding: "12px 32px",
                      background: "#ffffff",
                      color: "#000000",
                      borderRadius: "9999px",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
