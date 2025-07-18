import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TimeTracker } from './components/TimeTracker';
import { ProjectManagement } from './components/ProjectManagement';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { WorkSessionSummary } from './components/WorkSessionSummary';
import { useTimeTracking } from './hooks/useTimeTracking';
import { useProjects } from './hooks/useProjects';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, forceUpdate] = useState({});
  const [isOnBreak, setIsOnBreak] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { projects, addProject, updateProject, deleteProject, getProjectById } = useProjects();
  const { 
    entries, 
    activeEntry, 
    showSummary, 
    setShowSummary,
    startTracking, 
    stopTracking, 
    addEntry,
    addBreakEntry,
    updateBreakEntry,
    getBreakEntriesForTimeEntry
  } = useTimeTracking();

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Set document language
    document.documentElement.lang = currentLanguage;
    // Force re-render when language changes
    forceUpdate({});
  }, [isDarkMode, currentLanguage]);

  // Enhanced break handling functions
  const handleAddBreak = (breakEntry: any) => {
    setIsOnBreak(true);
    return addBreakEntry(breakEntry);
  };

  const handleUpdateBreak = (id: string, updates: any) => {
    // If the break is being ended (has endTime), set isOnBreak to false
    if (updates.endTime) {
      setIsOnBreak(false);
    }
    updateBreakEntry(id, updates);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard entries={entries} projects={projects} getBreakEntries={getBreakEntriesForTimeEntry} />;
      case 'tracker':
        return (
          <TimeTracker
            projects={projects}
            activeEntry={activeEntry}
            onStart={startTracking}
            onStop={stopTracking}
            onAddBreak={handleAddBreak}
            onUpdateBreak={handleUpdateBreak}
            getBreakEntries={getBreakEntriesForTimeEntry}
          />
        );
      case 'projects':
        return (
          <ProjectManagement
            projects={projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
          />
        );
      case 'analytics':
        return <Analytics entries={entries} projects={projects} />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
      default:
        return <Dashboard entries={entries} projects={projects} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header
        activeTab={activeTab}
        onTabChange={isOnBreak ? () => {} : setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={isOnBreak ? () => {} : toggleTheme}
        isOnBreak={isOnBreak}
      />
      <main className={`container mx-auto px-4 py-6 max-w-7xl ${isOnBreak ? 'pointer-events-none opacity-50' : ''}`}>
        {renderContent()}
      </main>
      
      {/* Work Session Summary Modal */}
      {showSummary && (
        <WorkSessionSummary
          timeEntry={showSummary.timeEntry}
          project={getProjectById(showSummary.timeEntry.projectId)!}
          breakEntries={showSummary.breakEntries}
          onClose={() => setShowSummary(null)}
          onEdit={() => {
            // TODO: Implement edit functionality
            console.log('Edit time entry:', showSummary.timeEntry.id);
          }}
          onExport={() => {
            // TODO: Implement export functionality
            const data = {
              timeEntry: showSummary.timeEntry,
              project: getProjectById(showSummary.timeEntry.projectId),
              breakEntries: showSummary.breakEntries,
              exportDate: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `arbeitszeit-${showSummary.timeEntry.id}-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
      )}
    </div>
  );
}

export default App;