import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStores } from "../services/storeService";
import type { Store } from "../types";
import ConnectShopifyModal from "./ConnectShopifyModal";
import { useAuthStore } from "../store/authStore";
import { logout } from "../services/authService";

interface SidebarProps {
    activePage?: "dashboard" | "chat" | "orders" | "fraud" | "analytics";
}

export default function Sidebar({ activePage = "dashboard" }: SidebarProps) {
    const navigate = useNavigate();
    const { storeId } = useParams<{ storeId: string }>();
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = useAuthStore((state) => state.user);


    const currentStore = stores.find((s) => s._id === storeId);

    useEffect(() => {
        getStores()
            .then(setStores)
            .catch(() => alert("Failed to load stores"))
            .finally(() => setLoading(false));
    }, []);

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: "📊", path: `/store/${storeId}/dashboard` },
        { id: "chat", label: "Chat", icon: "💬", path: `/store/${storeId}/chat` },
        { id: "orders", label: "Orders", icon: "📦", path: `/store/${storeId}/orders` },
        { id: "fraud", label: "Fraud Detection", icon: "🛡️", path: `/store/${storeId}/fraud` },
        { id: "analytics", label: "Analytics", icon: "📈", path: `/store/${storeId}/analytics` },
    ];

    const handleNavigate = (path: string) => {
        navigate(path);
        setDropdownOpen(false);
    };

    const handleStoreSelect = (store: Store) => {
        navigate(`/store/${store._id}/dashboard`);
        setDropdownOpen(false);
    };

    return (
        <>
            <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col h-screen overflow-hidden">
                {/* Brand + Profile */}
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-black text-xs font-bold">A</span>
                            </div>
                            <span className="font-semibold text-white text-sm">[YourBrand]</span>
                        </div>
                        <button className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 hover:text-white text-xs font-semibold">
                            {user?.email?.[0]?.toUpperCase() ?? "U"}
                        </button>
                    </div>

                    {/* Store Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-sm text-white/80 hover:text-white"
                        >
                            <span className="truncate text-left">
                                {loading ? "Loading stores..." : currentStore?.storeName ?? "Select Store"}
                            </span>
                            <span className={`text-xs transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                                ▼
                            </span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#111111] border border-white/20 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                                {stores.length === 0 ? (
                                    <div className="px-3 py-4 text-center text-white/40 text-xs">
                                        No stores connected
                                    </div>
                                ) : (
                                    stores.map((store) => (
                                        <button
                                            key={store._id}
                                            onClick={() => handleStoreSelect(store)}
                                            className={`w-full px-3 py-2 text-sm text-left transition-colors border-b border-white/5 last:border-b-0 ${storeId === store._id
                                                    ? "bg-white/10 text-white"
                                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <div className="font-medium">{store.storeName}</div>
                                            <div className="text-xs text-white/30 capitalize">
                                                {store.platform ?? "custom"}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Connect Store Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full mt-3 px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-colors text-white text-xs font-medium"
                    >
                        + Connect Store
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto px-2 py-4">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigate(item.path)}
                                disabled={!storeId}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activePage === item.id
                                        ? "bg-white/10 text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                    } ${!storeId ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Footer - Sign Out */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="w-full px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Connect Store Modal */}
            {showModal && <ConnectShopifyModal onClose={() => setShowModal(false)} />}
        </>
    );
}