// File: components/ColorPalettePicker.jsx
import { useState } from "react";
import MiniWeb from "./MiniWeb"

export default function ColorPalettePicker({ label, name, selectedColors, onChange, description }) {
  const [customHexInput, setCustomHexInput] = useState("");
  const [hexInputError, setHexInputError] = useState("");
const professionalColorPalettes = [
  // --- Professional & Powerful Base Themes ---
  { name: "Corporate Sapphire", colors: ["#192A56", "#2F5D9E", "#5FA8D3", "#CBD9E8", "#F4F7F9"] },
  { name: "Elegant Charcoal", colors: ["#212121", "#424242", "#757575", "#BDBDBD", "#ECEFF1"] },
  { name: "Forest Modern", colors: ["#1B5E20", "#388E3C", "#66BB6A", "#C8E6C9", "#F1F8E9"] },
  { name: "Deep Plum Harmony", colors: ["#311B92", "#512DA8", "#7E57C2", "#D1C4E9", "#F3E5F5"] },
  { name: "Sunstone Warmth", colors: ["#E64A19", "#FF7043", "#FFAB91", "#FFCCBC", "#FFF3E0"] },

  // --- Professional Blue Tones ---
  { name: "Midnight Ocean", colors: ["#001F3F", "#003366", "#0056B3", "#87CEEB", "#E0FFFF"] }, // Deep, corporate blue
  { name: "Skyline Serenity", colors: ["#0B3C5D", "#3282B8", "#BBE1FA", "#DEEBF5", "#F8FBFD"] }, // Calm, modern blue
  { name: "Tech Indigo", colors: ["#1A237E", "#3F51B5", "#7986CB", "#C5CAE9", "#E8EAF6"] }, // Rich, deep indigo blue
  { name: "Arctic Blue", colors: ["#005792", "#00BBD4", "#7FEFFF", "#A7F7F6", "#E1FFFF"] }, // Cooler, crisp blue

  // --- Earthy Brown Tones ---
  { name: "Rich Mahogany", colors: ["#4E342E", "#6D4C41", "#8D6E63", "#D7CCC8", "#F5F5F5"] }, // Deep, warm, classic brown
  { name: "Desert Earth", colors: ["#8D6247", "#B2845B", "#D4AC64", "#F4E0BF", "#FCF8F3"] }, // Lighter, natural, sandy brown
  { name: "Cinnamon Spice", colors: ["#795548", "#A1887F", "#BCAAA4", "#EFEBE9", "#FBFBFB"] }, // Muted, cozy brown

  // --- Elegant Golden Tones ---
  { name: "Regal Gold", colors: ["#8B5E00", "#D4AF37", "#FFD700", "#FFFACD", "#FAFAD2"] }, // Classic, rich gold
  { name: "Amber Luster", colors: ["#FF8C00", "#FFC300", "#FFDA66", "#FFF2CC", "#FFF8E1"] }, // Warmer, inviting amber-gold
  { name: "Champagne Glow", colors: ["#A0522D", "#CD853F", "#F0E68C", "#FDF5E6", "#FFFDD0"] }, // Sophisticated, softer gold

  // --- Dynamic Red-Blue Tones ---
  { name: "Crimson & Cobalt", colors: ["#8B0000", "#B22222", "#4169E1", "#6495ED", "#F0F8FF"] }, // Strong, classic red and blue
  { name: "Modern Sangria Blue", colors: ["#7F0000", "#C85050", "#3E508F", "#8CA0D9", "#ECEFF1"] }, // Muted, sophisticated red-blue
  { name: "Patriotic Contrast", colors: ["#B20000", "#E12C2C", "#1F4068", "#4A6E9B", "#F5F8FA"] }, // Bold, high-contrast red-blue

  // --- Vibrant & Colorful (Remaining from previous set, still excellent) ---
  { name: "Vibrant Azure", colors: ["#007ACC", "#00A1D6", "#4FC3F7", "#B3E5FC", "#E1F5FE"] },
  { name: "Tropical Punch", colors: ["#FF4081", "#F48FB1", "#FFEB3B", "#8BC34A", "#26A69A"] },
  { name: "Emerald Coast", colors: ["#00897B", "#4DB6AC", "#80CBC4", "#B2DFDB", "#E0F2F1"] },

  // --- Feminine & Sophisticated (Remaining from previous set, still excellent) ---
  { name: "Rose Quartz Serenity", colors: ["#D8BFD8", "#F0C4DF", "#F6DCEF", "#FAE3E3", "#FDFDFD"] },
  { name: "Berry Blossom", colors: ["#880E4F", "#C2185B", "#EC407A", "#F8BBD0", "#FCE4EC"] },
  { name: "Lavender Mist", colors: ["#673AB7", "#9575CD", "#D1C4E9", "#EDE7F6", "#F3E5F5"] },
];

  // Helper function to generate a slightly different shade for the gradient end
  const getGradientEndColor = (hex) => {
    // Simple approach: parse hex, adjust brightness, convert back
    // This isn't perfect for all colors (e.g., black), but works for most.
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Darken by 10-20%
    r = Math.max(0, r - 30);
    g = Math.max(0, g - 30);
    b = Math.max(0, b - 30);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const handleCustomHexInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCustomHexInput(value);
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) && value.length > 0) {
      setHexInputError("Invalid hex code (e.g., #RRGGBB or #RGB)");
    } else {
      setHexInputError("");
    }
  };

  const handleAddCustomColor = () => {
    const colorToAdd = customHexInput.trim();
    if (colorToAdd && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorToAdd)) {
      if (!selectedColors.includes(colorToAdd)) {
        onChange([...selectedColors, colorToAdd]);
      }
      setCustomHexInput("");
      setHexInputError("");
    } else {
      setHexInputError("Please enter a valid hex color code.");
    }
  };

  const handlePaletteSelect = (colors) => {
    const allColorsSelected = colors.every(color => selectedColors.includes(color));

    if (allColorsSelected) {
      onChange(selectedColors.filter(c => !colors.includes(c)));
    } else {
      const newColors = [...new Set([...selectedColors, ...colors])];
      onChange(newColors);
    }
  };

  const handleIndividualColorToggle = (color) => {
    if (selectedColors.includes(color)) {
      onChange(selectedColors.filter((c) => c !== color));
    } else {
      onChange([...selectedColors, color]);
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-lg font-semibold text-gray-800 mb-2">
        {label}
      </label>
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

      {/* Manual Color Addition */}
      <div className="mb-10 p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
        <h3 className="text-md font-medium text-gray-700 mb-3">Add Custom Color</h3>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="#RRGGBB or #RGB"
            value={customHexInput}
            onChange={handleCustomHexInputChange}
            className={`flex-grow p-3 border ${hexInputError ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400`}
          />
          <button
            type="button"
            onClick={handleAddCustomColor}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md flex-shrink-0 font-medium active:scale-95"
          >
            Add Color
          </button>
        </div>
        {hexInputError && <p className="text-red-500 text-sm mt-2">{hexInputError}</p>}
      </div>

      {/* Suggested Color Palettes */}
      <div className="mb-10">
        <h3 className="text-md font-medium text-gray-700 mb-4">Or choose a Professional Palette:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalColorPalettes.map((palette) => {
            const isSelected = palette.colors.every(color => selectedColors.includes(color));
            return (
              <div
                key={palette.name}
                className={`border  rounded-lg cursor-pointer overflow-hidden transition-all duration-200 flex justify-between
                           ${isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}
                           hover:shadow-sm `}
                onClick={() => handlePaletteSelect(palette.colors)}
              >
                <div className="p-4">

                <h4 className={`font-semibold mb-2 ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                  {palette.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {palette.colors.map((color) => {
                    const isColorSelected = selectedColors.includes(color);
                    const gradientEnd = getGradientEndColor(color);
                    return (
                      <div
                        key={color}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-150
                                   ${isColorSelected ? "border-blue-500 scale-110" : "border-gray-300"}
                                   hover:scale-110 active:scale-95`}
                        style={{ background: `linear-gradient(to bottom right, ${color}, ${gradientEnd})` }}
                        title={color}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIndividualColorToggle(color);
                        }}
                      >
                        {isColorSelected && (
                          <svg className="w-4 h-4 text-white stroke-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                </div>
                <div className="h-full w-[40%] group overflow-hidden" ><MiniWeb   theme={{
    primary: palette.colors[0],
    accent: palette.colors[1],
    highlight: palette.colors[2],
    dark: palette.colors[3],
    base: palette.colors[4],
  }}/></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Display Selected Colors */}
      {selectedColors.length > 0 && (
        <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
          <h3 className="text-md font-medium text-gray-700 mb-3">Selected Colors:</h3>
          <div className="flex flex-wrap gap-3">
            {selectedColors.map((color) => {
              const gradientEnd = getGradientEndColor(color);
              return (
                <div
                  key={color}
                  className="flex items-center space-x-2 p-2 border border-gray-200 rounded-full bg-gray-50 transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ background: `linear-gradient(to bottom right, ${color}, ${gradientEnd})` }}
                    title={color}
                  ></div>
                  <span className="text-gray-700 text-sm font-mono">{color.toUpperCase()}</span>
                  <button
                    type="button"
                    onClick={() => onChange(selectedColors.filter(c => c !== color))}
                    className="text-gray-500 hover:text-red-500 transition-colors duration-150 focus:outline-none"
                    title="Remove color"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    
    </div>
  );
}