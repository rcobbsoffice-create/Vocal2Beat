import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Search, Bell } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 font-sans">
      <Sidebar />
      <main className="grow pl-64">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search models, generations..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <Link 
              href="/dashboard/compose"
              className="px-5 py-2 bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-brand/20"
            >
              New Composition
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
