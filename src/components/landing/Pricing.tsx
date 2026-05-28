const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect for solo store owners just getting started.",
    cta: "Get started free",
    highlight: false,
    features: [
      "10 listings per month",
      "3 ad copies per month",
      "1 store connected",
      "Manual publishing",
      "Basic order tracking",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "20",
    desc: "For growing stores and small teams that need full power.",
    cta: "Start Pro",
    highlight: true,
    features: [
      "Unlimited listings",
      "Unlimited ad copies",
      "Up to 5 stores",
      "Auto-publish to Shopify & WooCommerce",
      "Full order tracking",
      "Audit logging",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Pricing</p>
          <h2
            className="text-3xl lg:text-4xl font-semibold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Simple pricing.{" "}
            <span className="text-white/30 italic">No surprises.</span>
          </h2>
          <p className="mt-4 text-sm text-white/40">
            Start free. Upgrade when you're ready.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border flex flex-col gap-6 ${
                plan.highlight
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full font-semibold">
                  Most Popular
                </span>
              )}

              {/* Plan name & price */}
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span
                    className="text-5xl font-semibold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ${plan.price}
                  </span>
                  <span className="text-sm text-white/30 mb-2">/month</span>
                </div>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">{plan.desc}</p>
              </div>

              {/* Features list */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="text-white/30">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-auto w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}