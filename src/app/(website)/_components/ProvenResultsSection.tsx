"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  BarChart3,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

interface ResultSlide {
  id: string | number;
  title: string;
  category: string;
  badge: string;
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
  highlights: string[];
}

const fallbackResultsData: ResultSlide[] = [
  {
    id: 1,
    title: "Google Search Console Organic Traffic Explosion",
    category: "SEO & Growth",
    badge: "Verified Analytics",
    metric: "+340%",
    metricLabel: "Organic Impressions Growth in 90 Days",
    description:
      "Comprehensive technical SEO restructure, schema markup optimization, and content velocity strategy leading to massive search visibility and organic click growth.",
    image: "/images/proven-gsc.png",
    highlights: [
      "Zero to 340% Impressions Surge",
      "Ranked 150+ High Intent Keywords",
      "Eliminated Technical Crawl Errors",
    ],
  },
  {
    id: 2,
    title: "100/100 Core Web Vitals & Lighthouse Optimization",
    category: "Web Performance",
    badge: "Lighthouse Certified",
    metric: "0.4s",
    metricLabel: "Largest Contentful Paint (LCP)",
    description:
      "Next.js architecture re-engineering, asset preloading, image optimization, and zero layout shift optimization achieving perfect 100/100 scores across desktop & mobile.",
    image: "/images/proven-pagespeed.png",
    highlights: [
      "100/100 Performance & SEO Scores",
      "0ms Interaction to Next Paint (INP)",
      "90% Lower Server Response Time",
    ],
  },
  {
    id: 3,
    title: "High-Volume Keyword #1 Rank Domination",
    category: "Rank Tracking",
    badge: "Serp Supremacy",
    metric: "#1",
    metricLabel: "Position for Competitive Commercial Keywords",
    description:
      "Strategic semantic search structuring, backlink architecture, and entity optimization resulting in top Google ranking positions over legacy industry competitors.",
    image: "/images/proven-rank.png",
    highlights: [
      "#1 Position for Target Search Terms",
      "Featured Snippets Captured",
      "+280% High Intent Lead Generation",
    ],
  },
];

export default function ProvenResultsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch dynamic results from Backend API
  const { data: response } = useQuery({
    queryKey: ["proven-results"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/result/all-results`
      );
      return res.json();
    },
  });

  const apiResults = response?.data?.map((item: any, idx: number) => ({
    id: item._id || idx + 1,
    title: item.title,
    category: item.category,
    badge: item.badge || "Verified Analytics",
    metric: item.metric,
    metricLabel: item.metricLabel,
    description: item.description,
    image: item.image?.url || fallbackResultsData[idx % fallbackResultsData.length].image,
    highlights: item.highlights || [],
  }));

  const resultsData: ResultSlide[] =
    apiResults && apiResults.length > 0 ? apiResults : fallbackResultsData;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % resultsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + resultsData.length) % resultsData.length);
  };

  // Auto slide effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const currentSlide = resultsData[currentIndex];

  return (
    <section
      id="proven-results"
      className="relative bg-[#0d0e09] py-20 md:py-28 px-4 md:px-6 selection:bg-[#c7d300] selection:text-black overflow-hidden border-t border-b border-white/5"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c7d300]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c7d300]/10 border border-[#c7d300]/30 rounded-full text-[#c7d300] text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <BarChart3 size={12} />
              <span>Real Work Performance & Proof</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              PROVEN <span className="text-[#c7d300]">RESULTS</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-3 leading-relaxed">
              Empirical proof of search engine growth, 100/100 Core Web Vitals speed optimization, and keyword rank domination delivered for real-world applications.
            </p>
          </div>

          {/* Slider AutoPlay & Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-[#15160e] p-2 rounded-2xl border border-white/10 shadow-xl">
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className={`p-2.5 rounded-xl border transition-all ${
                isAutoPlaying
                  ? "bg-[#c7d300]/20 border-[#c7d300]/40 text-[#c7d300]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
              title={isAutoPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <div className="h-5 w-[1px] bg-white/10" />

            <button
              onClick={prevSlide}
              className="p-2.5 bg-white/5 hover:bg-[#c7d300] text-slate-300 hover:text-black rounded-xl border border-white/10 hover:border-[#c7d300] transition-all cursor-pointer"
              title="Previous Result"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Slide Index Counter */}
            <span className="font-mono text-xs text-slate-400 px-1 font-bold">
              0{currentIndex + 1} / 0{resultsData.length}
            </span>

            <button
              onClick={nextSlide}
              className="p-2.5 bg-white/5 hover:bg-[#c7d300] text-slate-300 hover:text-black rounded-xl border border-white/10 hover:border-[#c7d300] transition-all cursor-pointer"
              title="Next Result"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slide Showcase Main Container */}
        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#13140c] border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl overflow-hidden relative"
            >
              {/* Left Column: Browser Mockup Showcase with Image */}
              <div className="lg:col-span-7 relative group">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                  {/* Browser Bar Frame */}
                  <div className="bg-[#1c1d13] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="bg-black/50 px-3 py-0.5 rounded-md border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <ShieldCheck size={11} className="text-[#c7d300]" />
                      <span>{currentSlide.badge}</span>
                    </div>
                  </div>

                  {/* Screenshot Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <Image
                      fill
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right Column: Key Details & Metrics */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                    <span className="text-[#c7d300] font-bold uppercase tracking-wider text-[11px]">
                      {currentSlide.category}
                    </span>
                    <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-[10px]">
                      Slide {currentIndex + 1} of {resultsData.length}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-white leading-snug mb-4">
                    {currentSlide.title}
                  </h3>

                  {/* Highlight Metric Card */}
                  <div className="bg-gradient-to-br from-[#181a0e] to-[#0f100a] p-4 rounded-2xl border border-[#c7d300]/30 shadow-lg mb-5 flex items-center gap-4">
                    <div className="p-3 bg-[#c7d300] text-black rounded-xl font-black text-xl md:text-2xl shrink-0">
                      {currentSlide.metric}
                    </div>
                    <div>
                      <div className="text-white text-xs md:text-sm font-bold">
                        {currentSlide.metricLabel}
                      </div>
                      <div className="text-slate-400 text-[10px] font-mono mt-0.5">
                        Verified Live Measurement
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-5">
                    {currentSlide.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2">
                    {currentSlide.highlights.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-xs text-slate-200"
                      >
                        <CheckCircle2 size={14} className="text-[#c7d300] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {resultsData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? "w-8 bg-[#c7d300]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        title={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Auto-sliding
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
