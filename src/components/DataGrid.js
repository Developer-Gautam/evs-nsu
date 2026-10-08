import { Database, Upload, TableProperties, Plus } from "lucide-react";

export default function DataGrid({ columns, setColumns, dataset, setDataset, fileInputRef }) {
  const updateCell = (rowIndex, colName, value) => {
    const newData = [...dataset];
    const parsedVal = !isNaN(value) && value !== '' ? Number(value) : value;
    newData[rowIndex][colName] = parsedVal;
    setDataset(newData);
  };

  const addColumn = () => {
    const newColName = `VAR${String(columns.length + 1).padStart(3, '0')}`;
    setColumns([...columns, newColName]);
    setDataset(dataset.map(row => ({ ...row, [newColName]: "" })));
  };

  if (columns.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 h-full">
        <Database className="w-16 h-16 mb-4 opacity-20" />
        <h2 className="text-xl font-semibold text-slate-300 mb-2">No Data Loaded</h2>
        <p className="mb-6 text-sm">Import a CSV file or start building a dataset manually.</p>
        <div className="flex gap-4">
          <button onClick={() => fileInputRef.current.click()} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button onClick={addColumn} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-lg font-medium transition-all">
            Create Variable
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto h-full">
      <table className="w-full text-sm text-left relative">
        <thead className="text-xs text-slate-300 uppercase bg-[#1e293b] sticky top-0 z-10 shadow-md">
          <tr>
            <th className="px-3 py-3 font-semibold border-b border-white/10 w-12 text-center text-slate-500 bg-[#1e293b]">#</th>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 font-semibold border-b border-white/10 border-l border-white/5 tracking-wider bg-[#1e293b]">
                <input 
                  value={col}
                  onChange={(e) => {
                    const newCols = [...columns];
                    newCols[idx] = e.target.value;
                    setColumns(newCols);
                  }}
                  className="bg-transparent border-none outline-none w-full text-slate-200 focus:text-blue-400 transition-colors uppercase font-semibold"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {dataset.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-white/5 transition-colors group">
              <td className="px-3 py-1.5 text-center text-slate-500 border-r border-white/5 bg-[#1e293b]/50 group-hover:bg-transparent font-mono text-xs select-none">
                {rowIdx + 1}
              </td>
              {columns.map((col, cellIdx) => (
                <td key={cellIdx} className="border-r border-white/5 last:border-r-0 p-0">
                  <input 
                    type="text"
                    value={row[col] === undefined ? "" : row[col]}
                    onChange={(e) => updateCell(rowIdx, col, e.target.value)}
                    className="w-full h-full min-h-[36px] bg-transparent border-none outline-none px-4 py-1.5 focus:bg-blue-500/10 focus:ring-1 focus:ring-blue-500 text-slate-300 font-medium transition-colors"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
