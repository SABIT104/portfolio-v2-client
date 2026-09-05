/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // stiffness বাড়িয়ে ১০০ করা হয়েছে যাতে স্ক্রলিং ল্যাগ না করে
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== "undefined") {
        setIsVisible(window.scrollY > 300);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-28 right-6 md:right-10 lg:bottom-10 z-[100]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative flex items-center justify-center cursor-pointer select-none"
          >
            <svg
              viewBox="0 0 100 100"
              className="-rotate-90 w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="rgba(21, 22, 14, 0.8)"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="6"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#c7d300"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>

            <motion.div
              className="absolute text-white"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={20} className="md:w-6 md:h-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}