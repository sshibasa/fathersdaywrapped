import { useState } from "react";
import { Landing } from "./components/Landing";
import { Questions } from "./components/Questions";
import { Loading } from "./components/Loading";
import { Results } from "./components/Results";
import { AnimatePresence, motion } from "framer-motion";

type Step = "landing" | "questions" | "loading" | "results";

function App() {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleStart = () => {
    setStep("questions");
  };

  const handleQuestionsComplete = (finalAnswers: Record<number, string>) => {
    setAnswers(finalAnswers);
    setStep("loading");
    // Simulate loading
    setTimeout(() => {
      setStep("results");
    }, 3000);
  };

  const handleRestart = () => {
    setStep("landing");
    setAnswers({});
  };

  const handleBack = () => {
    setStep("landing");
  };

  return (
    <div className="bg-black min-h-screen text-white font-yu-gothic overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full absolute inset-0"
          >
            <Landing onStart={handleStart} />
          </motion.div>
        )}

        {step === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full absolute inset-0"
          >
            <Questions onComplete={handleQuestionsComplete} onBack={handleBack} />
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full absolute inset-0 z-50"
          >
            <Loading />
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            <Results answers={answers} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;