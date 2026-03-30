import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Academics", path: "/academics" },
    { name: "News", path: "/news" },
    { name: "Clubs", path: "/clubs" },
    { name: "Sports", path: "/sports" },
    { name: "History", path: "/history" },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
    <motion.nav
      layout
      className={`fixed z-50 left-1/2 -translate-x-1/2 flex justify-between items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? "w-[95%] max-w-[1200px] rounded-2xl bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl py-3 px-6 top-4"
          : "w-[90%] max-w-[1000px] rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/5 shadow-lg py-4 px-8 top-6"
        }`}
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 rounded-inherit ring-1 ring-inset ring-white/10 pointer-events-none" />

        {/* Left: Brand Area */}
        <Link to="/" className="flex items-center gap-3 group relative z-10 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center p-1 border border-white/10 group-hover:border-primary/50 transition-colors duration-500 shadow-inner">
            <img
              src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487"
              alt="HMV Logo"
              className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-sm md:text-base lowercase tracking-tighter text-white group-hover:text-primary transition-colors duration-300 leading-none mb-1">
              homagamamv
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 leading-none group-hover:text-white/80 transition-colors">
              est. 1889
            </span>
          </div>
        </Link>

      {/* Center: Navigation Pill */}
      <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 relative z-10 mx-4 backdrop-blur-md shadow-inner">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors group"
          >
            {isActive(link.path) ? (
              <span className="relative z-20 text-white font-bold drop-shadow-sm">{link.name}</span>
            ) : (
              <span className="relative z-20 text-white/60 group-hover:text-white transition-colors duration-300">{link.name}</span>
            )}

            {isActive(link.path) && (
              <motion.div
                layoutId="activeNavPill"
                className="absolute inset-0 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Active Indicator Base */}
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-md rounded-full shadow-[0_4px_12px_rgba(139,0,0,0.4)] border border-white/20" />
              </motion.div>
            )}
            {!isActive(link.path) && (
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            )}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 relative z-10 shrink-0">
        <MagneticButton>
          <Link
            to="/contact"
            className="hidden sm:flex items-center gap-2 h-10 px-6 rounded-full bg-white text-primary text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
          >
            <span className="material-symbols-outlined text-[16px] relative z-10">login</span>
            <span className="relative z-10">Portal</span>
          </Link>
        </MagneticButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-white hover:bg-white/20 active:scale-90 transition-all shadow-inner"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Modal / Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[rgba(10,10,20,0.95)] backdrop-blur-[20px] flex flex-col"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center p-1 border border-white/10">
                  <img src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487" alt="HMV Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-lg lowercase tracking-tighter text-white">
                  homagamamv
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-white hover:bg-white/20 hover:rotate-90 transition-all"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Modal Links */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`block text-4xl sm:text-5xl font-black lowercase tracking-tighter hover:pl-4 transition-all duration-300 ${isActive(link.path) ? "text-primary" : "text-white/70 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Modal Footer / Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-12 mb-8"
            >
              <Link
                to="/contact"
                className="flex items-center justify-between w-full p-6 rounded-2xl bg-primary text-white uppercase font-black tracking-[0.1em] text-lg shadow-[0_15px_30px_-10px_rgba(200,30,50,0.6)] active:scale-95 transition-all"
              >
                <span>Access Portal</span>
                <span className="material-symbols-outlined text-3xl">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
