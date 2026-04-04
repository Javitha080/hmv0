import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsScrolled(false);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const closeMobileMenu = () => setMobileMenu(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Academics", path: "/academics" },
    { name: "News", path: "/news" },
    { name: "Clubs", path: "/clubs" },
    { name: "Sports", path: "/sports" },
    { name: "History", path: "/history" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Scroll Shadow Mask */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-40" 
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 flex justify-center ${
          isScrolled ? "top-4 w-[92%] sm:w-auto" : "top-6 w-[92%] max-w-[1100px]"
        }`}
      >
        <div className={`relative flex items-center justify-between w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
          isScrolled 
            ? "h-14 px-2 sm:px-3 rounded-[2rem] bg-white/40 dark:bg-black/60 backdrop-blur-[40px] border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            : "h-16 sm:h-20 px-4 sm:px-6 rounded-[2.5rem] bg-white/20 dark:bg-black/40 backdrop-blur-[40px] border border-white/50 dark:border-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
        }`}>
          {/* Advanced Liquid Glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}>
            <div className="absolute inset-0 border rounded-inherit border-white/60 dark:border-white/10" />
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent" />
          </div>
          
          {/* Animated Liquid Gradient */}
          <motion.div 
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none mix-blend-overlay"
            style={{ 
              background: 'linear-gradient(270deg, rgba(var(--color-primary), 0.2), transparent, rgba(var(--color-secondary), 0.2))',
              backgroundSize: '200% 200%'
            }}
          />

          {/* Left: Brand Area */}
          <Link to="/" className="flex items-center gap-3 group relative z-10 shrink-0">
            <div className={`flex items-center justify-center bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/20 group-hover:border-primary/50 transition-all duration-500 shadow-sm ${
              isScrolled ? "w-10 h-10 rounded-[1rem] p-1.5" : "w-10 h-10 sm:w-12 sm:h-12 rounded-[1.25rem] p-2"
            }`}>
              <img src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487" alt="HMV Logo" className="w-full h-full object-contain group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500" />
            </div>
            <div className={`flex flex-col justify-center transition-all duration-500 ${isScrolled ? "hidden sm:flex" : "flex"}`}>
              <span className={`font-black lowercase tracking-tighter text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 leading-none mb-0.5 ${isScrolled ? "text-sm" : "text-[15px] sm:text-lg"}`}>
                homagamamv
              </span>
              <span className={`uppercase tracking-[0.2em] text-gray-500 dark:text-white/50 leading-none group-hover:text-gray-700 dark:group-hover:text-white/80 transition-colors ${isScrolled ? "text-[8px]" : "text-[9px] sm:text-[10px]"}`}>
                est. 1889
              </span>
            </div>
          </Link>

          {/* Center: Navigation Pill - Desktop */}
          <div className={`hidden lg:flex items-center relative z-10 transition-all duration-500 ${isScrolled ? "gap-1 mx-4" : "gap-2 mx-8"}`}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`relative rounded-full font-semibold tracking-wide transition-all duration-300 group ${isScrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2 sm:py-2.5 text-sm"}`}>
                <span className={`relative z-20 transition-all duration-300 ${isActive(link.path) ? "text-white font-bold" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
                  {link.name}
                </span>

                {isActive(link.path) && (
                  <motion.div layoutId="activeNavPill" className="absolute inset-0 rounded-full -z-10 bg-primary shadow-[0_4px_12px_rgba(139,0,0,0.3)]" transition={{ type: "spring", stiffness: 450, damping: 30 }}>
                    <div className="absolute inset-0 rounded-full border border-white/20" />
                    <div className="absolute top-0 inset-x-3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </motion.div>
                )}

                {!isActive(link.path) && (
                  <div className="absolute inset-0 rounded-full -z-10 bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 relative z-10 shrink-0">
            <ThemeToggle />
            <MagneticButton>
              <div className="hidden sm:block">
                <Link to="/contact" className={`flex items-center gap-2 rounded-full relative overflow-hidden group bg-primary transition-all duration-300 shadow-[0_4px_12px_rgba(139,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(139,0,0,0.4)] hover:-translate-y-0.5 ${isScrolled ? "h-10 px-4" : "h-10 sm:h-12 px-5 sm:px-6"}`}>
                  <span className="material-symbols-outlined text-[16px] relative z-10 text-white group-hover:translate-x-0.5 transition-transform">login</span>
                  <span className={`relative z-10 text-white font-bold tracking-wide ${isScrolled ? "text-xs" : "text-[13px] sm:text-sm"}`}>Portal</span>
                  <div className="absolute top-0 inset-x-2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </MagneticButton>
            <button onClick={() => setMobileMenu(true)} className={`lg:hidden rounded-full relative overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-sm flex items-center justify-center transition-all bg-white/80 dark:bg-white/10 backdrop-blur-md active:scale-90 ${isScrolled ? "w-10 h-10" : "w-10 h-10 sm:w-12 sm:h-12"}`}>
              <span className="material-symbols-outlined relative z-10 text-gray-700 dark:text-white">menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(8px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.4 }} className="fixed inset-0 z-[90] bg-black/40" onClick={closeMobileMenu} />
            <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%", transition: { duration: 0.3 } }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 z-[100] w-full max-w-sm flex flex-col">
              <div className="absolute inset-0 bg-white/85 dark:bg-[#0a0a0f]/85 backdrop-blur-3xl border-l border-white/50 dark:border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-20px_0_40px_rgba(0,0,0,0.5)] rounded-l-[2.5rem]">
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/80 dark:via-white/20 to-transparent" />
              </div>
              <div className="relative flex flex-col h-full z-10">
                <div className="flex justify-between items-center p-8 pb-4">
                  <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-[16px] bg-white/90 dark:bg-white/10 backdrop-blur-md flex items-center justify-center p-1.5 border border-white/60 dark:border-white/20 shadow-sm">
                      <img src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487" alt="HMV Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-lg lowercase tracking-tighter text-gray-900 dark:text-white leading-none mb-1">homagamamv</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-white/50 leading-none">est. 1889</span>
                    </div>
                  </Link>
                  <button onClick={closeMobileMenu} className="w-12 h-12 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center border border-white/60 dark:border-white/10 text-gray-700 dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
                  <div className="space-y-2">
                    {navLinks.map((link, i) => (
                      <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}>
                        <Link onClick={closeMobileMenu} to={link.path} className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive(link.path) ? "bg-primary/5 dark:bg-primary/10 border border-primary/20" : "hover:bg-white/50 dark:hover:bg-white/5 border border-transparent"}`}>
                          <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center transition-colors duration-300 relative z-10 ${isActive(link.path) ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/5 text-gray-600 dark:text-white/60 group-hover:bg-white dark:group-hover:bg-white/20 group-hover:text-gray-900 dark:group-hover:text-white shadow-sm"}`}>
                            <span className="material-symbols-outlined text-[22px]">
                              {link.name === "Home" ? "home" : link.name === "Academics" ? "school" : link.name === "News" ? "newspaper" : link.name === "Clubs" ? "diversity_3" : link.name === "Sports" ? "sports_football" : "history_edu"}
                            </span>
                          </div>
                          <span className={`text-[17px] font-bold tracking-tight relative z-10 ${isActive(link.path) ? "text-primary dark:text-primary-fixed" : "text-gray-700 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white"}`}>{link.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
                <div className="p-8 pt-4 pb-10 mt-auto">
                  <div className="flex items-center justify-between mb-6 px-2">
                    <span className="text-[15px] font-semibold text-gray-600 dark:text-white/60">Appearance</span>
                    <ThemeToggle showLabel />
                  </div>
                  <Link onClick={closeMobileMenu} to="/contact" className="flex items-center justify-between w-full p-4 rounded-[2rem] bg-primary text-white font-bold tracking-wide shadow-[0_15px_30px_-10px_rgba(139,0,0,0.4)] active:scale-[0.98] transition-all overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <span className="relative z-10 text-[16px] pl-3">Access Portal</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover:bg-white/30 transition-colors">
                       <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}