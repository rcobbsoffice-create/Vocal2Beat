'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Settings2, 
  Waves,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Music
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/Modal';
import { useSupabase } from '@/hooks/useSupabaseData';
import { VoiceModel } from '@/types/supabase';
import { useRouter } from 'next/navigation';

export default function ModelsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [models, setModels] = useState<VoiceModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { getVoiceModels, supabase } = useSupabase();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await getVoiceModels(user.id);
      if (data) setModels(data);
    }
    setIsLoading(false);
  };

  const handleTrainModel = async () => {
    if (!newModelName.trim()) return;
    setIsSubmitting(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('voice_models')
        .insert({
          user_id: user.id,
          name: newModelName,
          quality: 'Studio Grade',
          status: 'Training',
          color_gradient: 'from-accent-cyan to-brand'
        })
        .select()
        .single();

      if (!error) {
        setModels([data, ...models]);
        setIsModalOpen(false);
        setNewModelName('');
      }
    }
    setIsSubmitting(false);
  };

  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white">Voice Models</h1>
          <p className="text-slate-400">Manage and train your unique AI vocal identities.</p>
        </div>
        <button 
          onClick={() => router.push('/dashboard/models/train')}
          className="bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand/20 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Train New Model
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search models..." 
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all text-white placeholder-slate-600"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Completed', 'Training', 'Failed'].map((filter) => (
            <button 
              key={filter}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap",
                filter === 'All' 
                  ? "bg-brand/20 border-brand/50 text-brand-light" 
                  : "bg-white/5 border-white/10 text-slate-500 hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-64 bg-slate-900/40 rounded-3xl animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <div key={model.id} className="group relative bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:border-brand/30 transition-all hover:-translate-y-1">
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              <div className="flex items-start justify-between mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg bg-linear-to-br", model.color_gradient)}>
                  {model.name.charAt(0)}
                </div>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-light transition-colors">{model.name}</h3>
              <div className="flex items-center gap-2 mb-6">
                {model.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {model.status === 'Training' && <Clock className="w-3.5 h-3.5 text-orange-400 animate-pulse" />}
                {model.status === 'Failed' && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  model.status === 'Completed' ? "text-emerald-400" : 
                  model.status === 'Training' ? "text-orange-400" : "text-red-500"
                )}>
                  {model.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Quality</div>
                  <div className="text-sm font-bold text-white truncate">{model.quality}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Created</div>
                  <div className="text-[10px] font-bold text-white">{new Date(model.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="grow bg-brand/10 hover:bg-brand text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn">
                  <Waves className="w-3.5 h-3.5 group-hover/btn:animate-pulse" /> Use Model
                </button>
                <button className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-xl transition-all">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <button 
            onClick={() => router.push('/dashboard/models/train')}
            className="flex flex-col items-center justify-center gap-4 bg-slate-950/50 border border-dashed border-white/10 rounded-3xl p-6 hover:bg-brand/5 hover:border-brand/40 transition-all group min-h-[280px]"
          >
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-500 group-hover:text-brand-light group-hover:bg-brand/10 transition-all transform group-hover:rotate-90">
              <Plus className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white mb-1">Add New Model</div>
              <p className="text-xs text-slate-500">Train with your custom voice data</p>
            </div>
          </button>
        </div>
      )}

      {/* Train New Model Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Train New Voice Model"
      >
        <div className="space-y-6">
          <div className="p-6 bg-brand/10 border border-brand/20 rounded-2xl flex gap-4 items-start shadow-inner shadow-brand/5">
            <div className="p-3 bg-brand rounded-xl text-white shadow-lg shadow-brand/20">
              <Mic2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">Prepare Your Audio</h4>
              <p className="text-xs text-indigo-200/70 leading-relaxed">
                For best results, upload at least 15 minutes of dry, isolated vocals with no background music or effects.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Model Name</label>
              <input 
                type="text" 
                value={newModelName}
                onChange={(e) => setNewModelName(e.target.value)}
                placeholder="e.g. My Studio Voice"
                className="w-full bg-slate-950 border border-white/10 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder-slate-700"
              />
            </div>
            
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:bg-white/5 hover:border-brand/40 transition-all cursor-pointer group">
              <Music className="w-8 h-8 text-slate-600 mx-auto mb-4 group-hover:text-brand-light transition-colors" />
              <div className="text-sm font-bold text-white mb-1">Drop your audio files here</div>
              <p className="text-xs text-slate-500">Supported formats: WAV, MP3 (Max 500MB)</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              disabled={isSubmitting}
              onClick={() => setIsModalOpen(false)}
              className="grow py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-[10px]"
            >
              Cancel
            </button>
            <button 
              disabled={isSubmitting || !newModelName.trim()}
              onClick={handleTrainModel}
              className="grow py-3.5 bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white font-bold rounded-xl transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Start Training"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
