'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Music, Download, Wand2 } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Mic2,
      title: "1. Capture Your Voice",
      description: "Upload 15 minutes of vocal takes. Our AI learns your specific vibrato, breath, and timbre.",
      color: "blue"
    },
    {
      icon: Music,
      title: "2. Drop an Instrumental",
      description: "Provide any beat or instrumental track. VoxFlow analyzes the BPM, key, and structure.",
      color: "indigo"
    },
    {
      icon: Wand2,
      title: "3. Generation & Refinement",
      description: "AI writes lyrics and generates vocals synced perfectly to the transients of your beat.",
      color: "fuchsia"
    },
    {
      icon: Download,
      title: "4. Lossless Master",
      description: "Download stems or a fully mastered track ready for Spotify and Apple Music.",
      color: "cyan"
    }
  ];

  return (
    <section id="how-it-works" className="relative px-6 py-32 bg-slate-950 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand/5 blur-[120px] rounded-full skew-y-12 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6">
            The <span className="text-gradient-primary">Workflow</span> of the Future
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From raw input to professional master in minutes. No complex configuration, just pure creativity.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-linear-to-r from-blue-500/20 via-brand/40 to-cyan-500/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {/* Step Marker */}
                <div className="relative z-20 mb-10 mx-auto w-24 h-24 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-brand/50 transition-colors duration-500">
                  <div className={`absolute inset-0 bg-${step.color}-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <step.icon className={`w-10 h-10 text-${step.color}-400 relative z-10`} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold font-outfit text-white mb-4 group-hover:text-brand-light transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Connector (Mobile/Tablet) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-px h-10 bg-linear-to-b from-white/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
