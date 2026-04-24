import LoginOne from "@/components/ui/login-1";

export const metadata = {
  title: "Login | RentKaro",
  description: "Sign in to your RentKaro account to manage your rentals and bookings.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <LoginOne />
    </main>
  );
}
