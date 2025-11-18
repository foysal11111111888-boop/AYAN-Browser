
import React, { useState } from 'react';
import type { QuickLink } from '../types';

interface QuickLinksProps {
    links: QuickLink[];
    setLinks: React.Dispatch<React.SetStateAction<QuickLink[]>>;
    isIncognito: boolean;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ links, setLinks, isIncognito }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const handleAddLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (newName.trim() && newUrl.trim() && !isIncognito) {
            const newLink: QuickLink = {
                id: Date.now().toString(),
                name: newName,
                url: newUrl.startsWith('http') ? newUrl : `https://` + newUrl,
                icon: newName.substring(0, 2).toUpperCase(),
            };
            setLinks(prev => [...prev, newLink]);
            setNewName('');
            setNewUrl('');
            setIsAdding(false);
        }
    };

    const handleRemoveLink = (id: string) => {
        if (!isIncognito) {
            setLinks(prev => prev.filter(link => link.id !== id));
        }
    };

    return (
        <section aria-labelledby="quick-links-heading">
            <h2 id="quick-links-heading" className="sr-only">Quick Links</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {links.map(link => (
                    <div key={link.id} className="group relative">
                        <a href={link.url} className="flex flex-col items-center justify-center p-2 space-y-2 text-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold text-gray-600 dark:text-gray-300 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                {link.icon}
                            </div>
                            <span className="text-xs truncate w-full">{link.name}</span>
                        </a>
                        {!isIncognito && (
                            <button onClick={() => handleRemoveLink(link.id)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`Remove ${link.name}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                        )}
                    </div>
                ))}
                {!isIncognito && (
                    <button onClick={() => setIsAdding(true)} className="flex flex-col items-center justify-center p-2 space-y-2 text-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:border-sky-500 group-hover:text-sky-500 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Add</span>
                    </button>
                )}
            </div>
             {isAdding && !isIncognito && (
                <form onSubmit={handleAddLink} className="mt-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium">Add New Quick Link</h3>
                    <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name (e.g., Wikipedia)" required className="w-full p-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"/>
                    <input type="url" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL (e.g., wikipedia.org)" required className="w-full p-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"/>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-3 py-1 text-sm bg-sky-500 text-white rounded-md hover:bg-sky-600">Add</button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default QuickLinks;
