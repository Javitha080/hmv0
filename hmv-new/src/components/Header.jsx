import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 h-24 items-center pointer-events-none transition-all duration-700">
        <motion.nav 
          layout
          className={`pointer-events-auto relative overflow-hidden flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled 
              ? "w-[95%] max-w-[1300px] rounded-[24px] bg-[rgba(10,10,20,0.85)] backdrop-blur-[20px] border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] py-3 px-6 top-4" 
              : "w-[90%] max-w-[1100px] rounded-full bg-[rgba(10,10,20,0.6)] backdrop-blur-[12px] border border-white/5 shadow-none py-3 px-6 top-6"
          }`}
          style={{ position: 'absolute' }}
        >
          {/* Ambient Liquid Background */}
          <div className="absolute inset-0 pointer-events-none -z-10 mix-blend-screen opacity-50">
            <div className="absolute top-1/2 left-[20%] w-32 h-32 bg-primary/40 rounded-full blur-3xl animate-[float-orb_8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
            <div className="absolute -top-1/4 right-[25%] w-24 h-24 bg-blue-500/30 rounded-full blur-3xl animate-[float-orb_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-0 right-10 w-28 h-28 bg-secondary/40 rounded-full blur-3xl animate-[float-orb_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
          </div>

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
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5 relative z-10 mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-5 py-2.5 rounded-full text-[9px] uppercase font-bold tracking-[0.15em] transition-colors group"
              >
                {isActive(link.path) ? (
                  <span className="relative z-20 text-white font-black drop-shadow-md">{link.name}</span>
                ) : (
                  <span className="relative z-20 text-white/50 group-hover:text-white transition-colors duration-300">{link.name}</span>
                )}

                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
                    {/* Glass overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                    {/* Highlight inner border */}
                    <div className="absolute inset-0 border border-white/40 rounded-full" />
                    {/* Glow */}
                    <div className="absolute inset-0 shadow-[0_0_15px_rgba(200,30,50,0.5)] rounded-full" />
                    {/* Shimmer translation effect */}
                    <div className="absolute -inset-full h-full w-[300%] animate-[shimmer_2.5s_infinite_linear]">
                      <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" />
                    </div>
                  </motion.div>
                )}
                {!isActive(link.path) && (
                  <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-white text-[9px] uppercase font-bold tracking-[0.15em] shadow-[0_0_20px_rgba(200,30,50,0.3)] hover:shadow-[0_0_30px_rgba(200,30,50,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out border border-white/20 overflow-hidden relative group"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 w-full h-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100" />
              <span className="material-symbols-outlined text-[14px] relative z-10">auto_awesome</span>
              <span className="relative z-10">Portal</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-white hover:bg-white/20 active:scale-90 transition-all shadow-inner"
            >
              <span className="material-symbols-outlined text-xl">menu_open</span>
            </button>
          </div>
        </motion.nav>
      </header>

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
                <motion.div custom={i} variants={linkVariants} key={link.name}>
                  <Link
                    to={link.path}
                    className={`block text-4xl sm:text-5xl font-black lowercase tracking-tighter hover:pl-4 transition-all duration-300 ${
                      isActive(link.path) ? "text-primary" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Modal Footer / Mobile CTA */}
            <motion.div 
              custom={navLinks.length} 
              variants={linkVariants}
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
