import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Image as ImageIcon, Users, BookOpen, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'News & Events', path: '/admin/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon className="w-5 h-5" /> },
    { name: 'Staff', path: '/admin/staff', icon: <Users className="w-5 h-5" /> },
    { name: 'Societies', path: '/admin/societies', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 font-sans text-white">
      {/* Sidebar */}
      <aside className={`bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
          {!collapsed && <span className="font-playfair font-bold text-xl text-primary">HMV Admin</span>}
          <div 
            className={`w-8 h-8 rounded-full bg-white p-1 cursor-pointer flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <img src="https://ik.imagekit.io/5fpzilm1y/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {item.icon}
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <div 
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-zinc-400 hover:bg-red-500/10 hover:text-red-500 cursor-pointer transition-colors"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Sign Out</span>}
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
               <span className="text-sm font-semibold">{user?.email || 'admin@hmv.lk'}</span>
               <span className="text-xs text-primary font-medium tracking-wide">Administrator</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
               {user?.email?.charAt(0).toUpperCase() || 'A'}
             </div>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-zinc-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
