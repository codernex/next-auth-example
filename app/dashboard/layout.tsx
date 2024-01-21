export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="bg-black text-white">Layout</nav>
      {children}
    </div>
  );
}
