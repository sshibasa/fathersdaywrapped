import { motion } from "framer-motion";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-full bg-black text-neon-green font-mono">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-6xl font-bold tracking-tighter"
      >
        ANALYZING
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="h-1 bg-neon-green mt-8"
      />
      <p className="mt-4 text-xs text-gray-500 animate-pulse">
        Generating your relationship wrapped...
      </p>
    </div>
  );
}
