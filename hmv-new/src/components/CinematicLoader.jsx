import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CinematicLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
          style={{ perspective: 1000 }}
        >
          <motion.div
            initial={{ translateZ: -1000, rotateX: 20, opacity: 0 }}
            animate={{ translateZ: 0, rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center p-4 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <img
                src="https://ik.imagekit.io/5fpzilm1y/logo.png?updatedAt=1747557297487"
                alt="HMV Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <div className="h-1 w-48 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={!loading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
