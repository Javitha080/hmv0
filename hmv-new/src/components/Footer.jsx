import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <footer className="relative pt-32 pb-10 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      {/* Outer fade gradient to blend with the page above */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent -z-20" />
      
      {/* Main Floating Container */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto rounded-[2.5rem] bg-white/70 dark:bg-slate-950/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative"
      >
        {/* Ambient Liquid Background Z-index: -10 */}
        <div className="absolute inset-0 pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-30">
          <div className="absolute -top-20 left-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid Layout inside the massive padding container */}
        <div className="p-8 sm:p-12 lg:p-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column (Spans 5/12) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pr-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-md flex items-center justify-center p-2 border border-white/60 dark:border-white/20 shadow-inner">
                  <img src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487" alt="Logo" className="w-full h-full object-contain drop-shadow" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-3xl sm:text-4xl lowercase tracking-tighter text-primary dark:text-white leading-none mb-1">
                    homagamamv
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary dark:text-primary-fixed">
                    est. 1889
                  </span>
                </div>
              </div>
              <p className="text-lg font-light leading-relaxed text-on-surface-variant dark:text-white/60 max-w-sm">
                Nurturing minds and building character since 1889. A premier educational institution shaping the leaders of tomorrow.
              </p>
              
              {/* Social Links Row (Squircle Icons) */}
              <div className="flex gap-4 mt-2">
                {['public', 'share', 'mail', 'link'].map((icon) => (
                  <motion.a 
                    href="#" 
                    key={icon}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/5 flex items-center justify-center text-on-surface-variant dark:text-white/70 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white border border-white dark:border-white/10 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links Column (3/12) */}
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/70 dark:text-white/50 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {[
                  { name: "Academics", path: "/academics" },
                  { name: "School News", path: "/news" },
                  { name: "Clubs & Societies", path: "/clubs" },
                  { name: "Sports Programs", path: "/sports" },
                  { name: "Our History", path: "/history" },
                  { name: "Contact Hub", path: "/contact" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="group flex items-center gap-3 text-lg font-medium text-on-surface dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column (4/12) */}
            <div className="lg:col-span-4">
              <div className="p-6 md:p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-inner">
                <h4 className="text-xl font-bold lowercase tracking-tight mb-2 text-primary dark:text-white">stay connected</h4>
                <p className="text-sm text-on-surface-variant dark:text-white/60 mb-6 font-medium">
                  Subscribe to our curated newsletter for the latest academic, athletic, and alumni updates.
                </p>
                <form className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="student@hmv.lk" 
                    className="flex-1 rounded-xl bg-white/80 dark:bg-black/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-white dark:border-white/10 placeholder:text-on-surface-variant/40 dark:placeholder:text-white/30 text-on-surface dark:text-white transition-all shadow-sm font-medium"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </motion.button>
                </form>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-16 pt-8 border-t border-outline-variant/30 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/70 dark:text-white/40">
              © {new Date().getFullYear()} homagamamv. all rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/70 dark:text-white/40 hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/70 dark:text-white/40 hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
