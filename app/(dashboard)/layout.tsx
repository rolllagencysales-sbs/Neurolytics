import { 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  LogOut, 
  TrendingUp, 
  Zap, 
  ShoppingBag,
  User 
} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans">
      {/* Yan Menü (Sidebar) */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 space-y-10 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 font-black italic text-xl">N</div>
          <span className="text-xl font-black tracking-tighter italic">NEUROLYTICS</span>
        </div>
        
        <nav className="flex-1 space-y-3">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20}/>} label="Genel Bakış" />
          <NavItem href="/sales" icon={<ShoppingBag size={20}/>} label="Satış Girişi" />
          <NavItem href="/account" icon={<User size={20}/>} label="Hesap & Üyelik" />
          <NavItem href="/settings" icon={<Settings size={20}/>} label="API Entegrasyonu" />
        </nav>

        <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-transparent border border-indigo-600/20 rounded-[32px] space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] tracking-[0.2em]">
            <Zap size={14} /> PRO ÜYELİK
          </div>
          <p className="text-xs text-slate-400 font-medium">Verileriniz anlık olarak işleniyor.</p>
        </div>
      </aside>

      {/* Sayfa İçeriği */}
      <main className="flex-1 overflow-y-auto p-12 bg-gradient-to-b from-[#0a0a0a] to-black">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-white/5 hover:text-white transition-all group">
      <span className="group-hover:text-indigo-500 transition-colors">{icon}</span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </Link>
  );
}