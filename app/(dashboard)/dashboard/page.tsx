"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, TrendingUp, Target, ShoppingBag, 
  Plus, ArrowUpRight, Loader2, BrainCircuit 
} from 'lucide-react';
import Link from "next/link";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    spend: 0,
    revenue: 0,
    roas: 0,
    orders: 0,
    chartData: []
  });

  useEffect(() => {
    fetchEverything();
  }, []);

  async function fetchEverything() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Meta Verilerini Çek
      let metaSpend = 0;
      try {
        const metaRes = await fetch('/api/meta/insights');
        const metaJson = await metaRes.json();
        metaSpend = parseFloat(metaJson[0]?.spend || 0);
      } catch (e) { console.error(e); }

      // 2. Manuel Satışları Çek
      const { data: sales } = await supabase
        .from('manual_sales')
        .select('*')
        .eq('user_id', user.id);

      const totalRevenue = sales?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
      const totalOrders = sales?.reduce((acc, curr) => acc + Number(curr.order_count), 0) || 0;
      const realRoas = metaSpend > 0 ? (totalRevenue / metaSpend).toFixed(2) : "0.00";

      const chartMapping = sales?.slice(-7).map(s => ({
        name: s.sale_date,
        Ciro: Number(s.amount),
        Harcama: metaSpend / 7
      })) || [];

      setData({
        spend: metaSpend,
        revenue: totalRevenue,
        roas: realRoas,
        orders: totalOrders,
        chartData: chartMapping
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-[80vh]">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
      <p className="text-slate-500 font-black tracking-widest uppercase text-xs">Nöral Veriler İşleniyor...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Genel Bakış</h1>
          <p className="text-slate-500 font-medium italic">Harcama vs. Ciro Analizi</p>
        </div>
        <Link href="/sales" className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
          <Plus size={20} /> SATIŞ GİRİŞİ
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DataCard title="Harcama" value={`₺${data.spend}`} color="text-rose-500" icon={<DollarSign/>} />
        <DataCard title="Ciro" value={`₺${data.revenue}`} color="text-emerald-500" icon={<ShoppingBag/>} />
        <DataCard title="ROAS" value={`${data.roas}x`} color="text-indigo-500" icon={<Target/>} />
        <DataCard title="Sipariş" value={data.orders} color="text-amber-500" icon={<TrendingUp/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/5 p-10 rounded-[48px] shadow-2xl h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chartData.length > 0 ? data.chartData : demoData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
              <XAxis dataKey="name" tick={{fill: '#475569', fontSize: 12}} />
              <YAxis tick={{fill: '#475569', fontSize: 12}} />
              <Tooltip contentStyle={{backgroundColor: '#000', borderRadius: '16px', border: 'none'}} />
              <Area type="monotone" dataKey="Ciro" stroke="#4f46e5" fill="#4f46e520" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-indigo-600 p-10 rounded-[48px] text-white flex flex-col justify-between">
          <div>
            <BrainCircuit size={40} className="mb-6 opacity-50" />
            <h3 className="text-3xl font-black italic mb-6 uppercase">Neuro-AI</h3>
            <p className="text-lg font-bold">
              {Number(data.roas) > 3 ? "Performansınız mükemmel seviyede." : "ROAS artışı için kreatifleri optimize edin."}
            </p>
          </div>
          <button className="bg-black text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs">
            Detaylı Rapor
          </button>
        </div>
      </div>
    </div>
  );
}

function DataCard({ title, value, color, icon }: any) {
  return (
    <div className="bg-[#0d0d0d] p-8 rounded-[40px] border border-white/5">
      <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${color}`}>{icon}</div>
      <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mb-1">{title}</p>
      <h4 className="text-3xl font-black tracking-tighter">{value}</h4>
    </div>
  );
}

const demoData = [
  { name: '04/04', Ciro: 2780, Harcama: 3908 },
  { name: '05/04', Ciro: 1890, Harcama: 4800 }
];