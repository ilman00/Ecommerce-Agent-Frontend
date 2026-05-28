// import { useNavigate } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import SocialProof from "../components/landing/SocialProof";
import Problem from "../components/landing/Problem";
import Solution from "../components/landing/Solution";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";


// ─── Page ─────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}