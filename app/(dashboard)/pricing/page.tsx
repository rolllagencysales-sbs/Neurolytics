"use client";
import { Check, Crown, Zap, Star } from "lucide-react";

export default function PricingPage() {
  const buy = (url: string) => window.location.href = url;

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">PLANINIZI SEÇİN</h2>
        <p className="text-slate-500 font-medium">Neurolytics gücünü serbest bırakın ve verilerinizi yönetin.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PriceCard 
          title="AYLIK PRO" 
          price="₺299" 
          icon={<Zap className="text-indigo-500" />}
          features={["Tüm Meta Ads Verileri", "Anlık Veri Akışı", "AI Analiz Notları"]}
          onClick={() => buy("https://www.shopier.com/neurolytics/46451401")}
        />
        <PriceCard 
          title="3 AYLIK GOLD" 
          price="₺799" 
          popular={true}
          icon={<Star className="text-amber-500" />}
          features={["%15 Tasarruf", "Öncelikli Destek Hattı", "Detaylı Rakip Analizi"]}
          onClick={() => buy("https://www.shopier.com/neurolytics/46451431")}
        />
        <PriceCard 
          title="YILLIK ELITE" 
          price="₺2.499" 
          icon={<Crown className="text-rose-500" />}
          features={["4 Ay Bedava", "Özel Danışmanlık", "Sınırsız Export"]}
          onClick={() => buy("https://www.shopier.com/neurolytics/46451459")}
        />
      </div>
    </div>
  );
}

function PriceCard({ title, price, icon, features, onClick, popular }: any) {
  return (
    <div className={`bg-[#0d0d0d] p-10 rounded-[48px] border-2 ${popular ? 'border-indigo-600 shadow-2xl shadow-indigo-500/20' : 'border-white/5'} flex flex-col justify-between relative`}>
      {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-[10px] font-black italic">EN POPÜLER</div>}
      <div>
        <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">{icon}</div>
        <h3 className="text-xl font-black mb-2">{title}</h3>
        <div className="text-4xl font-black mb-8 tracking-tighter">{price} <span className="text-sm text-slate-500 font-normal">/paket</span></div>
        <ul className="space-y-4 mb-10">
          {features.map((f: any, i: any) => (
            <li key={i} className="flex gap-3 text-sm text-slate-400 font-medium italic"><Check size={16} className="text-indigo-500" /> {f}</li>
          ))}
        </ul>
      </div>
      <button onClick={onClick} className={`w-full py-5 rounded-[24px] font-black transition-all ${popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white text-black hover:bg-indigo-600 hover:text-white'}`}>
        SATIN AL
      </button>
    </div>
  );
}