"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [text, setText] = useState("");
  const name = "S@BIT";
  const typingSpeed = 70; // একটু ফাস্ট টাইপিং আরও প্রফেশনাল লাগে

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(name.substring(0, i));
      i++;
      if (i > name.length) {
        clearInterval(interval);
        setTimeout(() => {
          onFinished();
        }, 1200);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [onFinished, name]);

  return (
    <motion.div
      // হোয়াইট স্ক্রিন এড়াতে এই স্টাইলগুলো জরুরি
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f100a]"
      style={{ backgroundColor: "#0f100a" }} // Force dark background
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-[300px] h-[300px] bg-[#c7d300]/5 blur-[120px] rounded-full" />

      <div className="relative flex flex-col items-center">
        {/* Main Text Area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.15em] text-white uppercase flex items-center">
            <span className="relative">
              {text}
              {/* গ্লো ইফেক্ট টেক্সটের পেছনে */}
              <span className="absolute inset-0 text-[#c7d300]/20 blur-sm">
                {text}
              </span>
            </span>

            {/* Custom Cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear", // এখানে 'linear' অথবা 'easeInOut' ব্যবহার করুন
              }}
              className="inline-block w-[4px] h-10 md:h-16 bg-[#c7d300] ml-4 shadow-[0_0_15px_#c7d300]"
            />
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="relative mt-8 w-64 h-[2px] bg-white/5 overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c7d300] to-transparent"
          />
        </div>

        {/* Loading Percentage or Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-[10px] font-bold tracking-[0.5em] text-[#c7d300]/50 uppercase"
        >
          Portfolio Loading
        </motion.p>
      </div>
    </motion.div>
  );
}
