import DashboardHeader from "@/components/DashboardHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          {children}
        </section>
      </div>
    </main>
  )
}