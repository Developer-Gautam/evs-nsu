import React, { useState } from 'react';
import { Activity, TrendingUp } from 'lucide-react';

// Highly distinct and accessible color palette
const distinctColors = [
  '#2DD4BF', // Teal
  '#FBBF24', // Amber
  '#F43F5E', // Rose
  '#818CF8', // Indigo
  '#A3E635', // Lime
  '#E879F9', // Fuchsia
  '#38BDF8', // Sky
];

export const KPICard = ({ title, value, icon: Icon, trend }) => (
  <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/80">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-900 rounded-xl shadow-inner">
        <Icon className="w-5 h-5 text-teal-400" />
      </div>
      {trend && (
        <span className="text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded-md flex items-center gap-1 border border-teal-400/20">
          <TrendingUp className="w-3 h-3" /> {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-slate-300 text-sm font-semibold mb-1 uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-black text-white tracking-tight">{value}</p>
    </div>
  </div>
);

export const ModernBarChart = ({ data, dataKey, categoryKey, title }) => {
  if (!data || data.length === 0) return null;
  // Fallback global max if item.Max isn't provided
  const globalMaxVal = Math.max(...data.map(d => Number(d[dataKey]) || 0));
  
  return (
    <div className="glass-card p-6 rounded-2xl h-full flex flex-col border border-slate-700 bg-slate-800/80">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0">
        <Activity className="w-5 h-5 text-teal-400" /> {title}
      </h3>
      <div className="flex-1 overflow-x-auto custom-scrollbar w-full h-full relative">
        <div className="flex items-end gap-2 md:gap-4 min-w-max px-2 absolute inset-0">
          {data.map((item, i) => {
          const val = Number(item[dataKey]) || 0;
          const max = item.Max ? Number(item.Max) : globalMaxVal;
          const heightPct = max > 0 ? (val / max) * 100 : 0;
          const color = distinctColors[i % distinctColors.length];
          
          return (
            <div key={i} className="flex flex-col items-center flex-1 gap-3 group h-full justify-end">
              <div className="w-full relative flex items-end justify-center h-full bg-slate-900/50 rounded-t-xl overflow-hidden border-b-2 border-slate-700">
                <div 
                  className="w-full rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-100 opacity-80 relative"
                  style={{ height: `${heightPct}%`, backgroundColor: color, boxShadow: `0 -4px 20px ${color}40` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute -top-12 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-slate-600 flex flex-col items-center">
                  <span className="font-bold text-teal-400">{val.toFixed(2)}</span>
                  <span className="text-[9px] text-slate-400">Max: {max.toFixed(0)}</span>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-300 truncate w-full text-center font-bold bg-slate-900/50 py-1 rounded" title={String(item[categoryKey])}>
                {item[categoryKey]}
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export const DonutChart = ({ data, title }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  if (!data || Object.keys(data).length === 0) return null;
  
  const entries = Object.entries(data);
  const total = entries.reduce((acc, [_, val]) => acc + val, 0);
  
  // Group into 'Other' if more than 5 items
  const sortedEntries = [...entries].sort((a, b) => b[1] - a[1]);
  const topEntries = sortedEntries.slice(0, 5);
  const otherSum = sortedEntries.slice(5).reduce((acc, [_, val]) => acc + val, 0);
  if (otherSum > 0) {
    topEntries.push(['Other', otherSum]);
  }

  let currentAngle = 0;

  const paths = topEntries.map(([key, value], index) => {
    const sliceAngle = (value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle += sliceAngle;
    
    const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
    const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
    const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
    const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);
    
    const largeArcFlag = sliceAngle > 180 ? 1 : 0;
    
    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');

    return { 
      pathData, 
      color: distinctColors[index % distinctColors.length], 
      label: key, 
      value, 
      percentage: ((value/total)*100).toFixed(1) 
    };
  });

  return (
    <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-between border border-slate-700 bg-slate-800/80">
      <h3 className="text-lg font-bold text-white mb-6 text-center">{title}</h3>
      <div className="flex flex-col items-center justify-center h-full flex-1">
        <div className="relative w-64 h-64 drop-shadow-2xl">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-md">
            {paths.map((p, i) => (
              <path 
                key={i} 
                d={p.pathData} 
                fill={p.color} 
                className="transition-all duration-300 hover:opacity-80 cursor-pointer stroke-slate-800 stroke-[1.5]" 
                onMouseEnter={() => setHoveredSlice(p)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{
                  transformOrigin: '50% 50%',
                  transform: hoveredSlice === p ? 'scale(1.05)' : 'scale(1)'
                }}
              />
            ))}
            <circle cx="50" cy="50" r="22" fill="#1e293b" className="drop-shadow-inner transition-colors duration-300" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {hoveredSlice ? (
              <div className="animate-in fade-in zoom-in duration-200">
                <span 
                  className="text-[10px] font-bold block mb-1 truncate w-[100px] mx-auto uppercase tracking-wider" 
                  style={{ color: hoveredSlice.color }}
                >
                  {hoveredSlice.label}
                </span>
                <span className="text-3xl font-black text-white block leading-none tracking-tighter">
                  {hoveredSlice.percentage}%
                </span>
                <span className="text-[9px] text-slate-400 font-bold mt-1 block uppercase">
                  {hoveredSlice.value} Items
                </span>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in duration-200">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Total
                </span>
                <span className="text-3xl font-black text-white block leading-none">
                  {total}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
