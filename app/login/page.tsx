"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Supabase bağlantımız
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    setLoading(true);

    // Supabase ile giriş yapma işlemi
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Giriş Hatası: " + error.message);
    } else {
      // Giriş başarılıysa Dashboard'a yönlendir
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white animate-in">
      <div className="w-full max-w-md bg-[#0d0d0d] border border-white/5 p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
        
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-12 bg-indigo-600 rounded-2xl font-black italic text-2xl mb-4 pt-1 shadow-lg shadow-indigo-500/20 text-center">N</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Neurolytics</h1>
          <p className="text-slate-500 text-sm font-medium mt-2 italic">Zekaya giriş yapın.</p>
        </div>

        {/* FORM BAŞLANGICI */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-2">E-POSTA ADRESİ</label>
            <input 
              type="email" 
              placeholder="isim@sirket.com" 
              required
              className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-600 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-2">ŞİFRE</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-600 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={20}/> SİSTEME GİRİŞ YAP</>}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 font-bold mt-8">
          Henüz hesabınız yok mu? <Link href="/register" className="text-indigo-500 hover:underline">Ücretsiz Kaydolun</Link>
        </p>
      </div>
    </div>
  );
}