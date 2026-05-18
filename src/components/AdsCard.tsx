import type { AdCopy } from "../types";

export default function AdsCard({ ads }: { ads: AdCopy }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest">Ad Copy</h3>
        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-medium border border-blue-500/20">Generated</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-xs text-white/30 mb-1 font-medium">Headline</p>
          <p className="text-sm font-semibold text-white">{ads.headline}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-xs text-white/30 mb-1 font-medium">Body</p>
          <p className="text-sm text-white/60 leading-relaxed">{ads.body}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-xs text-white/30 mb-1 font-medium">Call to Action</p>
          <p className="text-sm font-semibold text-white">{ads.callToAction}</p>
        </div>
      </div>
    </div>
  );
}