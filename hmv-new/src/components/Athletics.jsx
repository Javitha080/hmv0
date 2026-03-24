import { motion } from "framer-motion";

export default function Athletics() {
  return (
    <section className="py-24 sm:py-32 bg-surface overflow-hidden relative">
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <h3 className="font-headline text-sm uppercase tracking-[0.4em] text-secondary font-bold mb-4">
            Strength & Honour
          </h3>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-6 font-headline">
            Athletics & Excellence
          </h2>
          <div className="w-24 h-2 bg-secondary rounded-full" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Rugger Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative h-[400px] md:h-[600px] rounded-soft overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
          >
            <img
              alt="Rugby Match"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-crimson-deep/90 via-crimson-deep/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
              <div className="liquid-glass-crimson p-6 sm:p-8 rounded-soft inline-block max-w-lg">
                <span className="bg-yellow-warm text-crimson-deep px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
                  Premier Sport
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 font-display">Rugger Legacy</h3>
                <p className="text-white/80 leading-relaxed mb-6 font-outfit text-sm sm:text-base">
                  A tradition of grit, determination, and tactical brilliance. Our rugger teams continue to dominate the fields with an unbreakable spirit.
                </p>
                <a className="flex items-center gap-3 text-yellow-warm font-bold group/link" href="/sports">
                  Match Highlights
                  <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-2">arrow_right_alt</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Cricket Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group bg-secondary-container rounded-soft p-8 sm:p-10 h-1/2 overflow-hidden shadow-xl hover:shadow-2xl transition-all border-l-8 border-primary min-h-[240px]"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <span className="material-symbols-outlined text-3xl">sports_cricket</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-primary mb-3 font-display">Elite Cricket</h3>
                <p className="text-primary/70 font-outfit mb-6">
                  Upholding the standard of the gentleman's game on the prestigious green grounds.
                </p>
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all">
                  Season Fixtures
                </button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[200px] text-primary/5 pointer-events-none group-hover:scale-110 transition-transform">
                sports_cricket
              </span>
            </motion.div>

            {/* Track & Field Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group h-1/2 bg-surface-container-high rounded-soft overflow-hidden shadow-xl min-h-[240px]"
            >
              <img
                alt="Track & Field"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
              <div className="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-end">
                <div className="liquid-glass p-6 rounded-xl border-white/20">
                  <h3 className="text-2xl font-black text-white mb-2 font-display">Track & Field</h3>
                  <p className="text-white/70 text-sm font-outfit">
                    Where speed meets discipline and records are redefined annually.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <a
            className="liquid-glass-crimson px-12 py-4 rounded-full text-primary font-bold hover:bg-primary hover:text-white transition-all border-2 border-primary/20 flex items-center gap-3"
            href="/sports"
          >
            View All Sports Portfolios
            <span className="material-symbols-outlined">grid_view</span>
          </a>
        </div>
      </div>
    </section>
  );
}
