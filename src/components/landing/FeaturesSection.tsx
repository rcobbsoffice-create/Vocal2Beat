import { Mic2, Zap, Sparkles, Layers, Wand2, Lock } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Mic2,
      color: "blue",
      title: "Isolated Voice Cloning",
      desc: "Train private AI models on just 15 minutes of audio.",
    },
    {
      icon: Zap,
      color: "indigo",
      title: "Beat Intelligence",
      desc: "Our engine syncs lyrics to transients, ensuring perfect flow.",
    },
    {
      icon: Sparkles,
      color: "fuchsia",
      title: "Infinite Songwriting",
      desc: "Generate verses, hooks, and ad-libs that match your style.",
    },
    {
      icon: Layers,
      color: "cyan",
      title: "Multi-Track Export",
      desc: "Get separate stems for vocals, backing, and ad-libs.",
    }
  ];

  return (
    <section id="features" className="relative px-6 py-32 bg-slate-950">
      <div className="absolute inset-0 bg-brand/5 skew-y-3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-center text-4xl md:text-6xl font-bold font-outfit mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Superhuman</span> Capabilities
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            The first AI music engine built specifically for professional artists and producers, not just hobbyists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`bg-slate-950/40 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300 p-8 rounded-3xl relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 p-24 bg-${f.color}-500/10 blur-[60px] rounded-full group-hover:bg-${f.color}-500/20 transition-all duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-slate-950/50 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-7 h-7 text-${f.color}-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                </div>
                
                <h3 className="text-xl font-bold font-outfit mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
