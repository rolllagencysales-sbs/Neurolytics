"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Terminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const baseLogs = [
    "Initializing neural nodes...",
    "Syncing with Global Data Lake...",
    "AI Agent: Node_01 is now active.",
    "Analyzing pattern clusters...",
    "Optimization sequence complete.",
    "Status: System performing at 99.9% efficiency."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-4), baseLogs[i]]);
      i = (i + 1) % baseLogs.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="terminal" className="max-w-4xl mx-auto px-6 py-20">
      <div className="w-full bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="bg-white/5 px-4 py-2 flex gap-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-500/30" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <div className="w-2 h-2 rounded-full bg-green-500/30" />
        </div>
        <div className="p-6 font-mono text-xs md:text-sm text-cyan-400/80 min-h-[200px] flex flex-col gap-2">
          {logs.map((log, idx) => (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx}>
              <span className="text-slate-500">{">"}</span> {log}
            </motion.p>
          ))}
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-1/2 h-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </section>
  );
}