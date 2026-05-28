import WorkflowDiagram from "./WorkflowDiagram";

const capabilities = [
  { title: "Listing Generation", desc: "SEO-optimized titles, descriptions, bullet points and tags from a single image." },
  { title: "Ad Copy Creation", desc: "Facebook, Instagram, TikTok and Google ads written and ready in seconds." },
  { title: "Direct Publishing", desc: "Push products live to Shopify or WooCommerce without leaving the dashboard." },
  { title: "Order Tracking", desc: "All your orders across every store in one clean view. No more tab switching." },
];

export default function Solution() {
  return (
    <section className="py-24 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">The solution</p>
          <h2
            className="text-3xl lg:text-4xl font-semibold text-white max-w-xl mx-auto leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet Ilman.{" "}
            <span className="text-white/30 italic">Your store's AI operator.</span>
          </h2>
          <p className="mt-4 text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            One agent that handles the repetitive work — so you spend your time on decisions that actually grow your business.
          </p>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — capability list */}
          <div className="flex flex-col gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-xs font-semibold text-white/40 group-hover:text-white transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{cap.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — diagram */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <WorkflowDiagram />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}