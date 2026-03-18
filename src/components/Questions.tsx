import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../data/questions";
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";

interface QuestionsProps {
  onComplete: (answers: Record<number, string>) => void;
  onBack: () => void;
}

export function Questions({ onComplete, onBack }: QuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1);
      setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 300);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="flex flex-col h-full min-h-[100dvh] w-full max-w-md mx-auto relative p-6">
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-8">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-xs font-mono text-neon-green tracking-widest">
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
        <motion.div 
          className="h-full bg-neon-green shadow-[0_0_10px_#39FF14]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full space-y-8"
          >
            <h2 className="text-2xl font-bold leading-relaxed text-white">
              {currentQuestion.text}
            </h2>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full p-4 text-left rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200",
                    "hover:bg-white/10 hover:border-neon-green/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]",
                    answers[currentQuestion.id] === option && "bg-neon-green/20 border-neon-green text-neon-green"
                  )}
                >
                  <span className="text-sm font-medium tracking-wide">
                    {option}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
