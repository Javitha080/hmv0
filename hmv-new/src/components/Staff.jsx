import { motion } from "framer-motion";
import { Mail, Globe, Phone } from "lucide-react";

export default function Staff() {
  const staffMembers = [
    {
      name: "Mrs. N.N.Abeysekera",
      title: "Principal",
      qualifications: "BED / PGDE",
      description: "With 25+ years of experience, Mrs. Abeysekera leads with vision and dedication to educational excellence.",
      image: "https://ik.imagekit.io/5fpzilm1y/482026404_122173863980268549_2475517132003996885_n-modified-removebg-preview-modified.png",
      color: "primary"
    },
    {
      name: "Mrs. Ishanka Hettiarachchi",
      title: "Vice Principal",
      qualifications: "BA / PGDE",
      description: "Specializing in student welfare and academic development with a focus on holistic education.",
      image: "https://ik.imagekit.io/5fpzilm1y/470208976_122161865672268549_3749353031114916278_n-modified-removebg-preview-modified.png",
      color: "secondary"
    },
    {
      name: "Mrs. M.K.N.K.De Silva",
      title: "Head of Science",
      qualifications: "BSC / DSM",
      description: "Leading our award-winning science department with innovative teaching methods and research initiatives.",
      image: "https://ik.imagekit.io/5fpzilm1y/470218004_122161865762268549_191957469568571903_n-removebg-preview-modified.png",
      color: "accent"
    }
  ];

  return (
    <section id="staff" className="py-24 relative bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%239C92AC\\' fill-opacity=\\'0.4\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-2">Our Leadership</h2>
            <h3 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-4">Meet Our Educational Leaders</h3>
            <div className="h-1 w-20 mx-auto bg-primary rounded-full mb-6"></div>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {staffMembers.map((staff, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className={`group glass-card rounded-3xl p-8 relative overflow-hidden bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-white/5 shadow-xl ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Colorful gradient blob behind image */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-${staff.color}/10 rounded-full blur-[80px] -z-10 group-hover:bg-${staff.color}/20 transition-colors duration-500`}></div>
              
              <div className="flex flex-col items-center text-center h-full">
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-${staff.color}/20 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500`}></div>
                  <img 
                    src={staff.image} 
                    alt={staff.name} 
                    className={`w-40 h-40 object-cover rounded-full border-4 border-background shadow-lg relative z-10 group-hover:scale-105 transition-transform duration-500 ring-2 ring-${staff.color}/50 ring-offset-4 ring-offset-background`}
                  />
                  <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-${staff.color} text-white text-xs font-bold px-4 py-1.5 rounded-full z-20 shadow-md whitespace-nowrap`}>
                    {staff.title}
                  </div>
                </div>

                <div className="mt-4 flex-grow">
                  <h4 className="text-2xl font-bold text-foreground mb-1 font-playfair">{staff.name}</h4>
                  <p className="text-sm font-medium text-muted-foreground mb-4">{staff.qualifications}</p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed max-w-sm mx-auto">
                    {staff.description}
                  </p>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-border/50 w-full justify-center">
                  {[Mail, Globe, Phone].map((Icon, i) => (
                    <a key={i} href="#" className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-${staff.color} hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
