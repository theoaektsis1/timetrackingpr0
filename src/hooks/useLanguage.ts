import React, { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { translations, Translation } from '../i18n/translations';

export type Language = 'en' | 'de' | 'el';

// Global state for language changes
let globalLanguage: Language = 'de';
const languageListeners: Set<() => void> = new Set();

const notifyLanguageChange = () => {
  languageListeners.forEach(listener => listener());
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useLocalStorage<Language>('timetracker_language', 'de');
  const [, forceUpdate] = useState({});

  // Initialize global language from localStorage
  if (globalLanguage !== currentLanguage) {
    globalLanguage = currentLanguage;
  }

  // Subscribe to language changes
  React.useEffect(() => {
    const listener = () => {
      if (globalLanguage !== currentLanguage) {
        setCurrentLanguage(globalLanguage);
        forceUpdate({});
      }
    };
    
    languageListeners.add(listener);
    return () => {
      languageListeners.delete(listener);
    };
  }, [currentLanguage, setCurrentLanguage]);

  const changeLanguage = (language: Language) => {
    globalLanguage = language;
    setCurrentLanguage(language);
    // Notify all components using this hook
    notifyLanguageChange();
  };

  const t = (key: keyof Translation): string => {
    return translations[globalLanguage][key] || translations['en'][key] || key;
  };

  const getLanguageOptions = () => [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  ];

  return {
    currentLanguage: globalLanguage,
    changeLanguage,
    t,
    getLanguageOptions,
  };
};