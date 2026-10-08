import { Lock, Mail, KeyRound, ChevronRight, Sparkles } from "lucide-react";

export default function LoginScreen({ email, setEmail, password, setPassword, error, loading, handleLogin }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#000000] selection:bg-purple-500/30">
      {/* Deep Space Background Effects - ANTIGRAVITY AESTHETIC */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black pointer-events-none"></div>
      
      {/* Massive Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Antigravity Style Header */}
        <div className="flex flex-col items-center mb-12 relative group cursor-default">
          <div className="absolute -inset-10 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-1000"></div>
          
          <div className="relative flex items-center justify-center p-4 mb-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter mb-4 text-center">
            SKETCHER'S
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full mb-6 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
          <p className="text-slate-400 text-sm font-bold text-center tracking-[0.2em] uppercase">
            Next-Generation Intelligence
          </p>
        </div>

        {/* Sleek Form */}
        <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 ml-2 block uppercase tracking-widest">Authorized Identification</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-600 group-focus-within/input:text-purple-400 transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium hover:bg-[#151515]" 
                  placeholder="System Email" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 ml-2 block uppercase tracking-widest">Security Protocol</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-600 group-focus-within/input:text-blue-400 transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium hover:bg-[#151515]" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 backdrop-blur-md">
                <Lock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200 font-medium leading-relaxed">{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full relative group overflow-hidden bg-white text-black font-black py-4 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-8 text-lg"
            >
              {/* Button Hover Gradient Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              
              {loading ? (
                <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  INITIALIZE SESSION <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
