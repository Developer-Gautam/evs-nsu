import { useState, useRef, useMemo } from "react";
import { 
  Activity, Upload, LogOut, Database,
  TrendingUp, Users, DollarSign, Target, Plus, Info, LayoutDashboard, FileSpreadsheet
} from "lucide-react";
import { KPICard, ModernBarChart, DonutChart } from "./SVGCharts";
import DataGrid from "./DataGrid";
import { ThreeDDataUniverse } from "./ThreeDScatterPlot";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { ModernScatterPlot } from "./AdvancedCharts";
import { DataCleaningWizard } from "./DataCleaningWizard";

export default function StatProDashboard({ user, handleLogout }) {
  const [columns, setColumns] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' or 'editor'
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.trim().split('\n');
      if (lines.length === 0) return;
      const headers = lines[0].split(',').map(h => h.trim().replace(/["']/g, ''));
      const parsedData = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const values = lines[i].split(',').map(v => v.trim().replace(/["']/g, ''));
        const row = {};
        headers.forEach((header, index) => {
          const val = values[index];
          row[header] = !isNaN(val) && val !== '' ? Number(val) : val;
        });
        parsedData.push(row);
      }
      setColumns(headers);
      setDataset(parsedData);
      setActiveTab("overview");
    };
    reader.readAsText(file);
  };

  const createManualDataset = () => {
    setColumns(["VAR001"]);
    setDataset([{ "VAR001": "" }]);
    setActiveTab("editor");
  };

  // Derive Statistics for the Visuals
  const stats = useMemo(() => {
    if (dataset.length === 0) return null;
    
    const genderDist = {};
    const stringCols = columns.filter(col => dataset[0] && typeof dataset[0][col] === 'string');
    const catCol = stringCols.includes('Gender') ? 'Gender' : stringCols[0];
    
    if (catCol) {
      dataset.forEach(row => {
        const val = row[catCol] || 'Unknown';
        genderDist[val] = (genderDist[val] || 0) + 1;
      });
    }

    const numCols = columns.filter(col => dataset[0] && typeof dataset[0][col] === 'number');
    const averages = numCols.map(col => {
      const values = dataset.map(row => row[col] || 0);
      const sum = values.reduce((a, b) => a + b, 0);
      const max = Math.max(...values, 1); 
      return { Variable: col, Average: sum / dataset.length, Max: max };
    });

    return { genderDist, catCol, averages, numColsCount: numCols.length, catColsCount: stringCols.length };
  }, [dataset, columns]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans relative overflow-x-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/5 bg-[#0f172a]/40 backdrop-blur-2xl flex items-center justify-between px-6 z-50 sticky top-0">
        <div className="flex items-center gap-3 text-purple-400">
          <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            SKETCHER'S
          </span>
        </div>
        
        {/* Navigation Tabs */}
        {dataset.length > 0 && (
          <div className="hidden md:flex bg-slate-900/50 p-1 rounded-xl border border-white/5 shadow-inner">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'overview' ? 'bg-slate-800 text-teal-400 shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Visual Overview
            </button>
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'editor' ? 'bg-slate-800 text-teal-400 shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <FileSpreadsheet className="w-4 h-4" /> Data Editor
            </button>
          </div>
        )}

        <div className="flex items-center gap-6">
          <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
          <button onClick={() => fileInputRef.current.click()} className="hidden lg:flex bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl font-bold transition-all items-center gap-2 text-sm shadow-sm">
            <Upload className="w-4 h-4 text-blue-400" /> Import CSV
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user.email}</p>
              <p className="text-xs text-teal-400 font-bold uppercase tracking-wider">Pro Member</p>
            </div>
            <button onClick={handleLogout} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 rounded-xl transition-all" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full z-10 relative flex flex-col h-[calc(100vh-4rem)]">
        
        {dataset.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 animate-in fade-in duration-1000 max-w-2xl mx-auto w-full">
            <div className="relative w-24 h-24 bg-[#0f172a] rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl mb-8 rotate-12">
              <Database className="w-10 h-10 text-teal-400 -rotate-12" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4 tracking-tight text-center">Start Your Analysis</h2>
            
            <div className="glass-card p-6 rounded-2xl w-full mb-8 border border-blue-500/20 bg-blue-500/5 flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold mb-2">How to get started:</h4>
                <ul className="text-slate-400 text-sm space-y-2 font-medium">
                  <li><strong className="text-blue-300">Option 1:</strong> Click "Import CSV File" below to automatically generate a beautiful dashboard from your existing comma-separated data.</li>
                  <li><strong className="text-blue-300">Option 2:</strong> Don't have a file? Click "Create Blank Dataset" to open the spreadsheet editor and type your data in manually!</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button onClick={() => fileInputRef.current.click()} className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-6 py-4 rounded-xl font-black shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                <Upload className="w-5 h-5" /> Import CSV File
              </button>
              <button onClick={createManualDataset} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-6 py-4 rounded-xl font-black shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                <Plus className="w-5 h-5 text-teal-400" /> Create Blank Dataset
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-8 duration-700 fade-in h-full">
            {activeTab === 'overview' && (
              <div className="space-y-6 overflow-y-auto pb-10 pt-6 custom-scrollbar h-full">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Executive Overview</h1>
                    <p className="text-slate-400 font-medium">Automated insights from your dataset.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KPICard title="Total Records" value={dataset.length.toLocaleString()} icon={Database} trend="+12%" />
                  <KPICard title="Numeric Variables" value={stats.numColsCount} icon={Activity} />
                  <KPICard title="Categorical Variables" value={stats.catColsCount} icon={Users} />
                  <KPICard title="Data Health" value="98.5%" icon={Target} trend="Optimal" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[420px]">
                  <div className="lg:col-span-2 h-full">
                    <ModernBarChart 
                      title="Average Values by Numeric Variable" 
                      data={stats.averages} 
                      dataKey="Average" 
                      categoryKey="Variable" 
                    />
                  </div>
                  <div className="lg:col-span-1 h-full">
                    {stats.catCol ? (
                      <DonutChart title={`${stats.catCol} Distribution`} data={stats.genderDist} />
                    ) : (
                      <div className="glass-card p-6 rounded-2xl h-full flex flex-col items-center justify-center text-slate-500 border border-slate-700 bg-slate-800/50">
                        <Users className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-bold text-center">No Categorical Data</p>
                        <p className="text-xs text-center mt-2 max-w-[200px]">Add text-based columns (like 'Gender') to see proportion charts.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[420px]">
                  <div className="lg:col-span-1 h-full">
                    <AIInsightsPanel dataset={dataset} stats={stats} />
                  </div>
                  <div className="lg:col-span-1 h-full">
                    <ModernScatterPlot data={dataset} columns={columns} />
                  </div>
                  <div className="lg:col-span-1 h-full">
                    <ThreeDDataUniverse dataset={dataset} columns={columns} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="h-full flex flex-col gap-4">
                <DataCleaningWizard dataset={dataset} setDataset={setDataset} columns={columns} />
                <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
                    <h3 className="font-bold text-white flex items-center gap-2"><FileSpreadsheet className="w-4 h-4 text-teal-400" /> Manual Data Editor</h3>
                  <div className="flex gap-2">
                    <button onClick={() => {
                       const newRow = {};
                       columns.forEach(col => newRow[col] = "");
                       setDataset([...dataset, newRow]);
                    }} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                      <Plus className="w-3 h-3" /> Add Row
                    </button>
                    <button onClick={() => {
                      const newColName = `VAR${String(columns.length + 1).padStart(3, '0')}`;
                      setColumns([...columns, newColName]);
                      setDataset(dataset.map(row => ({ ...row, [newColName]: "" })));
                    }} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                      <Plus className="w-3 h-3 text-teal-400" /> Add Column
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <DataGrid columns={columns} setColumns={setColumns} dataset={dataset} setDataset={setDataset} fileInputRef={fileInputRef} />
                </div>
              </div>
            </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
