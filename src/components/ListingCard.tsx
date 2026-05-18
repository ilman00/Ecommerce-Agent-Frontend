import type { ProductListing } from "../types";

export default function ListingCard({ listing }: { listing: ProductListing }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest">Product Listing</h3>
        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full font-medium border border-green-500/20">Generated</span>
      </div>
      <h2 className="text-base font-semibold text-white">{listing.title}</h2>
      <p className="text-sm text-white/50 leading-relaxed">{listing.seoDescription}</p>
      <ul className="flex flex-col gap-2">
        {listing.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/60">
            <span className="text-white/30 mt-0.5">•</span>{b}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {listing.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-white/5 text-white/40 border border-white/10 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}