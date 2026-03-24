import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqMjjrzzc6HzDCqq3nEvwLdPGjsQBGDq-IlVgUhmd4KFc-WhmqzW_1cE09ntng0SJ-y85a4yVUDBUOoGloTIKJVEvGhCZQsjR31pBoe2YbSTFUWK_nTruMQaPgcngOLsEqtrJMeqbp8mhiEyOBlsfjBio_nV1_YbTphfk5cLtv3w8E26kqXKprLo-RWMJvDWCzIJd4Q9ZFcdlU5JIOZUgZs79YOCEswfJb-XRxqP_GIRxYkOHaVS_LtvOQRDmu1SA1kK89ywx3S0"
            alt="School building"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
        </div>
        <div className="relative z-10 p-8 sm:p-16">
          <span className="bg-yellow-warm text-crimson-deep px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">Get in Touch</span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-primary font-bold mb-2">Contact Us</h1>
          <div className="w-16 h-1 bg-primary rounded-full" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 sm:p-12 shadow-sm border border-outline-variant/10"
            >
              <h2 className="font-headline text-3xl font-bold text-primary mb-3">Send a Message</h2>
              <p className="text-on-surface-variant mb-8">Have a question or feedback? Our administrative team is ready to assist you.</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Subject</label>
                  <input type="text" placeholder="Admissions, Alumni, General Inquiry" className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Message</label>
                  <textarea rows="5" placeholder="Write your message here..." className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                </div>
                <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all flex items-center gap-2">
                  Send Inquiry <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </form>
            </motion.div>

            {/* Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-warm flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-crimson-deep">location_on</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">Visit Us</h3>
                  <p className="text-on-surface-variant">Highlevel Road,<br />Homagama, 10200<br />Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-warm flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-crimson-deep">call</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">Call Us</h3>
                  <p className="text-on-surface-variant">General Office: +94 11 2855 241<br />Principal's Office: +94 11 2855 242</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-warm flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-crimson-deep">mail</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">Email Us</h3>
                  <p className="text-on-surface-variant">info@homagamamv.lk<br />admissions@homagamamv.lk</p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-md border border-outline-variant/20 mt-8">
                <div className="h-48 sm:h-64 bg-surface-container-high flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-primary text-5xl mb-2">location_on</span>
                    <p className="text-on-surface-variant text-sm">Map loads here</p>
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Homagama+Maha+Vidyalaya" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-3 bg-white hover:bg-surface-container-low transition-colors">
                  <span className="text-sm font-medium text-on-surface">Find us on Google Maps</span>
                  <span className="material-symbols-outlined text-primary text-lg">open_in_new</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alumni Network CTA */}
      <section className="py-12 sm:py-16 px-6">
        <div className="max-w-4xl mx-auto bg-primary rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 skew-x-12 translate-x-12" />
          <div className="relative z-10 flex-1">
            <h2 className="font-headline text-3xl text-white font-bold mb-4">Join our prestigious alumni network</h2>
            <p className="text-white/80 mb-6">Are you a past student of Homagama Maha Vidyalaya? Connect with your roots and join our community of global leaders.</p>
            <div className="flex flex-wrap gap-4">
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">Register as Alumni</button>
              <button className="bg-yellow-warm text-crimson-deep px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all">View Directory</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
