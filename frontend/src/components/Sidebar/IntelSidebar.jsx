import React from 'react';
import { Search, Filter, Clock, MapPin, Eye, AlertCircle, ChevronRight, ChevronLeft, X } from 'lucide-react';

const IntelSidebar = ({ intelList, selectedId, onSelect, onFilterChange, loading, onGenerateReport, user }) => {
  return (
    <div className="w-full md:w-96 h-full bg-[#0f0f0f] border-l border-[#222] flex flex-col shadow-2xl z-20">
      {/* Search & Filter Section */}
      <div className="p-6 border-b border-[#222] space-y-4">
        <div className="flex items-center justify-between md:hidden mb-2">
           <button 
             onClick={() => onSelect(null)} 
             className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest"
           >
              <ChevronLeft size={16} /> Back to Grid
           </button>
           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Intel List</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search intelligence..." 
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            onChange={(e) => onFilterChange({ sourceType: e.target.value })}
            className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg py-2 px-3 text-xs text-gray-400 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Sources</option>
            <option value="OSINT">OSINT</option>
            <option value="HUMINT">HUMINT</option>
            <option value="IMINT">IMINT</option>
          </select>
          <button className="bg-[#1a1a1a] border border-[#333] p-2 rounded-lg text-gray-400 hover:text-white">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : intelList.length === 0 ? (
          <div className="p-10 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500 text-sm">No intelligence entries found for current parameters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#222]">
            {intelList.map((item) => (
              <div 
                key={item._id || item.id}
                onClick={() => onSelect(item)}
                className={`p-5 transition-all cursor-pointer hover:bg-[#151515] group ${
                  selectedId === item._id ? 'bg-[#1a1a1a] border-l-4 border-emerald-500' : 'border-l-4 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.sourceType === 'HUMINT' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.sourceType === 'IMINT' ? 'bg-red-400/10 text-red-400' :
                    'bg-blue-400/10 text-blue-400'
                  }`}>
                    {item.sourceType}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-gray-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {item.location.coordinates[1].toFixed(2)}, {item.location.coordinates[0].toFixed(2)}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-gray-700 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Action */}
      {user?.role !== 'Field Agent' && (
        <div className="p-6 bg-[#0c0c0c] border-t border-[#222]">
          <button 
            onClick={onGenerateReport}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            GENERATE THREAT REPORT
          </button>
        </div>
      )}
    </div>
  );
};

export default IntelSidebar;
