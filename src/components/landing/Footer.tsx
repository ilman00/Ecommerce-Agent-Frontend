import { useNavigate } from "react-router-dom";

const links = {
    Product: ["Features", "How it works", "Pricing"],
    Company: ["About", "Blog", "Careers"],
    Legal: ["Privacy", "Terms", "Contact"],
};

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="border-t border-white/5 px-8 py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2.5">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M10 1L12.5 6.5H18L13.5 10L15.5 16L10 12.5L4.5 16L6.5 10L2 6.5H7.5L10 1Z"
                                fill="white"
                                opacity="0.9"
                            />
                        </svg>
                        <span className="text-sm font-semibold text-white tracking-wide">Ilman</span>
                    </div>
                    <p className="text-xs text-white/30 leading-relaxed max-w-[180px]">
                        AI-powered ecommerce operations for modern store owners.
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="w-fit text-xs bg-white text-black px-4 py-1.5 rounded-lg hover:bg-white/90 transition-colors font-medium"
                    >
                        Get started free
                    </button>
                </div>

                {/* Links */}
                {Object.entries(links).map(([category, items]) => (
                    <div key={category} className="flex flex-col gap-4">
                        <p className="text-xs text-white/20 uppercase tracking-widest">{category}</p>
                        <ul className="flex flex-col gap-3">
                            {items.map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-white/40 hover:text-white transition-colors">
                                        {item}

                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* Bottom bar */}
            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/20">© 2026 Ilman. All rights reserved.</p>
                <p className="text-xs text-white/10">Built for store owners who mean business.</p>
            </div>

        </footer>
    );
}