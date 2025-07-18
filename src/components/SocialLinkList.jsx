// src/components/SocialLinkList.jsx
import React, { useState } from 'react';

export default function SocialLinkList({ links, onAddLink, onRemoveLink }) {
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  const handleAdd = () => {
    if (newLink.platform.trim() && newLink.url.trim()) {
      onAddLink(newLink);
      setNewLink({ platform: '', url: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLink(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 ">
    <div className="flex gap-4">
      <div className="grid w-10/12 grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="platform"
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-gemini-500 focus:border-blue-gemini-500"
          placeholder="Platform (e.g., LinkedIn, GitHub)"
          value={newLink.platform}
          onChange={handleChange}
        />
        <input
          type="url"
          name="url"
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-gemini-500 focus:border-blue-gemini-500"
          placeholder="Full URL (e.g., https://linkedin.com/in/yourprofile)"
          value={newLink.url}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="px-6 py-3 grow bg-blue-gemini-600 text-white rounded-lg hover:bg-blue-gemini-700 transition-colors"
      >
        Add Link
      </button>
      </div>

      <ul className="list-disc list-inside space-y-3 mt-4">
        {links.map((link, index) => (
          <li key={link.id || index} className="bg-gray-50 p-3 rounded-md border border-gray-200 flex justify-between items-center">
            <span className="text-gray-800 font-medium">{link.platform}: </span>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-gemini-600 hover:underline ml-2 break-all">{link.url}</a>
            <button
              type="button"
              onClick={() => onRemoveLink(index)}
              className="ml-4 text-red-600 hover:text-red-800 transition-colors flex-shrink-0"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}