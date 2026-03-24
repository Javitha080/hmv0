import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-8 sm:mb-12 tracking-tight">
          An Experience That Lasts a Lifetime
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-loose mb-8 max-w-3xl mx-auto">
          Founded on the principles of integrity and intellectual curiosity, Homagama Maha Vidyalaya has stood as a beacon of education for generations. Our campus isn't just a place of learning; it's a sanctuary where the leaders of tomorrow find their voice and purpose through a blend of rigorous academics and vibrant extracurricular life.
        </p>
        <a
          href="/life-at-school"
          className="inline-block font-bold text-secondary text-lg border-b-4 border-secondary-container pb-1 hover:text-primary transition-colors"
        >
          Explore Life at Reid Avenue
        </a>
      </motion.div>
    </section>
  );
}
