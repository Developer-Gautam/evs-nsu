import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronRight, Activity, Globe, Zap, Shield, BarChart3, Database, Code2, Cpu, LineChart, Lock, Gamepad2 } from "lucide-react";
import { InteractiveShape, SpaceGame } from "./ThreeDGame";

export default function LandingPage({ onActionClick, isLoggedIn }) {
  const gameRef = useRef(null);
  
  const scrollToGame = () => {
    gameRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#00ffcc]/30 overflow-x-hidden font-sans relative">
      
      {/* Deep Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#0a0a0a_0%,_#000000_100%)] pointer-events-none z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#cc00ff]/10 rounded-full blur-[200px] animate-pulse-slow z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#00ffcc]/10 rounded-full blur-[200px] animate-pulse-slow z-0" style={{ animationDelay: '2s' }}></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay z-0"></div>

      {/* FIBER OPTIC DATA STREAMS (Animated Background) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute w-full h-full opacity-40" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path className="data-line stroke-[#00ffcc]" d="M -100,500 C 300,500 400,200 600,200 C 800,200 900,600 1100,600" />
          <path className="data-line stroke-[#0066ff]" d="M -100,300 C 400,300 500,800 700,800 C 800,800 900,400 1100,400" style={{ animationDelay: '1.5s' }} />
          <path className="data-line stroke-[#cc00ff]" d="M -100,700 C 200,700 300,300 500,300 C 700,300 800,700 1100,700" style={{ animationDelay: '3s' }} />
          <path className="data-line stroke-[#00ffcc]" d="M -100,800 C 300,800 500,100 800,100 C 900,100 1000,500 1100,500" style={{ animationDelay: '4.5s' }} />
        </svg>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#020202]/50 backdrop-blur-3xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform duration-500">
            <div className="p-2 bg-gradient-to-tr from-[#00ffcc] to-[#0066ff] rounded-xl shadow-[0_0_20px_rgba(0,255,204,0.4)]">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <span className="font-black text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              SKETCHER'S
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <span className="hover:text-[#00ffcc] cursor-pointer transition-colors">Platform</span>
            <span className="hover:text-[#00ffcc] cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-[#00ffcc] cursor-pointer transition-colors">Enterprise</span>
          </div>
          <button 
            onClick={onActionClick}
            className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-black tracking-wide hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isLoggedIn ? "Dashboard" : "Sign In"}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-40 px-4 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(0,255,204,0.1)]">
          <Sparkles className="w-4 h-4 text-[#00ffcc] animate-pulse" />
          <span className="text-xs font-bold text-[#00ffcc] tracking-[0.2em] uppercase">Autonomous Data Processing</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-700 tracking-tighter mb-8 leading-[1.0] drop-shadow-2xl">
          Intelligence, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ffcc] via-[#0066ff] to-[#cc00ff] relative inline-block">
            Materialized.
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ffcc] via-[#0066ff] to-[#cc00ff] blur-3xl opacity-20 -z-10"></div>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 font-medium leading-relaxed">
          SKETCHER'S is the world's most advanced client-side analytics engine. Ingest massive datasets and generate interactive executive dashboards instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-32 z-30">
          <button 
            onClick={onActionClick}
            className="group relative px-10 py-5 bg-white text-black rounded-full font-black tracking-widest text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(0,255,204,0.6)] flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ffcc] via-[#0066ff] to-[#cc00ff] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            {isLoggedIn ? "ENTER PLATFORM" : "START BUILDING"} 
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <button 
            onClick={scrollToGame}
            className="group relative px-10 py-5 bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 rounded-full font-black tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,204,0.1)] hover:bg-[#00ffcc]/20 flex items-center justify-center gap-3 overflow-hidden"
          >
            <Gamepad2 className="w-5 h-5" />
            Don't be fu*king boring, Enjoy my gigs
          </button>
        </div>

        {/* --- 3D INTERACTIVE HERO ELEMENT --- */}
        <div className="w-full max-w-2xl relative z-20 mb-40 h-[500px]">
          <div className="absolute -inset-20 bg-gradient-to-r from-[#00ffcc] via-[#0066ff] to-[#cc00ff] opacity-20 blur-[100px] rounded-full"></div>
          <InteractiveShape />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-bold tracking-widest uppercase animate-pulse">
            Grab and Rotate
          </div>
        </div>
      </main>

      {/* --- 3D SPACE GAME --- */}
      <section ref={gameRef} className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Holodeck Initialized.</h2>
          <p className="text-xl text-[#00ffcc] font-medium tracking-wider uppercase">Destroy the incoming data targets.</p>
        </div>
        <SpaceGame />
      </section>


      {/* TRUSTED BY BANNER */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-md py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-8">Trusted by visionary teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 hover:text-[#00ffcc] transition-colors"><Globe className="w-6 h-6"/> GLOBAL</div>
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 hover:text-[#0066ff] transition-colors"><Zap className="w-6 h-6"/> NEXUS</div>
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 hover:text-[#cc00ff] transition-colors"><Cpu className="w-6 h-6"/> SYNAPSE</div>
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 hover:text-[#00ffcc] transition-colors"><Shield className="w-6 h-6"/> AEGIS</div>
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 hidden md:flex hover:text-[#0066ff] transition-colors"><Activity className="w-6 h-6"/> PULSE</div>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Unrivaled <br/> Architecture.</h2>
          <p className="text-xl text-slate-400 max-w-2xl font-medium">Built from the ground up for maximum velocity and zero latency. Experience analytics at the speed of thought.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-[#00ffcc]/30 transition-all duration-500 group relative overflow-hidden h-[400px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-[100px] group-hover:bg-[#00ffcc]/20 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#00ffcc]/10 flex items-center justify-center mb-6 border border-[#00ffcc]/20">
                  <Database className="w-7 h-7 text-[#00ffcc]" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Massive Scale Ingestion</h3>
                <p className="text-slate-400 text-lg max-w-md">Drop CSV files of any size. Our client-side WASM parser instantly types, structures, and prepares your variables without touching a server.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-[#0066ff]/30 transition-all duration-500 group relative overflow-hidden h-[400px]">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#0066ff]/10 flex items-center justify-center mb-6 border border-[#0066ff]/20">
                <Code2 className="w-7 h-7 text-[#0066ff]" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Native SVG</h3>
                <p className="text-slate-400 text-lg">No bloat. No canvas overhead. Just mathematically perfect SVG generation rendering at 120 frames per second.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-[#cc00ff]/30 transition-all duration-500 group relative overflow-hidden h-[400px]">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#cc00ff]/10 flex items-center justify-center mb-6 border border-[#cc00ff]/20">
                <Shield className="w-7 h-7 text-[#cc00ff]" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Air-Gapped</h3>
                <p className="text-slate-400 text-lg">Your data never leaves your machine. 100% of the analytical processing runs locally in your browser sandbox.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 glass-card p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-white/30 transition-all duration-500 group relative overflow-hidden h-[400px] flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-black border border-white/10 p-6 font-mono text-sm flex flex-col shadow-2xl">
              <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="text-slate-400 space-y-2 flex-1 overflow-hidden">
                <div className="flex gap-2"><span className="text-[#00ffcc]">~</span><span>$ sketcher init --turbo</span></div>
                <div className="text-slate-500">[14:02:43] Initializing engine...</div>
                <div className="text-slate-500">[14:02:43] Compiling SVG architecture...</div>
                <div className="flex gap-2"><span className="text-emerald-400">✓</span><span>Ready in 14ms</span></div>
                <div className="animate-pulse mt-4">_</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global CSS animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .data-line {
          fill: none;
          stroke-width: 3;
          stroke-dasharray: 100 1500;
          animation: pulse-line 6s ease-in-out infinite;
        }
        @keyframes pulse-line {
          0% { stroke-dashoffset: 1600; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotateX(2deg) rotateY(-2deg); }
          50% { transform: translateY(-20px) rotateX(-2deg) rotateY(2deg); }
          100% { transform: translateY(0px) rotateX(2deg) rotateY(-2deg); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
      `}} />
    </div>
  );
}
