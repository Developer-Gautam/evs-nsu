import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, TrendingUp, Database, Users } from 'lucide-react';

export const AIInsightsPanel = ({ dataset, stats }) => {
  const [generating, setGenerating] = useState(true);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    setGenerating(true);
    const timer = setTimeout(() => {
      const generated = [];
      if (dataset.length > 0) {
        generated.push({ icon: Database, text: `Scanned ${dataset.length} records across ${Object.keys(dataset[0] || {}).length} dimensions.` });
      }
      if (stats?.numColsCount > 0 && stats?.averages?.length > 0) {
        const highestAvg = [...stats.averages].sort((a,b)=>b.Average - a.Average)[0];
        if (highestAvg) {
          generated.push({ icon: TrendingUp, text: `The highest average is in ${highestAvg.Variable} (${highestAvg.Average.toFixed(2)}).` });
        }
      }
      if (stats?.catCol && stats?.genderDist) {
        const mostFreq = Object.entries(stats.genderDist).sort((a,b)=>b[1]-a[1])[0];
        if (mostFreq) {
          generated.push({ icon: Users, text: `Dominant category in ${stats.catCol} is '${mostFreq[0]}' making up ${((mostFreq[1]/dataset.length)*100).toFixed(1)}% of data.` });
        }
      }
      generated.push({ icon: Sparkles, text: `Data variance indicates possible clusters. Try the 3D Universe to visualize them.` });
      
      setInsights(generated);
      setGenerating(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [dataset, stats]);

  return (
    <div className="glass-card p-6 rounded-2xl h-full border border-purple-500/30 bg-gradient-to-br from-slate-900 to-purple-900/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
      
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
        <Bot className="w-5 h-5 text-purple-400" /> AI Insights <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/50 uppercase tracking-widest font-black ml-auto">Beta</span>
      </h3>

      {generating ? (
        <div className="flex flex-col items-center justify-center h-48 space-y-4 relative z-10">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
          <p className="text-purple-300 font-mono text-sm animate-pulse text-center">Neural Engine Analyzing Data Space...</p>
        </div>
      ) : (
        <div className="space-y-4 relative z-10">
          {insights.map((insight, idx) => {
            const Icon = insight.icon || Sparkles;
            return (
              <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
                <div className="mt-1 flex-shrink-0 bg-slate-800 p-1.5 rounded shadow">
                  <Icon className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{insight.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
