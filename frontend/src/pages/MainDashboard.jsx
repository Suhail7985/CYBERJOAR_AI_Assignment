import React, { useState, useEffect } from 'react';
import DashboardMap from '../components/Map/DashboardMap';
import IntelSidebar from '../components/Sidebar/IntelSidebar';
import IntelDetailPanel from '../components/Sidebar/IntelDetailPanel';
import UploadModal from '../components/Upload/UploadModal';
import { intelligenceApi } from '../services/api';
import { Activity, Shield, Map as MapIcon, Database, Layers, Plus, X, FileText, LogOut, ChevronLeft } from 'lucide-react';

const MainDashboard = ({ user, onLogout }) => {
  const [intelData, setIntelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntel, setSelectedIntel] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filters, setFilters] = useState({
    sourceType: '',
    classification: ''
  });
  const [mapStyle, setMapStyle] = useState('dark');
  const [activeView, setActiveView] = useState('map'); // 'map', 'database', 'activity'
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle


  const fetchIntel = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await intelligenceApi.getAll(filters);
      setIntelData(res.data.data);
    } catch (error) {
      console.error('Error fetching intel:', error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntel();
    
    // Setup 30s polling for real-time data flow
    const pollInterval = setInterval(() => {
      fetchIntel(false);
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [filters]);


  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navigation Rail - Bottom Bar on Mobile, Sidebar on Desktop */}
      <div className="w-full md:w-16 h-16 md:h-full bg-[#111] border-t md:border-t-0 md:border-r border-[#222] flex flex-row md:flex-col items-center justify-around md:justify-start md:py-6 gap-4 md:gap-8 order-2 md:order-1 z-[100]">
        <div 
          onClick={() => {
            setActiveView('map');
            setSelectedIntel(null);
            fetchIntel(); // Refresh data from server
          }}
          className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center md:mb-4 shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <Shield size={24} className="text-white" />
        </div>
        <button 
          onClick={() => setActiveView('map')}
          title="Map Grid"
          className={`p-3 rounded-xl transition-all ${activeView === 'map' ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-500 hover:text-white'}`}
        >
          <MapIcon size={22} />
        </button>
        <button 
          onClick={() => setActiveView('database')}
          title="Intelligence Database"
          className={`p-3 rounded-xl transition-all ${activeView === 'database' ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-500 hover:text-white'} ${user?.role === 'Field Agent' ? 'hidden' : ''}`}
        >
          <Database size={22} />
        </button>
        <button 
          onClick={() => setActiveView('activity')}
          title="Activity Feed"
          className={`p-3 rounded-xl transition-all ${activeView === 'activity' ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-500 hover:text-white'}`}
        >
          <Activity size={22} />
        </button>
        
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-3 rounded-xl md:hidden transition-all ${isSidebarOpen ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-500'}`}
        >
          <FileText size={22} />
        </button>

        <button 
          onClick={() => setActiveView('layers')}
          title="System Layers"
          className={`p-3 rounded-xl transition-all hidden md:block ${activeView === 'layers' ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-500 hover:text-white'} ${user?.role !== 'Commander' ? 'hidden' : ''}`}
        >
          <Layers size={22} />
        </button>
        
        <div className="md:mt-auto flex flex-row md:flex-col gap-4">
            <div className="group relative hidden md:block">
               <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/5 cursor-help">
                  <span className="text-emerald-500 font-bold text-xs">{user?.name?.substring(0, 2).toUpperCase()}</span>
               </div>
               <div className="absolute left-14 bottom-0 md:top-0 bg-[#1a1a1a] border border-[#333] p-3 rounded-xl invisible group-hover:visible transition-all w-48 z-[150]">
                  <div className="text-xs font-bold text-white mb-1">{user?.name}</div>
                  <div className="text-[10px] text-emerald-500 uppercase font-bold tracking-tighter mb-2">{user?.role}</div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left text-[10px] text-red-500 hover:text-red-400 font-bold flex items-center gap-2 border-t border-white/5 pt-2"
                  >
                     TERMINATE SESSION
                  </button>
               </div>
            </div>
            <button 
              onClick={onLogout}
              title="Terminate Session"
              className="w-10 h-10 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all active:scale-90"
            >
              <LogOut size={20} />
            </button>
            <button 
              onClick={() => setIsUploadOpen(true)}
              title="Ingest Intelligence"
              className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-90"
            >
              <Plus size={24} className="text-white" />
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header Stats Bar */}
        <header className="h-16 border-b border-[#222] bg-[#0c0c0c] flex items-center px-4 md:px-6 justify-between z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-sm md:text-lg font-semibold tracking-tight uppercase text-gray-400">
              Live Operation <span className="hidden sm:inline">Dashboard</span> <span className="text-emerald-500 ml-1 sm:ml-2 font-mono">[AG-ALPHA]</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
            <div className="flex flex-col items-end min-w-fit">
              <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold">Assets</span>
              <span className="text-sm md:text-xl font-mono text-emerald-400">1,284</span>
            </div>
            <div className="flex flex-col items-end border-l border-[#222] pl-4 md:pl-8 min-w-fit">
              <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold">Intel</span>
              <span className="text-sm md:text-xl font-mono text-white">{intelData.length}</span>
            </div>
            <div className="hidden xs:flex flex-col items-end border-l border-[#222] pl-4 md:pl-8 min-w-fit">
              <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold">Risk</span>
              <span className="text-sm md:text-xl font-mono text-orange-500 italic">ELEVATED</span>
            </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {activeView === 'map' ? (
            <div className="flex-1 relative bg-[#111]">
              <DashboardMap 
                data={intelData} 
                onMarkerClick={(item) => setSelectedIntel(item)}
                selectedItem={selectedIntel}
                mapStyle={mapStyle}
              />
              
              {/* Overlay Controls */}
              <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                 <div className="bg-[#151515] p-1 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md bg-opacity-80">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setMapStyle('terrain')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mapStyle === 'terrain' ? 'bg-emerald-500 text-white shadow-lg' : 'hover:bg-[#222] text-gray-400'}`}
                      >
                        Terrain
                      </button>
                      <button 
                        onClick={() => setMapStyle('satellite')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mapStyle === 'satellite' ? 'bg-emerald-500 text-white shadow-lg' : 'hover:bg-[#222] text-gray-400'}`}
                      >
                        Satellite
                      </button>
                      <button 
                        onClick={() => setMapStyle('dark')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mapStyle === 'dark' ? 'bg-emerald-500 text-white shadow-lg' : 'hover:bg-[#222] text-gray-400'}`}
                      >
                        Dark
                      </button>
                    </div>
                </div>
              </div>
            </div>
          ) : activeView === 'database' ? (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar bg-[#0d0d0d]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                   <button 
                     onClick={() => setActiveView('map')}
                     className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4 hover:text-emerald-400 transition-colors"
                   >
                      <ChevronLeft size={16} /> Back to Tactical Grid
                   </button>
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Database className="text-emerald-500" /> Strategic Intelligence Database
                   </h2>
                   <p className="text-sm text-gray-500 mt-1">Unified view of all OSINT, HUMINT, and IMINT assets.</p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-[#222] shadow-2xl bg-[#111]">
                 <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                       <tr className="bg-[#151515] border-b border-[#222]">
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Classification</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Source</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Location</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Timestamp</th>
                       </tr>
                    </thead>
                    <tbody>
                       {intelData.map(item => (
                         <tr 
                           key={item._id} 
                           onClick={() => {setSelectedIntel(item); setActiveView('map')}}
                           className="border-b border-[#222]/50 hover:bg-emerald-500/5 cursor-pointer transition-colors group"
                         >
                            <td className="p-4">
                               <span className="text-[10px] font-bold border border-[#333] px-2 py-0.5 rounded text-gray-400 group-hover:border-emerald-500/50">
                                  {item.classification}
                               </span>
                            </td>
                            <td className="p-4">
                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                 item.sourceType === 'HUMINT' ? 'bg-emerald-500/10 text-emerald-500' :
                                 item.sourceType === 'IMINT' ? 'bg-red-400/10 text-red-400' :
                                 'bg-blue-400/10 text-blue-400'
                               }`}>
                                 {item.sourceType}
                               </span>
                            </td>
                            <td className="p-4">
                               <div className="text-sm font-medium">{item.title}</div>
                               <div className="text-[10px] text-gray-500 truncate max-w-xs">{item.description}</div>
                            </td>
                            <td className="p-4 text-xs font-mono text-gray-500">
                               {item.location.coordinates[1].toFixed(2)}, {item.location.coordinates[0].toFixed(2)}
                            </td>
                            <td className="p-4 text-xs text-gray-500">
                               {new Date(item.timestamp).toLocaleString()}
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </div>
          ) : activeView === 'activity' ? (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar bg-[#0d0d0d]">
              <div className="max-w-3xl mx-auto space-y-6">
                 <button 
                   onClick={() => setActiveView('map')}
                   className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors"
                 >
                    <ChevronLeft size={16} /> Back to Tactical Grid
                 </button>
                 <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                    <Activity className="text-emerald-500" /> Operational Activity Feed
                 </h2>
                 {intelData.map((item, i) => (
                   <div key={item._id} className="relative pl-8 pb-8 border-l border-[#222] last:pb-0">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <div className="bg-[#111] border border-[#222] p-5 rounded-2xl hover:border-emerald-500/30 transition-all">
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{item.sourceType} SIGNAL</span>
                            <span className="text-[10px] text-gray-500 font-mono">{new Date(item.timestamp).toLocaleTimeString()}</span>
                         </div>
                         <h3 className="font-bold text-white mb-2">{item.title}</h3>
                         <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                         <button 
                           onClick={() => {setSelectedIntel(item); setActiveView('map')}}
                           className="mt-4 text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                         >
                            LOCATE ON GRID <MapIcon size={12} />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar bg-[#0d0d0d]">
               <div className="max-w-4xl mx-auto">
                  <button 
                    onClick={() => setActiveView('map')}
                    className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6 hover:text-emerald-400 transition-colors"
                  >
                     <ChevronLeft size={16} /> Back to Tactical Grid
                  </button>
                  <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                    <Layers className="text-emerald-500" /> System Layers & Analytics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Source Distribution</h3>
                        <div className="space-y-4">
                           {['HUMINT', 'OSINT', 'IMINT'].map(type => {
                             const count = intelData.filter(i => i.sourceType === type).length;
                             const percent = (count / intelData.length * 100) || 0;
                             return (
                               <div key={type} className="space-y-2">
                                  <div className="flex justify-between text-xs">
                                     <span>{type}</span>
                                     <span className="text-gray-500">{count} nodes</span>
                                  </div>
                                  <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                                     <div 
                                       className="h-full bg-emerald-500 transition-all duration-1000" 
                                       style={{ width: `${percent}%` }}
                                     ></div>
                                  </div>
                               </div>
                             );
                           })}
                        </div>
                     </div>
                     <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">System Health</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#222]">
                              <div className="text-[10px] text-gray-500 uppercase font-bold">API Latency</div>
                              <div className="text-xl font-mono text-emerald-500">24ms</div>
                           </div>
                           <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#222]">
                              <div className="text-[10px] text-gray-500 uppercase font-bold">Uptime</div>
                              <div className="text-xl font-mono text-emerald-400">99.9%</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Sidebar - Toggled on mobile */}
          <div className={`
            fixed inset-y-0 right-0 z-[110] transition-transform duration-300 md:relative md:translate-x-0 md:z-20
            ${isSidebarOpen ? 'translate-x-0 w-full' : 'translate-x-full md:w-auto'}
          `}>
             {/* Mobile Close Overlay */}
             {isSidebarOpen && (
               <div 
                 onClick={() => setIsSidebarOpen(false)}
                 className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
               ></div>
             )}
             
             <IntelSidebar 
                intelList={intelData} 
                selectedId={selectedIntel?._id}
                loading={loading}
                onSelect={(item) => {
                  setSelectedIntel(item);
                  setIsSidebarOpen(false); // Close on mobile after selection
                }}
                onFilterChange={(newFilters) => setFilters(prev => ({...prev, ...newFilters}))}
                onGenerateReport={() => setIsReportOpen(true)}
                user={user}
             />
          </div>
        </div>
      </div>

      <IntelDetailPanel 
        selectedIntel={selectedIntel} 
        onClose={() => setSelectedIntel(null)} 
      />

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUploadSuccess={fetchIntel}
      />

      {/* Report Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-[#111] border border-[#333] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-8 border-b border-[#222] flex justify-between items-center bg-gradient-to-r from-[#111] to-[#1a1a1a]">
                 <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                       <Shield className="text-emerald-500" /> Strategic Threat Analysis
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">Operation: AG-ALPHA | Cycle: {new Date().toLocaleDateString()}</p>
                 </div>
                 <button onClick={() => setIsReportOpen(false)} className="text-gray-500 hover:text-white transition-colors bg-[#222] p-2 rounded-full">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#151515] p-4 rounded-2xl border border-[#222]">
                       <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Critical Nodes</div>
                       <div className="text-2xl font-mono text-red-500">{intelData.filter(i => i.classification === 'SECRET' || i.classification === 'TOP SECRET').length}</div>
                    </div>
                    <div className="bg-[#151515] p-4 rounded-2xl border border-[#222]">
                       <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Active Clusters</div>
                       <div className="text-2xl font-mono text-emerald-500">12</div>
                    </div>
                    <div className="bg-[#151515] p-4 rounded-2xl border border-[#222]">
                       <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Signal Confidence</div>
                       <div className="text-2xl font-mono text-blue-500">92%</div>
                    </div>
                 </div>

                 <section className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Activity size={16} className="text-emerald-500" /> Executive Summary
                    </h3>
                    <div className="bg-[#0c0c0c] border border-[#222] p-6 rounded-2xl leading-relaxed text-gray-300 text-sm italic border-l-4 border-l-emerald-500">
                       "Aggregate analysis of the latest {intelData.length} signals suggests an elevated risk profile in the eastern sectors. IMINT data corroborates abnormal asset movement, while HUMINT field reports indicate a shift in operational tempo. Recommended action: Increase satellite surveillance frequency over primary clusters."
                    </div>
                 </section>

                 <section className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Threats by Source</h3>
                    <div className="space-y-3">
                       {['HUMINT', 'OSINT', 'IMINT'].map(type => (
                         <div key={type} className="flex items-center gap-4 bg-[#151515] p-3 rounded-xl border border-[#222]">
                            <div className={`w-2 h-2 rounded-full ${type === 'HUMINT' ? 'bg-emerald-500' : type === 'IMINT' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                            <span className="text-xs font-bold w-16">{type}</span>
                            <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
                               <div 
                                 className={`h-full transition-all duration-1000 ${type === 'HUMINT' ? 'bg-emerald-500' : type === 'IMINT' ? 'bg-red-500' : 'bg-blue-500'}`} 
                                 style={{ width: `${(intelData.filter(i => i.sourceType === type).length / intelData.length * 100) || 0}%` }}
                               ></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>

              <div className="p-8 border-t border-[#222] bg-[#0c0c0c] flex justify-end">
                 <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20">
                    <FileText size={18} /> DOWNLOAD PDF ENCRYPTED
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>

  );
};

export default MainDashboard;
