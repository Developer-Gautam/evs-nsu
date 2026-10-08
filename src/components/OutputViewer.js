import { BarChart2, Activity } from "lucide-react";

// A simple modern SVG Bar Chart
const MiniBarChart = ({ data, dataKey, categoryKey }) => {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map(d => Number(d[dataKey]) || 0));
  
  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      <h4 className="text-sm font-semibold text-slate-300 mb-4">{dataKey} Distribution</h4>
      <div className="flex items-end gap-2 h-40">
        {data.map((item, i) => {
          const val = Number(item[dataKey]) || 0;
          const heightPct = maxVal > 0 ? (val / maxVal) * 100 : 0;
          return (
            <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
              <div className="w-full relative flex items-end justify-center h-full bg-white/5 rounded-t-md overflow-hidden">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-violet-400 rounded-t-sm transition-all duration-500 ease-out group-hover:opacity-80"
                  style={{ height: `${heightPct}%` }}
                ></div>
                {/* Tooltip */}
                <div className="absolute -top-8 bg-[#0f172a] text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">
                  {val}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 truncate w-full text-center" title={String(item[categoryKey])}>
                {item[categoryKey]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function OutputViewer({ outputLogs }) {
  if (outputLogs.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-500 bg-[#0f172a] rounded-xl border border-white/10">
        <BarChart2 className="w-16 h-16 mb-4 opacity-20" />
        <h2 className="text-xl font-semibold text-slate-300 mb-2">Output Viewer Empty</h2>
        <p className="text-sm">Run an analysis from the toolbar or sidebar to see results here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {outputLogs.map((log) => (
        <div key={log.id} className="bg-[#0f172a] rounded-xl border border-white/10 shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500 fade-in">
          <div className="bg-[#1e293b] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> {log.title}
            </h3>
          </div>
          <div className="p-6">
            {log.type === "text" ? (
              <p className="text-slate-300">{log.content}</p>
            ) : (
              <div>
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 bg-[#1e293b] uppercase">
                      <tr>
                        {Object.keys(log.content[0]).map(k => (
                          <th key={k} className="px-4 py-2.5 font-semibold tracking-wider">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {log.content.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="px-4 py-2.5 text-slate-300 font-mono text-sm">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Visual Representation */}
                {log.title === "Descriptive Statistics" && (
                  <MiniBarChart data={log.content} dataKey="Mean" categoryKey="Variable" />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
