"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  User, CreditCard, Clock, ShieldCheck, 
  ArrowRight, Loader2, Calendar, Zap, ReceiptText 
} from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  // --- HOOKLAR (HER ZAMAN EN ÜSTTE OLMALI) ---
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetchEverything();
  }, []);

  // --- VERİ ÇEKME FONKSİYONLARI ---
  async function fetchEverything() {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);

        // 1. Abonelik Bilgisini Çek
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        setSub(subData);

        // 2. Ödeme Geçmişini Çek
        const { data: payData } = await supabase
          .from('payment_history')
          .select('*')
          .eq('user_id', session.user.id)
          .order('payment_date', { ascending: false });
        if (payData) setPayments(payData);
      }
    } catch (error) {
      console.error("Veri çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  }

  // Kalan gün sayısını hesapla
  const getDaysLeft = (expiryDate: string) => {
    const total = Date.parse(expiryDate) - Date.parse(new Date().toISOString());
    const days = Math.ceil(total / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center min-h-[80vh]">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
    </div>
  );

  const daysLeft = sub?.expires_at ? getDaysLeft(sub.expires_at) : 0;

  return (
    <div className="max-w-5xl space-y-12 animate-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">HESAP MERKEZİ</h2>
          <p className="text-slate-500 font-medium mt-2 italic">Aboneliğiniz ve geçmiş işlemleriniz.</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <ShieldCheck className="text-emerald-500" size={24} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Kullanıcı Kartı */}
        <div className="bg-[#0d0d0d] p-10 rounded-[48px] border border-white/5 space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-500">
            <User size={32} />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">E-posta</label>
            <p className="text-xl font-bold truncate">{user?.email}</p>
          </div>
          <span className="inline-block bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg text-xs font-black italic">AKTİF KULLANICI</span>
        </div>

        {/* Abonelik Kartı */}
        <div className="bg-[#0d0d0d] p-10 rounded-[48px] border border-indigo-600/30 space-y-6 relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full"></div>
           <div className="flex justify-between items-start">
             <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
               <CreditCard size={32} />
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Plan</p>
                <p className="text-2xl font-black italic tracking-tighter text-white">
                  {sub?.plan_type === 'pro' ? 'NEURO PRO' : 'FREE ANALYST'}
                </p>
             </div>
           </div>
           <div className="pt-4 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-5xl font-black text-white leading-none">{daysLeft}</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Kalan Gün</p>
                </div>
                <Clock className="text-slate-800" size={48} />
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((daysLeft / 30) * 100, 100)}%` }}
                ></div>
              </div>
           </div>
           <Link href="/pricing" className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
             SÜREYİ UZAT <Zap size={16} fill="currentColor" />
           </Link>
        </div>
      </div>

      {/* FATURA GEÇMİŞİ TABLOSU */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/5 flex items-center gap-3">
          <ReceiptText className="text-slate-500" />
          <h3 className="font-black text-xl uppercase tracking-tighter">ÖDEME GEÇMİŞİ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-10 py-5">İŞLEM TARİHİ</th>
                <th className="px-10 py-5">PAKET</th>
                <th className="px-10 py-5">TUTAR</th>
                <th className="px-10 py-5 text-right">DURUM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.length > 0 ? payments.map((p) => (
                <tr key={p.id} className="text-sm font-medium hover:bg-white/[0.02] transition group">
                  <td className="px-10 py-6 text-slate-400">
                    {new Date(p.payment_date).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-10 py-6 font-bold text-slate-200">{p.plan_name}</td>
                  <td className="px-10 py-6 text-emerald-500 font-black">{p.amount}</td>
                  <td className="px-10 py-6 text-right">
                    <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase">BAŞARILI</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center text-slate-600 font-bold italic">
                    Henüz bir fatura kaydı bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-slate-600 text-[10px] font-black tracking-widest">
        NEUROLYTICS INTELLIGENCE SYSTEM v1.0
      </div>
    </div>
  );
}