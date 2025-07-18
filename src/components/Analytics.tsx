import React, { useState, useMemo } from 'react';
import { BarChart3, Download, Filter, Calendar, Clock, TrendingUp, PieChart } from 'lucide-react';
import { TimeEntry, Project } from '../types';
import { formatDuration } from '../utils/timeUtils';

interface AnalyticsProps {
  entries: TimeEntry[];
  projects: Project[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ entries, projects }) => {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [viewType, setViewType] = useState<'overview' | 'projects' | 'timeline'>('overview');

  const filteredEntries = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (dateRange) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return entries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      const matchesDate = entryDate >= startDate;
      const matchesProject = !selectedProject || entry.projectId === selectedProject;
      return matchesDate && matchesProject;
    });
  }, [entries, dateRange, selectedProject]);

  const analytics = useMemo(() => {
    const totalTime = filteredEntries.reduce((sum, entry) => sum + entry.duration, 0);
    const totalBreakTime = filteredEntries.reduce((sum, entry) => sum + (entry.breakTime || 0), 0);
    const netTime = totalTime - totalBreakTime;

    const projectStats = projects.map(project => {
      const projectEntries = filteredEntries.filter(entry => entry.projectId === project.id);
      const projectTime = projectEntries.reduce((sum, entry) => sum + entry.duration, 0);
      const projectBreakTime = projectEntries.reduce((sum, entry) => sum + (entry.breakTime || 0), 0);
      const revenue = project.hourlyRate ? (projectTime / (1000 * 60 * 60)) * project.hourlyRate : 0;

      return {
        project,
        totalTime: projectTime,
        breakTime: projectBreakTime,
        netTime: projectTime - projectBreakTime,
        entries: projectEntries.length,
        revenue,
      };
    }).filter(stat => stat.totalTime > 0);

    const avgDailyHours = totalTime / (1000 * 60 * 60) / (dateRange === 'week' ? 7 : dateRange === 'month' ? 30 : dateRange === 'quarter' ? 90 : 365);
    const totalRevenue = projectStats.reduce((sum, stat) => sum + stat.revenue, 0);

    return {
      totalTime,
      totalBreakTime,
      netTime,
      avgDailyHours,
      totalRevenue,
      projectStats,
      entriesCount: filteredEntries.length,
    };
  }, [filteredEntries, projects, dateRange]);

  const exportData = () => {
    const data = {
      period: dateRange,
      analytics,
      entries: filteredEntries,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zeiterfassung-${dateRange}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analyse & Reporting</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="week">Letzte Woche</option>
            <option value="month">Letzter Monat</option>
            <option value="quarter">Letztes Quartal</option>
            <option value="year">Letztes Jahr</option>
          </select>

          {/* Project Filter */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Alle Projekte</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name} - {project.client}
              </option>
            ))}
          </select>

          {/* View Type */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { key: 'overview', label: 'Übersicht' },
              { key: 'projects', label: 'Projekte' },
              { key: 'timeline', label: 'Verlauf' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setViewType(key as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewType === key
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      {viewType === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gesamtarbeitszeit</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatDuration(analytics.totalTime)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nettoarbeitszeit</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatDuration(analytics.netTime)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ø Tägliche Stunden</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.avgDailyHours.toFixed(1)}h
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gesamtumsatz</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  €{analytics.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Analysis */}
      {viewType === 'projects' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projektanalyse</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {analytics.projectStats.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Keine Daten für den ausgewählten Zeitraum</p>
              </div>
            ) : (
              analytics.projectStats.map((stat) => (
                <div key={stat.project.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{stat.project.color}</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {stat.project.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stat.project.client}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Gesamtzeit</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatDuration(stat.totalTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Nettozeit</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatDuration(stat.netTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Einträge</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {stat.entries}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Umsatz</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            €{stat.revenue.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {viewType === 'timeline' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Zeitverlauf</h3>
          </div>
          <div className="p-6">
            {filteredEntries.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Keine Einträge für den ausgewählten Zeitraum</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries
                  .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                  .slice(0, 20)
                  .map((entry) => {
                    const project = projects.find(p => p.id === entry.projectId);
                    return (
                      <div key={entry.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-xl">{project?.color || '📋'}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {project?.name || 'Unbekanntes Projekt'}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(entry.startTime).toLocaleDateString('de-DE')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(entry.startTime).toLocaleTimeString('de-DE')} - {' '}
                            {entry.endTime ? new Date(entry.endTime).toLocaleTimeString('de-DE') : 'Laufend'}
                          </div>
                          {entry.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {entry.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {formatDuration(entry.duration)}
                          </div>
                          {entry.breakTime && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Pause: {formatDuration(entry.breakTime)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};