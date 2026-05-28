import { useNavigate } from "react-router-dom";
import WorkflowDiagram from "./WorkflowDiagram";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&display=swap');`}</style>

      <section className="min-h-screen px-8 pt-32 pb-20 flex items-center">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left Column ── */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <div className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI-powered ecommerce agent
            </div>

            {/* Headline */}
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl lg:text-6xl text-white leading-tight tracking-tight"
            >
              Your store
              <br />
              <span
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                className="text-white/40"
              >
                runs itself.
              </span>
              <br />
              You just grow it.
            </h1>

            {/* Subline */}
            <p className="mt-6 text-base text-white/40 leading-relaxed max-w-md">
              Ilman writes your listings, creates your ads, tracks your orders,
              and publishes to your store — so you focus on what actually matters.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors"
              >
                Get started free
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-white/60 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                View demo →
              </button>
            </div>

            {/* Social proof hint */}
            <p className="mt-8 text-xs text-white/20">
              Free plan available · No credit card required
            </p>

          </div>

          {/* ── Right Column — Diagram ── */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <WorkflowDiagram />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}