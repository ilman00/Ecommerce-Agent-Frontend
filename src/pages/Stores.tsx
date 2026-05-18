import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStores } from "../services/storeService";
import type { Store } from "../types";
import ConnectShopifyModal from "../components/ConnectShopifyModal";

const platformColors: Record<string, string> = {
  shopify: "text-green-400 bg-green-500/10 border-green-500/20",
  woocommerce: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  default: "text-white/40 bg-white/5 border-white/10",
};

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching stores...", stores);
    getStores()
      .then(setStores)
      .catch(() => alert("Failed to load stores"))
      .finally(() => setLoading(false));
  }, []);

  function handleSelect(store: Store) {
    navigate(`/dashboard/${store._id}`);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black text-xs font-bold">A</span>
          </div>
          <span className="font-semibold text-white text-sm">[YourBrand]</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-white/30 hover:text-white transition-colors"
        >
          Sign out
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors"
        >
          Connect Store
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white">Your Stores</h1>
          <p className="text-sm text-white/30 mt-1">Select a store to start generating.</p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-white/30 text-sm">
            <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            Loading stores...
          </div>
        ) : stores.length === 0 ? (
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
            <p className="text-white/40 text-sm">No stores found.</p>
            <button className="mt-4 px-5 py-2 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors">
              Connect a store
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map((store) => {
              const colorClass = platformColors[store.platform?.toLowerCase()] ?? platformColors.default;
              return (
                <button
                  key={store._id}
                  onClick={() => handleSelect(store)}
                  className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-semibold text-sm">
                      {store.storeName?.[0]?.toUpperCase() ?? "S"}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${colorClass}`}>
                      {store.platform ?? "custom"}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{store.storeName}</h3>
                  <p className="text-xs text-white/30 mt-1">
                    Added {new Date(store.created_at).toLocaleDateString()}
                  </p>
                  <div className="mt-4 text-xs text-white/20 group-hover:text-white/40 transition-colors">
                    Open dashboard →
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
      {showModal && <ConnectShopifyModal onClose={() => setShowModal(false)} />}
    </div>
  );
}