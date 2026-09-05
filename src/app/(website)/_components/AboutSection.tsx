/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// ─── CountUpNumber (Sora Font Optimized) ───────────────────────────
function CountUpNumber({ value, delay }: { value: string; delay: number }) {
  const num = parseInt(value) || 0;
  const suffix = value.replace(/\d/g, "");
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * num));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, num, delay]);

  return (
    <span
      ref={ref}
      className="text-3xl md:text-5xl font-extrabold text-white mt-1 tabular-nums"
    >
      {display}
      {suffix}
    </span>
  );
}

// ─── TiltImage ───────────────────────────────
function TiltImage({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };

  const rotateX = useSpring(
    useTransform(rawY, [-1, 1], [12, -12]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(rawX, [-1, 1], [-12, 12]),
    springConfig,
  );
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    scale.set(1.04);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      className="relative flex-shrink-0 cursor-pointer"
    >
      <div
        className="absolute rounded-full z-0"
        style={{
          inset: "-6px",
          background: "conic-gradient(from 0deg, #c7d300, #a5b4fc, #c7d300)",
          animation: "spin-slow 4s linear infinite",
        }}
      />
      <div
        className="absolute rounded-full z-10"
        style={{
          inset: "-3px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden z-20 shadow-2xl border border-white/10">
        <Image
          src={image || "/images/saimun-sabit.jpg"}
          alt="Saimun Sabit Profile Image"
          fill
          className="object-cover object-top"
        />
      </div>
    </motion.div>
  );
}

const DEFAULT_ABOUT = {
  titleLine1: "Hi, I am Saimun Sabit",
  titleLine2: "Web Developer & SEO Expert",
  profileImage: "/images/saimun-sabit.jpg",
  typewriterStrings: [
    "Building High-Performance Websites 🚀",
    "Rank #1 on Google with Technical SEO 📈",
    "Driving Organic Growth & Traffic ✨",
    "Full-Stack Web Development 💻",
  ],
  descriptions: [
    "I am Saimun Sabit, a results-driven Web Developer and SEO Expert. I specialize in building fast, modern, and responsive web applications while engineering advanced search engine optimization (SEO) strategies that drive organic traffic and maximize visibility.",
  ],
  stats: [
    { value: "Years Experience", label: "4+" },
    { value: "Projects Completed", label: "50+" },
    { value: "SEO Rankings", label: "100+" },
    { value: "Client Satisfaction", label: "99%" },
  ],
  ctaText: "Get In Touch",
};

// ─── Main Section ─────────────────────────────────────────────
export default function AboutSection() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["activeAbout"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/about/getActiveAbout`,
      );
      return res.json();
    },
  });

  if (isLoading) return <div className="w-full h-96 bg-[#15160e]" />;

  const rawData = response?.data;
  const aboutData = {
    titleLine1: rawData?.titleLine1 || DEFAULT_ABOUT.titleLine1,
    titleLine2: rawData?.titleLine2 || DEFAULT_ABOUT.titleLine2,
    profileImage: rawData?.profileImage || DEFAULT_ABOUT.profileImage,
    typewriterStrings:
      Array.isArray(rawData?.typewriterStrings) && rawData.typewriterStrings.length > 0
        ? rawData.typewriterStrings
        : DEFAULT_ABOUT.typewriterStrings,
    descriptions:
      Array.isArray(rawData?.descriptions) && rawData.descriptions.length > 0
        ? rawData.descriptions
        : DEFAULT_ABOUT.descriptions,
    stats:
      Array.isArray(rawData?.stats) && rawData.stats.length > 0
        ? rawData.stats
        : DEFAULT_ABOUT.stats,
    ctaText: rawData?.ctaText || DEFAULT_ABOUT.ctaText,
  };

  const typewriterSequence = aboutData.typewriterStrings.flatMap(
    (str: string) => [str, 2000],
  );

  return (
    <section id="about" className="w-full bg-[#15160e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Profile Image Section */}
        <div className="relative flex items-center gap-6 flex-shrink-0">
          <div className="hidden md:flex flex-col items-center self-stretch py-2">
            <div className="w-[6px] h-[6px] rounded-full bg-white/20" />
            <div className="w-[1px] flex-1 bg-gradient-to-b from-white/20 via-white/10 to-transparent my-2" />
          </div>
          <TiltImage image={aboutData.profileImage} />
          <span
            className="hidden md:block absolute -left-10 bottom-14 text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold select-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            My Story
          </span>
        </div>

        {/* Content Section */}
        <div className="flex-1 text-center md:text-left">
          <div className="min-h-[24px] mb-4">
            <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase font-extrabold">
              {typewriterSequence.length > 0 && (
                <TypeAnimation
                  sequence={typewriterSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-[#c7d300]"
                />
              )}
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
            {aboutData.titleLine1}
            <br className="hidden md:block" />
            <span className="text-white/80"> {aboutData.titleLine2}</span>
          </h2>

          <div className="space-y-5 max-w-4xl mx-auto md:mx-0">
            {aboutData.descriptions.map((desc: string, index: number) => (
              <p
                key={index}
                className="text-white/60 text-sm md:text-base leading-relaxed font-normal"
              >
                {desc}
              </p>
            ))}
          </div>

          <div className="flex justify-center md:justify-start">
            <a href="#contact" className="w-full md:w-[220px]">
              <button className="w-full h-[60px] md:h-[68px] bg-[#c7d300] text-black text-[12px] md:text-[13px] border-2 border-[#c7d300] uppercase font-black hover:bg-transparent hover:text-white duration-500 flex items-center justify-center gap-3 mt-10 transition-all active:scale-95 group">
                {aboutData.ctaText}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="relative border-y border-white/5 bg-white/[0.02] py-16 md:py-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
          {aboutData.stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#c7d300] font-black">
                {stat.value || stat.label}
              </span>
              <CountUpNumber value={stat.label || stat.value} delay={i * 0.1} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}