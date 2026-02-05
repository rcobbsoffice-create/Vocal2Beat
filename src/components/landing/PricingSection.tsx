import { Check, ArrowRight } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/mo",
      desc: "Perfect for experimenting with AI music generation.",
      features: [
        "1 Custom Voice Model",
        "5 AI Generations / month",
        "Standard Quality Audio",
        "Public License"
      ],
      cta: "Start for Free",
      popular: false,
      color: "slate"
    },
    {
      name: "Pro Creator",
      price: "$29",
      period: "/mo",
      desc: "For artists ready to release professional tracks.",
      features: [
        "3 Custom Voice Models",
        "Unlimited Generations",
        "Lossless WAV Export",
        "Commerical Rights",
        "Stem Separation"
      ],
      cta: "Get Pro Access",
      popular: true,
      color: "brand"
    },
    {
      name: "Studio",
      price: "$99",
      period: "/mo",
      desc: "Full power for production houses and labels.",
      features: [
        "10 Custom Voice Models",
        "Dedicated GPU Instance",
        "API Access",
        "Priority Support",
        "White Labeling"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "slate"
    }
  ];

  return (
    <section id="pricing" className="relative px-6 py-32 bg-slate-950 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-magenta/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6">
            Simple, Transparent <span className="text-gradient-primary">Pricing</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your creative journey. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`
                relative p-8 rounded-3xl border transition-all duration-300 group
                ${plan.popular 
                  ? 'bg-slate-950/80 border-brand/50 shadow-[0_0_50px_rgba(99,102,241,0.15)] scale-105 z-10' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 w-full left-0 flex justify-center">
                  <span className="px-4 py-1 bg-gradient-to-r from-brand to-accent-magenta text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-300'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500 font-medium">{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm">{plan.desc}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <div className={`
                      flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                      ${plan.popular ? 'bg-brand/20 text-brand-light' : 'bg-white/10 text-slate-400'}
                    `}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={plan.popular ? 'text-slate-200' : 'text-slate-400'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`
                w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                ${plan.popular 
                  ? 'bg-brand hover:bg-brand-dark text-white shadow-lg hover:shadow-brand/25' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                }
              `}>
                {plan.cta}
                {plan.popular && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto mt-24">
        <h3 className="text-3xl font-bold font-outfit text-center mb-12">Compare Features</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-slate-400 font-medium">Features</th>
                <th className="py-6 px-4 text-xl font-bold text-center">Starter</th>
                <th className="py-6 px-4 text-xl font-bold text-center text-brand-light">Pro Creator</th>
                <th className="py-6 px-4 text-xl font-bold text-center">Studio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { feature: "Voice Models", starter: "1", pro: "3", studio: "10" },
                { feature: "Monthly Generations", starter: "5", pro: "Unlimited", studio: "Unlimited" },
                { feature: "Audio Quality", starter: "Standard MP3", pro: "Lossless WAV", studio: "Lossless WAV + Stems" },
                { feature: "Commercial Rights", starter: false, pro: true, studio: true },
                { feature: "Stem Separation", starter: false, pro: true, studio: true },
                { feature: "API Access", starter: false, pro: false, studio: true },
                { feature: "Dedicated GPU", starter: false, pro: false, studio: true },
                { feature: "Support", starter: "Community", pro: "Email", studio: "Priority 24/7" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    {typeof row.starter === 'boolean' ? (
                      row.starter ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <div className="w-1 h-1 bg-slate-700 rounded-full mx-auto" />
                    ) : row.starter}
                  </td>
                  <td className="py-4 px-4 text-center text-brand-light font-medium bg-brand/5">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="w-5 h-5 text-brand-light mx-auto" /> : <div className="w-1 h-1 bg-slate-700 rounded-full mx-auto" />
                    ) : row.pro}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    {typeof row.studio === 'boolean' ? (
                      row.studio ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <div className="w-1 h-1 bg-slate-700 rounded-full mx-auto" />
                    ) : row.studio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
