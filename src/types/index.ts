export interface Project {
  id: string;
  name: string;
  client: string;
  description?: string;
  color: string;
  hourlyRate?: number;
  tags?: string[];
  isActive: boolean;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  startTime: string;
  endTime?: string;
  duration: number; // in milliseconds
  breakTime?: number; // in milliseconds
  description?: string;
  tags?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BreakEntry {
  id: string;
  timeEntryId: string;
  startTime: string;
  endTime?: string;
  duration: number; // in milliseconds
  type: 'lunch' | 'coffee' | 'meeting' | 'personal' | 'other';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  settings: {
    workingHoursPerDay: number;
    autoBreakAfterMinutes: number;
    theme: 'light' | 'dark';
    language: 'de' | 'en';
  };
  createdAt: string;
  updatedAt: string;
}