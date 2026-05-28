import { useNavigate } from "react-router-dom";

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-8 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Crown icon */}
        <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
          <path
            d="M3,14 L5,7 L8.5,11 L10,5 L11.5,11 L15,7 L17,14 Z"
            fill="white"
            opacity="0.2"
          />
          <rect x="3" y="14" width="14" height="2.5" rx="1" fill="white" opacity="0.2" />
        </svg>

        {/* Headline */}
        <h2
          className="text-4xl lg:text-5xl font-semibold text-white leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your store deserves{" "}
          <span className="text-white/30 italic">a better operator.</span>
        </h2>

        {/* Subline */}
        <p className="text-sm text-white/40 max-w-md leading-relaxed">
          Join hundreds of store owners who stopped doing the grunt work
          and started focusing on growth. Start free — no credit card required.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors"
          >
            Get started free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-white/5 border border-white/10 text-white/60 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors"
          >
            Sign in →
          </button>
        </div>

        {/* Trust line */}
        <p className="text-xs text-white/20 tracking-wide">
          Free plan available · Cancel anytime · No credit card required
        </p>

      </div>
    </section>
  );
}