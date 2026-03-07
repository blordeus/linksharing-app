import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1392px]">
        <DashboardHeader />
        {children}
      </div>
    </main>
  );
}