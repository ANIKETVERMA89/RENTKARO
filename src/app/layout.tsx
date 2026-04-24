import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { AppProvider } from "@/store/useStore";

export const metadata: Metadata = {
  title: "RentKaro — Drive Your Way, Rent Today | Vehicle Rental Platform",
  description:
    "RentKaro is India's #1 vehicle rental platform. Rent cars, bikes & scooters from verified owners at the best prices. Instant booking, secure payments, 24/7 support.",
  keywords: "vehicle rental, car rental, bike rental, scooty rental, rent car India, RentKaro",
  openGraph: {
    title: "RentKaro — Drive Your Way, Rent Today",
    description: "Rent cars, bikes & scooters from verified owners at the best prices.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950" suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <DottedSurface />
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
