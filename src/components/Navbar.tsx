export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-black px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
          <span className="text-black text-xs font-bold">A</span>
        </div>
        <span className="font-semibold text-white text-sm">AgentStore</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="/dashboard" className="text-sm text-white/40 hover:text-white transition-colors">Dashboard</a>
        <a href="/history" className="text-sm text-white/40 hover:text-white transition-colors">History</a>
        <button className="text-sm bg-white text-black px-4 py-1.5 rounded-lg hover:bg-white/90 transition-colors font-medium">
          Connect Store
        </button>
      </div>
    </nav>
  );
}