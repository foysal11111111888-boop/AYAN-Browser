
import React, { useState } from 'react';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <section aria-labelledby="search-heading">
            <h2 id="search-heading" className="sr-only">Search</h2>
            <form onSubmit={handleSubmit} className="relative">
                <div className="gcse-searchbox-only"></div>
                {/* Fallback search input for when PSE isn't loaded */}
                <div className="relative group">
                     <svg aria-hidden="true" className="absolute left-4 top-1/2 -mt-2.5 text-gray-400 dark:text-gray-500 pointer-events-none group-focus-within:text-sky-500" width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <input
                        type="search"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search the web..."
                        className="w-full py-3 pl-12 pr-4 text-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                        aria-label="Search the web"
                    />
                </div>
            </form>
        </section>
    );
};

export default SearchComponent;
