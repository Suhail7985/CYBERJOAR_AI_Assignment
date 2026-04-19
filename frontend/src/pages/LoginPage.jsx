import React, { useState } from 'react';
import { Shield, Lock, Mail, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { authApi } from '../services/api';

const LoginPage = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLoginSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Access Denied.');
    } finally {
      setLoading(false);
    }
  };

  const useDemo = (role) => {
    const creds = {
      'Commander': { email: 'commander@cyberjoar.ai', pass: 'commander123' },
      'Analyst': { email: 'analyst@cyberjoar.ai', pass: 'analyst123' },
      'Field Agent': { email: 'agent@cyberjoar.ai', pass: 'agent123' }
    };
    setEmail(creds[role].email);
    setPassword(creds[role].pass);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse">
              <Shield size={32} className="text-white" />
           </div>
           <h1 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase">Strategic Fusion Gate</h1>
           <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Secure Intelligence Access Portal</p>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
           {error && (
             <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 mb-6 animate-in slide-in-from-top-2">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-xs text-red-400 font-medium">{error}</p>
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Agent Identifier (Email)</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="agent@cyberjoar.ai"
                      className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Access Cipher (Password)</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700 text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                {loading ? 'AUTHENTICATING...' : 'AUTHORIZE ACCESS'}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">
                 <Info size={12} /> Rapid Deployment Credentials
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {['Commander', 'Analyst', 'Field Agent'].map(role => (
                   <button 
                     key={role}
                     onClick={() => useDemo(role)}
                     className="text-[9px] font-bold bg-white/5 hover:bg-white/10 py-2 px-1 rounded-lg text-gray-400 border border-white/5 transition-colors truncate"
                   >
                     {role}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="mt-8 text-center">
           <p className="text-gray-500 text-xs">
              Unauthorized access is strictly prohibited. <button onClick={onSwitchToSignup} className="text-emerald-500 font-bold hover:underline">New Recruitment</button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
