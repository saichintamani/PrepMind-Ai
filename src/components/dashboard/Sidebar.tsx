import React from 'react';
import { X, LogOut, Settings, Headphones } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { NAV_ITEMS } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const { compactSidebar } = usePreferencesStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    onClose();
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
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
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-navy-800 shadow-lg z-50 transition-all duration-300 ${
          compactSidebar ? 'w-56' : 'w-64'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-earth-200 dark:border-navy-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              {!compactSidebar && <span className="font-bold gradient-text">PrepMind</span>}
            </div>
            <button onClick={onClose} className="lg:hidden text-navy-800 dark:text-earth-100">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                    active
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'text-navy-800 dark:text-earth-200 hover:bg-brand-50 dark:hover:bg-navy-700 hover:text-brand-600'
                  }`}
                >
                  {compactSidebar ? item.label.split(' ')[0] : item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-earth-200 dark:border-navy-600 p-4 space-y-2">
            <div className="px-4 py-2">
              <p className="text-sm text-earth-500">Logged in as</p>
              <p className="font-semibold text-navy-800 dark:text-earth-100 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                handleNavClick('/dashboard/settings');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive('/dashboard/settings')
                  ? 'bg-brand-100 dark:bg-navy-700 text-brand-600'
                  : 'text-navy-800 dark:text-earth-200 hover:bg-earth-100 dark:hover:bg-navy-700'
              }`}
            >
              <Settings size={20} />
              Settings
            </button>
            <button
              onClick={() => {
                navigate('/support');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-navy-800 dark:text-earth-200 hover:bg-earth-100 dark:hover:bg-navy-700 transition-colors"
            >
              <Headphones size={20} />
              Customer Care
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors font-medium"
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
