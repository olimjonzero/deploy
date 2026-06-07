import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Share2, ShieldCheck, Server, GitBranch, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="font-black text-2xl text-slate-800 tracking-tighter uppercase">Market<span className="text-blue-600">Cloud</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" label="Bozor" />
            <NavLink to="/systems" label="Boshqaruv" />
            <div className="h-6 w-px bg-slate-200 mx-4"></div>
            <NavLink to="/infrastructure" icon={<Server size={16} />} label="Tarmoq" />
            <NavLink to="/security" icon={<ShieldCheck size={16} />} label="Xavfsizlik" />
            <NavLink to="/devops" icon={<GitBranch size={16} />} label="DevOps" />
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          <MobileNavLink to="/" label="Bozor" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/systems" label="Boshqaruv" onClick={() => setIsOpen(false)} />
          <div className="h-px bg-slate-100 my-2"></div>
          <MobileNavLink to="/infrastructure" label="Tarmoq Infratuzilmasi" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/security" label="Xavfsizlik" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/devops" label="DevOps / CI/CD" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-bold text-sm"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block px-4 py-3 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors"
  >
    {label}
  </Link>
);

export default Navbar;
