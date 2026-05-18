import { useState } from "react";
import { connectShopify } from "../services/storeService";

interface Props {
  onClose: () => void;
}

export default function ConnectShopifyModal({ onClose }: Props) {
  const [shop, setShop] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleConnect() {
    const trimmed = shop.trim();
    if (!trimmed) return setError("Shop domain is required");
    if (!trimmed.endsWith(".myshopify.com")) return setError("Must be a valid .myshopify.com domain");
    connectShopify(trimmed);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-white">Connect Shopify Store</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>

        {/* Input */}
        <label className="block text-xs text-white/40 mb-2">Shop domain</label>
        <input
          type="text"
          placeholder="yourstore.myshopify.com"
          value={shop}
          onChange={(e) => { setShop(e.target.value); setError(null); }}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
        />
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/40 hover:text-white hover:border-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            className="flex-1 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Connect
          </button>
        </div>

      </div>
    </div>
  );
}