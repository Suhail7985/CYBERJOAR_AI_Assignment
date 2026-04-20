import React, { useState, useEffect } from 'react';
import { X, Shield, Activity, MapPin, Clock, Brain, AlertTriangle, FileText, Share2, Trash2, ChevronLeft } from 'lucide-react';
import { intelligenceApi } from '../../services/api';
import Button from '../UI/Button';

const IntelDetailPanel = ({ selectedIntel, onClose }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedIntel) {
      fetchSummary();
    }
  }, [selectedIntel?._id]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await intelligenceApi.getSummary(selectedIntel._id);
      setSummary(res.data.summary);
    } catch (error) {
      console.error('Error fetching AI summary:', error);
      setSummary('Failed to generate real-time AI summary. Check operational logs.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedIntel) return null;

  return (
    <div className="fixed md:absolute inset-0 md:inset-y-0 md:right-0 md:left-auto w-full md:w-96 bg-[#0c0c0c]/95 backdrop-blur-xl md:border-l border-[#222] shadow-2xl z-[1500] animate-in slide-in-from-right duration-300 transition-all flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#222] flex justify-between items-center bg-gradient-to-r from-emerald-500/10 to-transparent">
        <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="md:hidden text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 mr-2"
            >
               <ChevronLeft size={20} />
            </button>
            <Shield size={18} className="text-emerald-500" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400">Tactical Detail</h2>
        </div>
        <button onClick={onClose} className="hidden md:block text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-md">
            <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
            <div className="flex justify-between items-start">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedIntel.sourceType === 'HUMINT' ? 'bg-emerald-500/10 text-emerald-500' :
                    selectedIntel.sourceType === 'IMINT' ? 'bg-red-400/10 text-red-400' :
                    'bg-blue-400/10 text-blue-400'
                  }`}>
                    {selectedIntel.sourceType}
                 </span>
                 <span className="text-[10px] font-bold text-gray-500 uppercase border border-[#333] px-2 py-0.5 rounded">
                    {selectedIntel.classification}
                 </span>
            </div>
            <h1 className="text-xl font-bold leading-tight">{selectedIntel.title}</h1>
            <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={14} className="text-emerald-500/50" />
                    <span>Lat: {selectedIntel.location.coordinates[1].toFixed(4)}, Lng: {selectedIntel.location.coordinates[0].toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} className="text-emerald-500/50" />
                    <span>Captured: {new Date(selectedIntel.timestamp).toLocaleString()}</span>
                </div>
            </div>
        </section>

        {/* Tactical Image */}
        {selectedIntel.imageUrl && (
          <section className="space-y-3">
             <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                <Activity size={14} className="text-emerald-500" /> Raw IMINT Acquisition
             </div>
             <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#222] bg-[#111]">
                <img 
                  src={selectedIntel.imageUrl.startsWith('http') ? selectedIntel.imageUrl : `http://localhost:5000${selectedIntel.imageUrl}`} 
                  alt={selectedIntel.title} 
                  className="w-full h-full object-cover"
                />
             </div>
          </section>
        )}

        {/* AI Insight Section */}
        <section className="relative group">
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#151515] border border-emerald-500/20 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-tighter">
                    <Brain size={16} /> AI Fusion Insight
                </div>
                {loading ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-2 bg-white/5 rounded w-full"></div>
                        <div className="h-2 bg-white/5 rounded w-5/6"></div>
                        <div className="h-2 bg-white/5 rounded w-4/6"></div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-300 leading-relaxed italic font-serif">
                        "{summary}"
                    </p>
                )}
            </div>
        </section>

        {/* Full Context */}
        <section className="space-y-3">
             <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                <Activity size={14} /> Full Context Description
             </div>
             <p className="text-sm text-gray-400 leading-relaxed bg-[#111] p-4 rounded-xl border border-[#222]">
                {selectedIntel.description}
             </p>
        </section>

        {/* Predictive Movement Alert */}
        <section className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="text-orange-500 flex-shrink-0" size={20} />
            <div className="space-y-1">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-tighter">Predictive Analysis</h4>
                <p className="text-[11px] text-gray-500">
                    Based on current metadata, asset has a 68% probability of regrouping within the next 12 cycles.
                </p>
            </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[#222] bg-[#0c0c0c] flex gap-3">
         <Button className="flex-1" variant="secondary"><Share2 size={16} /></Button>
         <Button className="flex-1" variant="secondary"><FileText size={16} /></Button>
         <Button className="flex-1" variant="danger"><Trash2 size={16} /></Button>
      </div>
    </div>
  );
};

export default IntelDetailPanel;
