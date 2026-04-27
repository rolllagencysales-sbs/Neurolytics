"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(0,242,255,0.4)]">
            N
          </div>
          <span className="font-black tracking-tighter text-xl italic uppercase tracking-[2px]">Neurolytics</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
          <a href="#features" className="hover:text-cyan-400 transition">Hizmetler</a>
          <a href="#terminal" className="hover:text-cyan-400 transition">Teknoloji</a>
          <a href="#contact" className="hover:text-cyan-400 transition">İletişim</a>
        </div>
        <button className="px-5 py-2 rounded-md bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
          DEMO AL
        </button>
      </div>
    </nav>
  );
}