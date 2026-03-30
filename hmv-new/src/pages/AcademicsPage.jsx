import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const educationLevels = [
  { tag: "Foundation", title: "Primary Education", desc: "Focus on foundational literacy, numeracy, and social skills through activity-based learning. We emphasize character building and the joy of discovery in these critical early years (Grade 1 - 5).", features: ["Grade 1-5", "Integrated Curriculum", "Creative Arts focus"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoCo6ZYBPAru3z6aoAa3b3vb_zp0xW-HKrZdUC2n7x4q9O-1nGIBsAl1KWkK4J4X55_ypGa6AJRye2gQr9Ih6gvTTL27ujCw2FCJL95i6B6WylHBMPDQzvg4nyA93EveYS2i0N4djFB4CIkMzXLkjCo9O2Rrq8Ma1lXuBuVlTPVnjGqUQK0603hKgDdQ_NWMJrkZD9bDmvh0gCQwb_IKdnZv3YYnporZwPTIzlYXzsLi1BQlF7tERKSaN3pFEpR0QTakgyd6dVNM8" },
  { tag: "Growth", title: "Secondary Education", desc: "A rigorous academic environment preparing students for the G.C.E. Ordinary Level examinations. Broad subject exposure allows students to identify their strengths and interests.", features: ["Grade 6-11", "O/L Preparation", "STEM focus"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXz4hzRye-oOLCUfxW_v2USXlGYagMUcEafggRcpdFiop1QvFmw-4UUbeL9trAli9y7y0RkUiggEEWlRBBExcmuXR1WGQ2QYreJoz1n56nQlhhtUDhR7i_JyCPH_0fkbYZafxz9y_B535nPlLhbInryFIR8COsL2jQIcMS2yUmlKA1Vb1-n2IDHBYRG3oDLVXmpVnYaOGz7y4x5IJuAGD5aTtP8bxmR3b9XF4L_Unbyn-nnTQswamo7_3vy0HSmJ3lzXP8d0GftxM", reverse: true },
  { tag: "Specialization", title: "Advanced Level", desc: "Specialized streams in Science, Commerce, and Arts. Our expert faculty guides students through the intensive G.C.E. Advanced Level curriculum to secure university placements.", features: ["Grade 12-13", "University Pathways", "Expert Mentorship"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1iFDl6Y7DFhuEyQTrsLcG_OcPcBgJ1BANY7iVDJldd5O88TmUtyc4qBXRA2WpIt198Z6M6eQh5AyKMSvXBIOq_hIeR6ZnqZCjz6KsYsQj-zHXWvPgkzR0g4u4u3QW9f0jBrSv96vmYcbXSZFx_WXq4IzvE_dMFSO30LPin27RM5H57mx8s-abD7U-SU00xa7w_ILhGtqd7Jn1w18fzz1NAUciIaed05ivB3HCyHAjG2CGK_B-AxKg1zvpwBelqWTicJAnMgpOxlU" },
];

const calendarTerms = [
  { name: "First Term", period: "Jan - Apr", items: [{ date: "Jan 10", event: "School Re-opens for Term I" }, { date: "Feb 22", event: "Mid-Term Assessments Start" }, { date: "Apr 05", event: "First Term Examinations" }] },
  { name: "Second Term", period: "May - Aug", items: [{ date: "May 02", event: "School Re-opens for Term II" }, { date: "Jun 15", event: "Annual Sports & Academic Meet" }, { date: "Aug 12", event: "Second Term Assessments" }] },
  { name: "Third Term", period: "Sep - Dec", items: [{ date: "Sep 04", event: "School Re-opens for Term III" }, { date: "Oct 20", event: "G.C.E. A/L Model Examinations" }, { date: "Dec 02", event: "Annual Prize Giving Ceremony" }] },
];

export default function AcademicsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <PageHero 
        badge="Core Academics"
        title="Academic Excellence"
        subtitle="Tradition meets innovation in a data-driven modular environment."
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
        primaryAction={
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="h-14 px-8 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              View Prospectus
            </button>
            <button className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/20 hover:scale-105 active:scale-95 transition-all">
              Contact Registrar
            </button>
          </div>
        }
      />

      {/* Bento Curriculum */}
      <section className="py-16 sm:py-24 bg-surface-container overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16">
            <div className="max-w-xl">
              <span className="text-crimson-deep font-extrabold tracking-widest uppercase text-sm mb-4 block">Core Pathways</span>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-6">Our Curriculum</h2>
            </div>
            <p className="text-on-surface-variant max-w-md md:text-right mb-2">
              A future-ready educational framework blending traditional values with modern research-driven pedagogy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Science Stream */}
            <div className="md:col-span-4 lg:col-span-4 lg:row-span-2 liquid-glass rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between group relative overflow-hidden min-h-[400px] sm:min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <img
                  alt="Modern laboratory"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 mix-blend-multiply"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8sVy0UXQWEZt2QK5fj36G90HbQT5fL6ec67T9GI0uRYDvjE1FsPhnTW1xGtXErCSX6emCCqDGjEUVPKVCZnE_9vg2YgLUPmfaiwUFpdNWZFfBUnncrIm7wV7JPhoNSWBmpvFNFSmkyVzMKE7Ggor_lbzz2snhhIpB2XPV-oUHATa0TlwZhGftumSPsDjNFQYKq3EEj8MH8tuvOaTq8KU8G2XEv46EM0duX-wGgE_5IzFyvx2lQHBJl1dZfgEDxr2Y-I-JucjSe3o"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-12 h-1.5 bg-crimson-deep rounded-full" />
                  <h3 className="font-bold uppercase tracking-tighter text-crimson-deep text-lg">Science Stream</h3>
                </div>
                <h4 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-6 leading-tight max-w-xl">
                  Forging the next generation of innovators and researchers.
                </h4>
                <p className="text-on-surface-variant text-base sm:text-lg max-w-md">
                  Physics, Chemistry, and Biology combined with advanced laboratory research and experimental learning modules.
                </p>
              </div>
              <div className="relative z-10 mt-8 sm:mt-12">
                <button className="bg-primary text-white py-4 px-10 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-crimson-deep transition-all shadow-lg active:scale-95">
                  Explore Science <span className="material-symbols-outlined align-middle ml-2">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Arts */}
            <div className="md:col-span-2 lg:col-span-2 liquid-glass rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between bg-primary/5 min-h-[220px]">
              <span className="material-symbols-outlined text-crimson-deep text-5xl mb-6">palette</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black mb-3 uppercase tracking-tight text-primary">Arts & Humanities</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Cultivating creative expression and critical thinking through literature, history, and fine arts.</p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-crimson-deep font-bold text-xs uppercase hover:underline">
                Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            {/* Commerce */}
            <div className="md:col-span-2 lg:col-span-2 liquid-glass rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between bg-yellow-warm/10 min-h-[220px]">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-yellow-warm text-5xl">payments</span>
                <span className="bg-yellow-warm text-crimson-deep font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">Leadership</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black mb-3 uppercase tracking-tight text-primary">Commerce & Business</h3>
                <p className="text-sm text-slate-600">Economics, Accounting, and Business Studies for the leaders of tomorrow.</p>
              </div>
              <button className="mt-6 bg-crimson-deep text-white py-2 px-6 rounded-lg font-bold text-xs uppercase w-fit hover:opacity-90">Program Details</button>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Journey */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-4">Educational Journey</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">From the first steps of primary education to the specialized paths of the advanced levels.</p>
          </div>
          <div className="flex flex-col gap-8">
            {educationLevels.map((level, i) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 sm:p-12 rounded-2xl flex flex-col ${level.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 sm:gap-12 items-center transition-all hover:-translate-y-1 shadow-sm`}
              >
                <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                  <img alt={level.title} className="w-full h-full object-cover" src={level.img} />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-secondary-container/30 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{level.tag}</span>
                    <h3 className="font-headline text-2xl sm:text-3xl font-bold text-primary">{level.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed mb-6">{level.desc}</p>
                  <div className="flex flex-wrap gap-6 sm:gap-8 text-sm font-bold text-primary">
                    {level.features.map((f) => (
                      <span key={f} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check_circle</span> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Excellence */}
      <section className="py-16 sm:py-24 bg-surface-container-highest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-8 leading-tight">Faculty Excellence</h2>
              <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed mb-10">
                Our educators are more than teachers; they are mentors, researchers, and lifelong learners dedicated to the success of every student. With over 150 qualified staff members, we maintain a standard of pedagogical mastery.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-surface p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-headline font-bold text-primary mb-2">98%</div>
                  <p className="text-sm text-on-surface-variant uppercase tracking-wider font-bold">Success Rate</p>
                </div>
                <div className="bg-surface p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-headline font-bold text-secondary mb-2">15+</div>
                  <p className="text-sm text-on-surface-variant uppercase tracking-wider font-bold">Avg. Yrs Experience</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl max-w-md mx-auto">
                <img
                  alt="Faculty member"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV_eFB7fxRRp7a38DKzmY1370iq0dUI2-rgA_Wa20RMWnICtuAimT1Uljyo05Q0NRTiSwN_50UWUCn69rDkFCRluiomX3XnXCQgPbrt0AUNMijyE-Qz2mwFovpYNuZ4Dt0NKkd5o7bJrz1FnAYERTj8ED9l_5T7XhzoHMCvexUAcsBw6hL9TVblFwTR7oRUJV8NIZodiON34XaqlJJ3hx_lBbE0rkquWNmqNDLTmZwdvZHt4G3tx8IDW8rOrIsLFPunGt7f2RXV5M"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">format_quote</span>
                <p className="italic text-on-surface mb-4">"We don't just teach subjects; we inspire a lifelong passion for knowledge and character."</p>
                <p className="font-bold text-primary text-sm">— Principal's Academic Vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <div className="md:sticky md:top-32">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-6">Academic Calendar</h2>
                <p className="text-on-surface-variant mb-8">Stay informed about term dates, examination schedules, and key academic milestones for the current year.</p>
                <button className="flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all">
                  Download Full PDF <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              {calendarTerms.map((term, i) => (
                <motion.div
                  key={term.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-surface-container-low p-6 sm:p-8 rounded-xl ${i % 2 === 0 ? "border-l-4 border-primary" : "border-l-4 border-secondary"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline text-xl sm:text-2xl font-bold">{term.name}</h3>
                    <span className={`font-bold ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}>{term.period}</span>
                  </div>
                  <ul className="space-y-4">
                    {term.items.map((item) => (
                      <li key={item.event} className="flex items-center gap-4 text-on-surface-variant">
                        <span className="w-16 font-serif font-bold text-secondary">{item.date}</span>
                        <span>{item.event}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
