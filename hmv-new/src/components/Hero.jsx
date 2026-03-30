import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 origin-top"
      >
        <img
          alt="Students smiling on a sunny campus lawn"
          className="w-full h-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-10 text-center px-6 max-w-5xl mt-12"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] mb-8"
        >
          A Legacy Since 1889
        </motion.span>
        
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[1.05]">
          Welcome Home, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">to Excellence.</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Discover a community where your child's potential is nurtured with warmth, tradition, and boundless innovation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button className="h-14 px-8 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Begin The Discovery Tour
          </button>
          <button className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300">
            View Prospectus
          </button>
        </div>
      </motion.div>

      {/* Floating Testimonial Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 right-12 z-20 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl w-80 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-white">format_quote</span>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Sarah Mitchell</h4>
              <p className="text-xs text-white/60">Parent, Grade 9</p>
            </div>
          </div>
          <p className="text-sm text-white/80 italic leading-relaxed">
            "The atmosphere here is unlike any other. It truly feels like a second family for our daughter."
          </p>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-white absolute top-0"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
