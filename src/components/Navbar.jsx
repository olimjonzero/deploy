import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Share2, ShieldCheck, Server, GitBranch, Menu, Settings, Calculator, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="font-black text-2xl text-slate-800 dark:text-white tracking-tighter uppercase">Market<span className="text-blue-600">Cloud</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" label="Bozor" />
            <NavLink to="/systems" label="Boshqaruv" />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
            <NavLink to="/infrastructure" icon={<Server size={16} />} label="Tarmoq" />
            <NavLink to="/security" icon={<ShieldCheck size={16} />} label="Xavfsizlik" />
            <NavLink to="/devops" icon={<GitBranch size={16} />} label="DevOps" />
            <NavLink to="/cost" icon={<Calculator size={16} />} label="Xarajat" />
            <NavLink to="/admin" icon={<Settings size={16} />} label="Admin" />
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="ml-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          <MobileNavLink to="/" label="Bozor" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/systems" label="Boshqaruv" onClick={() => setIsOpen(false)} />
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
          <MobileNavLink to="/infrastructure" label="Tarmoq Infratuzilmasi" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/security" label="Xavfsizlik" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/devops" label="DevOps / CI/CD" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/cost" label="Xarajat Kalkulyatori" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/admin" label="Admin Paneli" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-bold text-sm"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
  >
    {label}
  </Link>
);

export default Navbar;
