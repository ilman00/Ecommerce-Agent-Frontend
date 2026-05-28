const steps = [
  {
    number: "01",
    title: "Connect your store",
    desc: "Link your Shopify or WooCommerce store in seconds. Ilman instantly syncs your products and orders.",
    detail: "Supports Shopify, WooCommerce, and more.",
  },
  {
    number: "02",
    title: "Upload your product",
    desc: "Drop in a product image or paste a URL. Ilman extracts everything it needs automatically.",
    detail: "Images, URLs, or manual input — your choice.",
  },
  {
    number: "03",
    title: "Let Ilman do the work",
    desc: "Your agent generates listings, writes ad copy, and publishes directly to your store.",
    detail: "Review before publishing or let it run autonomously.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">How it works</p>
          <h2
            className="text-3xl lg:text-4xl font-semibold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Up and running{" "}
            <span className="text-white/30 italic">in three steps.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02]">

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/10 text-xl z-10">
                  →
                </div>
              )}

              {/* Number */}
              <span
                className="text-6xl font-bold text-white/5 leading-none block mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {step.number}
              </span>

              <h3 className="text-sm font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{step.desc}</p>

              {/* Detail pill */}
              <span className="inline-block text-[10px] text-white/20 border border-white/5 rounded-full px-3 py-1 uppercase tracking-widest">
                {step.detail}
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}