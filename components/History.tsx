
import React from 'react';

interface HistoryProps {
    history: string[];
    onSearch: (query: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onSearch }) => {
    if (history.length === 0) return null;

    return (
        <section aria-labelledby="history-heading" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 id="history-heading" className="text-lg font-semibold mb-3">Recent Searches</h2>
            <ul className="space-y-1">
                {history.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => onSearch(item)} className="w-full text-left p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default History;
