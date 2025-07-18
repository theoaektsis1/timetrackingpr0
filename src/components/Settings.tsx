import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Shield, Database, Download, Upload, Trash2, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleTheme }) => {
  const { t, currentLanguage, changeLanguage, getLanguageOptions } = useLanguage();
  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'data'>('general');

  const tabs = [
    { id: 'general', label: t('general'), icon: SettingsIcon },
    { id: 'privacy', label: t('privacy'), icon: Shield },
    { id: 'data', label: t('data'), icon: Database },
  ];

  const exportAllData = () => {
    const data = {
      settings: { isDarkMode },
      projects: JSON.parse(localStorage.getItem('timetracker_projects') || '[]'),
      entries: JSON.parse(localStorage.getItem('timetracker_entries') || '[]'),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timetracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Import gestartet für Datei:', file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        console.log('Importierte Daten:', data);
        
        // Validierung der Datenstruktur
        let importedProjects = [];
        let importedEntries = [];
        let importedBreaks = [];
        
        // Projekte validieren und importieren
        if (data.projects && Array.isArray(data.projects)) {
          importedProjects = data.projects.filter(project => 
            project.id && project.name && project.client
          );
          console.log('Gültige Projekte gefunden:', importedProjects.length);
        }
        
        // Zeiteinträge validieren und importieren
        if (data.entries && Array.isArray(data.entries)) {
          importedEntries = data.entries.filter(entry => 
            entry.id && entry.projectId && entry.startTime
          );
          console.log('Gültige Einträge gefunden:', importedEntries.length);
        }
        
        // Pauseneinträge validieren und importieren (falls vorhanden)
        if (data.breaks && Array.isArray(data.breaks)) {
          importedBreaks = data.breaks.filter(breakEntry => 
            breakEntry.id && breakEntry.timeEntryId && breakEntry.startTime
          );
          console.log('Gültige Pauseneinträge gefunden:', importedBreaks.length);
        }
        
        // Bestehende Daten laden
        const existingProjects = JSON.parse(localStorage.getItem('timetracker_projects') || '[]');
        const existingEntries = JSON.parse(localStorage.getItem('timetracker_entries') || '[]');
        const existingBreaks = JSON.parse(localStorage.getItem('timetracker_breaks') || '[]');
        
        // Daten zusammenführen (Duplikate vermeiden)
        const mergedProjects = [...existingProjects];
        importedProjects.forEach(importedProject => {
          if (!mergedProjects.find(p => p.id === importedProject.id)) {
            mergedProjects.push(importedProject);
          }
        });
        
        const mergedEntries = [...existingEntries];
        importedEntries.forEach(importedEntry => {
          if (!mergedEntries.find(e => e.id === importedEntry.id)) {
            mergedEntries.push(importedEntry);
          }
        });
        
        const mergedBreaks = [...existingBreaks];
        importedBreaks.forEach(importedBreak => {
          if (!mergedBreaks.find(b => b.id === importedBreak.id)) {
            mergedBreaks.push(importedBreak);
          }
        });
        
        // Daten speichern
        localStorage.setItem('timetracker_projects', JSON.stringify(mergedProjects));
        localStorage.setItem('timetracker_entries', JSON.stringify(mergedEntries));
        localStorage.setItem('timetracker_breaks', JSON.stringify(mergedBreaks));
        
        console.log('Import abgeschlossen:');
        console.log('- Projekte:', mergedProjects.length);
        console.log('- Einträge:', mergedEntries.length);
        console.log('- Pausen:', mergedBreaks.length);
        
        // Erfolgreiche Import-Meldung mit Details
        const importSummary = [
          `✅ ${importedProjects.length} Projekte importiert`,
          `✅ ${importedEntries.length} Zeiteinträge importiert`,
          importedBreaks.length > 0 ? `✅ ${importedBreaks.length} Pauseneinträge importiert` : null
        ].filter(Boolean).join('\n');
        
        alert(`Daten erfolgreich importiert!\n\n${importSummary}\n\nSeite wird neu geladen.`);
        
        // Seite neu laden um React State zu aktualisieren
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      } catch (error) {
        console.error('Import-Fehler:', error);
        alert(`Fehler beim Importieren der Daten:\n\n${error.message}\n\nBitte überprüfen Sie das Dateiformat.`);
      }
    };
    
    reader.onerror = (error) => {
      console.error('Datei-Lesefehler:', error);
      alert('Fehler beim Lesen der Datei. Bitte versuchen Sie es erneut.');
    };
    
    reader.readAsText(file);
    
    // Input-Feld zurücksetzen für erneuten Import
    event.target.value = '';
  };

  const clearAllData = () => {
    if (window.confirm(t('deleteAllDataWarning'))) {
      localStorage.removeItem('timetracker_projects');
      localStorage.removeItem('timetracker_entries');
      localStorage.removeItem('timetracker_theme');
      alert(`${t('success')}! ${t('loading')}`);
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settingsTitle')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('manageSettings')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {activeTab === 'general' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('appearance')}
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {isDarkMode ? t('darkTheme') : t('lightTheme')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('chooseTheme')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('language')}
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('selectLanguage')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getLanguageOptions().find(lang => lang.code === currentLanguage)?.name}
                    </p>
                  </div>
                </div>
                <select
                  value={currentLanguage}
                  onChange={(e) => changeLanguage(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {getLanguageOptions().map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('workingHours')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dailyWorkHours')}
                  </label>
                  <input
                    type="number"
                    defaultValue="8"
                    min="1"
                    max="24"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('privacySecurity')}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-medium text-green-900 dark:text-green-100">
                      {t('localDataStorage')}
                    </h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    {t('localDataDesc')}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      {t('gdprCompliance')}
                    </h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                    {t('gdprDesc')}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {t('dataProcessing')}
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {t('dataProcessingItems').map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('dataManagement')}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t('exportData')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('exportDataDesc')}
                  </p>
                  <button
                    onClick={exportAllData}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                    <span>{t('exportAllData')}</span>
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t('importData')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('importDataDesc')}
                  </p>
                  <label className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <span>{t('selectFile')}</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importData}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
                    {t('deleteAllData')}
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    {t('deleteAllDataDesc')}
                  </p>
                  <button
                    onClick={clearAllData}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>{t('deleteAllData')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};