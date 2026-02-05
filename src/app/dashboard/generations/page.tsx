'use client';

import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  Clock, 
  ChevronRight,
  Waves,
  Share2,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSupabase } from '@/hooks/useSupabaseData';
import { Generation } from '@/types/supabase';

export default function GenerationsPage() {
  const [generations, setGenerations] = useState<(Generation & { voice_models: { name: string } | null })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { getGenerations, supabase } = useSupabase();

  useEffect(() => {
    fetchGenerations();
  }, []);

  const fetchGenerations = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await getGenerations(user.id);
      if (data) setGenerations(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('generations')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setGenerations(generations.filter(g => g.id !== id));
    }
  };

  const filteredGenerations = generations.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (g.voice_models?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-white">Generations History</h1>
          <p className="text-slate-400">Review, listen, and download your AI-generated tracks.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all flex items-center gap-2 text-xs uppercase tracking-widest">
            <Share2 className="w-4 h-4" /> Share Studio
          </button>
          <Link href="/dashboard/compose" className="px-6 py-2.5 bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white rounded-xl font-bold transition-all shadow-lg shadow-brand/20 text-sm flex items-center gap-2">
            Compose New
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search generations..." 
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50 text-white placeholder-slate-600"
          />
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="flex items-center gap-2 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
            <Filter className="w-4 h-4 text-brand-light" /> Filter
          </button>
          <div className="h-4 w-px bg-white/10" />
          <button className="flex items-center gap-2 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
             Sort: Newest First
          </button>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 bg-slate-900/40 rounded-2xl animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGenerations.map((gen) => (
            <div key={gen.id} className="group bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 hover:border-brand/30 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Play Button & Info */}
                <div className="flex items-center gap-5 shrink-0">
                  <button className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                    gen.status === 'Completed' 
                      ? "bg-brand text-white hover:scale-105 active:scale-95 shadow-lg shadow-brand/20" 
                      : "bg-white/5 text-slate-500 cursor-not-allowed"
                  )}>
                    {gen.status === 'Completed' ? <Play className="w-5 h-5 fill-current" /> : <Clock className="w-5 h-5" />}
                  </button>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-brand-light transition-colors">{gen.title}</h4>
                    <p className="text-[10px] text-slate-500 flex items-center gap-2 font-bold uppercase tracking-widest">
                      <span className="text-brand-light">{gen.voice_models?.name || 'Generic'}</span> • {new Date(gen.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className="grow flex items-center gap-1.5 h-10 px-4">
                  {gen.status === 'Completed' ? (
                    gen.waveform.map((height, i) => (
                      <div 
                        key={i} 
                        className="grow bg-white/10 rounded-full group-hover:bg-brand/20 transition-all overflow-hidden relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute inset-x-0 bottom-0 bg-brand-light opacity-0 group-hover:opacity-40 transition-opacity" style={{ height: '100%' }} />
                      </div>
                    ))
                  ) : (
                    <div className="w-full flex items-center gap-3 text-brand-light">
                      <div className="h-1 bg-white/5 grow rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-brand/50 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">Processing...</span>
                    </div>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-white font-mono">{gen.duration}s</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Length</div>
                  </div>
                  <div className="h-8 w-px bg-white/10 hidden sm:block" />
                  <div className="flex items-center gap-1">
                    <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white" title="Download">
                      <Download className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(gen.id)}
                      className="p-3 hover:bg-red-500/10 rounded-xl transition-colors text-slate-500 hover:text-red-400" 
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredGenerations.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center animate-in fade-in duration-700">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <Waves className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No tracks found</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8 text-sm leading-relaxed">Your generated tracks will appear here once you've composed them in the studio.</p>
              <Link 
                href="/dashboard/compose"
                className="bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 flex items-center gap-2 group"
              >
                Start Composing <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
