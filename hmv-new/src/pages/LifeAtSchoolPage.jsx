import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const campusSpots = [
  { name: "Main Quadrangle", desc: "The historic heart of the school where morning assemblies, ceremonies, and traditions unfold under the shade of century-old trees.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0" },
  { name: "Knowledge Commons", desc: "Our multi-story digital library and collaborative hub for the modern scholar.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbdJRabQ2AjdCyjhBYeyyyIAvMQQGw13lVZPvz6BWkB8NFuLwGdUz26l39tmuzBc40_7HNXfi8DZH6cYfir0sQX0kxtvFBr_1U_NbAyIXVbdE8D0PhgzpAp4cwNFfEX7vlhm7tNVbuPzwAdnqo6prS9qMg0_t5k7bN20otBuwXJ6UT2ojM7hZX3wA7AcPx4Lv2Be0iUqWipShLF8-EnALD0lutf8VFLKTyU9ou-XE2GrQ6P3P8ZrYS5UwyTkPpUxVBDpL6fNyLEOU" },
  { name: "Sports Pavilion", desc: "Home to our champions and the spirit of sportsmanship.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4" },
  { name: "Innovation Labs", desc: "Where curiosity leads to groundbreaking discovery.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8sVy0UXQWEZt2QK5fj36G90HbQT5fL6ec67T9GI0uRYDvjE1FsPhnTW1xGtXErCSX6emCCqDGjEUVPKVCZnE_9vg2YgLUPmfaiwUFpdNWZFfBUnncrIm7wV7JPhoNSWBmpvFNFSmkyVzMKE7Ggor_lbzz2snhhIpB2XPV-oUHATa0TlwZhGftumSPsDjNFQYKq3EEj8MH8tuvOaTq8KU8G2XEv46EM0duX-wGgE_5IzFyvx2lQHBJl1dZfgEDxr2Y-I-JucjSe3o" },
];

const testimonials = [
  { quote: "HMV isn't just a school, it's a brotherhood that shapes your identity. The values I've learned on these grounds stay with me in everything I do.", name: "Ravinda Perera", role: "Head Prefect '24" },
  { quote: "The freedom to explore science and arts simultaneously in such a supportive environment is what makes Life at Reid Avenue so unique.", name: "Amara Senaratake", role: "President, Astronomy Society" },
];

const clubCategories = [
  { name: "Science & Tech", desc: "From robotics to chemical research, push the boundaries of human knowledge in our state-of-the-art labs.", clubs: ["Robotics Club", "Astronomy Society"], icon: "science" },
  { name: "Arts & Media", desc: "Express your creativity through drama, music, literature, and our award-winning broadcasting team.", clubs: ["Drama Society", "MediaUnit"], icon: "palette" },
  { name: "Athletics", desc: "Discipline and grit define our athletes. Join the legacy of champions across multiple sporting disciplines.", clubs: ["First XI Rugby", "Swimming Team"], icon: "sports_martial_arts" },
];

export default function LifeAtSchoolPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        </div>
        <div className="relative z-10 p-8 sm:p-16 w-full">
          <span className="bg-yellow-warm text-crimson-deep px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
            Est. 1889
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold mb-2">
            Life at<br /><span className="italic text-yellow-warm">Reid Avenue</span>
          </h1>
          <div className="liquid-glass mt-6 p-4 rounded-xl max-w-2xl">
            <p className="text-white/80 text-sm sm:text-base">
              Beyond the classrooms lies a legacy of excellence, brotherhood, and character. Discover the vibrant pulse of Homagama Maha Vidyalaya. Where tradition meets future-forward thinking.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 flex flex-wrap gap-4 sm:gap-0 rounded-xl overflow-hidden">
            {[
              { value: "50+", label: "Active Societies" },
              { value: "20+", label: "Sports Teams" },
              { value: "100", label: "Years of Legacy" },
            ].map((s, i) => (
              <div key={s.label} className={`px-6 py-4 ${i < 2 ? "bg-white/10 backdrop-blur" : ""} flex-1 min-w-[120px] text-center`}>
                <span className="block text-2xl font-bold text-white">{s.value}</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
            <a href="/contact" className="bg-yellow-warm text-crimson-deep px-6 py-4 font-bold text-sm flex items-center justify-center flex-1 min-w-[160px] hover:brightness-110 transition-all">
              Join the Excellence
            </a>
          </div>
        </div>
      </section>

      {/* Campus Spots */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-3">Our Sanctuary of Learning</h2>
              <p className="text-on-surface-variant max-w-xl">
                A harmonious blend of historic landmarks and modern innovation spaces designed to foster intellectual growth and community spirit.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {campusSpots.map((spot, i) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-xl h-64 sm:h-80 shadow-lg"
              >
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={spot.img} alt={spot.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display italic mb-2">{spot.name}</h3>
                  <p className="text-white/70 text-sm">{spot.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary italic mb-12">
            Voices of<br />the Avenue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-primary"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-4">format_quote</span>
                <p className="text-on-surface italic text-lg leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-on-surface-variant text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary text-center mb-12">Clubs & Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">{cat.icon}</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-3">{cat.name}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{cat.desc}</p>
                <ul className="space-y-2 mb-6">
                  {cat.clubs.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-primary">
                      <span className="material-symbols-outlined text-xs">radio_button_checked</span> {c}
                    </li>
                  ))}
                </ul>
                <a className="text-primary font-bold text-sm flex items-center gap-2" href="/clubs">
                  Explore More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-headline text-3xl sm:text-4xl text-white font-bold mb-4">Ready to Write Your Chapter?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Applications for the next academic year are now open. Begin your journey at the home of excellence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">Apply Now</button>
            <button className="bg-yellow-warm text-crimson-deep px-8 py-3 rounded-lg font-bold hover:brightness-110 transition-all">Download Prospectus</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
