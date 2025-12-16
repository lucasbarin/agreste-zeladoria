import DashboardLayout from '@/components/DashboardLayout';

export default function MoradorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
