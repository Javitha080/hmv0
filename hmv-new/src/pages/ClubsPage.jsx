import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const clubs = [
  { name: "Music & Fine Arts", desc: "Nurturing artistic expression through orchestral performances, choral groups, and traditional dance ensembles.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTT545n_-VbsuaXp38MTovsA80wuk_R8fHNggOnuKI5Nr0ZzxpoNKk1umRYDohCMesoBW1jt_FtNFoyZkP53EFDUUWEECUCkhd1W6gemTdlEBV8LRT_43kJk_WR6oAjREbPE4fh7peYcrh3JTYq6SpvC2tSuc66rB9L1C-NtBbInBluVwVvxyVyxd6E0XnpXCQRn3B4n4yDundrnOWGYK0MtX2SRAN-xhH50fKRvVmunKMeQIKHrbcqsZWqU49AMCmkJI_6IL8eTc", icon: "music_note", large: true },
  { name: "ICT Club", desc: "The hub of digital innovation. From competitive programming to robotics and web development, we lead the school's technological frontier.", icon: "developer_mode", bg: "bg-yellow-warm/10" },
  { name: "Debating", desc: "Honing the art of persuasion and critical thinking through inter-school tournaments and national symposiums.", icon: "campaign" },
  { name: "Science Society", desc: "Exploring the wonders of the physical world through hands-on experiments, annual science fairs, and academic field trips.", icon: "science", hasImg: true },
  { name: "Interact", desc: "Service above self. Our Interact club focuses on community service projects that make a real-world impact in Homagama and beyond.", icon: "groups", bg: "bg-yellow-warm" },
];

export default function ClubsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[500px] sm:h-[650px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
            alt="School building"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        </div>
        <div className="relative z-10 p-8 sm:p-16 max-w-4xl">
          <span className="bg-yellow-warm text-crimson-deep px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
            Extra-Curricular Excellence
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold mb-6">
            Clubs &<br /><span className="text-yellow-warm">Societies</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            Where passion meets purpose. Our vibrant student organizations cultivate leadership, creativity, and technical prowess beyond the traditional classroom.
          </p>
          <div className="mt-8 liquid-glass px-6 py-3 rounded-full inline-flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-warm">emoji_events</span>
            <div>
              <span className="text-xs text-white/60 uppercase tracking-wider">Enrollment 2024</span>
              <p className="text-white font-bold">50+ Active Organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Community */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-3">Discover Your Community</h2>
              <p className="text-on-surface-variant max-w-xl">
                Join a community of like-minded peers and develop skills that will last a lifetime. Explore our diverse range of scholarly and creative associations.
              </p>
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Music - Large */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl shadow-lg min-h-[400px]"
            >
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={clubs[0].img} alt={clubs[0].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-10">
                <div className="glass-card p-6 rounded-xl">
                  <span className="material-symbols-outlined text-white text-3xl mb-3">{clubs[0].icon}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-headline">{clubs[0].name}</h3>
                  <p className="text-white/70 mb-4">{clubs[0].desc}</p>
                  <a className="text-yellow-warm font-bold flex items-center gap-2" href="#">
                    Explore Gallery <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ICT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container rounded-xl p-6 sm:p-8 flex flex-col justify-between min-h-[250px]"
            >
              <div>
                <div className="w-12 h-12 bg-yellow-warm rounded-lg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-crimson-deep">developer_mode</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-2">ICT Club</h3>
                <p className="text-on-surface-variant text-sm">{clubs[1].desc}</p>
              </div>
            </motion.div>

            {/* Debating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-3">campaign</span>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">Debating</h3>
                <p className="text-on-surface-variant text-sm">{clubs[2].desc}</p>
              </div>
              <a className="text-primary font-bold text-sm flex items-center gap-2 mt-4" href="#">
                Join Society <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </motion.div>

            {/* Science Society */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative group overflow-hidden rounded-xl min-h-[250px]"
            >
              <div className="absolute inset-0 bg-surface-container-high" />
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
                <span className="material-symbols-outlined text-primary text-3xl mb-3">science</span>
                <div>
                  <h3 className="font-headline text-xl font-bold text-primary mb-2">Science Society</h3>
                  <p className="text-on-surface-variant text-sm">{clubs[3].desc}</p>
                </div>
              </div>
            </motion.div>

            {/* Interact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-yellow-warm rounded-xl p-6 sm:p-8 flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="material-symbols-outlined text-crimson-deep text-3xl mb-3">groups</span>
                <h3 className="font-headline text-xl font-bold text-crimson-deep mb-2">Interact</h3>
                <p className="text-crimson-deep/70 text-sm">{clubs[4].desc}</p>
              </div>
              <div className="mt-4 bg-white/50 rounded-lg p-3">
                <span className="text-xs text-crimson-deep uppercase tracking-wider font-bold">Upcoming Project</span>
                <p className="text-crimson-deep font-bold text-sm">Community Health Camp - Oct 12</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-surface-container-high rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-yellow-warm/20 rounded-full" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/10 rounded-full" />
          <div className="relative z-10">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Ready to find your place?</h2>
            <p className="text-on-surface-variant mb-8 max-w-lg mx-auto">
              Clubs registrations open during the first two weeks of every academic term. Stay updated with the latest society announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your student email"
                className="flex-1 px-6 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
