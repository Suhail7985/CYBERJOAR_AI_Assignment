import React, { useState } from 'react';
import { Shield, Lock, Mail, User, ChevronRight, AlertCircle } from 'lucide-react';
import { authApi } from '../services/api';

import { useNavigate } from 'react-router-dom';

const SignupPage = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Field Agent'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.register(formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onSignupSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden font-inter">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <User size={32} className="text-white" />
           </div>
           <h1 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase">Agency Recruitment</h1>
           <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Personnel Onboarding Portal</p>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
           {error && (
             <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 mb-6">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-xs text-red-400 font-medium">{error}</p>
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assigned Email</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Clearance Level (Role)</label>
                 <select 
                   className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-gray-300"
                   value={formData.role}
                   onChange={(e) => setFormData({...formData, role: e.target.value})}
                 >
                    <option value="Field Agent">Field Agent (Level 1)</option>
                    <option value="Analyst">Intelligence Analyst (Level 2)</option>
                    <option value="Commander">Operational Commander (Level 3)</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      type="password" 
                      required
                      className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2 group mt-4"
              >
                {loading ? 'PROCESSING...' : 'INITIALIZE AGENT'}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </form>
        </div>

        <div className="mt-8 text-center">
           <p className="text-gray-500 text-xs">
              Already have clearance? <button onClick={() => navigate('/login')} className="text-blue-500 font-bold hover:underline">Access Gate</button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
