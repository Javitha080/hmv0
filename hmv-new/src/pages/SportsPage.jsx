import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const sports = [
  { name: "Cricket", desc: "Our legacy on the pitch is unmatched, producing international stars and legendary victories.", tag: "Premier Sport", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4", large: true },
  { name: "Rugby", desc: "Power, precision, and passion define our Lions on the field." },
  { name: "Athletics", desc: "Track and field excellence.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4" },
  { name: "Swimming", desc: "Aquatic excellence.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4" },
];

const achievements = [
  { date: "March 2024", title: "Western Province Athletics Meet", desc: "Homagama MV secured 12 Gold medals, breaking 3 provincial records in the 100m and 400m hurdles categories." },
  { date: "February 2024", title: "Inter-School Cricket Big Match", desc: "A stunning victory against our rivals, reclaiming the 'Golden Willow' Trophy after a decade-long wait." },
  { date: "January 2024", title: "National Age-Group Swimming", desc: "Our junior relay team brought home silver at the National Aquatic Championships held at Sugathadasa." },
];

const matches = [
  { sport: "Cricket", date: "Apr 15, 2024", home: "HMV", away: "Ananda College", venue: "HMV Grounds, Homagama" },
  { sport: "Rugby", date: "Apr 22, 2024", home: "HMV", away: "Isipathana", venue: "CR & FC Grounds" },
];

const stats = [
  { value: "45+", label: "National Titles" },
  { value: "12", label: "Major Sports" },
  { value: "850", label: "Active Athletes" },
  { value: "15", label: "Pro Coaches" },
];

export default function SportsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <PageHero 
        badge="Nurturing Champions"
        title="Sports"
        subtitle="Our sports legacy spans decades of excellence, teamwork, and unyielding school spirit."
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4"
        primaryAction={
          <div className="flex gap-4 flex-wrap mt-6">
            <button className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/20 hover:scale-105 active:scale-95 transition-all">
              View Calendars
            </button>
            <button className="h-14 px-8 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Join a Team
            </button>
          </div>
        }
      />

      {/* Sporting Disciplines */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary italic mb-4">Our Sporting Disciplines</h2>
              <div className="w-24 h-1 bg-primary" />
            </div>
            <a className="text-primary font-bold flex items-center gap-2" href="#">
              Explore All Sports <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cricket Large */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:row-span-2 relative group overflow-hidden rounded-xl shadow-lg min-h-[400px]"
            >
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={sports[0].img} alt={sports[0].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 inline-block">Premier Sport</span>
                <h3 className="text-3xl font-bold text-white font-display italic mb-2">{sports[0].name}</h3>
                <p className="text-white/70 text-sm">{sports[0].desc}</p>
              </div>
            </motion.div>

            {/* Rugby */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container rounded-xl p-6 sm:p-8 flex flex-col justify-end min-h-[200px]"
            >
              <h3 className="font-display text-2xl font-bold text-primary italic mb-2">Rugby</h3>
              <p className="text-on-surface-variant text-sm">{sports[1].desc}</p>
            </motion.div>

            {/* Athletics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative group overflow-hidden rounded-xl min-h-[200px]"
            >
              <img className="absolute inset-0 w-full h-full object-cover" src={sports[2].img} alt={sports[2].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-xl font-bold text-white italic">Athletics</h3>
              </div>
            </motion.div>

            {/* Swimming */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group overflow-hidden rounded-xl min-h-[200px]"
            >
              <img className="absolute inset-0 w-full h-full object-cover" src={sports[3].img} alt={sports[3].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-xl font-bold text-white italic">Swimming</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements & Matches */}
      <section className="py-16 sm:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Achievements */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary italic mb-8">Recent Achievements</h2>
              <div className="space-y-8">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 sm:gap-6"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
                      <img className="w-full h-full object-cover" src={sports[0].img} alt="" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">{a.date}</span>
                      <h3 className="font-bold text-lg text-on-surface mb-1">{a.title}</h3>
                      <p className="text-on-surface-variant text-sm">{a.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div>
              <div className="bg-primary rounded-2xl p-6 sm:p-8 text-white">
                <h2 className="font-display text-2xl sm:text-3xl font-bold italic mb-8">Upcoming Matches</h2>
                <div className="space-y-6">
                  {matches.map((m) => (
                    <div key={m.date} className="bg-white/10 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-white/20 px-3 py-1 rounded text-xs font-bold uppercase">{m.sport}</span>
                        <span className="text-sm text-white/70">{m.date}</span>
                      </div>
                      <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="text-center">
                          <p className="font-bold text-xl">{m.home}</p>
                          <p className="text-xs text-white/60">HOME</p>
                        </div>
                        <span className="text-yellow-warm font-bold text-lg">VS</span>
                        <div className="text-center">
                          <p className="font-bold text-xl">{m.away}</p>
                          <p className="text-xs text-white/60">AWAY</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {m.venue}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-yellow-warm text-crimson-deep py-3 rounded-lg font-bold hover:brightness-110 transition-all">
                  Full Sports Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display text-5xl sm:text-6xl font-bold text-primary italic mb-2">{s.value}</div>
                <p className="text-on-surface-variant text-sm uppercase tracking-wider font-bold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
