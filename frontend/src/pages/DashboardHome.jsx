import React from 'react';
import { Shield, BarChart2, Globe, Cpu, FileText, Layout, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { platformStats } from '../data/statsData';

const DashboardHome = ({ user }) => {

  const modules = [
    {
      id: 'fusion',
      title: 'Strategic Fusion Intelligence',
      desc: 'Real-time multi-source data fusion and geospatial mapping for tactical dominance.',
      icon: Shield,
      path: '/fusion-dashboard',
      color: 'from-emerald-500/20 to-emerald-500/5',
      accent: 'bg-emerald-500',
      tag: 'Problem Statement 1'
    },
    {
      id: 'urban',
      title: 'Urban Growth Predictor',
      desc: 'AI-driven predictive modeling for real estate investment hotspots and urban expansion.',
      icon: BarChart2,
      path: '/urban-growth',
      color: 'from-blue-500/20 to-blue-500/5',
      accent: 'bg-blue-500',
      tag: 'Problem Statement 3'
    }
  ];

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-[0.3em]">
           <Zap size={14} className="animate-pulse" /> Platform Overview
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white">
          Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">{user?.name?.split(' ')[0] || 'Agent'}</span>
        </h1>
        <p className="text-gray-500 max-w-2xl font-medium">
          Access your tactical intelligence tools and predictive analytics modules from a unified enterprise gateway.
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
          >
             <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                   <div className="text-3xl font-black font-mono text-white tracking-tighter">{stat.value}</div>
                </div>
                <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon size={20} />
                </div>
             </div>
             {/* Decorative background element */}
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
          </motion.div>
        ))}
      </div>

      {/* Module Selector */}
      <div className="space-y-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">Active Intelligence Modules</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className={`bg-gradient-to-br ${module.color} border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between group hover:border-white/20 transition-all min-h-[380px] relative overflow-hidden`}
            >
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                     <div className={`w-16 h-16 ${module.accent} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
                        <module.icon size={32} className="text-white" />
                     </div>
                     <span className="text-[10px] font-bold text-gray-400 bg-black/40 px-4 py-2 rounded-full border border-white/5 uppercase tracking-widest">
                        {module.tag}
                     </span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">{module.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md font-medium">
                    {module.desc}
                  </p>
               </div>

               <div className="relative z-10 pt-10">
                  <Link 
                    to={module.path}
                    className="inline-flex items-center gap-3 bg-white text-black font-black py-4 px-8 rounded-2xl group-hover:gap-5 transition-all active:scale-95"
                  >
                    OPEN MODULE <ChevronRight size={20} />
                  </Link>
               </div>

               {/* Large Background Icon */}
               <module.icon size={200} className="absolute -right-10 -bottom-10 text-white/[0.03] -rotate-12 group-hover:rotate-0 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
         <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Enterprise Platform v2.4.0-Alpha</p>
         <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Documentation</button>
            <button className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Support API</button>
            <button className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Security Audit</button>
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;
