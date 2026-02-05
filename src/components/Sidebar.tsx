'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Music, 
  LayoutDashboard, 
  Mic2, 
  Settings, 
  LogOut, 
  ChevronRight,
  PlusCircle,
  History,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/app/(auth)/actions';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/supabase';

const menuItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Voice Models', href: '/dashboard/models', icon: Mic2 },
  { name: 'Generations', href: '/dashboard/generations', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) setProfile(data);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await logout();
  };

  const initials = profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??';

  return (
    <aside className="w-64 h-screen bg-slate-950/50 backdrop-blur-xl border-r border-white/5 flex flex-col fixed left-0 top-0 z-40 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-[10%] -left-[20%] w-[150%] h-[40%] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 relative z-10 group">
          <div className="w-10 h-10 bg-linear-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
            <Music className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-outfit text-white">
            VoxFlow <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-light to-accent-cyan">AI</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="grow p-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
        <div className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all group relative overflow-hidden",
                isActive 
                  ? "bg-brand text-white shadow-xl shadow-brand/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-brand-light")} />
                <span className="text-sm font-bold tracking-tight">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/50 relative z-10" />}
            </Link>
          );
        })}

        <div className="pt-10 px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Creative Tools
        </div>
        <Link 
          href="/dashboard/compose"
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-brand/5 transition-all group border border-dashed border-white/10 hover:border-brand/40"
        >
          <PlusCircle className="w-5 h-5 text-slate-500 group-hover:text-brand-light" />
          <span className="text-sm font-bold tracking-tight">New Composition</span>
        </Link>
      </div>

      {/* User / Footer */}
      <div className="p-4 border-t border-white/5 space-y-4 bg-slate-950/40 relative z-10">
        <div className="flex items-center gap-4 px-3 py-2">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          ) : (
            <div className="w-10 h-10 bg-linear-to-tr from-brand to-accent-magenta rounded-full flex items-center justify-center font-bold text-sm text-white border border-white/20 shadow-lg">
              {initials}
            </div>
          )}
          <div className="grow min-w-0">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                <div className="h-2 w-12 bg-white/5 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <div className="text-sm font-bold text-white truncate leading-none mb-1">{profile?.full_name || 'Creator'}</div>
                <div className="text-[10px] text-brand-light font-bold uppercase tracking-widest">{profile?.subscription_tier || 'Basic'} Plan</div>
              </>
            )}
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center justify-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full rounded-2xl group text-xs font-bold uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Sign Out Studio
        </button>
      </div>
    </aside>
  );
}
