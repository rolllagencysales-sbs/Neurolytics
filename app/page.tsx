"use client";
import Link from 'next/link';
import { ArrowRight, BarChart3, Shield, Globe, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-indigo-500/30">
      {/* Üst Menü */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter italic">NEUROLYTICS</div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 text-sm font-medium hover:text-indigo-400 transition">Giriş</Link>
            <Link href="/pricing" className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all">Başlayın</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-48 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block">Yapay Zeka Destekli Analitik</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">VERİNİN <br/><span className="text-indigo-600 italic">GÜCÜNÜ</span> SERBEST BIRAKIN.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">Neurolytics, Meta Ads harcamalarınızı anlık olarak işler ve işletmeniz için en kârlı rotayı çizer.</p>
          <Link href="/login" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-600 hover:text-white transition-all group">
            ŞİMDİ ANALİZ ET <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}