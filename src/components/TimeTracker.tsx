import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Coffee, Clock, MessageSquare, User, Utensils, Users } from 'lucide-react';
import { TimeEntry, Project, BreakEntry } from '../types';
import { formatDuration } from '../utils/timeUtils';
import { useLanguage } from '../hooks/useLanguage';

interface TimeTrackerProps {
  projects: Project[];
  activeEntry: TimeEntry | null;
  onStart: (projectId: string, description?: string) => void;
  onStop: () => void;
  onAddBreak: (breakEntry: Omit<BreakEntry, 'id' | 'createdAt' | 'updatedAt'>) => BreakEntry;
  onUpdateBreak: (id: string, updates: Partial<BreakEntry>) => void;
  getBreakEntries: (timeEntryId: string) => BreakEntry[];
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ 
  projects, 
  activeEntry, 
  onStart, 
  onStop, 
  onAddBreak, 
  onUpdateBreak, 
  getBreakEntries 
}) => {
  const { t } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentBreak, setCurrentBreak] = useState<BreakEntry | null>(null);
  const [selectedBreakType, setSelectedBreakType] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDuration = activeEntry ? Date.now() - new Date(activeEntry.startTime).getTime() : 0;
  const currentBreakDuration = currentBreak ? Date.now() - new Date(currentBreak.startTime).getTime() : 0;

  const handleStart = () => {
    if (selectedProjectId) {
      onStart(selectedProjectId, description);
      setDescription('');
    }
  };

  const startBreak = (breakType: string) => {
    if (!activeEntry || isOnBreak) return;

    const newBreak = onAddBreak({
      timeEntryId: activeEntry.id,
      type: breakType,
      startTime: new Date().toISOString(),
      duration: 0,
    });

    setCurrentBreak(newBreak);
    setIsOnBreak(true);
    setSelectedBreakType(breakType);
  };

  const endBreak = () => {
    if (!currentBreak) return;

    const endTime = new Date().toISOString();
    const duration = new Date(endTime).getTime() - new Date(currentBreak.startTime).getTime();

    onUpdateBreak(currentBreak.id, {
      endTime,
      duration,
    });

    setCurrentBreak(null);
    setIsOnBreak(false);
    setSelectedBreakType('');
  };

  const breakTypes = [
    { 
      id: 'lunch', 
      label: t('lunchBreak'),
      icon: Utensils,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: t('lunchDescription')
    },
    { 
      id: 'coffee', 
      label: t('coffeeBreak'),
      icon: Coffee,
      color: 'bg-amber-500 hover:bg-amber-600',
      description: t('coffeeDescription')
    },
    { 
      id: 'meeting', 
      label: t('meeting'),
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: t('meetingDescription')
    },
    { 
      id: 'personal', 
      label: t('personal'),
      icon: User,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: t('personalDescription')
    },
  ];

  const getTotalBreakTime = () => {
    if (!activeEntry) return 0;
    const breakEntries = getBreakEntries(activeEntry.id);
    const completedBreaksTime = breakEntries.reduce((sum, breakEntry) => sum + breakEntry.duration, 0);
    const currentBreakTime = currentBreak ? currentBreakDuration : 0;
    return completedBreaksTime + currentBreakTime;
  };

  const getNetWorkTime = () => {
    return Math.max(0, currentDuration - getTotalBreakTime());
  };

  return (
    <div className="relative">
      {/* Break Overlay - Blocks all interactions when on break */}
      {isOnBreak && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4 animate-fade-in">
          <div className="card-glass max-w-lg w-full animate-scale-in overflow-hidden">
            {/* Header with gradient */}
            <div className="relative p-8 bg-gradient-to-br from-accent-warning-50 to-accent-warning-100 dark:from-accent-warning-900/20 dark:to-accent-warning-800/20 border-b border-accent-warning-200/50 dark:border-accent-warning-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-warning-400/10 to-accent-warning-500/10"></div>
              <div className="relative text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 gradient-warning rounded-2xl blur opacity-50 animate-pulse"></div>
                  <div className="relative gradient-warning p-4 rounded-2xl shadow-professional">
                    {breakTypes.find(bt => bt.id === selectedBreakType)?.icon && 
                      React.createElement(breakTypes.find(bt => bt.id === selectedBreakType)!.icon, {
                        className: "h-8 w-8 text-white"
                      })
                    }
                  </div>
                </div>
                <h2 className="text-2xl font-display font-bold text-primary-content mb-2">
                  {t('pauseActive')}
                </h2>
                <p className="text-secondary-content font-medium text-lg">
                  {breakTypes.find(bt => bt.id === selectedBreakType)?.label}
                </p>
              </div>
            </div>

            {/* Timer Display */}
            <div className="p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 gradient-warning rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-gradient-to-r from-accent-warning-50 to-accent-warning-100 dark:from-accent-warning-900/30 dark:to-accent-warning-800/30 p-6 rounded-2xl border border-accent-warning-200 dark:border-accent-warning-700">
                  <div className="text-4xl font-mono font-bold text-accent-warning-700 dark:text-accent-warning-300 mb-2">
                    {formatDuration(currentBreakDuration)}
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-accent-warning-600 dark:text-accent-warning-400 font-medium">
                    <div className="w-2 h-2 bg-accent-warning-500 rounded-full animate-pulse"></div>
                    <span>{t('running')}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-secondary-content font-medium mb-8 text-lg">
                {t('endBreakToContinue')}
              </p>
              
              <button
                onClick={endBreak}
                className="relative w-full btn-success btn-lg group overflow-hidden"
                style={{ pointerEvents: 'auto' }}
              >
                <div className="absolute inset-0 gradient-success opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-semibold">{t('endBreak')}</span>
                </div>
              </button>
            </div>

            {/* Footer with break info */}
            <div className="px-8 pb-8">
              <div className="bg-neutral-50 dark:bg-neutral-700/50 p-4 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-secondary-content font-medium">
                    <Clock className="h-4 w-4" />
                    <span>Started at {new Date(currentBreak?.startTime || '').toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="text-secondary-content font-medium">
                    Break #{getBreakEntries(activeEntry?.id || '').length + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`max-w-4xl mx-auto space-y-6 px-4 ${isOnBreak ? 'pointer-events-none opacity-50' : ''}`}>
      {/* Current Time Display */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-50"></div>
        <div className="relative">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Clock className="h-8 w-8 text-white" />
          </div>
        <div className="text-3xl sm:text-5xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          {currentTime.toLocaleTimeString('de-DE')}
        </div>
        <div className="text-gray-600 dark:text-gray-400 font-semibold text-sm sm:text-lg">
          {currentTime.toLocaleDateString('de-DE', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        </div>
      </div>

      {/* Active Timer */}
      {activeEntry && (
        <div className="relative bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 rounded-2xl shadow-2xl p-4 sm:p-8 text-white transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 opacity-0 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 animate-pulse"></div>
          <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse"></div>
                <Clock className="relative h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">
                  {t('activeTimer')}
                </p>
                <p className="text-sm opacity-90 font-medium">
                  {projects.find(p => p.id === activeEntry.projectId)?.name || t('unknownProject')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono font-bold">
                {formatDuration(getNetWorkTime())}
              </div>
              <div className="text-sm opacity-90 font-medium">
                {t('since')} {new Date(activeEntry.startTime).toLocaleTimeString('de-DE')}
              </div>
            </div>
          </div>

          {/* Timer Statistics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="text-center">
              <div className="text-xs sm:text-sm opacity-90 font-semibold uppercase tracking-wide">{t('totalTime')}</div>
              <div className="font-mono font-bold text-sm sm:text-lg">{formatDuration(currentDuration)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm opacity-90 font-semibold uppercase tracking-wide">{t('pauseTime')}</div>
              <div className="font-mono font-bold text-sm sm:text-lg">{formatDuration(getTotalBreakTime())}</div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm opacity-90 font-semibold uppercase tracking-wide">{t('netTime')}</div>
              <div className="font-mono font-bold text-sm sm:text-lg">{formatDuration(getNetWorkTime())}</div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Break Type Selection */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {breakTypes.map((breakType) => {
                const Icon = breakType.icon;
                return (
                  <button
                    key={breakType.id}
                    onClick={() => startBreak(breakType.id)}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 group border border-white/20 hover:border-white/40 hover:scale-110 text-xs sm:text-sm"
                    title={breakType.description}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden md:inline">{breakType.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/40"></div>
            
            <button
              onClick={onStop}
              className="relative flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-red-400 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-red-400 rounded-xl blur opacity-50"></div>
              <div className="relative flex items-center space-x-2">
              <Square className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{t('stop')}</span>
              </div>
            </button>
          </div>
          </div>

          {/* Break Sessions Overview */}
          {activeEntry && getBreakEntries(activeEntry.id).length > 0 && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm font-medium mb-2">{t('todaysBreaks')}:</p>
              <div className="space-y-1">
                {getBreakEntries(activeEntry.id).slice(-3).map((breakEntry) => {
                  const breakType = breakTypes.find(bt => bt.id === breakEntry.type);
                  const Icon = breakType?.icon || Coffee;
                  return (
                    <div key={breakEntry.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-3 w-3" />
                        <span>{breakType?.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{new Date(breakEntry.startTime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>-</span>
                        <span>{breakEntry.endTime ? new Date(breakEntry.endTime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : t('running')}</span>
                        <span className="font-mono">({formatDuration(breakEntry.duration)})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Start New Timer */}
      {!activeEntry && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <Play className="h-5 w-5 text-white" />
            </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('startNewTracking')}
          </h3>
          </div>

          <div className="space-y-6">
            {/* Project Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                {t('selectProject')}
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 font-medium text-lg"
              >
                <option value="">{t('selectProject')}...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} - {project.client}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                {t('description')}
              </label>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('descriptionPlaceholder')}
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none transition-all duration-300 font-medium"
                />
                <MessageSquare className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {description.length}/500 {t('characters')}
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={!selectedProjectId}
              className={`relative w-full flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedProjectId
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              {selectedProjectId && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-50"></div>
              )}
              <div className="relative flex items-center space-x-3">
              <Play className="h-5 w-5" />
              <span>{t('startTracking')}</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('quickActions')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {projects.slice(0, 4).map((project) => (
            <button
              key={project.id}
              onClick={() => onStart(project.id)}
              disabled={!!activeEntry}
              className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
                activeEntry
                  ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{project.color}</div>
                <div className="font-medium text-sm">{project.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{project.client}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Break Types Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('breakTypes')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakTypes.map((breakType) => {
            const Icon = breakType.icon;
            return (
              <div key={breakType.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-lg ${breakType.color.replace('hover:', '')}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{breakType.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{breakType.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};