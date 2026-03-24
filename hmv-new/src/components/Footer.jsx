import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10">
      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16">
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
            <p className="text-slate-600 text-sm leading-relaxed">
              Nurturing minds and building character since 1889. A premier educational
              institution in the heart of Homagama.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-2xl">public</span>
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-2xl">share</span>
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-primary font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/academics" className="text-slate-600 hover:text-primary transition-colors text-sm">Academics</Link></li>
              <li><Link to="/news" className="text-slate-600 hover:text-primary transition-colors text-sm">School News</Link></li>
              <li><Link to="/clubs" className="text-slate-600 hover:text-primary transition-colors text-sm">Clubs & Societies</Link></li>
              <li><Link to="/sports" className="text-slate-600 hover:text-primary transition-colors text-sm">Sports Programs</Link></li>
              <li><Link to="/history" className="text-slate-600 hover:text-primary transition-colors text-sm">Our History</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-primary font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Alumni Portal</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Staff Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-primary font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                <span>High Level Road, Homagama,<br />Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary text-lg">call</span>
                <span>+94 11 2855 241</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                <span>info@homagamamv.lk</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} Homagama Maha Vidyalaya. All Rights Reserved.
          </p>
          <p className="text-xs tracking-[0.2em] text-on-surface-variant/60 uppercase">
            Nurturing Excellence Since 1889
          </p>
        </div>
      </div>
    </footer>
  );
}
