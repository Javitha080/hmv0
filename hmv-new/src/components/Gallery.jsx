import { motion } from "framer-motion";

export default function AcademicsPreview() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 bg-surface-container">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] sm:h-[600px] order-2 md:order-1"
        >
          <div className="absolute right-0 top-0 w-3/4 h-[350px] sm:h-[500px] shadow-2xl rounded-lg overflow-hidden z-0">
            <img
              alt="Historic university library"
              className="w-full h-full object-cover opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5BrcAf1PRUDuCREDz2lMs974bCjvmwNBWOru9LoYys2Wt6cBq5rmL9moJM9iWcnXDf_utbXOHgsliNV_duGmDGKkrK1fMl5IcW6PpSPl_GKtyI9mjlUFxuhnt350r8SezN_-rthEDAB0RKOjKxeZm-hGIKO9yAAlgSpzj7iK9cJigF-JPWZzPPbrh6xv-CCjfCs03vQdz3MCUS-NCAZ6nkwbvVm8cOcIY_Q9DZMJSMHRV-WM4jaOGit26U_r3H3w20E-9TQKi91Q"
            />
          </div>
          <div className="absolute left-0 bottom-0 w-3/4 h-[350px] sm:h-[500px] shadow-2xl rounded-lg overflow-hidden z-10 border-8 border-white">
            <img
              alt="Student in a science lab"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj3vHFlrmz1GtJ8-ofVSaJsyUqpjs73ILZ8g4HgBfMnRUfsxOpLTfYQQlAObHpioOc30CrXYGBLWyJP1Y-XshP6mqLggcYRN8DhspWJq5G4OIFNrfvLxKU74mGwsKjItgt1IEsoxQMQpi-r4b9DOvMFxDQNSnSptygQ0Z0x7pfFeY6yv9SQSbZL6Mw-3s58A-R5oFtKVKnhDTC2eXnhs0D-LOscDQKKZWrVVVSV7hCFWOUF7uOQSBqE7EkMA5DFjPQzfyKhoQzTV8"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <h3 className="font-headline text-sm uppercase tracking-[0.3em] text-secondary font-bold mb-4">
            Intellectual Rigor
          </h3>
          <h2 className="font-headline text-4xl sm:text-5xl font-bold text-primary mb-8">
            Academics
          </h2>
          <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed mb-10">
            Our academic curriculum is designed to challenge students to think critically and creatively. From classical humanities to cutting-edge STEM subjects, we provide a holistic education that prepares students for the most prestigious universities worldwide.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-primary mt-1">
                <span className="material-symbols-outlined">school</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-on-surface">Advanced Level Excellence</h4>
                <p className="text-on-surface-variant">
                  Specialized streams in Biological Sciences, Physical Sciences, Commerce, and Arts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-primary mt-1">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-on-surface">Research & Innovation</h4>
                <p className="text-on-surface-variant">
                  Encouraging student-led inquiry and scientific exploration through state-of-the-art facilities.
                </p>
              </div>
            </div>
          </div>
          <a
            href="/academics"
            className="mt-12 inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-lg font-bold border-2 border-primary hover:bg-primary hover:text-white transition-all"
          >
            Explore Our Curriculum{" "}
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
