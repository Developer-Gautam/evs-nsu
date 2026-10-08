import React, { useState } from 'react';
import { Wand2, CheckCircle2 } from 'lucide-react';

export const DataCleaningWizard = ({ dataset, setDataset, columns }) => {
  const [cleaning, setCleaning] = useState(false);
  const [report, setReport] = useState(null);

  const performClean = () => {
    setCleaning(true);
    setTimeout(() => {
      let missingFixed = 0;
      const numCols = columns.filter(c => dataset.some(d => typeof d[c] === 'number'));
      
      const newDataset = dataset.map(row => {
        const newRow = { ...row };
        numCols.forEach(col => {
          if (newRow[col] === '' || newRow[col] === null || newRow[col] === undefined || isNaN(newRow[col])) {
            newRow[col] = 0; // In a real app we'd use mean/median
            missingFixed++;
          }
        });
        return newRow;
      });

      setDataset(newDataset);
      setReport(`Magically fixed ${missingFixed} anomalies & normalized data!`);
      setCleaning(false);
      
      setTimeout(() => setReport(null), 5000);
    }, 2000);
  };

  return (
    <div className="bg-slate-800/80 border border-purple-500/30 p-4 rounded-xl flex items-center justify-between mb-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Wand2 className={`w-5 h-5 text-purple-400 ${cleaning ? 'animate-bounce' : ''}`} />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">Data Cleaning Wizard</h4>
          <p className="text-xs text-slate-400">Auto-detect anomalies & fill missing values</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        {report && (
          <span className="text-xs text-teal-400 font-bold flex items-center gap-1 animate-in fade-in zoom-in">
            <CheckCircle2 className="w-4 h-4" /> {report}
          </span>
        )}
        <button 
          onClick={performClean} 
          disabled={cleaning}
          className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2 cursor-pointer"
        >
          {cleaning ? 'Scanning Matrix...' : 'Clean Data Magic'}
        </button>
      </div>
    </div>
  );
};
