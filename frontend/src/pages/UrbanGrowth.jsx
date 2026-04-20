import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import {
  TrendingUp, Home, DollarSign, Construction, Activity, BarChart2,
  Search, ArrowUpRight, Download, FileText, Zap, X, Shield
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { urbanGrowthData } from '../data/urbanGrowthData';
import { calculateGrowthScore, getClassification } from '../utils/growthCalculator';

// Fix Leaflet default icon issue in Vite
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIconPng, shadowUrl: markerShadowPng });

// Smoothly fly to selected area — only triggers when lat/lng change
function ChangeView({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 10, { duration: 1.0, easeLinearity: 0.25 });
    }
  }, [lat, lng]); // eslint-disable-line
  return null;
}

// Color-coded marker icons by growth status
const getIcon = (status) => {
  const colorMap = {
    'High Growth': '#10b981',
    'Emerging':    '#f59e0b',
    'Stable':      '#3b82f6',
    default:       '#ef4444',
  };
  const color = colorMap[status] || colorMap.default;
  return L.divIcon({
    className: '',
    html: `<div style="background-color:${color};width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px ${color}88;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const UrbanGrowth = () => {
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedArea, setSelectedArea] = useState(urbanGrowthData[0] || null);
  const [timeHorizon, setTimeHorizon] = useState('24');

  const [isReportOpen, setIsReportOpen] = useState(false);

  // Export filtered data to CSV
  const handleExportCSV = () => {
    if (!filteredData.length) return;
    
    const headers = ['Area', 'City', 'Price per SqFt', 'Rental Yield', 'Infra Score', 'Demand Score', 'Growth Status', 'Suggested Action'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        `"${item.area}"`,
        `"${item.city}"`,
        item.priceSqFt,
        item.rentalYield,
        item.infraScore,
        item.demandScore,
        `"${item.status}"`,
        `"${item.suggestedAction}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `urban_growth_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = useMemo(() => {
    if (!urbanGrowthData) return [];
    const q = searchTerm.toLowerCase();
    return urbanGrowthData.filter(
      item => item.area.toLowerCase().includes(q) || item.city.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const chartData = useMemo(() => {
    if (!selectedArea?.priceHistory) return [];
    return selectedArea.priceHistory.map((price, i) => ({
      period: `Y${i + 1}`,
      price,
      yield: parseFloat((selectedArea.rentalYield + i * 0.1).toFixed(1)),
    }));
  }, [selectedArea]);

  const stats = [
    { label: 'High Growth Zones',  value: urbanGrowthData.filter(d => d.status === 'High Growth').length, icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Avg Growth Score',   value: Math.round(urbanGrowthData.reduce((a, d) => a + calculateGrowthScore(d), 0) / urbanGrowthData.length), icon: Activity, color: 'text-blue-500' },
    { label: 'Undervalued Markets',value: urbanGrowthData.filter(d => d.suggestedAction === 'Buy').length, icon: DollarSign, color: 'text-purple-500' },
    { label: 'Rental Yield Avg',   value: (urbanGrowthData.reduce((a, d) => a + d.rentalYield, 0) / urbanGrowthData.length).toFixed(1) + '%', icon: Home, color: 'text-orange-500' },
    { label: 'Infra Projects',     value: '24', icon: Construction, color: 'text-pink-500' },
    { label: 'ROI Outlook',        value: '+18%', icon: Zap, color: 'text-yellow-500' },
  ];

  if (!selectedArea) return (
    <div className="p-8 text-center text-gray-500">No urban growth data available.</div>
  );

  const growthScore    = calculateGrowthScore(selectedArea);
  const classification = getClassification(growthScore);

  return (
    <div className="p-6 md:p-8 space-y-10 animate-in fade-in duration-700">

      {/* ── Module Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-[0.3em]">
            <BarChart2 size={14} /> Real Estate Analytics
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
            Predictive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Urban Growth
            </span>{' '}
            Modeling
          </h1>
          <p className="text-gray-500 max-w-2xl font-medium text-sm">
            AI-driven evaluation of real estate investment hotspots based on infrastructure, demand, and growth velocity.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all active:scale-95"
          >
            <Download size={14} /> Export CSV
          </button>
          <button 
            onClick={() => setIsReportOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <FileText size={14} /> Generate Report
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#111] border border-white/5 p-5 rounded-3xl group hover:border-blue-500/30 transition-all"
          >
            <div className={`${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
              <stat.icon size={20} />
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-xl font-black text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Map + Analytics Panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-4 overflow-hidden">
            {/* Map overlay controls */}
            <div className="flex flex-wrap items-center gap-3 mb-3 px-2">
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2 flex-1 min-w-[160px]">
                <Search size={14} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search area or city…"
                  className="bg-transparent border-none outline-none text-xs text-white w-full placeholder:text-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
              >
                <option value="24">24 Month Horizon</option>
                <option value="36">36 Month Horizon</option>
                <option value="60">60 Month Horizon</option>
              </select>
            </div>

            {/* Legend */}
            <div className="flex gap-4 px-2 mb-3">
              {[
                { label: 'High Growth', color: '#10b981' },
                { label: 'Emerging',    color: '#f59e0b' },
                { label: 'Stable',      color: '#3b82f6' },
                { label: 'Premium',     color: '#ef4444' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div style={{ background: l.color }} className="w-2.5 h-2.5 rounded-full" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{l.label}</span>
                </div>
              ))}
            </div>

            <div className="h-[460px] w-full rounded-[1.5rem] overflow-hidden border border-white/5">
              <MapContainer
                center={[selectedArea.lat, selectedArea.lng]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <ChangeView lat={selectedArea.lat} lng={selectedArea.lng} />
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                />
                {filteredData.map(item => (
                  <Marker
                    key={item.id}
                    position={[item.lat, item.lng]}
                    icon={getIcon(item.status)}
                    eventHandlers={{ click: () => setSelectedArea(item) }}
                  >
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <div style={{ fontWeight: 900, fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>{item.area}</div>
                        <div style={{ color: '#888', fontSize: 10, marginBottom: 8, textTransform: 'uppercase' }}>{item.city}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          <div>
                            <div style={{ fontSize: 9, color: '#aaa', fontWeight: 700 }}>PRICE/sqft</div>
                            <div style={{ fontSize: 13, fontWeight: 900 }}>₹{item.priceSqFt.toLocaleString()}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: '#aaa', fontWeight: 700 }}>YIELD</div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: '#10b981' }}>{item.rentalYield}%</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 8, padding: '4px 8px', background: '#10b98120', color: '#10b981', borderRadius: 6, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>
                          {item.suggestedAction}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="space-y-6">
          {/* Growth Score Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight">{selectedArea.area}</h3>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1">{selectedArea.city}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
                  <Zap size={20} className="text-white" />
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-5 border border-white/10 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Growth Velocity Score</span>
                  <span className="text-2xl font-black font-mono">{growthScore}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${growthScore}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <div className={`mt-3 inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest ${classification.color}`}>
                  {classification.label}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-[8px] text-blue-100 uppercase font-bold mb-1">Rental Yield</div>
                  <div className="text-lg font-black">{selectedArea.rentalYield}%</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-[8px] text-blue-100 uppercase font-bold mb-1">Infra Score</div>
                  <div className="text-lg font-black">{selectedArea.infraScore}/100</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 mb-4">
                <div className="text-[8px] text-blue-100 uppercase font-bold mb-2">Action Recommendation</div>
                <div className={`text-sm font-black uppercase tracking-widest ${
                  selectedArea.suggestedAction === 'Buy' ? 'text-emerald-300' :
                  selectedArea.suggestedAction === 'Hold' ? 'text-blue-200' : 'text-yellow-300'
                }`}>
                  ● {selectedArea.suggestedAction}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-blue-50 font-medium italic">"{selectedArea.details}"</p>
            </div>
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          {/* Price Trend Chart */}
          <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Price Trend</h3>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                <ArrowUpRight size={12} /> 5 YEAR
              </span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="period" stroke="#444" fontSize={10} tickLine={false} />
                  <YAxis stroke="#444" fontSize={10} hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', fontSize: '11px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v) => [`₹${v.toLocaleString()}`, 'Price/sqft']}
                  />
                  <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#priceGrad)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Comparative Smart Table ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">Comparative Market Analysis</h2>
          <span className="text-[10px] text-gray-600 font-bold uppercase">
            {filteredData.length} / {urbanGrowthData.length} zones
          </span>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5">
                  {['Region', 'Price / Sq.Ft', 'Rent Yield', 'Infra', 'Demand', 'Score', 'Action'].map(h => (
                    <th key={h} className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredData.map(item => {
                  const score  = calculateGrowthScore(item);
                  const cls    = getClassification(score);
                  const active = selectedArea.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedArea(item)}
                      className={`transition-all cursor-pointer group ${
                        active ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <td className="p-5">
                        <div className={`font-bold text-sm ${active ? 'text-blue-400' : 'text-white group-hover:text-blue-400'} transition-colors`}>{item.area}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold">{item.city}</div>
                      </td>
                      <td className="p-5 text-sm font-mono text-gray-300">₹{item.priceSqFt.toLocaleString()}</td>
                      <td className="p-5">
                        <span className="text-xs font-bold text-emerald-400">{item.rentalYield}%</span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.infraScore}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">{item.infraScore}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.demandScore}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">{item.demandScore}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black ${cls.bg} ${cls.color}`}>
                          {score} — {cls.label}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${
                            item.suggestedAction === 'Buy'  ? 'bg-emerald-500' :
                            item.suggestedAction === 'Hold' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`} />
                          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{item.suggestedAction}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ── Report Modal ── */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-600/20 to-transparent">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
                   <Shield className="text-blue-500" /> Strategic Market Report
                </h2>
                <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-[0.2em]">Hotspot: {selectedArea.area} | Ref: UG-X9</p>
              </div>
              <button onClick={() => setIsReportOpen(false)} className="text-gray-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                     <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Market Maturity</div>
                     <div className="text-2xl font-black text-blue-400">74%</div>
                  </div>
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                     <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Connectivity Index</div>
                     <div className="text-2xl font-black text-emerald-400">8.2</div>
                  </div>
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                     <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Demand Ratio</div>
                     <div className="text-2xl font-black text-purple-400">1.4x</div>
                  </div>
               </div>

               <section className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <TrendingUp size={16} className="text-blue-500" /> Executive Investment Summary
                  </h3>
                  <div className="bg-black/40 border border-white/10 p-6 rounded-[2rem] leading-relaxed text-gray-300 text-sm italic border-l-4 border-l-blue-500">
                     "Comprehensive analysis of {selectedArea.area} suggests a {selectedArea.status} market trajectory. With an infrastructure score of {selectedArea.infraScore}/100 and a rental yield of {selectedArea.rentalYield}%, this hotspot is currently positioned as a '{selectedArea.suggestedAction.toUpperCase()}' asset. AI modeling predicts a price appreciation of ~{Math.round(selectedArea.rentalYield * 2.5)}% over the next 36 months based on current demand patterns."
                  </div>
               </section>

               <section className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Growth Factor Attribution</h3>
                  <div className="space-y-3">
                     {[
                        { label: 'Public Transport Access', val: selectedArea.infraScore + 5, color: 'bg-blue-500' },
                        { label: 'Commercial Density', val: selectedArea.demandScore - 8, color: 'bg-purple-500' },
                        { label: 'Price Momentum', val: 78, color: 'bg-emerald-500' }
                     ].map(f => (
                        <div key={f.label} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                           <span className="text-[10px] font-bold w-32 uppercase tracking-tighter text-gray-400">{f.label}</span>
                           <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${f.color} transition-all duration-1000`} style={{ width: `${f.val}%` }}></div>
                           </div>
                           <span className="text-xs font-bold text-white">{f.val}%</span>
                        </div>
                     ))}
                  </div>
               </section>
            </div>

            <div className="p-8 border-t border-white/5 bg-black/40 flex justify-end">
               <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95">
                  <FileText size={18} /> Download Encrypted PDF
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrbanGrowth;
