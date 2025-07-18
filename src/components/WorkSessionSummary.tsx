import React from 'react';
import { Clock, Coffee, Play, FileText, X, Download, Edit3 } from 'lucide-react';
import { TimeEntry, Project, BreakEntry } from '../types';
import { formatDuration, formatTime, formatDate } from '../utils/timeUtils';
import { useLanguage } from '../hooks/useLanguage';

interface WorkSessionSummaryProps {
  timeEntry: TimeEntry;
  project: Project;
  breakEntries: BreakEntry[];
  onClose: () => void;
  onEdit?: () => void;
  onExport?: () => void;
}

export const WorkSessionSummary: React.FC<WorkSessionSummaryProps> = ({
  timeEntry,
  project,
  breakEntries,
  onClose,
  onEdit,
  onExport
}) => {
  const { t } = useLanguage();
  const totalBreakTime = breakEntries.reduce((sum, breakEntry) => sum + breakEntry.duration, 0);
  const netWorkTime = timeEntry.duration - totalBreakTime;
  const workingHours = netWorkTime / (1000 * 60 * 60);
  const estimatedEarnings = project.hourlyRate ? workingHours * project.hourlyRate : 0;

  const breakTypeLabels = {
    lunch: t('lunchBreak'),
    coffee: t('coffeeBreak'), 
    meeting: t('meeting'),
    personal: t('personal')
  };

  const breakTypeIcons = {
    lunch: '🍽️',
    coffee: '☕',
    meeting: '👥',
    personal: '👤'
  };

  const breakTypeColors = {
    lunch: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    coffee: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    meeting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('workSessionEnded')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(timeEntry.startTime)} • {formatTime(timeEntry.startTime)} - {timeEntry.endTime ? formatTime(timeEntry.endTime) : t('running')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{project.color}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.client}
              </p>
              {project.hourlyRate && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  €{project.hourlyRate}/Stunde
                </p>
              )}
            </div>
          </div>
          
          {timeEntry.description && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {timeEntry.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Time Summary */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('timeSummary')}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Gesamtzeit */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {t('totalTime')}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {formatDuration(timeEntry.duration)}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                {t('includesAllBreaks')}
              </p>
            </div>

            {/* Pausenzeit */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-2 mb-2">
                <Coffee className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  {t('pauseTime')}
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                {formatDuration(totalBreakTime)}
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                {breakEntries.length} {t('pause')}{breakEntries.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Nettoarbeitszeit */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-900 dark:text-green-100">
                  {t('netWorkTime')}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {formatDuration(netWorkTime)}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                {t('pureWorkTime')}
              </p>
            </div>
          </div>

          {/* Earnings */}
          {project.hourlyRate && estimatedEarnings > 0 && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    {t('estimatedEarnings')}
                  </p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    €{estimatedEarnings.toFixed(2)}
                  </p>
                </div>
                <div className="text-right text-sm text-purple-700 dark:text-purple-300">
                  <p>{workingHours.toFixed(2)} {t('hours')}</p>
                  <p>× €{project.hourlyRate}/h</p>
                </div>
              </div>
            </div>
          )}

          {/* Break Details */}
          {breakEntries.length > 0 && (
            <div>
              <h5 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                {t('breakDetails')}
              </h5>
              <div className="space-y-3">
                {breakEntries.map((breakEntry, index) => (
                  <div key={breakEntry.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg">
                          {breakTypeIcons[breakEntry.type as keyof typeof breakTypeIcons]}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {breakTypeLabels[breakEntry.type as keyof typeof breakTypeLabels]}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${breakTypeColors[breakEntry.type as keyof typeof breakTypeColors]}`}>
                              #{index + 1}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatTime(breakEntry.startTime)} - {breakEntry.endTime ? formatTime(breakEntry.endTime) : t('running')}
                          </div>
                          {breakEntry.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {breakEntry.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-semibold text-gray-900 dark:text-white">
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
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h5 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              {t('productivityMetrics')}
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('workEfficiency')}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {((netWorkTime / timeEntry.duration) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('breakPercentage')}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {((totalBreakTime / timeEntry.duration) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('avgBreakLength')}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {breakEntries.length > 0 ? formatDuration(totalBreakTime / breakEntries.length) : '0:00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('hourlyRate')}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  €{project.hourlyRate || 0}/h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-all duration-200"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{t('edit')}</span>
                </button>
              )}
              {onExport && (
                <button
                  onClick={onExport}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-all duration-200"
                >
                  <Download className="h-4 w-4" />
                  <span>{t('exportSession')}</span>
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};