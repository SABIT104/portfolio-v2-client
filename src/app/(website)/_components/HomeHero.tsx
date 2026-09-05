/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CirclePlay, Download, Monitor, Sparkles, X } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

type HeroData = {
  backgroundImage?: string;
  overlayOpacity?: number;
  typingAnimationLines?: string[];
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  primaryBtnText?: string;
  cvFileUrl?: string;
  secondaryBtnText?: string;
  videoUrl?: string;
};

const DUMMY_CV_URL =
  "http://localhost:5001/uploads/resumes/saimun_sabit_resume.pdf";
const DUMMY_INTRO_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const DEFAULT_HERO_DATA: Required<HeroData> = {
  backgroundImage: "/images/heroImage.png",
  overlayOpacity: 25,
  typingAnimationLines: [
    "WEB DEVELOPER & SEO EXPERT",
    "HIGH IMPACT WEB APP SOLUTIONS",
    "GOOGLE #1 RANKING STRATEGY",
  ],
  titleLine1: "HI, I AM SAIMUN SABIT",
  titleLine2: "WEB DEVELOPER & SEO EXPERT",
  description:
    "I am Saimun Sabit, a passionate Web Developer and SEO Expert. I build high-performance, responsive web applications and optimize them to rank #1 on search engines.",
  primaryBtnText: "Download CV",
  cvFileUrl: "",
  secondaryBtnText: "Watch Video",
  videoUrl: "",
};

const normalizeHero = (hero: HeroData): Required<HeroData> => ({
  backgroundImage: hero.backgroundImage || "/images/heroImage.png",
  overlayOpacity:
    typeof hero.overlayOpacity === "number"
      ? Math.min(Math.max(hero.overlayOpacity, 0), 100)
      : 25,
  typingAnimationLines:
    Array.isArray(hero.typingAnimationLines) && hero.typingAnimationLines.length
      ? hero.typingAnimationLines
      : DEFAULT_HERO_DATA.typingAnimationLines,
  titleLine1: hero.titleLine1 || DEFAULT_HERO_DATA.titleLine1,
  titleLine2: hero.titleLine2 || DEFAULT_HERO_DATA.titleLine2,
  description: hero.description || DEFAULT_HERO_DATA.description,
  primaryBtnText: hero.primaryBtnText || DEFAULT_HERO_DATA.primaryBtnText,
  cvFileUrl: hero.cvFileUrl || "",
  secondaryBtnText: hero.secondaryBtnText || DEFAULT_HERO_DATA.secondaryBtnText,
  videoUrl: hero.videoUrl || "",
});

function HeroActions({
  primaryText,
  secondaryText,
  variant,
  cvUrl = DUMMY_CV_URL,
  onWatchVideo,
}: {
  primaryText: string;
  secondaryText: string;
  variant: "mobile" | "lamp" | "desktop";
  cvUrl?: string;
  onWatchVideo: () => void;
}) {
  if (variant === "mobile") {
    return (
      <div className="mt-8 flex w-full max-w-[290px] flex-col gap-3.5">
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="Saimun_Sabit_Resume.pdf"
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-[#c7d300] text-[12px] font-black uppercase text-black shadow-[0_12px_28px_rgba(199,211,0,0.18)] transition-transform active:scale-95 cursor-pointer"
        >
          {primaryText}
          <Download size={18} />
        </a>

        <button
          type="button"
          onClick={onWatchVideo}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/[0.06] text-[12px] font-bold uppercase text-white/90 backdrop-blur-md transition-all active:bg-white active:text-black cursor-pointer"
        >
          <CirclePlay size={18} className="text-[#c7d300]" />
          {secondaryText}
        </button>
      </div>
    );
  }

  if (variant === "lamp") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-10 w-full max-w-xs sm:max-w-none">
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="Saimun_Sabit_Resume.pdf"
          className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-[#c7d300] text-black text-xs sm:text-sm font-bold uppercase rounded-sm hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {primaryText}
          <Download size={18} />
        </a>
        <button
          type="button"
          onClick={onWatchVideo}
          className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 border border-[#c7d300] text-white text-xs sm:text-sm font-bold uppercase rounded-sm hover:bg-[#c7d300] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CirclePlay size={18} className="text-[#c7d300]" />
          {secondaryText}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-6 sm:mt-10 w-full sm:w-auto">
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        download="Saimun_Sabit_Resume.pdf"
        className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-[#c7d300] text-black text-xs md:text-sm font-black uppercase rounded-sm hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(199,211,0,0.2)]"
      >
        {primaryText}
        <Download size={18} />
      </a>
      <button
        type="button"
        onClick={onWatchVideo}
        className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 border border-[#c7d300] text-white text-xs md:text-sm font-black uppercase rounded-sm hover:bg-[#c7d300] hover:text-black transition-all flex items-center justify-center gap-3 cursor-pointer"
      >
        <CirclePlay size={18} className="text-[#c7d300]" />
        {secondaryText}
      </button>
    </div>
  );
}

function IntroVideoModal({
  isOpen,
  onClose,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}) {
  const activeVideoUrl = videoUrl && videoUrl.trim() !== "" ? videoUrl : DUMMY_INTRO_VIDEO_URL;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/").split("&")[0] + "?autoplay=1";
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const isYouTube = activeVideoUrl.includes("youtube.com") || activeVideoUrl.includes("youtu.be");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="intro-video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-4xl overflow-hidden rounded-md border border-[#c7d300]/25 bg-[#030617] shadow-[0_0_60px_rgba(199,211,0,0.16)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c7d300]">
                  Intro Video
                </p>
                <h3 className="mt-1 text-base font-bold uppercase text-white md:text-lg">
                  Saimun Sabit
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close intro video"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#c7d300]/60 hover:text-[#c7d300]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative bg-black aspect-video w-full">
              {isYouTube ? (
                <iframe
                  src={getEmbedUrl(activeVideoUrl)}
                  title="Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomeHero() {
  const [viewMode, setViewMode] = useState<"api" | "lamp">("api");
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Auto-switch viewMode every 7 seconds continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setViewMode((prev) => (prev === "api" ? "lamp" : "api"));
    }, 7000);
    return () => clearInterval(timer);
  }, [viewMode]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data: response } = useQuery({
    queryKey: ["heroData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/home/activeHero`,
      );
      if (!res.ok) return {};
      return res.json();
    },
  });

  const { data: resumeResponse } = useQuery({
    queryKey: ["activeResume"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/resume/activeresume`,
      );
      return res.json();
    },
  });

  const hero = normalizeHero(response?.data || {});
  const activeResumeData = resumeResponse?.data;

  const rawHeroCv = response?.data?.cvFileUrl;
  const rawResumeCv = activeResumeData?.resumeUrl;

  const cvUrl =
    (rawResumeCv && rawResumeCv.trim() !== "" && !rawResumeCv.includes("raw/upload"))
      ? rawResumeCv
      : (rawHeroCv && rawHeroCv.trim() !== "" && !rawHeroCv.includes("raw/upload"))
      ? rawHeroCv
      : DUMMY_CV_URL;

  const sequence = hero.typingAnimationLines.flatMap((line) => [line, 2200]);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0b07] overflow-hidden flex items-center justify-center font-sans">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.backgroundImage}
          alt="Saimun Sabit Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: hero.overlayOpacity / 100 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b07] via-[#0a0b07]/40 to-transparent" />
      </div>

      {/* Icon-Only Top-Right Interface Mode Switcher */}
      <div className="absolute top-5 right-6 sm:top-6 sm:right-12 z-40 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl">
        <button
          type="button"
          title="Classic Hero Mode"
          onClick={() => setViewMode("api")}
          className={`p-2.5 rounded-full transition-all cursor-pointer ${
            viewMode === "api"
              ? "bg-[#c7d300] text-black shadow-[0_0_15px_rgba(199,211,0,0.6)] scale-110"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          <Monitor size={18} />
        </button>
        <button
          type="button"
          title="Lamp Glow Mode"
          onClick={() => setViewMode("lamp")}
          className={`p-2.5 rounded-full transition-all cursor-pointer ${
            viewMode === "lamp"
              ? "bg-[#c7d300] text-black shadow-[0_0_15px_rgba(199,211,0,0.6)] scale-110"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sparkles size={18} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "lamp" ? (
          <motion.div
            key="lamp-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center z-10"
          >
            <LampContainer className="pt-20">
              <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                className="bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-4xl font-black tracking-tight text-transparent md:text-7xl uppercase"
              >
                {hero.titleLine1} <br />
                <span className="text-[#c7d300]">{hero.titleLine2}</span>
              </motion.h1>

              <p className="mt-4 text-center text-slate-400 text-sm md:text-lg max-w-2xl font-medium">
                {hero.description}
              </p>

              <HeroActions
                primaryText={hero.primaryBtnText || "Download CV"}
                secondaryText={hero.secondaryBtnText || "Watch Video"}
                variant="lamp"
                cvUrl={cvUrl}
                onWatchVideo={() => setIsVideoModalOpen(true)}
              />
            </LampContainer>
          </motion.div>
        ) : (
          <motion.div
            key="api-view"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 28, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="relative z-10 text-white text-left max-w-xl md:max-w-2xl lg:max-w-3xl ml-6 sm:ml-12 md:ml-20 lg:ml-28 xl:ml-36 mr-auto h-full flex flex-col justify-center pt-24 md:pt-0"
          >
            <div className="mb-3 md:mb-4">
              {sequence.length > 0 && (
                <TypeAnimation
                  sequence={sequence}
                  wrapper="p"
                  speed={50}
                  repeat={Infinity}
                  className="text-sm md:text-2xl font-bold text-[#c7d300] uppercase tracking-wider font-mono drop-shadow-[0_0_8px_rgba(199,211,0,0.5)]"
                />
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase leading-[1.05] mb-2 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {hero.titleLine1}
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase text-[#c7d300] tracking-tight drop-shadow-[0_0_20px_rgba(199,211,0,0.3)]">
              {hero.titleLine2}
            </h1>

            <div className="mt-5 md:mt-8 text-xs sm:text-sm md:text-lg text-white/80 w-full md:w-[85%] leading-relaxed whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {hero.description}
            </div>

            <HeroActions
              primaryText={hero.primaryBtnText || "Download CV"}
              secondaryText={hero.secondaryBtnText || "Watch Video"}
              variant={isMobile ? "mobile" : "desktop"}
              cvUrl={cvUrl}
              onWatchVideo={() => setIsVideoModalOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <IntroVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={hero.videoUrl || activeResumeData?.videoUrl}
      />

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

export default HomeHero;
