import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 sm:p-12 shadow-sm"
          >
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-3">
              Send a Message
            </h2>
            <p className="text-on-surface-variant mb-8">
              Have a question or feedback? Our administrative team is ready to assist you.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Admissions, Alumni, General Inquiry"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all flex items-center gap-2"
              >
                Send Inquiry <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Visit Us */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-warm flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-crimson-deep">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-1">Visit Us</h3>
                <p className="text-on-surface-variant">Highlevel Road,<br />Homagama, 10200<br />Sri Lanka</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-warm flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-crimson-deep">call</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-1">Call Us</h3>
                <p className="text-on-surface-variant">General Office: +94 11 2855 241<br />Principal's Office: +94 11 2855 242</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-warm flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-crimson-deep">mail</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-1">Email Us</h3>
                <p className="text-on-surface-variant">info@homagamamv.lk<br />admissions@homagamamv.lk</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden shadow-md border border-outline-variant/20 mt-8">
              <div className="h-48 sm:h-64 bg-surface-container-high flex items-center justify-center">
                <div className="text-center">
                  <span className="material-symbols-outlined text-primary text-5xl mb-2">location_on</span>
                  <p className="text-on-surface-variant text-sm">Map loads here</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Homagama+Maha+Vidyalaya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-3 bg-white hover:bg-surface-container-low transition-colors"
              >
                <span className="text-sm font-medium text-on-surface">Find us on Google Maps</span>
                <span className="material-symbols-outlined text-primary text-lg">open_in_new</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
