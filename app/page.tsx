"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Brain, Zap, Activity, Shield, Cpu, 
  Terminal as TerminalIcon, BarChart3, 
  Globe, ArrowRight, CheckCircle2 
} from "lucide-react";

// --- Alt Bileşen: Terminal ---
const TerminalEffect = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const baseLogs = [
    "Initialising NeuroCore v4.0.2...",
    "Connecting to neural_nodes_global...",
    "Status: 4.8k neurons firing at 99.9% efficiency.",
    "Analysing data clusters in real-time...",
    "AI Agent: Cluster_09 detected optimization path.",
    "Syncing with Neural API...",
    "Data encryption: Quantum-Shield active."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-5), baseLogs[i]]);
      i = (i + 1) % baseLogs.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="bg-white/5 px-4 py-2 flex gap-2 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-500/30" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
        <div className="w-2 h-2 rounded-full bg-green-500/30" />
        <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">neuro_monitor.log</span>
      </div>
      <div className="p-6 font-mono text-[11px] md:text-sm text-cyan-400/80 min-h-[220px] flex flex-col gap-2">
        {logs.map((log, idx) => (
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx} className="flex gap-2">
            <span className="text-slate-500">{">"}</span> {log}
          </motion.p>
        ))}
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-1/2 h-full bg-cyan-400" />
        </div>
      </div>
    </div>
  );
};

// --- ANA SAYFA ---
export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-cyan-400/30 overflow-x-hidden relative font-sans">
      
      {/* 1. SCROLL PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[100] origin-left" style={{ scaleX }} />

      {/* 2. CURSOR GLOW EFFECT */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 255, 0.12), transparent 80%)`
        }}
      />

      {/* 3. TECH GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00F2FF" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 4. NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 bg-cyan-400 rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(0,242,255,0.4)] group-hover:rotate-12 transition-transform">N</div>
            <span className="font-black tracking-tighter text-xl italic uppercase tracking-widest">Neurolytics</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Sistem</a>
            <a href="#terminal" className="hover:text-cyan-400 transition-colors">Ağ Katmanı</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">Ajans</a>
          </div>
          <button className="px-5 py-2 rounded-md bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all">Bağlan</button>
        </div>
      </nav>

      {/* 5. HERO SECTION */}
      <section className="relative z-10 pt-48 pb-32 px-4 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase"
        >
          Neural Analysis Agency // v4.0.2
        </motion.div>
        
        <h1 className="text-6xl md:text-[110px] font-black tracking-tighter leading-[0.85] mb-8 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
          BEYİN GÜCÜNDE <br /> <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(0,242,255,0.4)] italic uppercase">Analitik.</span>
        </h1>
        
        <p className="max-w-xl text-slate-400 text-lg md:text-xl font-light mb-12 leading-relaxed">
          Karmaşık veri yığınlarını, milisaniyeler içinde yaşayan stratejilere ve AI otomasyonuna dönüştürüyoruz.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button className="px-10 py-5 bg-cyan-400 text-black font-black rounded-2xl text-sm hover:shadow-[0_20px_40px_rgba(0,242,255,0.3)] transition-all flex items-center gap-2 group uppercase">
            Sistemi Başlat <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 bg-white/5 border border-white/10 font-bold rounded-2xl text-sm hover:bg-white/10 transition-all uppercase tracking-widest italic">Dokümantasyon</button>
        </div>
      </section>

      {/* 6. TERMINAL SECTION */}
      <section id="terminal" className="relative z-10 max-w-4xl mx-auto px-8 mb-32">
        <TerminalEffect />
      </section>

      {/* 7. BENTO GRID FEATURES */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          
          {/* Main Card */}
          <div className="md:col-span-4 bg-gradient-to-br from-cyan-900/20 to-transparent border border-white/5 rounded-[2.5rem] p-10 group hover:border-cyan-400/20 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain className="w-32 h-32 text-cyan-400" />
            </div>
            <Brain className="w-12 h-12 text-cyan-400 mb-8" />
            <h3 className="text-3xl font-black mb-4 uppercase">AI Otomasyonu</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Tekrarlayan iş süreçlerini nöral ağlarımızla optimize edin. %80'e varan verimlilik artışı sağlayın.</p>
          </div>

          {/* Stat Card */}
          <div className="md:col-span-2 bg-white/5 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center">
            <div className="text-cyan-400 text-6xl font-black mb-2 italic">0.2ms</div>
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">Tepki Süresi</p>
          </div>

          {/* Small Cards */}
          <div className="md:col-span-2 bg-white/5 border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all">
            <Shield className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Kuantum Koruma</h4>
            <p className="text-slate-500 text-xs italic">Uçtan uca şifrelenmiş veri iletimi.</p>
          </div>

          <div className="md:col-span-2 bg-white/5 border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all">
            <Globe className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Global Entegrasyon</h4>
            <p className="text-slate-500 text-xs italic">Dünya çapında 40+ veri merkezi.</p>
          </div>

          <div className="md:col-span-2 bg-cyan-400 text-black rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer">
            <span className="font-black uppercase tracking-tighter italic">Bize Katılın</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-cyan-400 group-hover:translate-x-2 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-20 px-8 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-5 h-5 bg-cyan-400 rounded-sm" />
              <span className="font-black text-[10px] uppercase font-mono tracking-widest">Neurolytics Engine</span>
            </div>
            <p className="text-slate-600 text-[10px] font-mono italic max-w-xs uppercase">Geleceğin analitik sistemlerini bugünden inşa ediyoruz.</p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
            <div className="flex flex-col gap-4">
              <span className="text-white mb-2 tracking-[0.4em]">Sistem</span>
              <a href="#" className="hover:text-cyan-400 transition-colors">API</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Nöronlar</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white mb-2 tracking-[0.4em]">Yasal</span>
              <a href="#" className="hover:text-cyan-400 transition-colors">Gizlilik</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Şartlar</a>
            </div>
          </div>
          <div className="text-[10px] text-slate-600 font-mono italic uppercase">
            Status: Fully_Operational_v4
          </div>
        </div>
      </footer>

    </main>
  );
}