'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mic2, 
  Music, 
  Play, 
  Settings2, 
  Clock, 
  Volume2, 
  ArrowRight,
  ChevronRight,
  Waves,
  Zap,
  Info,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '@/hooks/useSupabaseData';
import { VoiceModel } from '@/types/supabase';
import { useRouter } from 'next/navigation';

export default function ComposePage() {
  const router = useRouter();
  const { supabase, getVoiceModels } = useSupabase();
  const [prompt, setPrompt] = useState('');
  const [voiceModels, setVoiceModels] = useState<VoiceModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<VoiceModel | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [credits, setCredits] = useState(0);

  const [settings, setSettings] = useState({
    creativity: 70,
    duration: 60,
    tempo: 120
  });

  const [isRecording, setIsRecording] = useState(false);
  const [hasVocalSample, setHasVocalSample] = useState(false);
  const [uploadedBeat, setUploadedBeat] = useState<{ name: string; size: string } | null>(null);
  const [isListeningPrompt, setIsListeningPrompt] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoadingModels(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Fetch Credits
      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single();
      if (profile) setCredits(profile.credits);

      // Fetch Models
      const { data: models } = await getVoiceModels(user.id);
      if (models && models.length > 0) {
        setVoiceModels(models);
        setSelectedModel(models[0]);
      }
    }
    setIsLoadingModels(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !isListeningPrompt) return;
    if (!selectedModel) return;

    setIsGenerating(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // 1. Deduct Credits (Simulation/Real)
      const cost = uploadedBeat ? 60 : 40;
      const newCredits = credits - cost;
      
      await supabase
        .from('profiles')
        .update({ credits: newCredits })
        .eq('id', user.id);
      
      setCredits(newCredits);

      // 2. Insert Generation
      const { data: generation, error } = await supabase
        .from('generations')
        .insert({
          user_id: user.id,
          model_id: selectedModel.id,
          prompt: prompt,
          title: prompt.split(' ').slice(0, 3).join(' ') || 'New Studio Track',
          duration: settings.duration,
          status: 'Processing',
          waveform: Array.from({ length: 15 }, () => Math.floor(Math.random() * 70) + 20)
        })
        .select()
        .single();

      // 3. Simulate completion
      setTimeout(async () => {
        if (generation) {
          await supabase
            .from('generations')
            .update({ status: 'Completed' })
            .eq('id', generation.id);
          
          setIsGenerating(false);
          router.push('/dashboard/generations');
        }
      }, 5000);
    }
  };

  const simulateSpeechToPrompt = () => {
    setIsListeningPrompt(true);
    setTimeout(() => {
      setPrompt("A melodic drill track with dark piano chords and high-energy vocals.");
      setIsListeningPrompt(false);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white">Composition Studio</h1>
          <p className="text-slate-400">Bring your musical ideas to life with AI-powered vocals and beats.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-2.5 shadow-lg shadow-brand/5">
          <Zap className="w-4 h-4 text-brand-light" />
          <span className="text-sm font-bold text-white tracking-widest">{credits} Credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Interface */}
        <div className="lg:col-span-8 space-y-8">
          {/* Prompt Area */}
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-1 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent pointer-events-none" />
            <div className="p-8 relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-light" /> Studio Prompt
                </label>
                <button className="text-[10px] font-bold text-brand-light hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-1">
                  Suggest Idea <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={isListeningPrompt ? "Listening to your voice..." : "Ex: A futuristic synthwave track with a laid-back groove..."}
                  className={cn(
                    "w-full h-40 bg-transparent text-white placeholder-slate-700 border-none focus:ring-0 resize-none text-xl leading-relaxed font-outfit transition-all",
                    isListeningPrompt && "opacity-50 blur-[2px]"
                  )}
                />
                <AnimatePresence>
                  {isListeningPrompt && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-slate-950/20 rounded-2xl"
                    >
                      <div className="relative">
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="absolute inset-0 bg-brand rounded-full blur-2xl"
                        />
                        <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center border border-brand/40 backdrop-blur-md relative z-10 shadow-xl">
                          <Mic2 className="w-10 h-10 text-brand-light" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-4">
                   <button 
                    onClick={simulateSpeechToPrompt}
                    className={cn(
                      "px-5 py-3 rounded-xl transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                      isListeningPrompt 
                        ? "bg-brand text-white shadow-lg shadow-brand/40 scale-105" 
                        : "bg-white/5 text-slate-500 hover:text-brand-light hover:bg-brand/10 border border-white/5"
                    )}
                   >
                      <Mic2 className="w-4 h-4" />
                      {isListeningPrompt ? "Listening..." : "Voice Prompt"}
                   </button>
                   <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                      <Music className="w-4 h-4" />
                   </button>
                </div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                  {prompt.length} / 500 characters
                </div>
              </div>
            </div>
          </section>

          {/* Vocal Recognition & Beat Fusion Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vocal Sampling */}
            <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Mic2 className="w-4 h-4 text-accent-magenta" /> Vocal Recognition
                </h3>
                {hasVocalSample && (
                  <span className="text-[8px] bg-accent-magenta/20 text-accent-magenta px-2.5 py-1 rounded-full font-bold tracking-[0.1em]">ACTIVE</span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Record or upload your voice to create a unique **Vocal Print** signature.
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setIsRecording(true);
                    setTimeout(() => {
                      setIsRecording(false);
                      setHasVocalSample(true);
                    }, 3000);
                  }}
                  className={cn(
                    "grow py-3.5 rounded-2xl border font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                    isRecording 
                      ? "bg-accent-magenta/10 border-accent-magenta text-accent-magenta animate-pulse" 
                      : hasVocalSample 
                        ? "bg-accent-magenta/20 border-accent-magenta/40 text-white shadow-lg shadow-accent-magenta/5"
                        : "bg-white/5 border-white/10 text-slate-500 hover:border-accent-magenta/50 hover:text-white"
                  )}
                >
                  {isRecording ? <div className="w-2 h-2 bg-accent-magenta rounded-full animate-ping" /> : <Mic2 className="w-4 h-4" />}
                  {isRecording ? "Capturing..." : hasVocalSample ? "Vocal Print Locked" : "Sample My Voice"}
                </button>
              </div>
            </section>

            {/* Beat Fusion */}
            <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Music className="w-4 h-4 text-accent-cyan" /> Beat Fusion
                </h3>
                {uploadedBeat && (
                  <span className="text-[8px] bg-accent-cyan/20 text-accent-cyan px-2.5 py-1 rounded-full font-bold tracking-[0.1em]">SYNC</span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Fuse with custom instrumentals for perfect rhythmic vocal synchronization.
              </p>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer group relative overflow-hidden",
                  uploadedBeat 
                    ? "bg-accent-cyan/5 border-accent-cyan/40" 
                    : "bg-white/5 border-white/10 hover:border-accent-cyan/50 h-[52px]"
                )}
                onClick={() => setUploadedBeat({ name: "midnight_groove_v2.wav", size: "12.4 MB" })}
              >
                {uploadedBeat ? (
                  <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-xl bg-accent-cyan/20 flex items-center justify-center shadow-lg shadow-accent-cyan/5">
                         <Play className="w-3 h-3 text-accent-cyan fill-current" />
                       </div>
                       <div>
                         <div className="text-[10px] font-bold text-white truncate w-32">{uploadedBeat.name}</div>
                         <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{uploadedBeat.size}</div>
                       </div>
                     </div>
                     <button onClick={(e) => { e.stopPropagation(); setUploadedBeat(null); }} className="p-1 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-colors">
                        <ArrowRight className="w-3 h-3 rotate-45" />
                     </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-slate-600 group-hover:text-accent-cyan transition-colors">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Drop Beat</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Voice Selector */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold font-outfit text-white">Vocal Identity</h3>
            {isLoadingModels ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-900/40 rounded-2xl animate-pulse border border-white/5" />)}
              </div>
            ) : voiceModels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {voiceModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={cn(
                      "relative p-5 rounded-[1.5rem] border transition-all text-left group overflow-hidden",
                      selectedModel?.id === model.id 
                        ? "bg-white/5 border-brand ring-1 ring-brand/50 shadow-2xl shadow-brand/10" 
                        : "bg-slate-900/40 border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl opacity-10 transition-all group-hover:scale-150 group-hover:opacity-20",
                      model.color_gradient?.includes('brand') ? "bg-brand" : "bg-accent-magenta"
                    )} />
                    <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                      <div className={cn("w-12 h-12 rounded-2xl bg-linear-to-br flex items-center justify-center text-white shadow-lg", model.color_gradient)}>
                        <Mic2 className="w-5 h-5" />
                      </div>
                      {selectedModel?.id === model.id && (
                        <div className="bg-brand/20 p-1.5 rounded-full border border-brand/50">
                          <Zap className="w-3 h-3 text-brand-light fill-brand-light" />
                        </div>
                      )}
                    </div>
                    <div className="relative z-10 font-bold text-white mb-0.5 tracking-tight">{model.name}</div>
                    <div className="relative z-10 text-[9px] text-slate-500 font-bold uppercase tracking-[0.1em]">{model.quality}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-[2rem] p-8 text-center">
                 <p className="text-sm text-slate-500 mb-4 font-medium">No voice models found.</p>
                 <button 
                  onClick={() => router.push('/dashboard/models')}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-light hover:text-white transition-colors"
                 >
                   Train your first model <ArrowRight className="inline-flex w-3 h-3 ml-1" />
                 </button>
              </div>
            )}
          </section>

          {/* Visualization Area */}
          <AnimatePresence>
            {isGenerating && (
              <motion.section 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-900/60 backdrop-blur-3xl border border-brand/20 rounded-[2.5rem] p-10 text-center space-y-8 shadow-2xl"
              >
                <div className="flex flex-col items-center gap-6">
                   <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 bg-linear-to-r from-brand to-transparent rounded-full blur-xl absolute -inset-2 opacity-30"
                      />
                      <Waves className="w-16 h-16 text-brand-light relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                   </div>
                   <div>
                      <h4 className="text-2xl font-bold text-white mb-2 font-outfit">
                        {uploadedBeat ? "Fusing Fusion..." : "Weaving the Flow..."}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                        {hasVocalSample ? "Applying user vocal signature..." : "Synthesizing deep-learning vocal patterns..."}
                      </p>
                   </div>
                </div>

                {/* Animated Bars */}
                <div className="h-20 flex items-center justify-center gap-1.5 px-6">
                   {[...Array(32)].map((_, i) => (
                     <motion.div 
                       key={i}
                       className={cn(
                        "w-1 rounded-full transition-all",
                        uploadedBeat ? "bg-accent-cyan/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-brand-light/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                       )}
                       animate={{ 
                         height: [20, 60, 40, 80, 50, 30].slice(i % 5, (i % 5) + 2) 
                       }}
                       transition={{ 
                         repeat: Infinity, 
                         duration: 0.5 + (i * 0.05), 
                         ease: "easeInOut" 
                       }}
                       style={{ height: '30px' }}
                     />
                   ))}
                </div>

                <div className="flex items-center justify-center gap-12 pt-8 border-t border-white/5">
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Process Mode</span>
                     <span className="text-sm text-white font-bold uppercase tracking-tight">{uploadedBeat ? "Beat Fusion" : "Pure Gen"}</span>
                   </div>
                   <div className="h-10 w-px bg-white/10" />
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Identity</span>
                     <span className="text-sm text-brand-light font-bold uppercase tracking-tight">{hasVocalSample ? "Vocal Print" : selectedModel?.name}</span>
                   </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Command Center (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Settings2 className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
              <Settings2 className="w-5 h-5 text-brand-light" /> Studio Settings
            </h3>

            {/* Sliders */}
            <div className="space-y-8 relative z-10">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Creativity</span>
                  <span className="text-brand-light font-bold font-mono text-sm bg-brand/10 px-2 py-0.5 rounded-lg border border-brand/20">{settings.creativity / 100}</span>
                </div>
                <input 
                  type="range" 
                  value={settings.creativity}
                  onChange={(e) => setSettings({...settings, creativity: parseInt(e.target.value)})}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand" 
                />
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Gen Duration</span>
                  <span className="text-brand-light font-bold uppercase tracking-widest text-[10px]">{settings.duration}s</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 60, 90, 120].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSettings({...settings, duration: d})}
                      className={cn(
                        "py-3 rounded-xl text-[10px] font-bold transition-all border",
                        settings.duration === d 
                          ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" 
                          : "bg-slate-950/50 text-slate-500 border-white/5 hover:border-white/10 hover:text-white"
                      )}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Studio BPM</span>
                  <span className="text-brand-light font-bold font-mono text-sm">{settings.tempo} </span>
                </div>
                <input 
                  disabled={!!uploadedBeat}
                  type="range" 
                  min="60"
                  max="200"
                  value={settings.tempo}
                  onChange={(e) => setSettings({...settings, tempo: parseInt(e.target.value)})}
                  className={cn(
                    "w-full h-1 rounded-lg appearance-none cursor-pointer",
                    uploadedBeat ? "bg-white/5 cursor-not-allowed" : "bg-white/5 accent-brand"
                  )}
                />
                {uploadedBeat && (
                  <div className="flex items-center gap-2 text-[8px] text-accent-cyan font-bold uppercase tracking-[0.1em] bg-accent-cyan/10 p-2 rounded-lg border border-accent-cyan/20">
                    <Info className="w-3 h-3" /> Sync Locked to Beat
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 space-y-4 relative z-10 border-t border-white/5">
               <button 
                disabled={isGenerating || (!prompt.trim() && !isListeningPrompt) || isLoadingModels}
                onClick={handleGenerate}
                className={cn(
                  "w-full py-4.5 rounded-[1.25rem] font-bold flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-[0.1em]",
                  isGenerating || isLoadingModels
                    ? "bg-slate-800 text-slate-600 border border-white/5 cursor-not-allowed" 
                    : "bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white shadow-2xl shadow-brand/20 hover:-translate-y-1 active:scale-[0.98]"
                )}
               >
                 {isGenerating ? (
                   <>
                     <Loader2 className="w-5 h-5 animate-spin" />
                     Processing...
                   </>
                 ) : (
                   <>
                     {uploadedBeat ? "Finalize Fusion" : "Ignite Track Gen"}
                     <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </>
                 )}
               </button>
               <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1 text-[9px] text-slate-600 font-bold uppercase tracking-[0.1em]">
                    <Clock className="w-3 h-3" /> Est. Time: ~45s
                  </div>
                  <div className="h-1 w-1 bg-slate-700 rounded-full" />
                  <div className="flex items-center gap-1 text-[9px] text-brand-light/70 font-bold uppercase tracking-[0.1em]">
                    Cost: {uploadedBeat ? "60" : "40"} units
                  </div>
               </div>
            </div>
          </section>

          {/* Studio Advantage */}
          <div className="p-6 rounded-[2rem] bg-slate-900/60 backdrop-blur-md border border-white/5 flex gap-4 items-start shadow-xl">
            <div className="bg-brand/10 p-2.5 rounded-xl border border-brand/20">
               <Waves className="w-5 h-5 text-brand-light" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] text-white font-bold uppercase tracking-widest">Acoustic Engine v4</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Our latest engine preserves vocal timbre while ensuring 0ms latency in beat synchronization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
