const pains = [
  {
    icon: "⏱",
    title: "Hours lost on listings",
    desc: "Writing titles, descriptions, and tags for every product manually drains your entire day.",
  },
  {
    icon: "💸",
    title: "Ad copy that costs you twice",
    desc: "Hiring copywriters is expensive. Doing it yourself is exhausting and inconsistent.",
  },
  {
    icon: "📦",
    title: "Orders slipping through",
    desc: "Tracking orders across platforms means constant tab-switching and missed updates.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Headline */}
        <div className="text-center mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">The problem</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-white max-w-xl mx-auto leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Running a store is a full-time job.{" "}
            <span className="text-white/30 italic">Listing products shouldn't be.</span>
          </h2>
        </div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
            >
              <span className="text-2xl mb-4 block">{pain.icon}</span>
              <h3 className="text-sm font-semibold text-white mb-2">{pain.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}