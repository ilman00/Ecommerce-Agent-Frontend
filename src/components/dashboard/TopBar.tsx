import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface TopBarProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  onMenuClick: () => void;
}

export default function TopBar({ title, description, action, onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-14 px-6 border-b border-white/5 bg-[#111111] flex items-center justify-between shrink-0">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <div>
          <h1 className="text-sm font-semibold text-white">{title}</h1>
          {description && (
            <p className="text-xs text-white/30 mt-0.5">{description}</p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {action && (
          <button
            onClick={action.onClick}
            className="px-4 py-1.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-white/90 transition-colors mr-2"
          >
            {action.label}
          </button>
        )}

        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors relative">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 0 0 8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M6.5 11v.5a1.5 1.5 0 0 0 3 0V11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/60" />
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-white">
            {user?.email?.[0]?.toUpperCase() ?? "U"}
          </div>
          <span className="text-xs text-white/40 hidden md:block">{user?.email}</span>
        </div>
      </div>

    </header>
  );
}