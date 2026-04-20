import React, { useState } from 'react';
import { X, Calendar, Shield, Zap, FileText, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScheduleModal = ({ isOpen, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Intelligence',
    priority: 'Medium',
    frequency: 'Once',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({
      ...formData,
      id: `RPT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'Scheduled',
      date: formData.date
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#111] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#111] to-[#161616]">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Calendar className="text-emerald-500" size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Schedule Report</h2>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Automated Intelligence Generation</p>
               </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Report Title</label>
              <input 
                type="text"
                required
                placeholder="e.g., Strategic Border Assessment"
                className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Report Type</label>
                <select 
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Intelligence">Intelligence</option>
                  <option value="Predictive">Predictive</option>
                  <option value="System">System</option>
                  <option value="Operational">Operational</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Priority</label>
                <select 
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Schedule Date</label>
                  <div className="relative">
                     <input 
                        type="date"
                        required
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Frequency</label>
                  <select 
                     className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                     value={formData.frequency}
                     onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  >
                     <option value="Once">One-time</option>
                     <option value="Daily">Daily</option>
                     <option value="Weekly">Weekly</option>
                     <option value="Monthly">Monthly</option>
                  </select>
               </div>
            </div>

            <div className="pt-4">
               <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 group"
               >
                  <Clock size={18} className="group-hover:animate-spin-slow" /> 
                  CONFIRM SCHEDULE
               </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScheduleModal;
