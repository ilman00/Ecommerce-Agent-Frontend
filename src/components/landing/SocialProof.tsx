const stats = [
  { number: "500+", label: "Stores powered" },
  { number: "10,000+", label: "Listings generated" },
  { number: "3,200+", label: "Ads created" },
  { number: "4.9/5", label: "Average rating" },
];

export default function SocialProof() {
  return (
    <div className="border-y border-white/5 py-8 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 text-center"
          >
            <span className="text-2xl font-semibold text-white tracking-tight">
              {stat.number}
            </span>
            <span className="text-xs text-white/30 uppercase tracking-widest">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}