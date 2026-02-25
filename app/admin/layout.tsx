import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import AdminAuthGuard from "./AdminAuthGuard";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Dashboard",
};

const menuData = [
  { label: "Dashboard", path: "/admin" },
  { label: "Blog", path: "/admin/blog" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="antialiased bg-gray-50">

        {/* ✅ Fixed Header */}
        <header className="fixed top-0 left-0 w-full h-16 bg-yellow-100 flex items-center px-6 z-50 shadow-sm">
          <h1 className="text-lg font-semibold">Adaind Admin</h1>
        </header>

        <div className="flex pt-16">

          {/* ✅ Sidebar */}
          <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-blue-100 p-4">
            {menuData.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.path}
                className="block py-3 px-3 rounded-md hover:bg-gray-200 transition"
              >
                {menu.label}
              </Link>
            ))}
          </aside>

          {/* ✅ Main Content */}
          <main className="ml-64 w-full p-6">
            <AdminAuthGuard>
              {children}
            </AdminAuthGuard>
          </main>

        </div>
      </body>
    </html>
  );
}