import React from 'react';
import { Home, Globe, BarChart2, FileText, Download, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard Home', icon: Home, path: '/' },
    { name: 'Fusion Module', icon: Shield, path: '/fusion-dashboard' },
    { name: 'Growth Module', icon: BarChart2, path: '/urban-growth' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Export', icon: Download, path: '/export' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 bg-black/60 backdrop-blur-xl border-r border-white/5 z-[900] transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden md:flex flex-col`}
    >
      <div className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-emerald-500' : 'group-hover:text-emerald-400 transition-colors'} />
              {!isCollapsed && (
                <span className="text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-3 text-gray-500 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Collapse</span></div>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
