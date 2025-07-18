import React, { useState, useMemo } from 'react';
import { Clock, Calendar, TrendingUp, Coffee, Play, Pause, ChevronRight, X, FileText, Zap, Target, Award } from 'lucide-react';
import { TimeEntry, Project } from '../types';
import { formatDuration, formatTime, formatDate } from '../utils/timeUtils';
import { useLanguage } from '../hooks/useLanguage';

interface DashboardProps {
  entries: TimeEntry[];
  projects: Project[];
  getBreakEntries?: (timeEntryId: string) => any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ entries, projects, getBreakEntries }) => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null);

  const stats = useMemo(() => {
    const now = new Date();
    let filterDate: Date;

    if (timeRange === 'today') {
      filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (timeRange === 'week') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dayOfWeek = today.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      filterDate = new Date(today.getTime() - (daysToMonday * 24 * 60 * 60 * 1000));
    } else {
      filterDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    const filteredEntries = entries.filter(entry => 
      new Date(entry.startTime) >= filterDate
    );

    const totalTime = filteredEntries.reduce((sum, entry) => sum + entry.duration, 0);
    
    const totalBreakTime = filteredEntries.reduce((sum, entry) => {
      if (getBreakEntries) {
        const breakEntries = getBreakEntries(entry.id);
        const entryBreakTime = breakEntries.reduce((breakSum: number, breakEntry: any) => breakSum + breakEntry.duration, 0);
        return sum + entryBreakTime;
      }
      return sum + (entry.breakTime || 0);
    }, 0);
    
    const netWorkTime = totalTime - totalBreakTime;
    const projectCounts = filteredEntries.reduce((acc, entry) => {
      acc[entry.projectId] = (acc[entry.projectId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const activeProjects = Object.keys(projectCounts).length;
    
    let overtimeHours = 0;
    if (timeRange === 'today') {
      const dailyWorkLimit = 8 * 60 * 60 * 1000;
      overtimeHours = Math.max(0, netWorkTime - dailyWorkLimit);
    } else {
      const entriesByDay = filteredEntries.reduce((acc, entry) => {
        const dayKey = new Date(entry.startTime).toDateString();
        if (!acc[dayKey]) acc[dayKey] = [];
        acc[dayKey].push(entry);
        return acc;
      }, {} as Record<string, TimeEntry[]>);
      
      overtimeHours = Object.values(entriesByDay).reduce((totalOvertime, dayEntries) => {
        const dayTotalTime = dayEntries.reduce((sum, entry) => sum + entry.duration, 0);
        const dayBreakTime = dayEntries.reduce((sum, entry) => {
          if (getBreakEntries) {
            const breakEntries = getBreakEntries(entry.id);
            return sum + breakEntries.reduce((breakSum: number, breakEntry: any) => breakSum + breakEntry.duration, 0);
          }
          return sum + (entry.breakTime || 0);
        }, 0);
        const dayNetTime = dayTotalTime - dayBreakTime;
        const dailyWorkLimit = 8 * 60 * 60 * 1000;
        const dayOvertime = Math.max(0, dayNetTime - dailyWorkLimit);
        return totalOvertime + dayOvertime;
      }, 0);
    }

    return {
      totalTime,
      totalBreakTime,
      netWorkTime,
      activeProjects,
      overtimeHours,
      entriesCount: filteredEntries.length,
      workEfficiency: totalTime > 0 ? (netWorkTime / totalTime) * 100 : 0
    };
  }, [entries, timeRange, getBreakEntries]);

  const recentEntries = useMemo(() => {
    return entries
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 5);
  }, [entries]);

  const StatCard: React.FC<{ 
    title: string; 
    value: string; 
    icon: React.ReactNode; 
    gradient: string; 
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
  }> = ({ title, value, icon, gradient, subtitle, trend }) => (
    <div className="group relative card-interactive overflow-hidden">
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className={`w-full h-full ${gradient} rounded-full blur-3xl`}></div>
      </div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold text-secondary-content uppercase tracking-wider mb-2">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-display font-bold text-primary-content">
                {value}
              </p>
              {trend && (
                <div className={`flex items-center text-xs font-semibold ${
                  trend === 'up' ? 'text-accent-success-600' : 
                  trend === 'down' ? 'text-accent-error-600' : 
                  'text-neutral-500'
                }`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
                  {trend === 'up' ? '+5%' : trend === 'down' ? '-2%' : '0%'}
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-secondary-content mt-2 font-medium">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className={`relative p-4 rounded-2xl ${gradient} shadow-professional group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
            <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
            <div className="relative text-white">
              {icon}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  const EntryDetailModal: React.FC<{ entry: TimeEntry; onClose: () => void }> = ({ entry, onClose }) => {
    const project = projects.find(p => p.id === entry.projectId);
    const breakEntries = getBreakEntries ? getBreakEntries(entry.id) : [];
    const totalBreakTime = breakEntries.reduce((sum: number, breakEntry: any) => sum + breakEntry.duration, 0);
    const netWorkTime = entry.duration - totalBreakTime;
    const workingHours = netWorkTime / (1000 * 60 * 60);
    const estimatedEarnings = project?.hourlyRate ? workingHours * project.hourlyRate : 0;

    const breakTypeLabels: Record<string, string> = {
      lunch: 'Mittagspause',
      coffee: 'Kaffeepause', 
      meeting: 'Besprechung',
      personal: 'Privat',
      other: 'Sonstiges'
    };

    const breakTypeIcons: Record<string, string> = {
      lunch: '🍽️',
      coffee: '☕',
      meeting: '👥',
      personal: '👤',
      other: '⏸️'
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-modal animate-fade-in">
        <div className="card-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200/50 dark:border-neutral-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 gradient-primary rounded-xl shadow-professional">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-primary-content">
                    {t('workSessionDetails')}
                  </h2>
                  <p className="text-sm text-secondary-content font-medium">
                    {formatDate(entry.startTime)} • {formatTime(entry.startTime)} - {entry.endTime ? formatTime(entry.endTime) : t('running')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-secondary-content" />
              </button>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-6 border-b border-neutral-200/50 dark:border-neutral-700/50">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{project?.color || '📋'}</div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-semibold text-primary-content">
                  {project?.name || t('unknownProject')}
                </h3>
                <p className="text-sm text-secondary-content font-medium">
                  {project?.client || t('unknownClient')}
                </p>
                {project?.hourlyRate && (
                  <p className="text-sm text-accent-success-600 dark:text-accent-success-400 font-semibold">
                    €{project.hourlyRate}/{t('hours')}
                  </p>
                )}
              </div>
            </div>
            
            {entry.description && (
              <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-secondary-content mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-primary-content">
                    {entry.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Time Summary */}
          <div className="p-6">
            <h4 className="text-lg font-display font-semibold text-primary-content mb-4">
              {t('timeSummary')}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl border border-primary-200 dark:border-primary-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-semibold text-primary-900 dark:text-primary-100">
                    {t('totalTime')}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-primary-900 dark:text-primary-100">
                  {formatDuration(entry.duration)}
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-300 mt-1 font-medium">
                  {t('includesAllBreaks')}
                </p>
              </div>

              <div className="bg-accent-warning-50 dark:bg-accent-warning-900/20 p-4 rounded-xl border border-accent-warning-200 dark:border-accent-warning-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Coffee className="h-4 w-4 text-accent-warning-600 dark:text-accent-warning-400" />
                  <span className="text-sm font-semibold text-accent-warning-900 dark:text-accent-warning-100">
                    {t('pauseTime')}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-accent-warning-900 dark:text-accent-warning-100">
                  {formatDuration(totalBreakTime)}
                </p>
                <p className="text-xs text-accent-warning-700 dark:text-accent-warning-300 mt-1 font-medium">
                  {breakEntries.length} {t('pause')}{breakEntries.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="bg-accent-success-50 dark:bg-accent-success-900/20 p-4 rounded-xl border border-accent-success-200 dark:border-accent-success-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Play className="h-4 w-4 text-accent-success-600 dark:text-accent-success-400" />
                  <span className="text-sm font-semibold text-accent-success-900 dark:text-accent-success-100">
                    {t('netWorkTime')}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-accent-success-900 dark:text-accent-success-100">
                  {formatDuration(netWorkTime)}
                </p>
                <p className="text-xs text-accent-success-700 dark:text-accent-success-300 mt-1 font-medium">
                  {t('pureWorkTime')}
                </p>
              </div>
            </div>

            {/* Earnings */}
            {project?.hourlyRate && estimatedEarnings > 0 && (
              <div className="bg-secondary-50 dark:bg-secondary-900/20 p-4 rounded-xl border border-secondary-200 dark:border-secondary-800 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                      {t('estimatedEarnings')}
                    </p>
                    <p className="text-2xl font-display font-bold text-secondary-900 dark:text-secondary-100">
                      €{estimatedEarnings.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right text-sm text-secondary-700 dark:text-secondary-300 font-medium">
                    <p>{workingHours.toFixed(2)} {t('hours')}</p>
                    <p>× €{project.hourlyRate}/h</p>
                  </div>
                </div>
              </div>
            )}

            {/* Break Details */}
            {breakEntries.length > 0 && (
              <div>
                <h5 className="text-md font-display font-semibold text-primary-content mb-3">
                  {t('breakDetails')}
                </h5>
                <div className="space-y-3">
                  {breakEntries.map((breakEntry: any, index: number) => (
                    <div key={breakEntry.id} className="bg-neutral-50 dark:bg-neutral-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">
                            {breakTypeIcons[breakEntry.type] || '⏸️'}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-primary-content">
                                {breakTypeLabels[breakEntry.type] || t('pause')}
                              </span>
                              <span className="badge-sm badge-neutral">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="text-sm text-secondary-content font-medium">
                              {formatTime(breakEntry.startTime)} - {breakEntry.endTime ? formatTime(breakEntry.endTime) : t('running')}
                            </div>
                            {breakEntry.description && (
                              <p className="text-sm text-secondary-content mt-1">
                                {breakEntry.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-primary-content">
                            {formatDuration(breakEntry.duration)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Productivity Metrics */}
            <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
              <h5 className="text-md font-display font-semibold text-primary-content mb-3">
                {t('productivityMetrics')}
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-secondary-content font-medium">{t('workEfficiency')}</p>
                  <p className="text-lg font-display font-bold text-primary-content">
                    {entry.duration > 0 ? ((netWorkTime / entry.duration) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-content font-medium">{t('breakPercentage')}</p>
                  <p className="text-lg font-display font-bold text-primary-content">
                    {entry.duration > 0 ? ((totalBreakTime / entry.duration) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-content font-medium">{t('avgBreakLength')}</p>
                  <p className="text-lg font-display font-bold text-primary-content">
                    {breakEntries.length > 0 ? formatDuration(totalBreakTime / breakEntries.length) : '0:00'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-content font-medium">{t('hourlyRate')}</p>
                  <p className="text-lg font-display font-bold text-primary-content">
                    €{project?.hourlyRate || 0}/h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="p-6 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-700/20">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="btn-primary btn-lg"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-component animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display font-bold text-gradient mb-2">
            {t('dashboard')}
          </h2>
          <p className="text-secondary-content font-medium text-lg">
            Professional time tracking overview and insights
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex glass-medium rounded-2xl p-1.5 shadow-professional">
          {[
            { key: 'today', label: t('today'), icon: Calendar },
            { key: 'week', label: t('thisWeekShort'), icon: Target },
            { key: 'month', label: t('thisMonthShort'), icon: Award }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTimeRange(key as typeof timeRange)}
              className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                timeRange === key
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-professional'
                  : 'text-secondary-content hover:text-primary-content hover:bg-white/50 dark:hover:bg-neutral-700/50 hover:scale-105'
              }`}
            >
              {timeRange === key && (
                <div className="absolute inset-0 gradient-brand opacity-10 rounded-xl"></div>
              )}
              <Icon className="h-4 w-4" />
              <span className="relative font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalWorkTime')}
          value={formatDuration(stats.totalTime)}
          icon={<Clock className="h-6 w-6" />}
          gradient="gradient-primary"
          trend="up"
        />
        <StatCard
          title={t('netWorkTime')}
          value={formatDuration(stats.netWorkTime)}
          subtitle={`${stats.workEfficiency.toFixed(1)}% ${t('efficiency')}`}
          icon={<Zap className="h-6 w-6" />}
          gradient="gradient-success"
          trend="up"
        />
        <StatCard
          title={t('breakTime')}
          value={formatDuration(stats.totalBreakTime)}
          subtitle={`${stats.entriesCount} ${t('entries')}`}
          icon={<Coffee className="h-6 w-6" />}
          gradient="gradient-warning"
          trend="neutral"
        />
        <StatCard
          title={t('overtime')}
          value={formatDuration(stats.overtimeHours)}
          subtitle={`${stats.activeProjects} ${t('projects')}`}
          icon={<TrendingUp className="h-6 w-6" />}
          gradient="gradient-secondary"
          trend="down"
        />
      </div>

      {/* Recent Entries */}
      <div className="card-default overflow-hidden">
        <div className="p-6 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 gradient-brand rounded-lg shadow-professional">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-primary-content">
              {t('recentEntries')}
            </h3>
          </div>
        </div>
        
        <div className="divide-y divide-neutral-200/50 dark:divide-neutral-700/50">
          {recentEntries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 gradient-brand rounded-full blur opacity-20"></div>
                <Clock className="relative h-16 w-16 mx-auto text-secondary-content" />
              </div>
              <h4 className="text-lg font-display font-semibold text-primary-content mb-2">
                No entries yet
              </h4>
              <p className="text-secondary-content font-medium">
                {t('noEntriesYet')}
              </p>
            </div>
          ) : (
            recentEntries.map((entry) => {
              const project = projects.find(p => p.id === entry.projectId);
              const breakEntries = getBreakEntries ? getBreakEntries(entry.id) : [];
              const totalBreakTime = breakEntries.reduce((sum: number, breakEntry: any) => sum + breakEntry.duration, 0);
              const netTime = entry.duration - totalBreakTime;
              
              return (
                <div 
                  key={entry.id} 
                  className="p-6 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/50 dark:hover:from-primary-900/5 dark:hover:to-secondary-900/5 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`relative p-3 rounded-xl shadow-professional transition-all duration-300 group-hover:scale-110 ${
                        entry.isActive ? 'gradient-success animate-pulse-soft' : 'gradient-primary'
                      }`}>
                        <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                        {entry.isActive ? (
                          <Play className="relative h-4 w-4 text-white" />
                        ) : (
                          <Pause className="relative h-4 w-4 text-white" />
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-display font-bold text-primary-content text-lg">
                            {project?.name || t('unknownProject')}
                          </p>
                          {entry.isActive && (
                            <span className="status-active">
                              <div className="w-2 h-2 bg-accent-success-500 rounded-full animate-pulse"></div>
                              Live
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-secondary-content font-medium">
                          {formatDate(entry.startTime)} • {formatTime(entry.startTime)} - {entry.endTime ? formatTime(entry.endTime) : t('running')}
                        </p>
                        {entry.description && (
                          <p className="text-sm text-secondary-content mt-1 truncate max-w-md">
                            {entry.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="space-y-1">
                          <p className="font-mono font-bold text-primary-content text-lg">
                            {formatDuration(netTime)}
                          </p>
                          {totalBreakTime > 0 && (
                            <p className="text-sm text-accent-warning-600 dark:text-accent-warning-400 font-semibold">
                              {t('pause')}: {formatDuration(totalBreakTime)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-secondary-content group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-all duration-300 group-hover:scale-125" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
};