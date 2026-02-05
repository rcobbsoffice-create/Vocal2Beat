'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Music, ArrowRight, Github, Chrome, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { signup } from '../actions';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 bg-linear-to-br from-brand to-brand-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-brand/20">
              <Music className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold font-outfit text-transparent bg-clip-text bg-linear-to-r from-brand-light to-accent-cyan">VoxFlow AI</span>
          </Link>
          <h1 className="text-3xl font-bold font-outfit text-white mb-2">Create Your Account</h1>
          <p className="text-slate-400">Join the next generation of AI-powered music production.</p>
        </div>

        <div className="bg-slate-900/40 border border-white/10 p-8 rounded-4xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-cyan/50 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input 
                  name="firstName"
                  type="text" 
                  required
                  placeholder="John"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-5 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  name="lastName"
                  type="text" 
                  required
                  placeholder="Doe"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-5 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder-slate-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                placeholder="name@example.com"
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-5 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-5 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder-slate-600"
              />
              <p className="text-[10px] text-slate-500 mt-2 ml-1">Minimum 8 characters with numbers.</p>
            </div>

            <div className="flex items-start gap-3 ml-1">
              <input type="checkbox" required className="mt-1 accent-brand rounded h-4 w-4 bg-slate-950 border-white/10 transition-colors" />
              <p className="text-xs text-slate-500 leading-relaxed">
                I agree to the <Link href="#" className="underline hover:text-white transition-colors">Terms</Link> and <Link href="#" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
              </p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8 text-center px-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <span className="relative bg-slate-900/80 backdrop-blur-md px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 rounded-full py-1">Quick Social Signup</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">
              <Chrome className="w-5 h-5 text-white" />
            </button>
            <button className="flex items-center justify-center p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">
              <Github className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-accent-cyan text-[10px] font-bold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4" /> 
            Encrypted Studio Access
          </div>
        </div>
        
        <p className="text-center mt-8 text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-brand-light font-bold hover:text-white transition-colors">Log in</Link>
        </p>
      </div>
    </div>
  );
}
