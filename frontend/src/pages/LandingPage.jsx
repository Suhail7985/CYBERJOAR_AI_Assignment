import React from 'react';
import { Shield, Globe, Zap, Database, ChevronRight, Activity, Cpu } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
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
           <button 
             onClick={onGetStarted}
             className="bg-white text-black font-bold py-2.5 px-6 rounded-full text-sm hover:bg-emerald-400 transition-all active:scale-95"
           >
              Access Gate
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
         {/* Background Glows */}
         <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>

         <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 py-2 px-4 rounded-full text-emerald-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4">
               <Zap size={14} /> Next-Gen Tactical Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
               Unified Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Intelligence Fusion</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
               Break down data silos with the world's most advanced Multi-Source dashboard. Anchor OSINT, HUMINT, and IMINT into a single Common Operating Picture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <button 
                 onClick={onGetStarted}
                 className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-5 px-10 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3 group active:scale-95"
               >
                  INITIALIZE SYSTEM <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <a href="#features" className="text-gray-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">
                  Explore Capabilities
               </a>
            </div>
         </div>

         {/* Dashboard Preview Mockup */}
         <div className="max-w-6xl mx-auto mt-24 relative animate-in fade-in zoom-in duration-1000">
            <div className="bg-[#111] rounded-3xl p-4 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
               <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" alt="Dashboard" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl backdrop-blur-md">
                        <Activity size={48} className="text-emerald-500 animate-pulse" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white/[0.02]">
         <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
               <div className="space-y-6 p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                     <Globe size={24} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">Geospatial Anchoring</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                     Every signal is precisely mapped to its physical origin. Support for high-fidelity terrain, satellite, and tactical dark mode grids.
                  </p>
               </div>
               <div className="space-y-6 p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                     <Cpu size={24} className="text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">AI Threat Analysis</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                     Automated OSINT retrieval and pattern recognition. Generate executive summaries and predictive trajectories instantly.
                  </p>
               </div>
               <div className="space-y-6 p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                     <Database size={24} className="text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold">Multi-Modal Ingest</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                     Seamlessly process CSV, JSON, and raw Imagery. Drag-and-drop tactical reports directly into the fusion database.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
         <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 CYBERJOAR TACTICAL SYSTEMS | CLASSIFIED PROJECT
         </p>
      </footer>
    </div>
  );
};

export default LandingPage;
