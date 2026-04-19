import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20',
    secondary: 'bg-[#222] hover:bg-[#333] text-gray-300 border border-[#444]',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-400'
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
