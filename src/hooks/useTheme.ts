import { useLocalStorage } from './useLocalStorage';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('timetracker_theme', false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};