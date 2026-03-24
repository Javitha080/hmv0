import { motion } from "framer-motion";

const newsItems = [
  {
    id: 1,
    category: "Academic",
    date: "May 15, 2024",
    title: "84th Annual Prize Giving Ceremony Announced",
    excerpt: "Celebrating the exceptional academic achievements of our students across all grades for the academic year.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9keh-PAGM1DeW4kW35xoXS9pOstiaTsO-B8uTYE13xcVQb-p9dbnwpVjKxTwUl2bpYaPTaChuhByv61KFGo-r1FZIqSTQxCMRlEqjSgo0EmXt1rzCF1p8OuF2EMLRmBjMnttyuRR59C7D1dunBy15YO3hP2CGMnTfjB8cVyBbr0bdLsbalwhZ1J1N6rAdO2Po34lV65BRONiiuyfLc3sCIlC3N9AczBQ8QEEwtdVV-BF4nD8uazHc-wik5LFHdfRKH0eIB-SMng",
  },
  {
    id: 2,
    category: "Sports",
    date: "May 10, 2024",
    title: "Inter-House Athletic Meet: Record Breaking Day",
    excerpt: "New records were set in the 100m sprint and high jump as houses competed for the overall championship trophy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjbQ3vjMWdOuY-4e6fRCefk7YLquWtu7hDp9I91iYl3yhKGoE948fVC-gZtdLK5C5gVhD6zb67H_Bexs3yeQsxumZTEPsmd_q4l49nl1nlhiNkcE287ayPCbcKL2Ziz_bTc-ie6BxeuqMO7mINLe703b5RJTwRIouob7fEkUUO28SjmKmt7cKH3C-DSRAiMctMZ1prqfFwI1c8I-xi3Tz3dRrxas3sS1QUxG6Wc4_kTXIf8o9iTtRucv6vobfa08Lvtu-6GoX9x4",
  },
  {
    id: 3,
    category: "Alumni",
    date: "May 05, 2024",
    title: "Global Alumni Networking Summit 2024",
    excerpt: "Connecting past pupils from around the globe to discuss mentorship programs for current senior students.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2AKzLyyMYS1SSE-5Hsx1oKiqesesDT0tH5ZJDdzbexzrbEzf0IrhSwwl7UaBL0SfdldtYGAvn6tfGubWQMNIhnt0bBzTbRd4r8IDXuvP8cchGb-fBO4oF81OG4MbPfcX9SH7CTauKqClCUQ61d6Ma54EDveIT0_TfYwyffLd2G_7wuqAv4aNmu9MD3LJs4GxuYOlUMfZ746eScsho4P3IfOX2ZUZxERLHH5h6fQWVh6BkQxOebqIJWZKFbFonMalC_Hq2XWCIb_A",
  },
];

export default function News() {
  return (
    <section id="news" className="py-24 sm:py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 sm:mb-16 gap-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary font-headline">Latest Updates</h2>
          <a
            className="text-secondary font-bold flex items-center gap-2 hover:underline"
            href="/news"
          >
            View All News <span className="material-symbols-outlined">open_in_new</span>
          </a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-secondary-container bg-primary px-3 py-1 rounded-full uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">{item.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 leading-snug">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{item.excerpt}</p>
                <a className="text-primary font-bold text-xs flex items-center gap-2 hover:gap-3 transition-all" href="#">
                  Read More <span className="material-symbols-outlined text-sm">chevron_right</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
