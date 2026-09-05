/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Compass,
  Search,
  FileSpreadsheet,
  Palette,
  Code2,
  Zap,
  TrendingUp,
  Target,
  Rocket,
  LineChart,
  Workflow,
  ArrowDown,
  Layers,
  Presentation,
  LayoutGrid,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  tags: string[];
}

const iconMap: Record<string, any> = {
  Compass,
  Search,
  FileSpreadsheet,
  Palette,
  Code2,
  Zap,
  TrendingUp,
  Target,
  Rocket,
  LineChart,
  Workflow,
};

const fallbackSteps: ProcessStep[] = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Understand the Business & Goals",
    subtitle: "Discovery & Requirements Gathering",
    description: "Deep-dive into client objectives, target demographics, brand identity, and project KPIs to establish a solid roadmap.",
    icon: Compass,
    tags: ["Business Model", "KPIs", "User Persona"],
  },
  {
    number: "02",
    phase: "RESEARCH",
    title: "Data + Keywords + Competitors Audit",
    subtitle: "Market Intelligence & Search Intent",
    description: "Analyzing competitor market share, search volume, high-intent keywords, and user query patterns for data-driven decisions.",
    icon: Search,
    tags: ["Keyword Research", "Competitor Audit", "Search Intent"],
  },
  {
    number: "03",
    phase: "PLAN",
    title: "SEO + UX + Website Architecture",
    subtitle: "Sitemap & System Blueprint",
    description: "Architecting logical sitemaps, URL hierarchies, schema mapping, and user flows designed for peak indexing and conversions.",
    icon: FileSpreadsheet,
    tags: ["Site Architecture", "Schema Strategy", "UX Blueprint"],
  },
  {
    number: "04",
    phase: "DESIGN",
    title: "UI/UX + Conversion Structure",
    subtitle: "High-Fidelity Wireframes & Aesthetics",
    description: "Crafting dark-mode aesthetics, responsive layouts, micro-animations, and conversion-focused call-to-actions (CTAs).",
    icon: Palette,
    tags: ["Figma Wireframes", "Design System", "Conversion UI"],
  },
  {
    number: "05",
    phase: "BUILD",
    title: "Frontend + Backend + CMS Engineering",
    subtitle: "Full-Stack Development Pipeline",
    description: "Writing clean, modular React/Next.js code, Node.js REST APIs, MongoDB data models, and headless CMS integrations.",
    icon: Code2,
    tags: ["Next.js 14", "Node/Express", "MongoDB Atlas"],
  },
  {
    number: "06",
    phase: "OPTIMIZE",
    title: "Technical + On-Page + Semantic SEO",
    subtitle: "Core Web Vitals & Technical Speed",
    description: "Optimizing LCP/INP scores, implementing JSON-LD Schema markup, image compression, and semantic HTML structure.",
    icon: Zap,
    tags: ["Core Web Vitals", "JSON-LD Schema", "Speed Optimization"],
  },
  {
    number: "07",
    phase: "GROW",
    title: "Content + Local + Off-Page Authority",
    subtitle: "Organic Growth & Authority Engine",
    description: "Strategy for content clustering, local map pack visibility, entity authority building, and high-trust backlink profile.",
    icon: TrendingUp,
    tags: ["Content Clusters", "Local SEO", "Domain Authority"],
  },
  {
    number: "08",
    phase: "CONVERT",
    title: "CRO + Analytics + Event Tracking",
    subtitle: "Telemetry & Friction Reduction",
    description: "Setting up Google Analytics 4 (GA4), custom event triggers, heatmaps, and CRO friction-reduction loops for revenue growth.",
    icon: Target,
    tags: ["GA4 Tracking", "CRO Testing", "Friction Audit"],
  },
  {
    number: "09",
    phase: "LAUNCH",
    title: "QA Testing + Indexing + Deployment",
    subtitle: "Production QA & Instant Search Indexing",
    description: "Cross-browser testing, accessibility audit, SSL security verification, Google Search Console indexing, and production deployment.",
    icon: Rocket,
    tags: ["Vercel Deploy", "GSC Indexing", "QA Audit"],
  },
  {
    number: "10",
    phase: "SCALE",
    title: "Monitor + A/B Test + Continuous Improvement",
    subtitle: "Growth Monitoring & Ongoing Iteration",
    description: "Real-time traffic monitoring, rank tracking, automated database backups, performance scaling, and ongoing feature updates.",
    icon: LineChart,
    tags: ["Rank Tracking", "Performance Scale", "Continuous Iteration"],
  },
];

export default function WorkProcessSection() {
  const [viewStyle, setViewStyle] = useState<"timeline" | "slides" | "grid" | "list">("timeline");
  const [slideIndex, setSlideIndex] = useState(0);
  const [hoveredListIndex, setHoveredListIndex] = useState<number | null>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fetch API
  const { data: response } = useQuery({
    queryKey: ["work-process"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/process/all-process?limit=1000`
      );
      return res.json();
    },
  });

  const apiSteps = response?.data?.data?.map((item: any) => ({
    number: item.number,
    phase: item.phase,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    icon: iconMap[item.iconName] || Workflow,
    tags: item.tags || [],
  }));

  const processSteps: ProcessStep[] =
    apiSteps && apiSteps.length > 0 ? apiSteps : fallbackSteps;

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(processSteps.length / itemsPerSlide);

  // Sync scroll position to slide index when in Slide Deck mode
  useEffect(() => {
    if (viewStyle === "slides") {
      const unsubscribe = scrollYProgress.on("change", (latest) => {
        const slideVal = Math.min(
          Math.floor(latest * totalSlides),
          totalSlides - 1
        );
        setSlideIndex(Math.max(0, slideVal));
      });
      return () => unsubscribe();
    }
  }, [viewStyle, scrollYProgress, totalSlides]);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#15160e] py-20 md:py-28 px-4 md:px-6 selection:bg-[#c7d300] selection:text-black min-h-screen"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header & 4-Mode View Selector Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              WORK <span className="text-[#c7d300]">PROCESS</span>
            </h2>
          </div>

          {/* View Switcher Controls (Icon Only - Matching MY PROJECTS) */}
          <div className="flex items-center bg-[#0f100a] p-1.5 border border-white/10 shadow-2xl relative z-20 rounded-xl">
            {(["timeline", "slides", "grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewStyle(mode)}
                aria-label={mode}
                className={`p-3 md:p-4 rounded-lg transition-all duration-300 relative ${
                  viewStyle === mode ? "text-black" : "text-white/40 hover:text-white"
                }`}
              >
                {viewStyle === mode && (
                  <motion.div
                    layoutId="activeWorkProcessTab"
                    className="absolute inset-0 bg-[#c7d300] rounded-lg"
                  />
                )}
                <span className="relative z-10 block">
                  {mode === "timeline" && <Layers size={18} className="md:w-5 md:h-5" />}
                  {mode === "slides" && <Presentation size={18} className="md:w-5 md:h-5" />}
                  {mode === "grid" && <LayoutGrid size={18} className="md:w-5 md:h-5" />}
                  {mode === "list" && <ListFilter size={18} className="md:w-5 md:h-5" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- VIEW STYLE 1: TIMELINE SCROLL MODE --- */}
        {viewStyle === "timeline" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Sticky Header & Progress Indicator */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8 z-20">
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                A systematic 10-step engineering & SEO framework. From initial business discovery to full-scale deployment and search engine domination.
              </p>

              <div className="hidden lg:block bg-[#0f100a] p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Process Progress
                  </span>
                  <span className="text-xs font-black text-[#c7d300] font-mono">
                    10 STEPS TOTAL
                  </span>
                </div>

                <div className="relative h-2 w-full bg-neutral-900 rounded-full overflow-hidden mb-6">
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-[#c7d300] shadow-[0_0_15px_#c7d300]"
                    style={{ scaleX: scaleY, transformOrigin: "left" }}
                  />
                </div>

                <div className="space-y-3 text-xs text-neutral-300 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">01. Discovery & Strategy</span>
                    <span className="text-white font-bold">Phase I</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">05. Full-Stack Build</span>
                    <span className="text-white font-bold">Phase II</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">10. Scale & Optimize</span>
                    <span className="text-[#c7d300] font-bold">Phase III</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-neutral-500 text-xs font-mono">
                <ArrowDown size={14} className="animate-bounce text-[#c7d300]" />
                <span>Scroll down to explore the 10 steps</span>
              </div>
            </div>

            {/* Right Column: Scroll-Animated Timeline Steps */}
            <div className="lg:col-span-7 relative pl-4 md:pl-8 space-y-6">
              <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-neutral-800 rounded-full">
                <motion.div
                  className="w-full bg-[#c7d300] shadow-[0_0_12px_#c7d300]"
                  style={{ scaleY, transformOrigin: "top" }}
                />
              </div>

              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group relative bg-[#0f100a] border border-white/10 hover:border-[#c7d300]/40 rounded-3xl p-6 md:p-8 transition-all duration-500 shadow-xl cursor-pointer ml-4 md:ml-6"
                  >
                    <div className="absolute -left-[27px] md:-left-[35px] top-8 w-5 h-5 rounded-full bg-[#0f100a] border-2 border-neutral-700 group-hover:border-[#c7d300] group-hover:bg-[#c7d300] group-hover:shadow-[0_0_15px_#c7d300] transition-all duration-500 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-black transition-colors" />
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#c7d300]/10 border border-[#c7d300]/20 flex items-center justify-center text-[#c7d300] group-hover:bg-[#c7d300] group-hover:text-black transition-all">
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black tracking-widest text-[#c7d300] uppercase font-mono">
                            STEP {step.number} • {step.phase}
                          </span>
                          <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#c7d300] transition-colors leading-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-2xl md:text-3xl font-black text-neutral-800 font-mono group-hover:text-white/20 transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-[10px] text-neutral-300 font-bold uppercase font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- VIEW STYLE 2: SCROLL-DRIVEN SLIDE DECK PRESENTATION MODE --- */}
        {viewStyle === "slides" && (
          <div className="space-y-8 min-h-[140vh]">
            {/* Sticky Header Bar for Slide Deck */}
            <div className="sticky top-24 z-30 flex items-center justify-between bg-[#0f100a]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#c7d300] uppercase tracking-wider font-bold">
                  SLIDE {slideIndex + 1} OF {totalSlides}
                </span>
                <span className="text-neutral-600">|</span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  Scroll down or use arrows to auto-transition slides (3 steps per slide)
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-white hover:bg-[#c7d300] hover:text-black transition-all flex items-center justify-center"
                  title="Previous Slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-white hover:bg-[#c7d300] hover:text-black transition-all flex items-center justify-center"
                  title="Next Slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Sticky Presentation Container */}
            <div className="sticky top-44">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, x: 60, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {processSteps
                    .slice(
                      slideIndex * itemsPerSlide,
                      slideIndex * itemsPerSlide + itemsPerSlide
                    )
                    .map((step) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={step.number}
                          className="bg-[#0f100a] border border-white/10 hover:border-[#c7d300] rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:shadow-[0_0_30px_rgba(199,211,0,0.1)] transition-all duration-300 min-h-[380px]"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-3xl font-black text-[#c7d300] font-mono">
                                {step.number}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-[#c7d300]/10 border border-[#c7d300]/30 rounded-md text-[#c7d300] font-mono">
                                {step.phase}
                              </span>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#c7d300]">
                              <Icon size={24} />
                            </div>

                            <h3 className="text-xl font-black text-white leading-tight">
                              {step.title}
                            </h3>

                            <p className="text-neutral-400 text-xs leading-relaxed">
                              {step.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-300 font-mono"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Indicators */}
              <div className="flex items-center justify-center gap-2 pt-8">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      slideIndex === idx ? "w-10 bg-[#c7d300]" : "w-2.5 bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW STYLE 3: GRID LAYOUT MODE --- */}
        {viewStyle === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-[#0f100a] border border-white/10 hover:border-[#c7d300]/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl group hover:scale-[1.02]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#c7d300]/10 border border-[#c7d300]/20 flex items-center justify-center text-[#c7d300] group-hover:bg-[#c7d300] group-hover:text-black transition-all">
                        <Icon size={20} />
                      </div>
                      <span className="text-2xl font-black text-neutral-800 font-mono group-hover:text-[#c7d300] transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-black tracking-widest text-[#c7d300] uppercase font-mono">
                        {step.phase}
                      </span>
                      <h3 className="text-lg font-black text-white group-hover:text-[#c7d300] transition-colors mt-1 leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-400 font-mono uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- VIEW STYLE 4: HOVER DROPDOWN LIST MODE --- */}
        {viewStyle === "list" && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="text-xs font-mono text-neutral-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c7d300] animate-pulse" />
              Hover mouse over any step row to auto-expand description dropdown
            </div>

            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isHovered = hoveredListIndex === idx;

              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredListIndex(idx)}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isHovered
                      ? "bg-[#0f100a] border-[#c7d300] shadow-[0_0_25px_rgba(199,211,0,0.12)] scale-[1.01]"
                      : "bg-[#0f100a]/60 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Step Row Header */}
                  <div className="p-5 md:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black font-mono text-[#c7d300]">
                        {step.number}
                      </span>

                      <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#c7d300] shrink-0">
                        <Icon size={18} />
                      </div>

                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#c7d300] font-mono">
                          {step.phase}
                        </span>
                        <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isHovered
                          ? "bg-[#c7d300] text-black rotate-180"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  {/* Auto Dropdown Expanded Content */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-6 text-neutral-300 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4 space-y-4">
                          <p>{step.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-[10px] text-neutral-300 font-mono font-bold uppercase"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
