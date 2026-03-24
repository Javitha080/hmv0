import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const milestones = [
  { year: "1962", title: "Elevation to Maha Vidyalaya Status", desc: "Recognizing the rapid growth in academic standards and student population, the school was officially elevated to 'Maha Vidyalaya' status, expanding its secondary education programs.", side: "left", color: "primary" },
  { year: "1985", title: "The Golden Jubilee Auditorium", desc: "Construction of the main auditorium was completed, providing a stage for cultural expression and large-scale academic gatherings that define our school spirit today.", side: "right", color: "secondary" },
  { year: "2010", title: "Modern Science Wing & IT Hub", desc: "Embracing the digital age, the institution inaugurated a state-of-the-art laboratory complex and the region's most advanced computer resource center.", side: "left", color: "primary" },
];

const alumni = [
  { name: "Prof. Ananda Perera", class: "Class of '68", desc: "Pioneering researcher in sustainable energy and recipient of the National Science Excellence Award.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD09Vkri-zopDupKfNQjFvPMJ1CG8B5LnKAR-5-xwhtBVHpDBuMeWPZ7-lJWo6h22EqyKLzfLh0zFE9mcyRzbIq4eUxDR-9JPJCn-HQ0yc8Us_HrMLRQVqBTRry0HMMsybW-0sjP6pegqw8Lk_SN0rwmq9BWZ693k-q_sR54NQzMGTo3uDUFIEWSQ4nIZTiIajHtiD8emiBj5kZwgv8LEw4zWFdjNA9AAC6aUwo17rB09ADglD2m9TvYaoLb2FiXTGZ8hzBs2pEV_Y" },
  { name: "Dr. Malini Wijesinghe", class: "Class of '82", desc: "Leading surgeon and philanthropist dedicated to rural healthcare accessibility across Sri Lanka.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuABdrXevKl8oZZbEDCK-RFZ1C1jKv3gNXm9XvLTk6DufExS8yuK88b54WC33bs3iQUhf-Ujl4XqarscsGyPD_5WMRqH1wus0A8Adp7Gbms6qSTmo_fy0ZVr2r22OOQV3MOk4pSdpPxPLwhV1p0ymHW88DemeugbanjNVC84dTvvF7Nj6QD7vDFmite3YrYycI45BlxNJ70ij1OEp4MRUm5d9CafAUyXeaLqNHh0W-YsKXl1tOgTKOYwQxDMwJqzezE0T-VzzKtUNGc" },
  { name: "Kasun Rathnayake", class: "Class of '05", desc: "National athlete and gold medalist, now mentoring the next generation of sporting talent.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6HL-dq9j04Ez4-WBXzSxZ0c2BCojocvnCS0rEGx2AWtt69C7ZqF7j1OZVvNqZXpFUCAoxws_37jf27_Ri1eR-qE5nMdsOPKu9OcxbFhNIGeHmiP0tthGODD7Tfk7ronJV-En_tf33iGFJCevBdY4BzvebTfKFTjZEyrdx9Nif8f7d-oo73KH7B_Lm1tS0d4nIZFnxwqMGReUr-yMtI-vvPywCGfsqbByUhV-ltyf_zueduZ88Jt1I6Q_bbXT-nMpQcMrSkyeTxI" },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/30">
          <img
            className="w-full h-full object-cover mix-blend-multiply opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
            alt="Historic school building"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-secondary-container font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Est. 1889</span>
          <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl text-white font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Our History
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A legacy of academic excellence and cultural heritage spanning over seven decades in the heart of Homagama.
          </p>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="py-16 sm:py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative z-10">
              <img
                className="w-full h-full object-cover grayscale sepia-[0.3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOkcvb2FogHQryPT0UksdysZpKv7b8lIEgiFQSQCZPz6XOSdCDbNqfra6QUxopKIqkXq1M6QpNB9D6kEv0133uwoBDYqsTZ0FYB5VoDNc658AJ2tywKSXXJIgRU3zyhU47Z-PqIvjwsu5xtAJWg2qLe48LFAI1gt3alJF_0olXhlPR7AMeOfnsq4qADeykAPL2ZKrQaox7Wx8dFBlgXB2tFbrziW3dnMbW8fnm5R-lOgRx3ayYDddMJbNuH5k5ffaOkvPGv0fal5o"
                alt="Historical founding photograph"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary-container rounded-xl -z-0 opacity-20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 md:pl-8 lg:pl-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-widest text-sm">The Beginning</span>
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl text-primary font-bold mb-8 leading-tight">Foundation (1945)</h2>
            <div className="space-y-6 text-on-surface-variant text-base sm:text-lg leading-relaxed">
              <p>Born amidst the pivotal year of 1945, Homagama Maha Vidyalaya was established with a singular vision: to provide quality vernacular education to the youth of the region during a time of great national transition.</p>
              <p>What started as a modest collection of thatched-roof classrooms has grown into a beacon of knowledge. The founding fathers of the institution, local visionaries and philanthropists, laid down a foundation not just of brick and mortar, but of discipline, integrity, and scholarly pursuit.</p>
              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-outline-variant/30">
                <div>
                  <span className="block font-headline text-4xl text-secondary font-bold mb-1">45</span>
                  <span className="text-sm font-medium uppercase tracking-tighter">Initial Students</span>
                </div>
                <div>
                  <span className="block font-headline text-4xl text-secondary font-bold mb-1">03</span>
                  <span className="text-sm font-medium uppercase tracking-tighter">Founding Teachers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface-container-low py-16 sm:py-24 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="font-headline text-4xl sm:text-5xl text-primary font-bold mb-4">Key Milestones</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">The chronological journey of our growth and transformation through the decades.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-outline-variant/50 hidden md:block" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative mb-16 sm:mb-24 md:flex ${m.side === "right" ? "flex-row-reverse" : ""} items-center justify-between w-full`}
              >
                <div className="md:w-[45%] mb-8 md:mb-0">
                  <div className={`glass-card p-6 sm:p-8 rounded-xl shadow-lg ${m.side === "left" ? "border-l-4 border-primary" : "border-r-4 border-secondary"}`}>
                    <span className="font-headline text-3xl text-secondary font-bold block mb-2">{m.year}</span>
                    <h3 className="font-bold text-xl mb-4">{m.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-surface hidden md:block" />
                <div className="md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Alumni */}
      <section className="py-16 sm:py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl sm:text-5xl text-primary font-bold mb-6">Notable Alumni</h2>
            <p className="text-on-surface-variant text-lg">Our legacy is best reflected in the lives and achievements of those who once walked these halls.</p>
          </div>
          <button className="flex items-center gap-2 font-bold text-primary group">
            View Alumni Portal
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {alumni.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-xl bg-surface shadow-md"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={a.img} alt={a.name} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 glass-card translate-y-4 group-hover:translate-y-0 transition-transform">
                <h4 className="font-headline text-xl sm:text-2xl font-bold text-primary mb-1">{a.name}</h4>
                <p className="text-sm font-semibold text-secondary mb-3 uppercase tracking-wider">{a.class}</p>
                <p className="text-on-surface-variant text-sm line-clamp-2">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Archive CTA */}
      <section className="py-16 sm:py-24 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto bg-primary rounded-2xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 skew-x-12 translate-x-12" />
          <div className="relative z-10 p-8 sm:p-12 md:p-20 md:w-2/3">
            <h2 className="font-headline text-3xl sm:text-4xl text-white font-bold mb-6">Contribute to our Digital Archive</h2>
            <p className="text-white/80 text-lg mb-8">
              Do you have old photographs, documents, or stories from your time at Homagama Maha Vidyalaya? Help us preserve our history for future generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-md font-bold hover:brightness-110 transition-all">Submit Archive Material</button>
              <button className="border border-white/30 text-white px-8 py-3 rounded-md font-bold hover:bg-white/10 transition-all">Browse Full Gallery</button>
            </div>
          </div>
          <div className="md:w-1/3 h-64 md:h-full relative">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEE0nj-XSByvEmbkbLwNvEf5TlnB2Mpxg8235XyGxt468yy8lFzMSFrr_F-sR2V8UDTc4fpwyKHuUhb7miMtayCllWgCku7oCPweGwJAQnv9Pko-GVa_Si_5mfL3COR6Q9E8SywewdPCr3FQGdGu_JSubIpZ_Jgqn6QEFYYVXp7HD2FBKqf0SadnYNRIdZM8BDQ-X9wGYLltXbfR6eYiByQkzEsaRQGxlAlJ9K2aCVCZL3Eglflv1x8iK6lWQXJUByL0brGij53uo"
              alt="Vintage books and documents"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
