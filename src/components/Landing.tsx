import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[100dvh] p-6 text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.15),_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center gap-8 max-w-md w-full"
      >
        <div className="space-y-4">
          <motion.h1 
            className="text-5xl font-black tracking-tighter text-white leading-[0.9]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            FATHER'S<br />
            <span className="text-neon-green">DAY</span><br />
            WRAPPED
          </motion.h1>
          
          <motion.p 
            className="text-gray-400 text-sm font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            簡単な質問に答えて、<br />お父さんとの関係を振り返ろう
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all duration-300"
        >
          はじめる
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
      
      {/* Decorative footer */}
      <motion.div 
        className="absolute bottom-8 text-[10px] text-gray-600 uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        2026 Edition
      </motion.div>
    </div>
  );
}
