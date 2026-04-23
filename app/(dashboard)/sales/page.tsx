"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation"; // Yönlendirme için
import { Save, ShoppingBag, X, Loader2, DollarSign } from "lucide-react";
import Link from "next/link";

export default function SalesInput() {
  const [amount, setAmount] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Router'ı tanımla

  const handleSave = async () => {
    if (!amount || !orderCount) return alert("Lütfen tüm alanları doldurun!");
    
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('manual_sales').insert({
      user_id: user?.id,
      amount: parseFloat(amount),
      order_count: parseInt(orderCount),
      sale_date: new Date().toISOString().split('T')[0]
    });

    if (error) {
      alert("Hata: " + error.message);
    } else {
      // BAŞARILIYSA DASHBOARD'A GERİ GÖNDER
      router.push("/dashboard"); 
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in relative">
      
      {/* SOL ÜSTTE KAPAT (X) BUTONU */}
      <Link href="/dashboard" className="absolute -top-4 -left-4 bg-white/5 p-3 rounded-full hover:bg-rose-500 hover:text-white transition-all">
        <X size={24} />
      </Link>

      <div className="text-center pt-8">
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">VERİ GİRİŞİ</h2>
        <p className="text-slate-500 font-medium mt-2 italic">Manuel satış rakamlarını sisteme işleyin.</p>
      </div>

      <div className="bg-[#0d0d0d] p-10 rounded-[48px] border border-white/5 space-y-8 shadow-2xl">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Toplam Ciro (₺)</label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">₺</div>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full bg-black border border-white/10 p-6 pl-12 rounded-3xl focus:border-indigo-600 outline-none transition text-2xl font-black" 
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Sipariş Adedi</label>
          <div className="relative">
            <ShoppingBag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="number" 
              value={orderCount}
              onChange={(e) => setOrderCount(e.target.value)}
              placeholder="0" 
              className="w-full bg-black border border-white/10 p-6 pl-14 rounded-3xl focus:border-indigo-600 outline-none transition text-2xl font-black" 
            />
          </div>
        </div>

        <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1 text-center py-6 border border-white/5 rounded-3xl font-black text-slate-500 hover:bg-white/5 transition">İPTAL</Link>
            <button 
                onClick={handleSave}
                disabled={loading}
                className="flex-[2] bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> KAYDET VE DÖN</>}
            </button>
        </div>
      </div>
    </div>
  );
}