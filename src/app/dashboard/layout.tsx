export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Each dashboard page manages its own layout with SideNav
  return <>{children}</>;
}
