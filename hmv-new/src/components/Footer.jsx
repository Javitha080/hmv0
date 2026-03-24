import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-4 sm:pb-8 px-4 sm:px-8">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-secondary/10 -z-10 pointer-events-none rounded-b-3xl" />
      
      {/* Frozen Glass Panel */}
      <div className="glass-panel border border-white/60 backdrop-blur-3xl relative z-10 rounded-[3rem] shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Main Footer */}
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487"
                alt="HMV Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-serif font-bold text-primary">
                Homagama Maha Vidyalaya
              </span>
            </div>
            <p className="text-slate-700/80 font-medium text-sm leading-relaxed mb-6">
              Nurturing minds and building character since 1889. A premier educational
              institution in the heart of Homagama.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-primary text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/academics" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Academics</Link></li>
              <li><Link to="/news" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">School News</Link></li>
              <li><Link to="/clubs" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Clubs & Societies</Link></li>
              <li><Link to="/sports" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Sports Programs</Link></li>
              <li><Link to="/history" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Our History</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-primary text-xl font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Alumni Portal</a></li>
              <li><a href="#" className="text-slate-700/80 font-medium hover:text-primary hover:translate-x-1 inline-block transition-all text-sm">Staff Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-primary text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4 text-slate-700/80 font-medium group cursor-pointer hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <span className="mt-1">High Level Road, Homagama,<br />Sri Lanka</span>
              </li>
              <li className="flex items-center gap-4 text-slate-700/80 font-medium group cursor-pointer hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </div>
                <span>+94 11 2855 241</span>
              </li>
              <li className="flex items-center gap-4 text-slate-700/80 font-medium group cursor-pointer hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </div>
                <span>info@homagamamv.lk</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/40 bg-white/10">
          <div className="max-w-screen-2xl mx-auto px-8 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-700/70 font-medium text-sm">
              © {new Date().getFullYear()} Homagama Maha Vidyalaya. All Rights Reserved.
            </p>
            <p className="text-xs font-bold tracking-[0.2em] text-primary/60 uppercase">
              Nurturing Excellence Since 1889
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
