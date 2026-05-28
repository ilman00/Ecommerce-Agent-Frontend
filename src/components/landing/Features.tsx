const features = [
  {
    icon: "✦",
    title: "AI Listing Generation",
    desc: "Generate SEO-optimized product titles, descriptions, bullet points, and tags from a single image or URL.",
    tag: "Core",
  },
  {
    icon: "◈",
    title: "Multi-Platform Ad Copy",
    desc: "Instantly create high-converting ad copy for Facebook, Instagram, TikTok, and Google in one click.",
    tag: "Core",
  },
  {
    icon: "⬡",
    title: "Direct Store Publishing",
    desc: "Publish products directly to Shopify and WooCommerce without ever leaving your dashboard.",
    tag: "Core",
  },
  {
    icon: "◎",
    title: "Order Tracking",
    desc: "Monitor all your orders across every connected store from a single unified view.",
    tag: "Operations",
  },
  {
    icon: "⊕",
    title: "Multi-Store Support",
    desc: "Connect and manage multiple stores under one account with full access control per store.",
    tag: "Operations",
  },
  {
    icon: "◇",
    title: "Audit Logging",
    desc: "Every action your agent takes is logged — full transparency into what was generated and published.",
    tag: "Trust",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Features</p>
          <h2
            className="text-3xl lg:text-4xl font-semibold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything your store needs.{" "}
            <span className="text-white/30 italic">Nothing it doesn't.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group"
            >
              {/* Tag */}
              <span className="absolute top-4 right-4 text-[10px] text-white/20 uppercase tracking-widest">
                {f.tag}
              </span>

              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-base mb-5 group-hover:bg-white/10 transition-colors">
                {f.icon}
              </div>

              <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}