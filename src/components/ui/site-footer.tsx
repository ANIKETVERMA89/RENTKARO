import Link from "next/link";

const footerLinks = ["Fleet", "Insurance", "Privacy", "Terms", "Contact"];
const footerHrefs: Record<string, string> = {
  Fleet: "/vehicles",
  Insurance: "#",
  Privacy: "#",
  Terms: "#",
  Contact: "#",
};

export function SiteFooter() {
  return (
    <footer
      className="w-full border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)", background: "#0c0c0e" }}
    >
      <div className="max-w-7xl mx-auto py-16 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          RentKaro
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link}
              href={footerHrefs[link]}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#52525b",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.3s ease, color 0.3s ease",
              }}
            >
              {link}
            </Link>
          ))}
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "#a1a1aa",
            opacity: 0.7,
          }}
        >
          © 2024 RentKaro. The Ethereal Monolith of Motion.
        </div>
      </div>
    </footer>
  );
}
