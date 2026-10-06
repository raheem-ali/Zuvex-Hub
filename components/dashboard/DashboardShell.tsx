"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, FileText, Briefcase, Users, Calendar,
  Globe, User, Menu, Search, Settings, Bell, CircleUser, LogOut,
} from "lucide-react";

const main = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Publications", href: "#", icon: BookOpen },
  { label: "Blog", href: "#", icon: FileText },
  { label: "Portfolio", href: "#", icon: Briefcase },
  { label: "Services", href: "#", icon: Settings },
  { label: "Team", href: "#", icon: Users },
  { label: "Community", href: "#", icon: Globe },
  { label: "Events", href: "#", icon: Calendar },
];
const account = [{ label: "Profile", href: "#", icon: User }];

const base =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors duration-200";
const activeCls = "bg-brand text-white! shadow-md shadow-brand/30";
const idleCls = "text-ink! hover:bg-brand hover:text-white!";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("dashboard_token");
    window.location.href = "/dashboard/login";
  };

  const renderItem = (item: (typeof main)[number]) => {
    const active = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={() => setOpen(false)}
        className={`${base} ${active ? activeCls : idleCls}`}
      >
        <Icon size={16} />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-surface text-ink">
      {open && (
        <div className="fixed inset-0 z-30 bg-navy/50 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-4 left-4 top-4 z-40 flex w-64 flex-col rounded-xl border border-line bg-white shadow-lg shadow-navy/5 transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div className="flex items-center gap-2 px-6 py-5 text-sm font-bold text-navy">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <LayoutDashboard size={16} />
          </span>
          Zuvex Hub
        </div>
        <div className="mx-4 h-px bg-line" />

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {main.map(renderItem)}
          <div className="px-3 pb-1 pt-5 text-[11px] font-bold uppercase text-muted">
            Account pages
          </div>
          {account.map(renderItem)}
          <button onClick={logout} className={`${base} ${idleCls}`}>
            <LogOut size={16} /> Sign out
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col lg:pl-72">
        <div className="flex-1 p-4 lg:pl-2 lg:pr-6">
          {/* Topbar */}
          <div className="mb-6 flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="rounded-lg p-2 text-navy hover:bg-brand-light lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <div className="text-sm text-muted">
                Pages / <span className="font-semibold text-navy">Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <div className="relative hidden sm:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  placeholder="Type here..."
                  className="w-56 rounded-lg border border-line bg-white py-2 pl-8 pr-3 text-sm text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                />
              </div>
              <Settings size={16} className="cursor-pointer hover:text-brand" />
              <Bell size={16} className="cursor-pointer hover:text-brand" />
              <CircleUser size={18} className="cursor-pointer hover:text-brand" />
            </div>
          </div>

          <main>{children}</main>
        </div>

        <div className="border-t border-line px-4 py-5 text-center text-xs text-muted lg:pl-2 lg:pr-6 lg:text-left">
          © {new Date().getFullYear()} Zuvex Hub. All rights reserved.
        </div>
      </div>
    </div>
  );
}