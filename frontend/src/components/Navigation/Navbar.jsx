import React, { useState, useRef, useEffect } from 'react';
import { Shield, Bell, Search, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home',                     path: '/' },
    { name: 'Intelligence Dashboard',   path: '/fusion-dashboard' },
    { name: 'Urban Growth Predictor',   path: '/urban-growth' },
  ];

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
    navigate('/landing');
  };

  return (
    <nav className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl fixed top-0 left-0 right-0 z-[1000] px-4 md:px-6 flex items-center justify-between">
      {/* Left — Logo + Nav Links */}
      <div className="flex items-center gap-6 md:gap-8">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-sm font-black tracking-tighter text-white uppercase hidden sm:block">
            CyberJoar <span className="text-emerald-500">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                location.pathname === link.path
                  ? 'text-emerald-400'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right — Search + Actions + User */}
      <div className="flex items-center gap-3">
        {/* Search (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <Search size={14} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search platform..."
            className="bg-transparent border-none outline-none text-[10px] text-white w-28 placeholder:text-gray-600"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-black" />
        </button>

        <div className="h-7 w-px bg-white/10" />

        {/* User Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:bg-white/5 rounded-xl px-2 py-1.5 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src={`https://i.pravatar.cc/80?u=${user?.email || 'default'}`}
                  alt="User"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[10px] font-bold text-white uppercase tracking-tighter leading-none">
                {user?.name || 'Agent'}
              </div>
              <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">
                {user?.role || 'Field Agent'}
              </div>
            </div>
            <ChevronDown size={14} className={`text-gray-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[2000]">
              <div className="px-4 py-3 border-b border-white/5">
                <div className="text-xs font-bold text-white">{user?.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{user?.email}</div>
              </div>
              <div className="py-2 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
