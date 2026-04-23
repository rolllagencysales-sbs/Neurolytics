export default function Settings() {
  return (
    <div className="max-w-2xl space-y-10">
      <h2 className="text-4xl font-black tracking-tight">ENTEGRASYON</h2>
      <div className="bg-[#111] p-10 rounded-[40px] border border-white/5 space-y-8">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Meta Access Token</label>
          <input type="password" placeholder="EAA..." className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-indigo-600 outline-none transition" />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Ad Account ID</label>
          <input type="text" placeholder="act_..." className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-indigo-600 outline-none transition" />
        </div>
        <button className="w-full bg-indigo-600 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-500/20">Bağlantıyı Doğrula</button>
      </div>
    </div>
  );
}