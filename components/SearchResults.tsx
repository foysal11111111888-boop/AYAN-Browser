
import React, { useEffect } from 'react';

interface SearchResultsProps {
    onBack: () => void;
    query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onBack, query }) => {

    useEffect(() => {
        // This is a bit of a hack to work with PSE.
        // We trigger a search programmatically if the search element is available.
        if (window.google && window.google.search && window.google.search.cse) {
            const element = window.google.search.cse.element.getElement('gsc-search-results-only');
            if (element) {
                element.execute(query);
            }
        }
    }, [query]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <button onClick={onBack} className="mb-4 text-sm text-sky-600 dark:text-sky-400 hover:underline">
                &larr; Back to Home
            </button>
            <div id="gsc-search-results-only" className="gcse-searchresults-only"></div>
        </div>
    );
};

declare global {
  interface Window {
    google?: {
      search?: {
        cse?: {
          element: {
            getElement: (id: string) => { execute: (query: string) => void; } | null;
          }
        }
      }
    };
  }
}

export default SearchResults;
