"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Hata: " + error.message);
    } else {
      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white animate-in">
      <div className="w-full max-w-md bg-[#0d0d0d] border border-white/5 p-12 rounded-[48px] space-y-8 shadow-2xl relative overflow-hidden">
        {/* Dekoratif Işık */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full"></div>
        
        <div className="text-center">
          <div className="inline-block w-12 h-12 bg-indigo-600 rounded-2xl font-black italic text-2xl mb-4 pt-1 shadow-lg shadow-indigo-500/20">N</div>
          <h1 className="text-3xl font-black tracking-tighter">YENİ HESAP AÇ</h1>
          <p className="text-slate-500 text-sm font-medium mt-2">Neurolytics zekasına ilk adımı atın.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-2">E-POSTA</label>
            <input 
              type="email" 
              placeholder="isim@sirket.com" 
              className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-600 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-2">ŞİFRE</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-600 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><UserPlus size={20}/> ÜCRETSİZ KATIL</>}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 font-bold">
          Zaten hesabınız var mı? <Link href="/login" className="text-indigo-500 hover:underline">Giriş Yapın</Link>
        </p>
      </div>
    </div>
  );
}