
import React, { useState } from 'react';
import type { Bookmark } from '../types';

interface BookmarksProps {
    bookmarks: Bookmark[];
    setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
    isIncognito: boolean;
}

const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks, setBookmarks, isIncognito }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const handleAddBookmark = (e: React.FormEvent) => {
        e.preventDefault();
        if (newName.trim() && newUrl.trim() && !isIncognito) {
            const newBookmark: Bookmark = {
                id: Date.now().toString(),
                name: newName,
                url: newUrl.startsWith('http') ? newUrl : `https://` + newUrl,
            };
            setBookmarks(prev => [...prev, newBookmark]);
            setNewName('');
            setNewUrl('');
            setIsAdding(false);
        }
    };
    
    const handleRemoveBookmark = (id: string) => {
        if (!isIncognito) {
            setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
        }
    };

    return (
        <section aria-labelledby="bookmarks-heading" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 id="bookmarks-heading" className="text-lg font-semibold mb-3">Bookmarks</h2>
            <div className="space-y-2">
                {bookmarks.length > 0 ? (
                    bookmarks.map(bookmark => (
                         <div key={bookmark.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50">
                            <a href={bookmark.url} className="truncate text-sky-600 dark:text-sky-400 hover:underline">
                                {bookmark.name}
                            </a>
                            {!isIncognito && (
                                <button onClick={() => handleRemoveBookmark(bookmark.id)} className="ml-4 p-1 text-red-500 rounded-full opacity-0 group-hover:opacity-100" aria-label={`Remove ${bookmark.name}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No bookmarks yet.</p>
                )}
            </div>
            {!isIncognito && (
                isAdding ? (
                    <form onSubmit={handleAddBookmark} className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                         <h3 className="text-sm font-medium">Add New Bookmark</h3>
                         <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name" required className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"/>
                         <input type="url" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL" required className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"/>
                         <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Cancel</button>
                            <button type="submit" className="px-3 py-1 text-sm bg-sky-500 text-white rounded-md hover:bg-sky-600">Add</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={() => setIsAdding(true)} className="mt-4 text-sm text-sky-600 dark:text-sky-400 hover:underline">
                        + Add Bookmark
                    </button>
                )
            )}
        </section>
    );
};

export default Bookmarks;
