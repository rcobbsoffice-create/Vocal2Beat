'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Key, 
  Smartphone,
  Check,
  ChevronRight,
  Zap,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/supabase';

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
        setFormData({
          fullName: data.full_name || '',
          email: user.email || ''
        });
      }
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setProfile(prev => prev ? { ...prev, full_name: formData.fullName } : null);
      }
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white">Account Settings</h1>
        <p className="text-slate-400">Manage your profile, subscription, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="space-y-1">
          {[
            { name: 'Profile', icon: User, active: true },
            { name: 'Subscription', icon: CreditCard },
            { name: 'Notifications', icon: Bell },
            { name: 'Security', icon: Shield },
            { name: 'API Access', icon: Key },
          ].map((item) => (
            <button 
              key={item.name}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all group",
                item.active 
                  ? "bg-brand text-white shadow-xl shadow-brand/20 border border-brand/50" 
                  : "text-slate-500 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="md:col-span-3 space-y-8">
          {/* Profile Section */}
          <section className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <User className="w-24 h-24 text-white" />
             </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-3 relative z-10 font-outfit">
              <User className="w-5 h-5 text-brand-light" /> General Profile
            </h3>
            
            <div className="flex items-center gap-8 relative z-10">
              <div className="relative group">
                <div className="w-28 h-28 bg-linear-to-tr from-brand to-accent-magenta rounded-[2rem] flex items-center justify-center text-4xl font-bold text-white border-4 border-slate-900 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform">
                  {profile?.full_name?.charAt(0) || 'U'}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <Smartphone className="w-6 h-6 mb-1" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Update</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-2xl font-bold text-white tracking-tight">{profile?.full_name || 'Anonymous Creator'}</h4>
                <p className="text-xs text-slate-500 font-medium">Joined {new Date(profile?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-[10px] font-bold text-brand-light bg-brand/10 px-3 py-1 rounded-full border border-brand/20 uppercase tracking-widest">Verified Artist</span>
                  <span className="text-[10px] font-bold text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/20 uppercase tracking-widest">Early Access</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 relative z-10">
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Display Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand/30 transition-all font-medium text-sm placeholder-slate-700"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Registered Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-950/20 border border-white/5 rounded-2xl py-4 px-6 text-slate-500 cursor-not-allowed font-medium text-sm"
                />
                <p className="text-[10px] text-slate-600 ml-1">Cannot be changed for security reasons.</p>
              </div>
            </div>

            {message && (
              <div className={cn(
                "p-4 rounded-2xl border text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4",
                message.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-500"
              )}>
                {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {message.text}
              </div>
            )}

            <div className="pt-4 relative z-10 border-t border-white/5 flex items-center justify-between">
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Last synced: Just now</p>
              <button 
                disabled={isSaving}
                onClick={handleSave}
                className="px-8 py-3.5 bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand/20 active:scale-95 flex items-center gap-2"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
              </button>
            </div>
          </section>

          {/* Subscription Card */}
          <section className="bg-linear-to-br from-brand to-brand-dark border border-brand-light/30 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl shadow-brand/30">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
              <Zap className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-white/10">
                  Account Tier: {profile?.subscription_tier || 'PRO'}
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 font-outfit">Creator Professional</h3>
                <p className="text-brand-light font-medium text-sm max-w-sm leading-relaxed">You have full access to our Diamond-quality acoustic engines and unlimited beat fusions.</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white mb-3">$29 <span className="text-sm font-bold text-brand-light/70 uppercase">/ Month</span></div>
                <button className="px-8 py-3 bg-white text-brand-dark rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-light transition-all shadow-xl active:scale-95">Manage Studio Billing</button>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>
                Next renewal: Feb 28
              </div>
              <div className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>
                Advanced Vocal Print
              </div>
              <div className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>
                Priority GPU Access
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
