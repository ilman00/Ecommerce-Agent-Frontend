import { useNavigate } from "react-router-dom";

// ─── Navbar ───────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
          <span className="text-black text-xs font-bold">A</span>
        </div>
        <span className="font-semibold text-white text-sm">[YourBrand]</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-white/40 hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="text-sm text-white/40 hover:text-white transition-colors">How it works</a>
        <a href="#pricing" className="text-sm text-white/40 hover:text-white transition-colors">Pricing</a>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          Sign in
        </button>
        <button
          onClick={() => navigate("/register")}
          className="text-sm bg-white text-black px-4 py-1.5 rounded-lg hover:bg-white/90 transition-colors font-medium"
        >
          Get started
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="pt-40 pb-24 px-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/50">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        AI-powered ecommerce operations
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-tight">
        From product to published{" "}
        <span className="text-white/30">in seconds.</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-base text-white/40 max-w-xl leading-relaxed">
        Upload a product image, describe what you need, and let your AI agent generate listings, write ads, and publish directly to your store — automatically.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors"
        >
          Start for free
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors"
        >
          View demo →
        </button>
      </div>

      {/* Dashboard mockup */}
      <div className="mt-16 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="ml-4 flex-1 h-5 rounded-md bg-white/5 max-w-xs" />
        </div>
        <div className="p-6 grid grid-cols-3 gap-4">
          {/* Fake uploader */}
          <div className="col-span-1 h-36 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10" />
            <div className="w-16 h-2 rounded bg-white/10" />
            <div className="w-10 h-2 rounded bg-white/5" />
          </div>
          {/* Fake listing card */}
          <div className="col-span-2 h-36 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-20 h-2 rounded bg-white/10" />
              <div className="w-14 h-4 rounded-full bg-green-500/20" />
            </div>
            <div className="w-3/4 h-3 rounded bg-white/10 mt-1" />
            <div className="w-full h-2 rounded bg-white/5" />
            <div className="w-5/6 h-2 rounded bg-white/5" />
            <div className="flex gap-2 mt-auto">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-5 w-14 rounded-full bg-white/5 border border-white/10" />
              ))}
            </div>
          </div>
          {/* Fake prompt bar */}
          <div className="col-span-3 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center px-4 gap-3">
            <div className="flex-1 h-2 rounded bg-white/10 max-w-sm" />
            <div className="w-8 h-8 rounded-lg bg-white/10 ml-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────
const features = [
  {
    icon: "✦",
    title: "AI Listing Generation",
    desc: "Generate SEO-optimized product titles, descriptions, bullet points, and tags from a single image.",
  },
  {
    icon: "◈",
    title: "Ad Copy in One Click",
    desc: "Instantly create high-converting ad copy for Facebook, Instagram, TikTok, and Google.",
  },
  {
    icon: "⬡",
    title: "Direct Store Publishing",
    desc: "Publish products directly to Shopify, WooCommerce, and more without leaving the dashboard.",
  },
  {
    icon: "◎",
    title: "Multi-Tenant Ready",
    desc: "Manage multiple stores and teams from a single platform with full access control.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl font-semibold text-white">Everything your store needs</h2>
          <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
            One AI agent handles your entire product operations workflow end to end.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white text-base mb-4">
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

// ─── How It Works ─────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your product",
    desc: "Drop in a product image or paste a URL. The agent extracts everything it needs automatically.",
  },
  {
    number: "02",
    title: "Describe what you need",
    desc: "Type a simple instruction — generate a listing, write ads, or publish to Shopify. The agent figures out the rest.",
  },
  {
    number: "03",
    title: "Review and publish",
    desc: "Get polished listings and ad copy in seconds. Publish directly to your store with one click.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl font-semibold text-white">Three steps to done</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.number} className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 text-white/10 text-lg">→</div>
              )}
              <span className="text-3xl font-bold text-white/10">{s.number}</span>
              <h3 className="text-sm font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 px-8 py-8 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
            <span className="text-black text-xs font-bold">A</span>
          </div>
          <span className="text-sm font-semibold text-white">[YourBrand]</span>
        </div>
        <p className="text-xs text-white/20">© 2026 [YourBrand]. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}