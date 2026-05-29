import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStores } from "../../services/storeService";
import type { Store } from "../../types";
import ConnectShopifyModal from "../ConnectShopifyModal";
// import { useAuthStore } from "../../store/authStore";
import { logout } from "../../services/authService";

const icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  chat: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14 8A6 6 0 0 1 2 8a6 6 0 0 1 12 0Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 10.5L3 13l2.5-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 8h.01M8 8h.01M10 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  orders: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 3V2.5A3 3 0 0 1 11 2.5V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  fraud: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L2 4v4c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 6v3M8 10.5h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  analytics: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 13h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 13V9M7 13V6M10 13V8M13 13V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

interface SidebarProps {
  activePage?: "dashboard" | "chat" | "orders" | "fraud" | "analytics";
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activePage = "dashboard", isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const user = useAuthStore((state) => state.user);

  const currentStore = stores.find((s) => s._id === storeId);

  useEffect(() => {
    getStores()
      .then(setStores)
      .catch(() => alert("Failed to load stores"))
      .finally(() => setLoading(false));
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: `/store/${storeId}/dashboard` },
    { id: "chat", label: "Chat", path: `/store/${storeId}/chat` },
    { id: "orders", label: "Orders", path: `/store/${storeId}/orders` },
    { id: "fraud", label: "Fraud Detection", path: `/store/${storeId}/fraud` },
    { id: "analytics", label: "Analytics", path: `/store/${storeId}/analytics` },
  ] as const;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const sidebarContent = (
    <aside className="w-full h-full bg-[#111111] flex flex-col overflow-hidden">

      {/* Brand */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 1L12.5 6.5H18L13.5 10L15.5 16L10 12.5L4.5 16L6.5 10L2 6.5H7.5L10 1Z" fill="white" opacity="0.9" />
            </svg>
            <span className="font-semibold text-white tracking-wide text-sm">Ilman</span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Store Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-sm text-white/60 hover:text-white"
          >
            <span className="truncate text-left text-xs">
              {loading ? "Loading..." : currentStore?.storeName ?? "Select store"}
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              className={`shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
              {stores.length === 0 ? (
                <p className="px-3 py-4 text-center text-white/30 text-xs">No stores connected</p>
              ) : (
                stores.map((store) => (
                  <button
                    key={store._id}
                    onClick={() => { navigate(`/store/${store._id}/dashboard`); setDropdownOpen(false); onClose(); }}
                    className={`w-full px-3 py-2.5 text-left border-b border-white/5 last:border-0 transition-colors ${
                      storeId === store._id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <p className="text-xs font-medium">{store.storeName}</p>
                    <p className="text-[10px] text-white/30 capitalize mt-0.5">{store.platform ?? "custom"}</p>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Connect Store */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-2 px-3 py-2 rounded-lg border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors text-white/40 hover:text-white text-xs"
        >
          + Connect store
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-[10px] text-white/20 uppercase tracking-widest px-2 mb-3">Navigation</p>
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              disabled={!storeId}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activePage === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              } ${!storeId ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <span className={activePage === item.id ? "text-white" : "text-white/40"}>
                {icons[item.id]}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign out
        </button>
      </div>

    </aside>
  );

  return (
    <>
      {/* Desktop — always visible */}
      <div className="hidden lg:block w-60 h-screen shrink-0 border-r border-white/5">
        {sidebarContent}
      </div>

      {/* Mobile — full screen overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-[#111111]">
          {sidebarContent}
        </div>
      )}

      {showModal && <ConnectShopifyModal onClose={() => setShowModal(false)} />}
    </>
  );
}