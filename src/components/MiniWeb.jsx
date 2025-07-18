import React, { useState } from 'react';

const MiniWeb = ({ theme }) => {
  const { primary, accent, highlight, dark, base } = theme;

  const [isHovered, setIsHovered] = useState(false);

  const getTextColor = (bgColor) => {
    if (!bgColor) return '#333333';
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#333333' : '#FFFFFF';
  };

  return (
    <div
      className="relative origin-top-left w-full h-full group"
    >
        <div className="absolute h-full w-1/4 z-20 bg-gradient-to-r from-white to-transparent"></div>
      <div
        className="group  flex h-full w-full flex-col overflow-hidden bg-base shadow-lg transition-all duration-300 ease-out"
        style={{
          backgroundColor: base,
          boxShadow: isHovered
            ? '0 10px 20px rgba(0,0,0,0.15)'
            : '0 5px 10px rgba(0,0,0,0.08)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div
          className="flex h-[20px] items-center justify-between px-2.5 text-[9px] font-semibold shadow-sm z-10"
          style={{
            backgroundColor: primary,
            color: getTextColor(primary),
            borderBottom: `1px solid ${getTextColor(primary)}1A`,
          }}
        >
          <span className="text-[9px]">Portfolio</span>
          <div className="flex gap-2">
            <span>Contact</span>
          </div>
        </div>

        {/* Main Section */}
        <div
          className="grid flex-grow grid-cols-4 gap-1.5 p-1.5"
          style={{ backgroundColor: base }}
        >
          {/* Main Content Area */}
          <div className="col-span-3 flex flex-col gap-1.5 rounded-md bg-white p-1 shadow-sm border border-gray-100">
            {/* Color Tags */}
            <div className="grid grid-cols-5 gap-px h-[15px] rounded-sm overflow-hidden shadow-sm border border-gray-100">
              <div className="flex items-center justify-center text-[7px]" style={{ backgroundColor: primary, color: getTextColor(primary) }}>P</div>
              <div className="flex items-center justify-center text-[7px]" style={{ backgroundColor: accent, color: getTextColor(accent) }}>A</div>
              <div className="flex items-center justify-center text-[7px]" style={{ backgroundColor: highlight, color: getTextColor(highlight) }}>H</div>
              <div className="flex items-center justify-center text-[7px]" style={{ backgroundColor: dark, color: getTextColor(dark) }}>D</div>
              <div className="flex items-center justify-center text-[7px]" style={{ backgroundColor: base, color: getTextColor(base) }}>B</div>
            </div>

            {/* Tech Stack Preview */}
            <div className="grid grid-cols-2 w-full gap-1 ">
              {['Skills', 'Awards','Resume','Work'].map((tech, i) => (
                <div
                  key={tech}
                  className={`flex grow  items-center justify-center font-medium text-[6px] p-0.5 border border-base transition-all duration-300 rounded-md ease-out ${isHovered ? 'scale-[1.02] opacity-100' : 'scale-100 opacity-90'}`}
                  style={{
                    backgroundColor: i % 2 === 0 ? accent : highlight,
                    color: getTextColor(i % 2 === 0 ? accent : highlight),
                  }}
                >
                  <span>{tech}</span>
                  <span className="text-[6px] opacity-80"></span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className=" flex h-[15px] items-center justify-center rounded-sm font-semibold text-[8px] opacity-95"
              style={{
                backgroundColor: primary,
                color: getTextColor(primary),
              }}
            >
              Visit Website
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 flex justify-center items-stretch flex-col gap-1.5">
            <div className="w-6 h-6 place-self-center flex justify-center items-center rounded-full" style={{background:accent}}><div className="w-4 h-4 rounded-full"style={{background:highlight}}></div></div>
            {[
              { label: 'About', color: highlight },
              { label: 'Link', color: accent },
              { label: 'Blog', color: primary },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-[15px] items-center justify-center rounded-sm text-[8px]"
                style={{ backgroundColor: item.color, color: getTextColor(item.color) }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Hover Popup with Slide-In from Right */}
<div
  className={`absolute right-0.5 top-4
              whitespace-nowrap px-2 py-1 rounded-md text-xs shadow-2xl z-20 
              transition-all duration-300 ease-out pointer-events-none
              ${isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}
  style={{
    backgroundColor: dark,
    color: getTextColor(dark),
  }}
>
  🎉Welcome!
</div>

      </div>
    </div>
  );
};

export default MiniWeb;
