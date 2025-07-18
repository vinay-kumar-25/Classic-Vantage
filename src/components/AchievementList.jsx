// src/components/AchievementList.jsx
import React, { useState } from 'react';

export default function AchievementList({ achievements, onAddAchievement, onRemoveAchievement }) {
  const [newAchievementText, setNewAchievementText] = useState('');

  const handleAdd = () => {
    if (newAchievementText.trim()) {
      onAddAchievement(newAchievementText.trim());
      setNewAchievementText('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-gemini-500 focus:border-blue-gemini-500"
          placeholder="e.g.Won Inter-College Debate Competition 2024, Organized Annual Cultural Fest..."
          value={newAchievementText}
          onChange={(e) => setNewAchievementText(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-gemini-600 text-white rounded-lg hover:bg-blue-gemini-700 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="list-disc list-inside space-y-2">
        {achievements.map((ach, index) => (
          <li key={ach.id || index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
            <span className="text-gray-800">{ach.text || ach}</span> {/* Handle objects or direct strings */}
            <button
              type="button"
              onClick={() => onRemoveAchievement(index)}
              className="ml-4 text-red-600 hover:text-red-800 transition-colors"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}