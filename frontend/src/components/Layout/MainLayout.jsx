import React, { useState } from 'react';
import Navbar from '../Navigation/Navbar';
import Sidebar from '../Navigation/Sidebar';

const MainLayout = ({ children, user, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="flex pt-16">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
        
        <main 
          className={`flex-1 transition-all duration-300 min-h-[calc(100vh-64px)] overflow-x-hidden ${
            isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
