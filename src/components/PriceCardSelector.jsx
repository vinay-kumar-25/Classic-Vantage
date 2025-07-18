// File: components/PriceCardSelector.jsx
import React from 'react';

export default function PriceCardSelector({ label, name, options, selectedValue, onChange, description, error }) {
  const handleChange = (value) => {
    onChange({ target: { name, value } });
  };

  return (
    <div className="mb-8 w-full ">
      <h3 className="text-3xl font-semibold text-blue-gemini-700 mb-6 text-center">{label}</h3>
      {description && <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-center">{description}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 xl:gap-4"> {/* Adjusted grid for wider cards, increased gap */}
        {options.map((option) => (
          <div
            key={option.value}
            className={`relative p-2 sm:p-4 rounded-2xl  border-3 cursor-pointer transition-all duration-300 ease-in-out transform flex flex-col justify-between 
                        ${selectedValue === option.value
                          ? " ring-blue-gemini-600 shadow-xl scale-101" // Reduced scale, added ring for prominent selection
                          : "hover:shadow-lg"
                        }
                        ${option.tier === 'essential' ? 'bg-white border-gray-200 hover:border-gray-300' : ''}
                        ${option.tier === 'enhanced' ? 'bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-300 hover:border-indigo-400' : ''}
                        ${option.tier === 'premium' ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-400 hover:border-purple-500' : ''}
                        `}
            onClick={() => handleChange(option.value)}
          >
            {/* Badge for highlight */}
            {option.badge && (
              <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg z-30 whitespace-nowrap
                                ${option.badge === 'Most Popular' ? 'bg-green-600' : 'bg-purple-600'}`}>
                {option.badge}
              </span>
            )}

            <div className="flex items-center mb-4">
              <span className={`text-3xl mr-2
                ${option.tier === 'essential' ? 'text-gray-600' : ''}
                ${option.tier === 'enhanced' ? 'text-indigo-600' : ''}
                ${option.tier === 'premium' ? 'text-purple-600' : ''}
              `}>{option.icon}</span>
              <h4 className={`text-2xl font-extrabold leading-tight
                ${option.tier === 'essential' ? 'text-gray-900' : ''}
                ${option.tier === 'enhanced' ? 'text-indigo-900' : ''}
                ${option.tier === 'premium' ? 'text-purple-900' : ''}
              `}>{option.label}</h4>
            </div>
            <p className="text-sm font-medium mb-4 text-gray-600">{option.slogan}</p>

            <p className={`text-4xl font-extrabold mb-6
              ${option.tier === 'essential' ? 'text-blue-gemini-700' : ''}
              ${option.tier === 'enhanced' ? 'text-indigo-700' : ''}
              ${option.tier === 'premium' ? 'text-purple-700' : ''}
            `}>
              ₹{option.value}
            </p>

            <ul className="list-none space-y-3 mb-8 text-gray-800 text-[0.8rem] flex-grow"> {/* Increased text size, spacing, and flex-grow */}
              {option.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className={`w-6 h-6 mr-3 flex-shrink-0
                    ${option.tier === 'essential' ? 'text-green-500' : ''}
                    ${option.tier === 'enhanced' ? 'text-indigo-500' : ''}
                    ${option.tier === 'premium' ? 'text-purple-500' : ''}
                  `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <div className={`mt-auto pt-6 border-t-2
              ${option.tier === 'essential' ? 'border-gray-100' : ''}
              ${option.tier === 'enhanced' ? 'border-indigo-100' : ''}
              ${option.tier === 'premium' ? 'border-purple-100' : ''}
            `}>
              <p className={` text-sm
                ${option.tier === 'essential' ? 'text-gray-500' : ''}
                ${option.tier === 'enhanced' ? 'text-indigo-500' : ''}
                ${option.tier === 'premium' ? 'text-purple-500' : ''}
              `}>
                {option.insight}
              </p>
            </div>

            {selectedValue === option.value && (
              <div className={`absolute top-0 right-0 
                ${option.tier === 'essential' ? 'text-blue-gemini-600' : ''}
                ${option.tier === 'enhanced' ? 'text-indigo-600' : ''}
                ${option.tier === 'premium' ? 'text-purple-600' : ''}
              `}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </div>
  );
}