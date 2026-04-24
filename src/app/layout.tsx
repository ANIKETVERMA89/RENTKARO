import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/store/useStore";

export const metadata: Metadata = {
  title: "RentKaro — Elite Rental Marketplace | Drive Your Way",
  description:
    "RentKaro is India's premier elite vehicle rental platform. Curated access to the world's most definitive automotive masterpieces. Instant booking, 24/7 concierge, secure payments.",
  keywords: "vehicle rental, luxury car rental, elite car rental, exotic cars, RentKaro, rent supercar India",
  openGraph: {
    title: "RentKaro — Elite Motion",
    description: "Curated access to the world's most definitive automotive masterpieces.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased min-h-screen"
        style={{ background: '#131315', color: '#e5e1e4' }}
        suppressHydrationWarning
      >
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
