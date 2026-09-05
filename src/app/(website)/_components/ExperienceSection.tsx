/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: response, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/experience/getallexp`);
      return res.json();
    },
  });

  const experiences = response?.data?.experiences || [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!experiences.length) return;
    const idx = Math.min(
      experiences.length - 1,
      Math.max(0, Math.floor(latest * experiences.length + 0.15))
    );
    setActiveIndex(idx);
  });

  return (
    <section
      className="bg-[#0f100a] overflow-hidden selection:bg-[#00f2fe] selection:text-black min-h-screen relative py-20"
      ref={containerRef}
    >
      {/* Background Soft Lime Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c7d300]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-20">
        <div className="text-left">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 md:whitespace-nowrap uppercase">
            MY <span className="text-[#c7d300]">EXPERIENCE</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg max-w-4xl leading-relaxed">
            A showcase of my professional journey and hands-on experience in
            building real-world applications. I focus on delivering scalable,
            high-performance, and user-centric solutions while maintaining clean
            code and efficiency.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Background Track Line (Dashed) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full hidden md:block border-l border-dashed border-white/15 z-0" />

        {/* Animated Straight Vertical Glowing Lime Neon Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-1/2 transform -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-[#c7d300] via-[#e2ec38] to-[#9ea900] origin-top hidden md:block shadow-[0_0_20px_#c7d300] rounded-full z-10"
        />

        <div className="space-y-16 md:space-y-24">
          {(!isLoading && isMounted) ? (
            experiences.map((exp: any, index: number) => {
              const isActive = index === activeIndex;
              const isRight = (exp.side || "").toLowerCase() === "right";

              const renderCard = () => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.15 }}
                  className={`p-6 sm:p-8 bg-[#13140c]/95 rounded-2xl transition-colors transition-shadow duration-200 relative z-20 group border-2 ${
                    isActive
                      ? "border-[#c7d300] shadow-[0_0_30px_rgba(199,211,0,0.18)] bg-[#15170f]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                      <h3
                        className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                          isActive ? "text-[#c7d300]" : "text-white group-hover:text-[#c7d300]"
                        }`}
                      >
                        {exp.position}
                      </h3>
                      <p className="text-slate-300 font-semibold text-sm mt-1">{exp.company}</p>
                    </div>
                    {exp.duration && (
                      <span className="shrink-0 px-3.5 py-1 bg-[#c7d300]/15 text-[#c7d300] border border-[#c7d300]/30 text-xs rounded-full font-bold uppercase tracking-wider shadow-sm">
                        {exp.duration}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-xs text-slate-400 mb-5 leading-relaxed italic">{exp.description}</p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2.5">
                      {exp.achievements.map((point: string, i: number) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                              isActive ? "bg-[#c7d300]" : "bg-[#c7d300]/50"
                            }`}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );

              return (
                <div
                  key={exp._id || index}
                  className="relative flex items-center justify-between md:flex-row flex-col"
                >
                  {/* --- LEFT SIDE CONTAINER --- */}
                  <div className={`md:w-[45%] w-full ${isRight ? "hidden md:block" : ""}`}>
                    {!isRight && renderCard()}
                  </div>

                  {/* --- MIDDLE CIRCLE --- */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-30">
                    <div
                      className={`w-12 h-12 rounded-full bg-[#0f100a] border-2 transition-colors transition-shadow duration-200 flex items-center justify-center ${
                        isActive
                          ? "border-[#c7d300] shadow-[0_0_20px_rgba(199,211,0,0.5)] bg-[#c7d300]/10"
                          : "border-white/15"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full transition-colors transition-shadow duration-200 ${
                          isActive
                            ? "bg-[#c7d300] shadow-[0_0_15px_#c7d300]"
                            : "bg-[#c7d300]/40"
                        }`}
                      />
                    </div>
                  </div>

                  {/* --- RIGHT SIDE CONTAINER --- */}
                  <div className={`md:w-[45%] w-full mt-8 md:mt-0 ${!isRight ? "hidden md:block" : ""}`}>
                    {isRight && renderCard()}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-96 flex items-center justify-center text-slate-500">
              Loading experiences...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;