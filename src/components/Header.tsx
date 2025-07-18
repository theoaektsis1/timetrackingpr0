import React from 'react';
import { Clock, BarChart3, FolderOpen, Settings, Sun, Moon, Activity } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isOnBreak?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  isDarkMode, 
  onToggleTheme, 
  isOnBreak = false 
}) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard', label: t('dashboard'), icon: BarChart3 },
    { id: 'tracker', label: t('timeTracking'), icon: Clock },
    { id: 'projects', label: t('projects'), icon: FolderOpen },
    { id: 'analytics', label: t('analytics'), icon: Activity },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <header className={`glass-strong sticky top-0 z-fixed transition-all duration-300 ${
      isOnBreak ? 'pointer-events-none opacity-50' : ''
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 gradient-brand rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative gradient-brand p-3 rounded-2xl shadow-professional hover:shadow-glow transition-all duration-300">
                <Clock className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-display font-bold text-gradient">
                TimeTracker Pro
              </h1>
              <p className="text-sm text-secondary-content font-medium -mt-1">
                Professional Time Management
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 glass-medium rounded-2xl p-2 shadow-professional">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  disabled={isOnBreak}
                  className={`relative flex items-center space-x-3 px-5 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                    isActive
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-professional'
                      : `text-secondary-content ${!isOnBreak ? 'hover:bg-white/50 dark:hover:bg-neutral-700/50 hover:text-primary-content hover:scale-105' : ''}`
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 gradient-brand rounded-full"></div>
                    </>
                  )}
                  <div className="relative flex items-center space-x-3">
                    <Icon className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'group-hover:scale-110'
                    }`} />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleTheme}
              disabled={isOnBreak}
              className={`relative p-3 rounded-xl glass-light transition-all duration-300 group hover-lift ${
                !isOnBreak ? 'hover:shadow-glow' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-warning-400/20 to-accent-warning-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-accent-warning-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                ) : (
                  <Moon className="h-5 w-5 text-neutral-700 dark:text-neutral-300 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  disabled={isOnBreak}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-professional'
                      : `text-secondary-content ${!isOnBreak ? 'hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105' : ''}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};