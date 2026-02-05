import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  BarChart3, 
  Mic2, 
  Music, 
  ArrowUpRight, 
  Play, 
  Clock,
  MoreVertical,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch Stats Counts
  const { count: voiceModelsCount } = await supabase
    .from('voice_models')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { count: generationsCount } = await supabase
    .from('generations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  // Fetch Recent Generations
  const { data: recentGenerations } = await supabase
    .from('generations')
    .select('*, voice_models(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    { label: 'Voice Models', value: voiceModelsCount || 0, icon: Mic2, change: 'Active Models', color: 'text-brand-light' },
    { label: 'Total Generations', value: generationsCount || 0, icon: Music, change: 'Lifetime', color: 'text-brand-light' },
    { label: 'Studio Credits', value: profile?.credits || 0, icon: BarChart3, change: 'Available', color: 'text-accent-magenta' },
  ];

  const firstName = profile?.full_name?.split(' ')[0] || 'Creator';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit text-white mb-2 leading-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-light to-accent-cyan">{firstName}</span>
          </h1>
          <p className="text-slate-400">Here's the latest pulse of your creative studio.</p>
        </div>
        <Link 
          href="/dashboard/compose"
          className="bg-linear-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 flex items-center gap-2 group"
        >
          <Zap className="w-4 h-4" />
          Start Composing
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-brand/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={cn("p-2.5 rounded-xl bg-white/5 transition-all group-hover:scale-110", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{stat.change}</span>
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-outfit text-white">Recent Generations</h3>
            <Link href="/dashboard/generations" className="text-xs font-bold uppercase tracking-widest text-brand-light hover:text-white transition-colors">View all history</Link>
          </div>
          
          {recentGenerations && recentGenerations.length > 0 ? (
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <th className="px-8 py-5">Track Title</th>
                      <th className="px-8 py-5">Model</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Length</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentGenerations.map((gen) => (
                      <tr key={gen.id} className="hover:bg-white/5 transition-all group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-light group-hover:bg-brand group-hover:text-white group-hover:scale-110 transition-all cursor-pointer shadow-lg shadow-brand/5">
                              <Play className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{gen.title || 'Untitled Generation'}</div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(gen.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                            {(gen.voice_models as any)?.name || 'Generic Model'}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            gen.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse"
                          )}>
                            {gen.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-xs font-mono text-slate-400">{gen.duration}s</td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 text-slate-500 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-slate-900/20 border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Music className="w-8 h-8 text-slate-600" />
              </div>
              <h4 className="text-white font-bold mb-2">No generations yet</h4>
              <p className="text-slate-400 text-sm max-w-xs mb-6">Start your first composition in the studio to see your history here.</p>
              <Link 
                href="/dashboard/compose"
                className="text-xs font-bold uppercase tracking-widest text-brand-light hover:text-white transition-colors flex items-center gap-2"
              >
                Go to Studio <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Upgrade Card / Tip */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-outfit text-white">Pro Tip</h3>
          <div className="p-6 rounded-[2rem] bg-linear-to-br from-brand to-brand-dark border border-white/20 relative overflow-hidden group shadow-2xl shadow-brand/20">
            <div className="relative z-10">
              <h4 className="text-white font-bold mb-2">Improve Model Accuracy</h4>
              <p className="text-brand-light/90 text-sm mb-6 leading-relaxed">
                Add 5 more minutes of clean, isolated vocals to reach Diamond quality status.
              </p>
              <button className="bg-white text-brand-dark px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute top-0 right-0 p-4">
               <Zap className="w-8 h-8 text-white/10" />
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-slate-900/80 backdrop-blur-md border border-white/5 relative overflow-hidden">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" /> System Status
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>GPU Queue</span>
                  <span className="text-emerald-400">Normal</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-emerald-400 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Training Latency</span>
                  <span className="text-emerald-400">~12 mins</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-brand-light rounded-full" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                 All systems operational
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
