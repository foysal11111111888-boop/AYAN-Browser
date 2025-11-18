
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { QuickLink, Bookmark, Theme } from './types';
import { DEFAULT_QUICK_LINKS } from './constants';
import Header from './components/Header';
import SearchComponent from './components/SearchComponent';
import QuickLinks from './components/QuickLinks';
import Bookmarks from './components/Bookmarks';
import History from './components/History';
import SearchResults from './components/SearchResults';

const App: React.FC = () => {
    const [theme, setTheme] = useLocalStorage<Theme>('ayan-theme', 'system');
    const [isIncognito, setIsIncognito] = useState<boolean>(false);
    const [quickLinks, setQuickLinks] = useLocalStorage<QuickLink[]>('ayan-quicklinks', DEFAULT_QUICK_LINKS);
    const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('ayan-bookmarks', []);
    const [history, setHistory] = useLocalStorage<string[]>('ayan-history', []);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    /* --- THEME MANAGEMENT --- */
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        root.classList.toggle('dark', isDark);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                root.classList.toggle('dark', mediaQuery.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    /* --- PSE WIRING --- */
    useEffect(() => {
        const cx = '25a65b850afc249e5';
        const scriptId = 'google-cse-script';
        if (document.getElementById(scriptId)) return;

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://cse.google.com/cse.js?cx=${cx}`;
        script.async = true;
        document.head.appendChild(script);
    }, []);

    /* --- DATA HANDLERS --- */
    const handleSearch = (newQuery: string) => {
        if (!newQuery.trim()) return;
        setQuery(newQuery);

        if (!isIncognito) {
            setHistory(prev => [newQuery, ...prev.filter(h => h !== newQuery)].slice(0, 20));
        }

        // Check if PSE has loaded by looking for its specific elements
        const pseLoaded = !!document.querySelector('.gsc-control-cse');
        if (!pseLoaded) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(newQuery)}`, '_blank');
        } else {
            setShowResults(true);
        }
    };

    const clearData = () => {
        if (window.confirm('Are you sure you want to clear all links, bookmarks, and history? This cannot be undone.')) {
            setQuickLinks(DEFAULT_QUICK_LINKS);
            setBookmarks([]);
            setHistory([]);
        }
    };
    
    const toggleIncognito = () => setIsIncognito(prev => !prev);
    
    // Animate glow on startup
    const glowClass = hasMounted ? 'animate-glow' : '';

    return (
        <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${isIncognito ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'}`}>
            <Header 
                theme={theme} 
                setTheme={setTheme}
                isIncognito={isIncognito}
                toggleIncognito={toggleIncognito}
                clearData={clearData}
            />
            <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8">
                {showResults ? (
                    <SearchResults onBack={() => setShowResults(false)} query={query}/>
                ) : (
                    <div className={`w-full max-w-4xl mx-auto space-y-8 md:space-y-12 ${glowClass} rounded-2xl`}>
                        <SearchComponent onSearch={handleSearch} />
                        <QuickLinks links={quickLinks} setLinks={setQuickLinks} isIncognito={isIncognito} />
                        <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} isIncognito={isIncognito} />
                        <History history={history} onSearch={handleSearch} />
                    </div>
                )}
            </main>
            <footer className="text-center p-4 text-xs text-gray-500 dark:text-gray-400">
                <p>AYAN Browser - Your lightweight portal to the web.</p>
            </footer>
        </div>
    );
};

export default App;
