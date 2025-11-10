export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container grid" style={{ gridTemplateColumns: '1fr' }}>
      {children}
    </section>
  );
}

