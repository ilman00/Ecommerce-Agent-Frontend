import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1L12.5 6.5H18L13.5 10L15.5 16L10 12.5L4.5 16L6.5 10L2 6.5H7.5L10 1Z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
        <span className="font-semibold text-white tracking-wide text-sm">Ilman</span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        <a
          key="Features"
          href="#features"
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          Features
        </a>
        <a
          key="How it works"
          href="#how-it-works"
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          How it works
        </a>
        <a
          key="Pricing"
          href="#pricing"
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          Pricing
        </a>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3">
      
        <button
          onClick={() => navigate("/register")}
          className="text-sm bg-white text-black px-4 py-1.5 rounded-lg hover:bg-white/90 transition-colors font-medium "
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