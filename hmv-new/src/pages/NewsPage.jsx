import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const categories = ["All Stories", "Academic", "Sports", "Student Life", "Alumni"];

const trending = [
  { num: "01", title: "National Sports Trophy: Reid Avenue Dominates the Field", cat: "Sports", time: "2 hours ago" },
  { num: "02", title: "New Alumni Mentorship Program Launches Globally", cat: "Alumni", time: "5 hours ago" },
  { num: "03", title: "Inter-School Debate Championship: Final Standings", cat: "Academic", time: "1 day ago" },
];

const articles = [
  { title: "Celebrating Cultural Diversity: The Annual Heritage Festival Returns", cat: "Student Life", date: "October 24, 2023", desc: "A vibrant display of traditions, flavors, and performances marked this year's Heritage Festival, bringing together students from all walks of life to celebrate the unity of our global community.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2AKzLyyMYS1SSE-5Hsx1oKiqesesDT0tH5ZJDdzbexzrbEzf0IrhSwwl7UaBL0SfdldtYGAvn6tfGubWQMNIhnt0bBzTbRd4r8IDXuvP8cchGb-fBO4oF81OG4MbPfcX9SH7CTauKqClCUQ61d6Ma54EDveIT0_TfYwyffLd2G_7wuqAv4aNmu9MD3LJs4GxuYOlUMfZ746eScsho4P3IfOX2ZUZxERLHH5h6fQWVh6BkQxOebqIJWZKFbFonMalC_Hq2XWCIb_A" },
  { title: "Revolutionizing STEM: The New Robotics Lab Inauguration", cat: "Academic", date: "October 19, 2023", desc: "Equipped with the latest in automation and artificial intelligence, the new STEM wing promises to provide students with unparalleled hands-on experience in modern engineering.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9keh-PAGM1DeW4kW35xoXS9pOstiaTsO-B8uTYE13xcVQb-p9dbnwpVjKxTwUl2bpYaPTaChuhByv61KFGo-r1FZIqSTQxCMRlEqjSgo0EmXt1rzCF1p8OuF2EMLRmBjMnttyuRR59C7D1dunBy15YO3hP2CGMnTfjB8cVyBbr0bdLsbalwhZ1J1N6rAdO2Po34lV65BRONiiuyfLc3sCIlC3N9AczBQ8QEEwtdVV-BF4nD8uazHc-wik5LFHdfRKH0eIB-SMng" },
];

const moreArticles = [
  { title: "Library Modernization Project Nears Completion", desc: "Over 15,000 new digital resources and collaborative study pods are being integrated.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbdJRabQ2AjdCyjhBYeyyyIAvMQQGw13lVZPvz6BWkB8NFuLwGdUz26l39tmuzBc40_7HNXfi8DZH6cYfir0sQX0kxtvFBr_1U_NbAyIXVbdE8D0PhgzpAp4cwNFfEX7vlhm7tNVbuPzwAdnqo6prS9qMg0_t5k7bN20otBuwXJ6UT2ojM7hZX3wA7AcPx4Lv2Be0iUqWipShLF8-EnALD0lutf8VFLKTyU9ou-XE2GrQ6P3P8ZrYS5UwyTkPpUxVBDpL6fNyLEOU" },
  { title: "Inter-School Championship: Final Standings", desc: "Our athletes showcased remarkable resilience and sportsmanship during this year's regional.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4" },
  { title: "Alumni Spotlight: Trailblazers in Technology", desc: "Meeting the former students who are leading innovation at some of the world's most influential.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTT545n_-VbsuaXp38MTovsA80wuk_R8fHNggOnuKI5Nr0ZzxpoNKk1umRYDohCMesoBW1jt_FtNFoyZkP53EFDUUWEECUCkhd1W6gemTdlEBV8LRT_43kJk_WR6oAjREbPE4fh7peYcrh3JTYq6SpvC2tSuc66rB9L1C-NtBbInBluVwVvxyVyxd6E0XnpXCQRn3B4n4yDundrnOWGYK0MtX2SRAN-xhH50fKRvVmunKMeQIKHrbcqsZWqU49AMCmkJI_6IL8eTc" },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All Stories");

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[450px] sm:h-[550px] flex items-end overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 p-8 sm:p-16 max-w-3xl">
          <span className="bg-yellow-warm text-crimson-deep px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
            Academic Excellence
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-4 leading-tight">
            The Centennial Vision: Shaping Future Leaders
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-6 max-w-xl">
            Reflecting on a century of scholarly tradition as we unveil our innovative curriculum for the next decade of academic brilliance.
          </p>
          <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-bold border border-white/20 hover:bg-white/30 transition-all">
            Read Full Story
          </button>
        </div>
      </section>

      {/* Category Tabs + Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Tabs */}
          <div className="flex gap-2 sm:gap-6 mb-12 border-b border-outline-variant/20 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {articles.map((article, i) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-6">
                    <img className="w-full h-full object-cover" src={article.img} alt={article.title} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{article.cat}</span>
                    <span className="text-on-surface-variant text-xs">• {article.date}</span>
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-4">{article.title}</h2>
                  <p className="text-on-surface-variant leading-relaxed">{article.desc}</p>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending */}
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-6">Trending News</h3>
                <div className="space-y-6">
                  {trending.map((t) => (
                    <div key={t.num} className="flex gap-4">
                      <span className="text-3xl font-display font-bold text-primary/20">{t.num}</span>
                      <div>
                        <h4 className="font-bold text-on-surface text-sm mb-1">{t.title}</h4>
                        <p className="text-xs text-on-surface-variant">{t.cat} • {t.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-surface-container p-6 rounded-xl">
                <h3 className="font-headline text-xl font-bold text-primary mb-3">Stay Informed</h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Subscribe to our weekly editorial for the latest updates on academic achievements, events, and school news.
                </p>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-white text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
                />
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-container transition-all">
                  Join Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-12 sm:py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moreArticles.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm group"
              >
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={a.img} alt={a.title} />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-on-surface mb-2">{a.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-4">{a.desc}</p>
                  <a className="text-primary font-bold text-sm flex items-center gap-2" href="#">
                    Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
