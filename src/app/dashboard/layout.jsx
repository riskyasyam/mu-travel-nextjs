import Sidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-slate-100">
        {/* Konten dari page.jsx dashboard akan muncul di sini */}
        {children}
      </main>
    </div>
  );
}