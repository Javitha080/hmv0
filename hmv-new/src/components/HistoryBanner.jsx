import { motion } from "framer-motion";

export default function HistoryBanner() {
  return (
    <section className="relative h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Old school vintage photograph"
          className="w-full h-full object-cover grayscale opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
        />
        <div className="absolute inset-0 bg-primary/20" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg">
          190 Years and Counting
        </h2>
        <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
          From its inception at the verandah of a modest church with a mere 20 pupils to becoming a prominent educational institution, our school has a documented history of nearly two centuries and counting.
        </p>
        <a
          href="/history"
          className="inline-block bg-secondary text-on-secondary px-10 py-4 rounded-lg font-bold text-lg hover:bg-secondary-container transition-all shadow-xl"
        >
          Explore History
        </a>
      </motion.div>
    </section>
  );
}
