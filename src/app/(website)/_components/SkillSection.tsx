"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Skill {
  _id: string;
  name: string;
  image: string; // API থেকে আসা ইমেজ URL
  color: string;
  description: string; // আপনার কোডে এটি 'tooltip' হিসেবে ছিল
  proficiency: number; // আপনার কোডে এটি 'level' হিসেবে ছিল
}

const SKILLS_PER_PAGE = 10;

function Tooltip({ skill, visible }: { skill: Skill; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute -top-4 left-1/2 z-50 w-56 -translate-x-1/2 -translate-y-full pointer-events-none"
        >
          <div
            className="relative rounded-xl border bg-[#15160e]/95 backdrop-blur-md p-4 shadow-2xl"
            style={{
              borderColor: `${skill.color}50`,
              boxShadow: `0 10px 30px -10px ${skill.color}30`,
            }}
          >
            <p
              className="font-bold text-sm uppercase tracking-widest mb-1"
              style={{ color: skill.color }}
            >
              {skill.name}
            </p>
            <p className="text-slate-300 text-[12px] leading-relaxed mb-3">
              {skill.description}
            </p>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-500 uppercase">
                Proficiency
              </span>
              <span
                className="text-[10px] font-bold"
                style={{ color: skill.color }}
              >
                {skill.proficiency}%
              </span>
            </div>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
              style={{ borderTopColor: `${skill.color}50` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group flex flex-col items-center justify-center gap-4 p-6 cursor-pointer transition-all duration-500 h-48 w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-0 border transition-all duration-500 ${
          hovered
            ? "border-[#c7d300]/40 bg-white/5 shadow-xl shadow-[#c7d300]/5"
            : "border-white/5 bg-white/[0.02]"
        }`}
      />
      <Tooltip skill={skill} visible={hovered} />

      {/* Icon Area - SVG এর বদলে API Image ব্যবহার করা হয়েছে */}
      <div
        className={`relative z-10 w-16 h-16 transition-all duration-500 ${hovered ? "scale-110 -translate-y-2" : "scale-100"}`}
      >
        <Image
          src={skill.image}
          alt={skill.name}
          fill
          className="object-contain"
        />
      </div>

      <span
        className={`relative z-10 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${hovered ? "text-[#c7d300]" : "text-slate-500"}`}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillSection() {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: response, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/skill/getallSkill?limit=1000`,
      ); // আপনার API URL দিন
      return res.json();
    },
  });

  const skills: Skill[] = response?.data?.skills || [];
  const totalPages = Math.ceil(skills.length / SKILLS_PER_PAGE);
  const displayedSkills = skills.slice(
    currentPage * SKILLS_PER_PAGE,
    (currentPage + 1) * SKILLS_PER_PAGE,
  );

  if (isLoading) return <div className="lg:min-h-[800px] bg-[#15160e]" />;

  return (
    <section className="relative w-full lg:min-h-[800px] bg-[#15160e] flex items-center justify-center overflow-hidden lg:py-24 px-6">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#c7d300]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#c7d300]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mt-10 lg:mt-0">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              MY <span className="text-[#c7d300]">SKILLS</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-4xl leading-relaxed">
              I specialize in building modern web applications using
              cutting-edge technologies. Focused on performance, accessibility,
              and user-centric design.
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-full border border-white/10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`transition-all duration-500 rounded-sm ${
                    currentPage === i
                      ? "w-8 h-1.5 bg-[#c7d300] shadow-[0_0_10px_#c7d300]"
                      : "w-4 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 min-h-[400px] content-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="contents"
            >
              {displayedSkills.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-[#c7d300]/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#c7d300]/60">
            Professional Tech Stack
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#c7d300]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
