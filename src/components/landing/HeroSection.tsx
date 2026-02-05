"use client";

import { motion } from "framer-motion";
import { Music, ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-32 pb-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950/80 pointer-events-none" />
      
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-brand-dark/20 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] bg-accent-cyan/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-glow/10 border border-brand/30 text-brand-light text-sm font-medium mb-8 hover:bg-brand-glow/20 transition-all cursor-default"
        >
          <Music className="w-4 h-4 animate-bounce" />
          <span>Next-Gen AI Music Engine</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-outfit mb-8 leading-[1.1] tracking-tight"
        >
          <span className="block text-white drop-shadow-2xl">Your Voice.</span>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 text-glow">Infinite Beats.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Train private AI models on your unique vocal tone. Write, perform, and own original songs in seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="group relative px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-brand/40 hover:shadow-brand/60 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              Start Creating Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand/30 rounded-full font-bold text-lg transition-all backdrop-blur-md flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white text-brand-dark flex items-center justify-center group-hover:scale-110 transition-transform">
               <Play className="w-4 h-4 ml-0.5 fill-current" />
             </div>
             Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
