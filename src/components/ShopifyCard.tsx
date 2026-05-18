import type { ShopifyResult } from "../types";

export default function ShopifyCard({ shopify }: { shopify: ShopifyResult }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest">Shopify</h3>
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">Published</span>
      </div>
      <div className="flex flex-col gap-0">
        {[
          { label: "Product ID", value: shopify.id },
          { label: "Title", value: shopify.title },
          { label: "Status", value: shopify.status },
          { label: "Published", value: new Date(shopify.created_at).toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
            <span className="text-xs text-white/30">{label}</span>
            <span className="text-xs font-medium text-white/70">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}