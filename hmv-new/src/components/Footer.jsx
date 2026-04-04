import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-[40px] text-white pt-24 pb-12 mx-2 md:mx-4 mb-4 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 mt-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Column (Spans 4) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-4 group w-fit">
              <div className="w-14 h-14 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 border border-white/10 group-hover:bg-primary/20 transition-colors duration-500">
                <img src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight text-white group-hover:text-primary-fixed transition-colors">
                  Homagama MV
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/50">
                  Established 1889
                </span>
              </div>
            </Link>
            <p className="text-sm font-normal leading-relaxed text-white/60 max-w-sm mt-2">
              Nurturing minds and building character since 1889. A premier educational institution shaping the leaders of tomorrow with tradition and innovation.
            </p>
            
            {/* Social Links Row */}
            <div className="flex gap-3 mt-4">
              {['public', 'share', 'mail', 'link'].map((icon) => (
                <a 
                  href="#" 
                  key={icon}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white border border-white/10 hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (Spans 2) */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: "Academics", path: "/academics" },
                { name: "News & Events", path: "/news" },
                { name: "Clubs & Societies", path: "/clubs" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column (Spans 2) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Connect</h4>
            <ul className="space-y-4">
              {[
                { name: "Sports", path: "/sports" },
                { name: "History", path: "/history" },
                { name: "Contact Hub", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (Spans 3) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Stay updated with our latest academic and athletic achievements.
            </p>
            <form className="relative mt-2">
              <input 
                type="email" 
                placeholder="school@student.hmv.lk" 
                className="w-full rounded-lg bg-white/5 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary border border-white/10 placeholder:text-white/30 text-white transition-all shadow-inner"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 aspect-square rounded-md bg-white hover:bg-gray-200 text-black flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-white/40">
            © {new Date().getFullYear()} Homagama MV. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-medium text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-medium text-white/40 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
