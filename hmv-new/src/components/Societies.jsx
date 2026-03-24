import { motion } from "framer-motion";

export default function Societies() {
  return (
    <section id="societies" className="py-24 sm:py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 font-headline">
            Clubs & Societies
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Explore interests beyond the syllabus with our diverse range of co-curricular activities.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-[600px]">
          {/* Music & Fine Arts - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTT545n_-VbsuaXp38MTovsA80wuk_R8fHNggOnuKI5Nr0ZzxpoNKk1umRYDohCMesoBW1jt_FtNFoyZkP53EFDUUWEECUCkhd1W6gemTdlEBV8LRT_43kJk_WR6oAjREbPE4fh7peYcrh3JTYq6SpvC2tSuc66rB9L1C-NtBbInBluVwVvxyVyxd6E0XnpXCQRn3B4n4yDundrnOWGYK0MtX2SRAN-xhH50fKRvVmunKMeQIKHrbcqsZWqU49AMCmkJI_6IL8eTc"
              alt="Music and Fine Arts"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-headline">Music & Fine Arts</h3>
              <p className="text-white/70 mb-4">Fostering creative souls through harmony and aesthetics.</p>
              <span className="inline-flex items-center text-secondary-container font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                Join Club <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </span>
            </div>
          </motion.div>

          {/* Debating & Oratory */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-primary p-6 sm:p-8 rounded-xl flex flex-col justify-between group hover:bg-primary-container transition-colors min-h-[200px]"
          >
            <div className="text-white">
              <span className="material-symbols-outlined text-4xl mb-4">record_voice_over</span>
              <h3 className="text-xl font-bold mb-2">Debating & Oratory</h3>
              <p className="text-white/70 text-sm">Mastering the art of persuasion and critical thought.</p>
            </div>
            <span className="material-symbols-outlined text-white/30 self-end group-hover:text-white transition-colors">trending_flat</span>
          </motion.div>

          {/* Social Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-high p-6 sm:p-8 rounded-xl flex flex-col justify-between group hover:bg-secondary transition-all min-h-[200px]"
          >
            <div className="text-on-surface group-hover:text-white">
              <span className="material-symbols-outlined text-4xl mb-4">volunteer_activism</span>
              <h3 className="text-xl font-bold mb-2">Social Service</h3>
              <p className="text-on-surface-variant group-hover:text-white/70 text-sm">
                Impacting lives through dedicated community outreach.
              </p>
            </div>
            <span className="material-symbols-outlined text-on-surface/30 self-end group-hover:text-white transition-colors">trending_flat</span>
          </motion.div>

          {/* Elite Cricket */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-secondary-container p-8 sm:p-10 rounded-xl relative overflow-hidden group min-h-[200px]"
          >
            <div className="relative z-10 flex h-full items-center justify-between">
              <div className="max-w-xs">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-3 font-headline">Elite Cricket</h3>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Join the legacy of champions on the prestigious grounds of Reid Avenue.
                </p>
                <button className="bg-primary text-white px-6 py-3 rounded-md font-bold text-sm">
                  View Team History
                </button>
              </div>
              <span className="material-symbols-outlined text-[120px] opacity-10 absolute -right-4 -bottom-4 text-primary group-hover:scale-125 transition-transform">
                sports_cricket
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
