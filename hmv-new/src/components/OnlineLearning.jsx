import { motion } from "framer-motion";

export default function OnlineLearning() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <h3 className="font-headline text-sm uppercase tracking-[0.3em] text-secondary font-bold mb-4">
            Digital Transformation
          </h3>
          <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-8">
            Learning Online
          </h2>
          <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed mb-10">
            Our state-of-the-art Learning Management System (LMS) ensures that education never stops. Access lectures, submit assignments, and collaborate with peers through our integrated digital portal designed for the modern scholar.
          </p>
          <div className="flex flex-col gap-4">
            {[
              "24/7 Access to Resource Libraries",
              "Interactive Live Classrooms",
              "Direct Faculty Mentorship Portals",
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 text-primary font-bold">
                <span className="material-symbols-outlined">check_circle</span>
                {item}
              </div>
            ))}
          </div>
          <button className="mt-12 bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-primary-container transition-all shadow-lg">
            Access Portal
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 relative"
        >
          <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="relative bg-white p-2 rounded-2xl shadow-2xl border border-outline-variant/30">
            <img
              alt="Sleek high-tech laptop dashboard"
              className="rounded-xl w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbdJRabQ2AjdCyjhBYeyyyIAvMQQGw13lVZPvz6BWkB8NFuLwGdUz26l39tmuzBc40_7HNXfi8DZH6cYfir0sQX0kxtvFBr_1U_NbAyIXVbdE8D0PhgzpAp4cwNFfEX7vlhm7tNVbuPzwAdnqo6prS9qMg0_t5k7bN20otBuwXJ6UT2ojM7hZX3wA7AcPx4Lv2Be0iUqWipShLF8-EnALD0lutf8VFLKTyU9ou-XE2GrQ6P3P8ZrYS5UwyTkPpUxVBDpL6fNyLEOU"
            />
            {/* Floating Stat */}
            <div className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-lg text-white">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Live Engagement</p>
                  <p className="text-2xl font-headline font-bold text-primary">98.5%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
