import Link from 'next/link';
import { logout } from '@/app/lib/actions'; // <-- 1. Impor action logout

const Sidebar = () => {
  const menus = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Paket Umroh', href: '/dashboard/paket', icon: '🕋' },
    { name: 'Jamaah', href: '/dashboard/jamaah', icon: '👥' },
    { name: 'Pengaturan', href: '/dashboard/pengaturan', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-slate-100 h-screen flex flex-col sticky top-0">
      <div className="p-6 text-2xl font-b old border-b border-slate-700">
        MU Travel
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {menus.map((menu) => (
            <li key={menu.name} className="mb-2">
              <Link
                href={menu.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
              >
                <span>{menu.icon}</span>
                <span>{menu.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---> 2. BUNGKUS TOMBOL DENGAN FORM <--- */}
      <div className="p-4 border-t border-slate-700">
        <form action={logout}>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </form>
      </div>

    </aside>
  );
};

export default Sidebar;