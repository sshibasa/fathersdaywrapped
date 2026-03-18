import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Mic, Check } from "lucide-react";
import { cn } from "../lib/utils";

interface ResultsProps {
  answers: Record<number, string>;
  onRestart: () => void;
}

export function Results({ answers, onRestart }: ResultsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const totalSlides = 4;

  // Auto-advance slides
  useEffect(() => {
    if (currentSlide < totalSlides - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
      }, 5000); // 5 seconds per slide
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const shareResult = () => {
    navigator.clipboard.writeText("My Father's Day Wrapped 2026. #FathersDayWrapped");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const slides = [
    // Slide 0: Intro
    {
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold tracking-tighter"
          >
            私たちについての<br />
            <span className="text-neon-green">気持ち</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-sm"
          >
            あなたの回答から、<br />
            お父さんとの今の関係が見えてきました。
          </motion.p>
        </div>
      ),
      bg: "bg-black"
    },
    // Slide 1: Insights 1
    {
      content: (
        <div className="flex flex-col justify-center h-full px-8 space-y-8">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-2"
          >
            <span className="text-xs text-neon-green font-mono uppercase tracking-widest">Support</span>
            <h3 className="text-3xl font-bold leading-tight">
              今年は、<br />
              <span className="text-neon-green">"{answers[1]}"</span><br />
              ような一年でした。
            </h3>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
          >
            <p className="text-lg text-gray-200">
              気づいたこと：<br />
              <span className="font-bold text-white">"{answers[2]}"</span>
            </p>
          </motion.div>
        </div>
      ),
      bg: "bg-gradient-to-br from-black to-gray-900"
    },
    // Slide 2: Insights 2
    {
      content: (
        <div className="flex flex-col justify-center h-full px-8 space-y-8">
           <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-300">
              ふとした瞬間に...
            </h3>
            <div className="text-4xl font-black text-white leading-none tracking-tighter">
              {answers[3]}
            </div>
            <p className="text-sm text-gray-500">に一番近く感じていました。</p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative p-8 mt-8 border-l-4 border-neon-green bg-white/5"
          >
             <p className="text-xl italic text-gray-300 font-serif">
              "{answers[4]}"
            </p>
            <span className="absolute bottom-2 right-2 text-[10px] text-gray-600">UNSPOKEN WORDS</span>
          </motion.div>
        </div>
      ),
      bg: "bg-black"
    },
    // Slide 3: Final & CTA
    {
      content: (
        <div className="flex flex-col items-center justify-between h-full py-12 px-6">
          <div className="space-y-6 text-center mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs font-mono text-gray-500 mb-2 block">SUMMARY</span>
              <h2 className="text-3xl font-bold">
                お父さんは、<br />
                <span className="text-neon-green text-4xl block mt-2">{answers[5]}</span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto"
            >
              言葉にしてこなかった想いが、<br />
              少しだけ見えてきた一年でした。
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full space-y-4"
          >
            <button className="w-full py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
              <Mic className="w-5 h-5" />
              音声で気持ちを伝える
            </button>
            
            <button 
              onClick={shareResult}
              className="w-full py-4 border border-white/20 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              {isCopied ? <Check className="w-5 h-5 text-neon-green" /> : <Share2 className="w-5 h-5" />}
              {isCopied ? "コピーしました" : "結果をシェアする"}
            </button>
            
            <button 
              onClick={onRestart}
              className="text-xs text-gray-600 underline hover:text-gray-400"
            >
              もう一度はじめる
            </button>
          </motion.div>
        </div>
      ),
      bg: "bg-gradient-to-t from-neon-green/10 to-black"
    }
  ];

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden bg-black font-yu-gothic" onClick={nextSlide}>
      {/* Progress Bars for Stories */}
      <div className="absolute top-4 left-0 right-0 z-50 flex gap-1 px-2">
        {slides.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
             <motion.div 
               className={cn("h-full bg-white", idx < currentSlide ? "w-full" : "w-0")}
               animate={{ width: idx === currentSlide ? "100%" : idx < currentSlide ? "100%" : "0%" }}
               transition={{ duration: idx === currentSlide ? 5 : 0, ease: "linear" }}
             />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={cn("h-full w-full", slides[currentSlide].bg)}
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
