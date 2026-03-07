import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="mx-auto max-w-[1392px]">
        <DashboardHeader />
        {children}
      </div>
    </main>
  );
}