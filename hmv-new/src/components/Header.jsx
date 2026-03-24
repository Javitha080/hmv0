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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl shadow-black/5" 
        : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl"
    }`}>
      <div className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487"
            alt="HMV Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl lg:text-2xl font-serif font-bold text-primary tracking-tight hidden sm:block">
            Homagama Maha Vidyalaya
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? "text-primary font-bold border-b-2 border-secondary pb-1"
                  : "text-slate-700 dark:text-slate-300 hover:text-primary"
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
            className="bg-primary hover:bg-primary-container text-white px-6 py-2 rounded-lg font-bold tracking-tight transition-all active:scale-95 duration-150 text-sm hidden sm:block"
          >
            Contact
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden material-symbols-outlined text-on-surface text-2xl"
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-outline-variant/20 animate-fade-in-up">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5 font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 bg-primary text-white text-center py-3 rounded-lg font-bold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
