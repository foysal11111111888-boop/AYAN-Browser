
import React from 'react';
import type { Theme } from '../types';

interface HeaderProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isIncognito: boolean;
    toggleIncognito: () => void;
    clearData: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, isIncognito, toggleIncognito, clearData }) => {
    return (
        <header className={`sticky top-0 z-50 p-3 shadow-md transition-colors duration-300 ${isIncognito ? 'bg-gray-900' : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${isIncognito ? 'bg-purple-600' : 'bg-sky-500'}`}>
                        A
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">AYAN Browser</h1>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <button onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'system'} mode`}>
                        {theme === 'light' && <SunIcon />}
                        {theme === 'dark' && <MoonIcon />}
                        {theme === 'system' && <SystemIcon />}
                    </button>
                    <button onClick={toggleIncognito} className={`p-2 rounded-full transition-colors ${isIncognito ? 'bg-purple-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} aria-label="Toggle Incognito Mode">
                        <IncognitoIcon />
                    </button>
                    <button onClick={clearData} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 transition-colors" aria-label="Clear Data">
                        <TrashIcon />
                    </button>
                </div>
            </div>
            {isIncognito && (
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500"></div>
            )}
        </header>
    );
};

/* --- ICONS --- */
const SunIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zm-2.12-2.122a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" /></svg>
);
const MoonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
);
const SystemIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const IncognitoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
);
const TrashIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
);

export default Header;
