import React from 'react';
import Link from 'next/link';
import { Music, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-24 pb-12 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-brand/50 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-linear-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all">
                <Music className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-outfit text-white">
                VoxFlow <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-light to-accent-cyan">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering creators with personalized AI voice models and beat-synced music generation.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand/20 rounded-full transition-all text-slate-400 hover:text-white border border-white/5 hover:border-brand/30 group">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand/20 rounded-full transition-all text-slate-400 hover:text-white border border-white/5 hover:border-brand/30 group">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand/20 rounded-full transition-all text-slate-400 hover:text-white border border-white/5 hover:border-brand/30 group">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-slate-400 hover:text-white text-sm transition-colors">How it Works</Link></li>
              <li><Link href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Voice Training</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Creator Rights</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} VoxFlow AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
