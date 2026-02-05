'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Waves, 
  Volume2, 
  Info,
  Zap,
  Sparkles,
  Music,
  Play,
  Clock,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const TRAINING_STEPS = [
  {
    id: 'phonetics',
    title: 'Phonetic Range',
    description: 'Establish your core vocal frequency and linguistic reach.',
    icon: Mic2,
    color: 'text-brand-light',
    bg: 'bg-brand/10',
    border: 'border-brand/20',
    sentences: [
      "The quick brown fox jumps over the lazy dog in the late afternoon sun.",
      "A shimmering silver satellite circled the planet's atmospheric boundary.",
      "Quantifying the qualitative aspects of acoustic engineering requires precision.",
      "Bright blue butterflies fluttered through the blooming botanical gardens.",
      "Sphinx of black quartz, judge my vow with ancient wisdom."
    ]
  },
  {
    id: 'emotions',
    title: 'Emotional Variance',
    description: 'Train the AI on how your voice handles different energies and tones.',
    icon: Sparkles,
    color: 'text-accent-magenta',
    bg: 'bg-accent-magenta/10',
    border: 'border-accent-magenta/20',
    sentences: [
      { text: "Welcome to the future of sound! We're breaking boundaries and rewriting the rules of music production right here, right now.", vibe: "Energetic / Hype" },
      { text: "Close your eyes and let the rhythm take control. The night is young, and the melody is just beginning to unfold.", vibe: "Smooth / Sultry" },
      { text: "They said we couldn't do it. They said we'd never make it. But look at us now—standing at the top, unstoppable.", vibe: "Aggressive / Intense" },
      { text: "Sometimes the silence speaks louder than any words ever could. It's in the spaces between the notes where we find the truth.", vibe: "Melancholic / Soft" }
    ]
  },
  {
    id: 'rhythmic',
    title: 'Rhythmic Context',
    description: 'Capture your unique flow and cadence for musical synchronization.',
    icon: Music,
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
    sentences: [
      "Mic check, one-two. From the underground basements to the neon-lit skyscrapers, the flow never stops. VoxFlow AI—synchronizing the frequency of your soul.",
      "Dropping the beat like a heavy rain in the middle of a summer drought. High-fidelity visuals, low-frequency bass. We are the architects of the cyber-midnight.",
      "Electronic pulses, digital dreams. Synthesizing the spirit of the machine."
    ]
  },
  {
    id: 'technical',
    title: 'Baseline Calibration',
    description: 'Final technical stable-speech analysis for spectral mapping.',
    icon: Settings2,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    sentences: [
      "The process of vocal synthesis involves mapping unique phonetic signatures across a multi-dimensional latent space. By analyzing the harmonic content and spectral envelope of your delivery, our acoustic engine v4 can replicate your timbre with zero-latency synchronization. This ensures that every beat fusion feels organic and every generation sounds like a masterpiece."
    ]
  }
];

import { Settings2 } from 'lucide-react';

export default function TrainPage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentStep = TRAINING_STEPS[currentStepIndex];
  const isLastSentence = currentSentenceIndex === currentStep.sentences.length - 1;
  const isLastStep = currentStepIndex === TRAINING_STEPS.length - 1;

  useEffect(() => {
    // Calculate overall progress
    const totalSentences = TRAINING_STEPS.reduce((acc, step) => acc + step.sentences.length, 0);
    let completedSentences = 0;
    for (let i = 0; i < currentStepIndex; i++) {
      completedSentences += TRAINING_STEPS[i].sentences.length;
    }
    completedSentences += currentSentenceIndex;
    setProgress((completedSentences / totalSentences) * 100);
  }, [currentStepIndex, currentSentenceIndex]);

  const handleNext = () => {
    if (isRecording) {
      setIsRecording(false);
      
      if (!isLastSentence) {
        setCurrentSentenceIndex(prev => prev + 1);
      } else if (!isLastStep) {
        setCompletedSteps([...completedSteps, currentStep.id]);
        setCurrentStepIndex(prev => prev + 1);
        setCurrentSentenceIndex(0);
      } else {
        setCompletedSteps([...completedSteps, currentStep.id]);
        setShowCelebration(true);
      }
    } else {
      setIsRecording(true);
    }
  };

  const handlePrevious = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(prev => prev - 1);
    } else if (currentStepIndex > 0) {
      const prevStep = TRAINING_STEPS[currentStepIndex - 1];
      setCurrentStepIndex(prev => prev - 1);
      setCurrentSentenceIndex(prevStep.sentences.length - 1);
    }
  };

  if (showCelebration) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand/30 blur-3xl rounded-full" />
          <CheckCircle2 className="w-24 h-24 text-brand-light relative z-10 mx-auto" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold font-outfit text-white">Vocal Signature Captured!</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Your acoustic data is now being processed by our neural engine. This usually takes about 15-30 minutes.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => router.push('/dashboard/models')}
            className="px-8 py-4 bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 flex items-center gap-2"
          >
            Go to My Models <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={() => router.push('/dashboard/models')}
            className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Studio
          </button>
          <h1 className="text-3xl font-bold font-outfit text-white">Voice Training Wizard</h1>
          <p className="text-slate-400">Step {currentStepIndex + 1} of {TRAINING_STEPS.length}: {currentStep.title}</p>
        </div>
        
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Overall Progress</span>
            <span className="text-brand-light">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-linear-to-r from-brand to-brand-light shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {TRAINING_STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = currentStepIndex === index;
            
            return (
              <div 
                key={step.id}
                className={cn(
                  "p-4 rounded-2xl border transition-all flex items-center gap-4",
                  isActive 
                    ? "bg-slate-900/60 border-brand/50 shadow-lg shadow-brand/5" 
                    : isCompleted 
                      ? "bg-emerald-500/5 border-emerald-500/20" 
                      : "bg-slate-950/20 border-white/5 opacity-50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                  isActive ? "bg-brand text-white" : isCompleted ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-600"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <div className={cn(
                    "text-[10px] font-bold uppercase tracking-widest leading-none mb-1",
                    isActive ? "text-brand-light" : isCompleted ? "text-emerald-400" : "text-slate-600"
                  )}>
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{step.sentences.length} Sentences</div>
                </div>
              </div>
            );
          })}

          <div className="p-5 bg-linear-to-br from-brand/10 to-transparent border border-brand/10 rounded-2xl space-y-3">
             <div className="flex items-center gap-2 text-[10px] font-bold text-brand-light uppercase tracking-widest">
               <Info className="w-3.5 h-3.5" /> Training Tips
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed">
               Maintain a consistent distance from the mic. Speak naturally as if you're introducing a track.
             </p>
          </div>
        </div>

        {/* Teleprompter Area */}
        <div className="lg:col-span-9 space-y-8">
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-4xl p-1 shadow-2xl relative overflow-hidden h-[450px] flex flex-col">
            <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent pointer-events-none" />
            
            {/* Vibe Badge for Emotions Step */}
            {currentStep.id === 'emotions' && (
              <div className="absolute top-8 right-8 z-20">
                <div className="bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-accent-magenta/5">
                  Vibe: {(currentStep.sentences[currentSentenceIndex] as any).vibe}
                </div>
              </div>
            )}

            <div className="grow flex items-center justify-center p-12 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentStepIndex}-${currentSentenceIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-8"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white font-outfit leading-normal max-w-3xl mx-auto selection:bg-brand selection:text-white">
                    {typeof currentStep.sentences[currentSentenceIndex] === 'string' 
                      ? currentStep.sentences[currentSentenceIndex] 
                      : (currentStep.sentences[currentSentenceIndex] as any).text
                    }
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visualizer Footer */}
            <div className="p-8 border-t border-white/5 bg-slate-950/20 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-light uppercase tracking-[0.2em]">
                  <Mic2 className="w-4 h-4" /> 
                  {isRecording ? "Live Analysis Active" : "Microphone Standby"}
                </div>
                {isRecording && (
                   <div className="flex items-center gap-1 h-4">
                     {[...Array(8)].map((_, i) => (
                       <motion.div 
                        key={i} 
                        className="w-1 bg-brand rounded-full"
                        animate={{ height: [4, 16, 8, 12, 4] }}
                        transition={{ repeat: Infinity, duration: 0.5 + (i * 0.1) }}
                       />
                     ))}
                   </div>
                )}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Sentence {currentSentenceIndex + 1} / {currentStep.sentences.length}
              </div>
            </div>
          </section>

          {/* Controls */}
          <div className="flex items-center justify-between gap-6">
            <button 
              onClick={handlePrevious}
              disabled={currentStepIndex === 0 && currentSentenceIndex === 0}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-20 disabled:cursor-not-allowed border border-white/5"
            >
              Previous
            </button>
            
            <button 
              onClick={handleNext}
              className={cn(
                "grow py-5 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all shadow-2xl relative overflow-hidden group active:scale-95",
                isRecording 
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20" 
                  : "bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white shadow-brand/30"
              )}
            >
              {isRecording ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Complete Sentence
                </>
              ) : (
                <>
                  <Mic2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                  Start Recording Selection
                </>
              )}
            </button>

            <button className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all border border-white/5">
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
