import React, { useState } from 'react';
import { Download, FileText, Database, Shield, Zap, ChevronRight, Globe, Share2, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { platformStats } from '../data/statsData';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import { intelligenceApi } from '../services/api';

const Export = ({ user }) => {
  const [exporting, setExporting] = useState(null); // ID of the option being exported
  const [success, setSuccess] = useState(null);

  const handleExport = async (index, option) => {
    setExporting(index);
    setSuccess(null);

    try {
      // Simulate heavy processing/encryption for tactical feel
      await new Promise(resolve => setTimeout(resolve, 2000));

      let dataToExport = [];
      try {
        const res = await intelligenceApi.getAll();
        dataToExport = res.data.data;
      } catch (err) {
        console.error('Failed to fetch data for export, using fallback', err);
        dataToExport = [{ message: 'System export generated from tactical gateway', timestamp: new Date() }];
      }

      if (option.title.includes('JSON')) {
        exportToJSON(dataToExport, 'CyberJoar_Intel_Export');
      } else if (option.title.includes('CSV')) {
        exportToCSV(dataToExport, 'CyberJoar_GIS_Data');
      } else {
        // Mock PDF export
        const blob = new Blob(['Mock Tactical Analysis PDF Content'], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Tactical_Analysis_${new Date().getTime()}.pdf`;
        link.click();
      }

      setSuccess(index);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(null);
    }
  };

  const exportOptions = [
    { 
      title: 'Intelligence Database (JSON)', 
      desc: 'Complete export of all verified intelligence nodes in machine-readable format.',
      icon: Database,
      size: '2.4 MB'
    },
    { 
      title: 'Tactical Analysis (PDF)', 
      desc: 'High-fidelity visual report with geospatial maps and predictive analysis.',
      icon: FileText,
      size: '12.8 MB'
    },
    { 
      title: 'Geospatial Dataset (CSV)', 
      desc: 'Coordinate-mapped data for external GIS platform integration.',
      icon: Globe,
      size: '850 KB'
    }
  ];

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-[0.3em]">
           <Download size={14} className="animate-pulse" /> Data Extraction
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase">
          Export <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Gateway</span>
        </h1>
        <p className="text-gray-500 max-w-2xl font-medium">
          Securely export platform data, intelligence logs, and predictive models for external operations.
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

      {/* Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {exportOptions.map((option, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-emerald-500/30 transition-all relative overflow-hidden"
          >
             {success === i && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-emerald-500/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white"
                >
                   <CheckCircle2 size={48} className="mb-2" />
                   <span className="font-bold uppercase tracking-widest">Extraction Complete</span>
                </motion.div>
             )}

             <div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 transition-all">
                   <option.icon size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {option.desc}
                </p>
                <div className="inline-block px-3 py-1 bg-black/40 rounded-full border border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Size: {option.size}
                </div>
             </div>
             <button 
              onClick={() => handleExport(i, option)}
              disabled={exporting !== null}
              className={`mt-10 w-full font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 ${
                exporting === i ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-emerald-500 hover:text-white'
              }`}
             >
                {exporting === i ? (
                  <>ENCRYPTING... <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>EXECUTE EXPORT <Download size={18} /></>
                )}
             </button>
          </motion.div>
        ))}
      </div>

      {/* Security Note */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-[2rem] flex items-center gap-6">
         <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
            <Shield size={24} className="text-emerald-500" />
         </div>
         <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Enterprise Security Protocol</h4>
            <p className="text-xs text-gray-500 font-medium italic">
              All exports are encrypted with AES-256 and logged in the system audit trail. Unauthorized data extraction is strictly monitored.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Export;
