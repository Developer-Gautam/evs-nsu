import React from 'react';
import { ScatterChart } from 'lucide-react';

export const ModernScatterPlot = ({ data, columns }) => {
  const numCols = columns.filter(c => data.some(d => typeof d[c] === 'number'));
  if (numCols.length < 2) {
    return (
      <div className="glass-card p-6 rounded-2xl h-full flex flex-col items-center justify-center text-slate-500 bg-slate-800/80 border border-slate-700">
        <p className="font-bold">Need at least 2 numeric columns for Correlation Chart.</p>
      </div>
    );
  }
  const xCol = numCols[0];
  const yCol = numCols[1];

  const xVals = data.map(d => Number(d[xCol]) || 0);
  const yVals = data.map(d => Number(d[yCol]) || 0);
  const xMax = Math.max(...xVals, 1);
  const yMax = Math.max(...yVals, 1);

  return (
    <div className="glass-card p-6 rounded-2xl h-full flex flex-col border border-slate-700 bg-slate-800/80">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0">
        <ScatterChart className="w-5 h-5 text-teal-400" /> Correlation: {xCol} vs {yCol}
      </h3>
      <div className="flex-1 relative w-full h-full border-l-2 border-b-2 border-slate-600 mt-4 mb-6 ml-4">
        {data.map((item, i) => {
          const xPct = ((Number(item[xCol]) || 0) / xMax) * 100;
          const yPct = ((Number(item[yCol]) || 0) / yMax) * 100;
          return (
            <div 
              key={i} 
              className="absolute w-3 h-3 rounded-full bg-teal-400/80 border border-white hover:scale-150 hover:bg-white hover:z-10 transition-transform cursor-pointer shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              style={{ left: `${xPct}%`, bottom: `${yPct}%`, transform: 'translate(-50%, 50%)' }}
              title={`${xCol}: ${item[xCol]}, ${yCol}: ${item[yCol]}`}
            />
          );
        })}
      </div>
    </div>
  );
};
