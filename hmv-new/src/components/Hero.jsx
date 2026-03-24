import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Students smiling on a sunny campus lawn"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 text-glow leading-[1.1]">
          Welcome Home, <br />to Excellence.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto text-glow font-outfit">
          Discover a community where your child's potential is nurtured with warmth, tradition, and innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <button className="liquid-glass text-slate-900 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white/60 transition-all border border-white/40 font-outfit">
            Begin The Discovery Tour
          </button>
          <button className="bg-yellow-warm text-crimson-deep px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-xl shadow-yellow-warm/20 font-outfit">
            View Prospectus
          </button>
        </div>
      </motion.div>

      {/* Floating Testimonial Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-12 right-12 z-20 hidden lg:block"
      >
        <div className="liquid-glass p-6 rounded-[2rem] w-80 shadow-2xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-crimson-soft/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-crimson-deep">person_search</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm font-outfit">Sarah Mitchell</h4>
              <p className="text-xs text-slate-500 font-outfit">Parent, Grade 9</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 italic leading-relaxed font-outfit">
            "The atmosphere here is unlike any other. It truly feels like a second family for our daughter."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
