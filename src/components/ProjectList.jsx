// src/components/ProjectList.jsx
import React, { useState } from 'react';

export default function ProjectList({ projects, onAddProject, onRemoveProject }) {
  const [newProject, setNewProject] = useState({ name: '', link: '', description: '', time: '' });

  const handleAdd = () => {
    if (newProject.name.trim()) {
      onAddProject(newProject);
      setNewProject({ name: '', link: '', description: '', time: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-gemini-500 focus:border-blue-gemini-500"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleChange}
        />
        <input
          type="url"
          name="link"
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-gemini-500 focus:border-blue-gemini-500"
          placeholder="Project Link (Optional)"
          value={newProject.link}
          onChange={handleChange}
        />
        <textarea
          name="description"
          rows="2"
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-gemini-500 focus:border-blue-gemini-500 col-span-full"
          placeholder="Brief description of the project (Optional)"
          value={newProject.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="px-6 py-3 bg-blue-gemini-600 text-white rounded-lg hover:bg-blue-gemini-700 transition-colors w-full"
      >
        Add Project
      </button>

      <div className="space-y-3 mt-4">
        {projects.map((proj, index) => (
          <div key={proj.id || index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-lg text-gray-800">{proj.name}</h4>
              <button
                type="button"
                onClick={() => onRemoveProject(index)}
                className="text-red-600 hover:text-red-800 text-sm transition-colors"
              >
                Remove
              </button>
            </div>
            {proj.link && (
              <p className="text-blue-gemini-600 text-sm mb-1 break-words">
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{proj.link}</a>
              </p>
            )}
            {proj.description && <p className="text-gray-700 text-sm mb-1">{proj.description}</p>}
            {proj.time && <p className="text-gray-600 text-xs italic">{proj.time}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}