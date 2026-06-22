import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Moon, Sun } from 'lucide-react';
import Sidebar from './Sidebar';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useStudyStore } from '../../store/studyStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { theme, setPreferences, recordStudySession, syncActivityFromStudy } = usePreferencesStore();
  const search = useStudyStore((s) => s.search);

  useEffect(() => {
    recordStudySession();
    syncActivityFromStudy();
  }, [recordStudySession, syncActivityFromStudy]);

  const results = searchQuery.trim() ? search(searchQuery) : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setPreferences({ theme: next });
  };

  const ThemeIcon = theme === 'dark' ? Moon : Sun;

  return (
    <div className="flex h-screen bg-earth-50 dark:bg-navy-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-navy-800 border-b border-earth-200 dark:border-navy-600 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-earth-100 dark:hover:bg-navy-700 rounded text-navy-800 dark:text-earth-100"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 max-w-md relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" size={20} />
                <input
                  type="search"
                  placeholder="Search notes, quizzes, problems..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 focus:border-brand-500 focus:outline-none"
                />
              </div>
              {showResults && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-navy-800 border border-earth-200 dark:border-navy-600 rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
                  {results.length === 0 ? (
                    <p className="p-4 text-sm text-earth-500">No results found</p>
                  ) : (
                    results.map((r) => (
                      <button
                        key={`${r.type}-${r.id}`}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-brand-50 dark:hover:bg-navy-700 border-b border-earth-100 dark:border-navy-700 last:border-0"
                        onClick={() => {
                          navigate(r.path);
                          setShowResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <p className="font-medium text-navy-800 dark:text-earth-100 text-sm">{r.title}</p>
                        <p className="text-xs text-earth-500 capitalize">
                          {r.type} · {r.subtitle}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleTheme}
              className="p-2 hover:bg-earth-100 dark:hover:bg-navy-700 rounded-lg text-navy-800 dark:text-earth-100"
              title={`Theme: ${theme}`}
            >
              <ThemeIcon size={22} />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-earth-100 dark:hover:bg-navy-700 rounded-lg relative"
              title="Notifications"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Bell size={24} className="text-navy-800 dark:text-earth-100" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
