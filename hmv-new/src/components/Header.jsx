import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 sm:px-6 transition-all duration-500 pt-4 pointer-events-none">
      <nav className={`pointer-events-auto transition-all duration-500 flex justify-between items-center w-full ${
        isScrolled 
          ? "max-w-4xl glass-card rounded-full py-3 px-6 shadow-2xl" 
          : "max-w-screen-2xl bg-transparent py-4 px-2 lg:px-6 border-transparent shadow-none"
      }`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487"
            alt="HMV Logo"
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
          />
          <span className={`text-xl lg:text-2xl font-serif font-bold tracking-tight hidden sm:block transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white text-shadow-sm'}`}>
            Homagama Maha Vidyalaya
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative font-medium transition-all duration-500 px-3 py-1.5 rounded-full ${
                isActive(link.path)
                  ? isScrolled ? "text-primary font-bold bg-primary/5" : "text-white font-bold bg-white/20 backdrop-blur-md"
                  : isScrolled ? "text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-black/5" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className={`px-6 py-2 rounded-full font-bold tracking-tight transition-all active:scale-95 duration-300 ease-out text-sm hidden sm:block shadow-lg ${
              isScrolled 
              ? "bg-primary text-white hover:bg-primary-container hover:shadow-primary/30 hover:-translate-y-0.5" 
              : "bg-white text-primary hover:bg-white/90 hover:shadow-white/20 hover:-translate-y-0.5"
            }`}
          >
            Contact
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden material-symbols-outlined text-2xl transition-colors ${isScrolled ? 'text-on-surface' : 'text-white'}`}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pointer-events-auto mt-20 px-4">
          <div className="glass-panel backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up overflow-hidden">
            <div className="flex flex-col p-6 gap-2 bg-white/40 dark:bg-slate-900/40">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-3 px-5 rounded-full font-medium transition-all ${
                    isActive(link.path)
                      ? "text-primary bg-white shadow-sm font-bold"
                      : "text-slate-800 dark:text-slate-200 hover:text-primary hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 bg-primary text-white text-center py-4 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
