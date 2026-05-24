import React from 'react';
import { X, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { NAV_ITEMS } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-earth-200 lg:justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold gradient-text">PrepMind</span>
            </div>
            <button onClick={onClose} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 rounded-lg text-navy-800 hover:bg-brand-50 hover:text-brand-500 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-earth-200 p-4 space-y-2">
            <div className="px-4 py-2">
              <p className="text-sm text-earth-500">Logged in as</p>
              <p className="font-semibold text-navy-800">{user?.email}</p>
            </div>
            <button
              onClick={() => handleNavClick('/dashboard/settings')}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-navy-800 hover:bg-earth-100 transition-colors"
            >
              <Settings size={20} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut size={20} />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
