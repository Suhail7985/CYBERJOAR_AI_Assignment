import React from 'react';
import { FileText, Download, Filter, Calendar, ChevronRight, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { platformStats } from '../data/statsData';

const Reports = ({ user }) => {
  const reports = [
    { id: 'RPT-001', title: 'Strategic Threat Assessment', date: '2024-04-18', status: 'Published', type: 'Intelligence' },
    { id: 'RPT-002', title: 'Urban Growth Projection Q2', date: '2024-04-15', status: 'Draft', type: 'Predictive' },
    { id: 'RPT-003', title: 'Signal Fusion Audit', date: '2024-04-12', status: 'Published', type: 'System' },
    { id: 'RPT-004', title: 'Field Agent Activity Log', date: '2024-04-10', status: 'Archived', type: 'Operational' },
  ];

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-[0.3em]">
           <FileText size={14} className="animate-pulse" /> Intelligence Reports
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase">
          Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Repository</span>
        </h1>
        <p className="text-gray-500 max-w-2xl font-medium">
          Manage and access all generated intelligence reports and strategic analysis documents.
        </p>
      </div>

      {/* Shared Stats */}
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
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
          </motion.div>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">Recent Intelligence Docs</h2>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                <Filter size={14} /> Filter
             </button>
             <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20">
                <Calendar size={14} /> Schedule New
             </button>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-white/5">
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Report ID</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Document Title</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {reports.map((report) => (
                   <tr key={report.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6 text-xs font-mono text-gray-500">{report.id}</td>
                      <td className="p-6">
                         <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{report.title}</div>
                      </td>
                      <td className="p-6">
                         <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded-md text-gray-400 uppercase tracking-tighter">
                            {report.type}
                         </span>
                      </td>
                      <td className="p-6 text-xs text-gray-500 font-medium">{report.date}</td>
                      <td className="p-6">
                         <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
                            report.status === 'Published' ? 'text-emerald-500 bg-emerald-500/10' :
                            report.status === 'Draft' ? 'text-blue-500 bg-blue-500/10' :
                            'text-gray-500 bg-gray-500/10'
                         }`}>
                            {report.status}
                         </span>
                      </td>
                      <td className="p-6">
                         <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white hover:bg-emerald-500 transition-all">
                            <Download size={16} />
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
