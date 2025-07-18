import { useState, useEffect } from 'react';
import { TimeEntry, BreakEntry, Project } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useTimeTracking = () => {
  const [entries, setEntries] = useLocalStorage<TimeEntry[]>('timetracker_entries', []);
  const [breaks, setBreaks] = useLocalStorage<BreakEntry[]>('timetracker_breaks', []);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [showSummary, setShowSummary] = useState<{
    timeEntry: TimeEntry;
    breakEntries: BreakEntry[];
  } | null>(null);

  useEffect(() => {
    // Find and set active entry on mount
    const active = entries.find(entry => entry.isActive);
    if (active) {
      setActiveEntry(active);
    }
  }, [entries]); // Abhängigkeit hinzugefügt für Re-Evaluation nach Import

  const startTracking = (projectId: string, description?: string) => {
    // Stop any existing active entry
    if (activeEntry) {
      stopTracking();
    }

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      projectId,
      startTime: new Date().toISOString(),
      duration: 0,
      description,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEntries(prev => [...prev, newEntry]);
    setActiveEntry(newEntry);
  };

  const stopTracking = () => {
    if (!activeEntry) return;

    const endTime = new Date().toISOString();
    const duration = new Date(endTime).getTime() - new Date(activeEntry.startTime).getTime();

    const updatedEntry: TimeEntry = {
      ...activeEntry,
      endTime,
      duration,
      isActive: false,
      updatedAt: new Date().toISOString(),
    };

    setEntries(prev => prev.map(entry => 
      entry.id === activeEntry.id ? updatedEntry : entry
    ));
    
    // Get break entries for this time entry
    const timeEntryBreaks = breaks.filter(breakEntry => 
      breakEntry.timeEntryId === activeEntry.id
    );
    
    // Show summary modal
    setShowSummary({
      timeEntry: updatedEntry,
      breakEntries: timeEntryBreaks
    });
    
    setActiveEntry(null);
  };

  const addBreakEntry = (breakEntry: Omit<BreakEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBreak: BreakEntry = {
      ...breakEntry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBreaks(prev => [...prev, newBreak]);
    return newBreak;
  };

  const updateBreakEntry = (id: string, updates: Partial<BreakEntry>) => {
    setBreaks(prev => prev.map(breakEntry =>
      breakEntry.id === id
        ? { ...breakEntry, ...updates, updatedAt: new Date().toISOString() }
        : breakEntry
    ));
  };

  const deleteBreakEntry = (id: string) => {
    setBreaks(prev => prev.filter(breakEntry => breakEntry.id !== id));
  };

  const getBreakEntriesForTimeEntry = (timeEntryId: string) => {
    return breaks.filter(breakEntry => breakEntry.timeEntryId === timeEntryId);
  };
  const addEntry = (entry: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEntries(prev => [...prev, newEntry]);
  };

  const updateEntry = (id: string, updates: Partial<TimeEntry>) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    ));

    if (activeEntry?.id === id) {
      setActiveEntry(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    if (activeEntry?.id === id) {
      setActiveEntry(null);
    }
  };

  return {
    entries,
    breaks,
    activeEntry,
    showSummary,
    setShowSummary,
    startTracking,
    stopTracking,
    addEntry,
    updateEntry,
    deleteEntry,
    addBreakEntry,
    updateBreakEntry,
    deleteBreakEntry,
    getBreakEntriesForTimeEntry,
  };
};