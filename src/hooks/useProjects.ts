import { useState } from 'react';
import { Project } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('timetracker_projects', []);

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project =>
      project.id === id
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
  };
};