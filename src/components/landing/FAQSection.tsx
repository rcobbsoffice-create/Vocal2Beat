'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      question: "How much data do I need to clones my voice?",
      answer: "We recommend at least 15 minutes of high-quality audio recording. The cleaner the audio (no background noise, dry vocals), the better the AI can capture your unique nuances, breath control, and vibrato."
    },
    {
      question: "Can I use the generated music commercially?",
      answer: "Yes! If you are on the Pro Creator or Studio plan, you own 100% of the commercial rights to the generations. Starter plan users have a public license for non-commercial project use."
    },
    {
      question: "Will the AI master the vocals as well?",
      answer: "Absolutely. Our engine doesn't just generate the audio; it applies professional-grade mixing and mastering, including compression, EQ, and spatial effects, to ensure the output is radio-ready."
    },
    {
      question: "Is my voice data secure?",
      answer: "Security is our priority. Your voice models are private to your account and encrypted. We never share your voice data or models with third parties without your explicit consent."
    },
    {
      question: "Does it work with any genre?",
      answer: "Yes, VoxFlow is genre-agnostic. Whether you produce Hip-Hop, Pop, EDM, or Rock, the engine analyzes your instrumental's transients and structure to generate appropriate rhythmic and melodic patterns."
    }
  ];

  return (
    <section id="faq" className="px-6 py-32 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about the future of music production.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`
        rounded-2xl border transition-all duration-300
        ${isOpen ? 'bg-white/5 border-brand/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'bg-transparent border-white/5 hover:border-white/10'}
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <span className={`font-semibold transition-colors ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
          ${isOpen ? 'bg-brand text-white scale-110' : 'bg-white/5 text-slate-500'}
        `}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
