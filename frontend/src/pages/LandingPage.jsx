import React from 'react';
import { Shield, Globe, Zap, Database, ChevronRight, Activity, Cpu, Layers } from 'lucide-react';

const LandingPage = ({ user, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30 overflow-x-hidden font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                 <Shield size={24} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">CyberJoar Fusion</span>
           </div>
           <div className="hidden md:flex items-center gap-8 mr-8">
              <a href="#features" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors">Capabilities</a>
              <a href="#workflow" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors">Workflow</a>
              <a href="#security" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors">Security</a>
           </div>
           <button 
             onClick={onGetStarted}
             className="bg-white text-black font-bold py-2.5 px-6 rounded-full text-sm hover:bg-emerald-400 transition-all active:scale-95"
           >
              {user ? 'Open Dashboard' : 'Access Gate'}
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
         {/* Background Glows */}
         <div className="absolute top-[10%] left-[5%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse"></div>
         <div className="absolute bottom-[0%] right-[5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px]"></div>
         
         <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 py-2 px-5 rounded-full text-emerald-500 text-xs font-bold uppercase tracking-[0.3em] mb-10 animate-in fade-in slide-in-from-bottom-4">
               <Zap size={14} className="animate-bounce" /> Tactical Awareness 2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-700">
               Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-600">Information Domain</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000">
               The ultimate common operating picture for field commanders. Fuse OSINT, HUMINT, and IMINT into actionable tactical superiority.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <button 
                 onClick={onGetStarted}
                 className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-6 px-12 rounded-2xl transition-all shadow-2xl shadow-emerald-500/30 flex items-center gap-4 group active:scale-95 text-lg"
               >
                  {user ? 'CONTINUE TO DASHBOARD' : 'INITIALIZE SYSTEM'} <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0a0a0a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Agent" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-[#0a0a0a] bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-black">
                     +2.4k
                  </div>
               </div>
            </div>
         </div>

         {/* Dashboard Preview Mockup */}
         <div className="max-w-7xl mx-auto mt-32 relative animate-in fade-in zoom-in duration-1000">
            <div className="relative group">
               {/* Decorative elements */}
               <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-3xl"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-emerald-500/30 rounded-br-3xl"></div>
               
               <div className="bg-[#111] rounded-[2.5rem] p-4 border border-white/10 shadow-[0_0_120px_rgba(16,185,129,0.15)] overflow-hidden">
                  <div className="aspect-[16/9] bg-black rounded-[1.8rem] overflow-hidden relative group">
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70"></div>
                     <img 
                       src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
                       alt="Strategic View" 
                       className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all duration-3000 ease-out" 
                     />
                     <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-700">
                           <Activity size={64} className="text-emerald-500 animate-pulse" />
                        </div>
                     </div>
                     {/* Floating Data UI Elements */}
                     <div className="absolute top-12 left-12 z-20 space-y-4 animate-in slide-in-from-left duration-1000">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                           <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Signal Strength</div>
                           <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[85%] animate-pulse"></div>
                           </div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                           <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1">Uptime Index</div>
                           <div className="text-lg font-mono">99.982%</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/[0.01] py-12">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
               { label: 'Data Nodes', val: '1.2M+' },
               { label: 'Signal Latency', val: '24ms' },
               { label: 'Active Clusters', val: '142' },
               { label: 'System Health', val: 'OPTIMAL' }
            ].map((stat, i) => (
               <div key={i} className="text-center">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] mb-2">{stat.label}</div>
                  <div className="text-3xl font-black font-mono text-white tracking-tighter">{stat.val}</div>
               </div>
            ))}
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Tactical Superiority</h2>
               <p className="text-gray-500 max-w-xl mx-auto uppercase text-xs font-bold tracking-[0.3em]">Built for high-stakes operational environments</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  {
                     icon: <Globe size={28} />,
                     title: 'Geospatial Anchoring',
                     desc: 'Every signal is precisely mapped to its physical origin. Support for high-fidelity terrain, satellite, and tactical dark mode grids.',
                     color: 'emerald'
                  },
                  {
                     icon: <Cpu size={28} />,
                     title: 'AI Threat Analysis',
                     desc: 'Automated OSINT retrieval and pattern recognition. Generate executive summaries and predictive trajectories instantly.',
                     color: 'blue'
                  },
                  {
                     icon: <Database size={28} />,
                     title: 'Multi-Modal Ingest',
                     desc: 'Seamlessly process CSV, JSON, and raw Imagery. Drag-and-drop tactical reports directly into the fusion database.',
                     color: 'purple'
                  },
                  {
                     icon: <Shield size={28} />,
                     title: 'Zero Trust Security',
                     desc: 'Military-grade encryption for all intel flows. Role-based access ensures data remains on a need-to-know basis.',
                     color: 'red'
                  },
                  {
                     icon: <Zap size={28} />,
                     title: 'Real-Time Sync',
                     desc: 'Sub-second latency across all connected nodes. Instant signal distribution to field agents globally.',
                     color: 'orange'
                  },
                  {
                     icon: <Layers size={28} />,
                     title: 'Contextual Layers',
                     desc: 'Overlay weather, infrastructure, and demographic data to reveal hidden correlations in strategic environments.',
                     color: 'emerald'
                  }
               ].map((feat, i) => (
                  <div key={i} className="group p-10 bg-[#111] border border-white/5 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2">
                     <div className={`w-14 h-14 bg-${feat.color}-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                        <div className={`text-${feat.color}-500`}>{feat.icon}</div>
                     </div>
                     <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                     <p className="text-gray-500 leading-relaxed text-sm">
                        {feat.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-32 bg-white/[0.01] px-6">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <div className="space-y-4">
                     <div className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Operational Flow</div>
                     <h2 className="text-5xl font-black tracking-tighter">How Fusion Works</h2>
                  </div>
                  
                  <div className="space-y-10">
                     {[
                        { step: '01', title: 'Data Collection', desc: 'Connect to global OSINT streams, HUMINT field reports, and IMINT satellite imagery.' },
                        { step: '02', title: 'AI Fusion', desc: 'Our engine processes millions of data points to identify patterns, anomalies, and high-value targets.' },
                        { step: '03', title: 'Actionable Intel', desc: 'Visualize threats on the tactical grid and deploy resources with total situational awareness.' }
                     ].map((step, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="text-4xl font-black font-mono text-white/10 group-hover:text-emerald-500/30 transition-colors">{step.step}</div>
                           <div className="space-y-2 pt-1">
                              <h4 className="text-xl font-bold text-white">{step.title}</h4>
                              <p className="text-gray-500 max-w-sm leading-relaxed">{step.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden">
                     <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                           <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signal Queue</div>
                           <div className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">LIVE</div>
                        </div>
                        {[1,2,3,4].map(i => (
                          <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                             <div className="flex-1 space-y-1">
                                <div className="h-2 w-24 bg-white/10 rounded"></div>
                                <div className="h-1.5 w-40 bg-white/5 rounded"></div>
                             </div>
                             <div className="text-[10px] font-mono text-gray-500">0.00{i}s</div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 px-6">
         <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 p-16 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <Shield size={64} className="text-emerald-500 mx-auto mb-10" />
            <h2 className="text-4xl font-black mb-8">Role-Based Access Control</h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
               Secure your operation with three distinct mission roles. Whether you're a Field Agent, Strategic Analyst, or Mission Commander, you get the intelligence you need—and nothing else.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
               {['Field Agent', 'Analyst', 'Commander'].map(role => (
                 <div key={role} className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                    <div className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-2">Role</div>
                    <div className="text-sm font-bold text-white">{role}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-16 px-6 border-t border-white/5 bg-black">
         <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-16 mb-24">
               <div className="space-y-8 col-span-2">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Shield size={18} className="text-white" />
                     </div>
                     <span className="text-lg font-black tracking-tighter uppercase">CyberJoar Fusion</span>
                  </div>
                  <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                     The world's first open-source tactical intelligence fusion platform. Built for transparency, security, and situational dominance.
                  </p>
                  <div className="flex gap-6">
                     {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map(social => (
                       <a key={social} href="#" className="text-gray-500 hover:text-emerald-500 text-xs font-bold transition-colors uppercase tracking-widest">{social}</a>
                     ))}
                  </div>
               </div>
               
               <div className="space-y-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white">Platform</h4>
                  <ul className="space-y-4">
                     {['Capabilities', 'Intelligence Grid', 'Security Protocol', 'API Reference'].map(link => (
                       <li key={link}><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{link}</a></li>
                     ))}
                  </ul>
               </div>

               <div className="space-y-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white">Resources</h4>
                  <ul className="space-y-4">
                     {['Operational Manual', 'Strategic Reports', 'System Status', 'Help Center'].map(link => (
                       <li key={link}><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{link}</a></li>
                     ))}
                  </ul>
               </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
               <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                  © 2026 CYBERJOAR TACTICAL SYSTEMS | CLASSIFIED PROJECT
               </p>
               <div className="flex gap-8">
                  <a href="#" className="text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest">Privacy Policy</a>
                  <a href="#" className="text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest">Terms of Engagement</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
