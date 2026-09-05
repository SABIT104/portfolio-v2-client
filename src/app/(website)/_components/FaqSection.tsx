/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Code2, TrendingUp, HelpCircle } from "lucide-react";

interface FaqItem {
  _id?: string;
  category: "DEVELOPMENT" | "SEO";
  question: string;
  answer: string;
  order?: number;
}

const fallbackDevFaqs: FaqItem[] = [
  {
    category: "DEVELOPMENT",
    question: "What core tech stack do you use for building web applications?",
    answer: "I specialize in modern full-stack development using Next.js 14, React, TypeScript, Node.js, Express, and MongoDB. Every application is engineered for high performance, modularity, and seamless scalability.",
  },
  {
    category: "DEVELOPMENT",
    question: "How do you ensure web application performance and Core Web Vitals?",
    answer: "I optimize application performance through server-side rendering (SSR), strict code-splitting, Next.js image optimization, lazy loading, and sub-100ms API response times to guarantee green Lighthouse scores.",
  },
  {
    category: "DEVELOPMENT",
    question: "Can you integrate custom headless CMS or existing backend APIs?",
    answer: "Yes, I build flexible architectures that seamlessly integrate with headless CMS systems (Sanity, Strapi), RESTful services, GraphQL APIs, and custom Node.js microservices tailored to your needs.",
  },
  {
    category: "DEVELOPMENT",
    question: "Do you deliver fully responsive and mobile-optimized interfaces?",
    answer: "Absolutely. All user interfaces are crafted with mobile-first CSS architecture, adaptive layouts, fluid typography, and custom micro-interactions that deliver smooth experiences across all devices.",
  },
  {
    category: "DEVELOPMENT",
    question: "What security measures and code standards do you implement?",
    answer: "I adhere to strict OWASP security standards, JWT authentication, CORS policies, environment variable isolation, input validation, and clean TypeScript typings for robust code maintainability.",
  },
];

const fallbackSeoFaqs: FaqItem[] = [
  {
    category: "SEO",
    question: "How do technical SEO and full-stack engineering work together?",
    answer: "By building applications with clean semantic HTML5, server-side rendering, dynamic XML sitemaps, JSON-LD Schema markup, and instant indexing pathways that search engine crawlers can index effortlessly.",
  },
  {
    category: "SEO",
    question: "How long does it take to see organic search ranking improvements?",
    answer: "Initial technical SEO improvements reflect within 2 to 4 weeks after Search Console submission, while competitive keyword ranking growth typically accelerates within 3 to 6 months of execution.",
  },
  {
    category: "SEO",
    question: "Do you perform keyword research and competitive content gap analysis?",
    answer: "Yes, I conduct comprehensive keyword intent analysis, search volume mapping, and competitor gap audits using tools like Semrush, Ahrefs, and Google Search Console to craft high-ROI strategies.",
  },
  {
    category: "SEO",
    question: "What is your approach to Schema markup and Rich Snippet optimization?",
    answer: "I implement structured JSON-LD Schema data tailored to your business (Organization, Article, Product, FAQPage, BreadcrumbList) to enhance search engine visibility and earn eye-catching rich snippets.",
  },
  {
    category: "SEO",
    question: "How do you track, measure, and report SEO organic growth analytics?",
    answer: "I configure Google Analytics 4 (GA4), custom event telemetry, and Search Console tracking to deliver transparent performance reports monitoring impressions, clicks, conversions, and keyword positions.",
  },
];

export default function FaqSection() {
  const [openDevIndex, setOpenDevIndex] = useState<number | null>(0);
  const [openSeoIndex, setOpenSeoIndex] = useState<number | null>(0);

  // Fetch FAQs from API
  const { data: response } = useQuery({
    queryKey: ["website-faqs"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/faq/all-faq?limit=1000`
      );
      return res.json();
    },
  });

  const apiFaqs: FaqItem[] = response?.data?.data || [];

  const devFaqs =
    apiFaqs.filter((f) => f.category === "DEVELOPMENT").length > 0
      ? apiFaqs.filter((f) => f.category === "DEVELOPMENT")
      : fallbackDevFaqs;

  const seoFaqs =
    apiFaqs.filter((f) => f.category === "SEO").length > 0
      ? apiFaqs.filter((f) => f.category === "SEO")
      : fallbackSeoFaqs;

  const toggleDev = (idx: number) => {
    setOpenDevIndex(openDevIndex === idx ? null : idx);
  };

  const toggleSeo = (idx: number) => {
    setOpenSeoIndex(openSeoIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative bg-[#11120b] py-20 md:py-28 px-4 md:px-6 selection:bg-[#c7d300] selection:text-black overflow-hidden"
    >
      {/* Background Decorative Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c7d300]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header (Simple & Plain, No top extra text) */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            GOT QUESTIONS? <span className="text-[#c7d300]">I&apos;VE GOT ANSWERS.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
            Everything you need to know about my engineering architecture and organic search engine optimization process.
          </p>
        </div>

        {/* 2-Column Accordion Layout (Dev vs. SEO) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: DEVELOPMENT FAQs */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-[#c7d300]/10 border border-[#c7d300]/30 flex items-center justify-center text-[#c7d300]">
                <Code2 size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                Development FAQs
              </h3>
            </div>

            <div className="space-y-4">
              {devFaqs.map((faq, idx) => {
                const isOpen = openDevIndex === idx;
                return (
                  <div
                    key={faq._id || idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-[#181a10] border-[#c7d300]/50 shadow-[0_0_20px_rgba(199,211,0,0.1)]"
                        : "bg-[#0f100a] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => toggleDev(idx)}
                      className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-[#c7d300] transition-colors">
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "bg-[#c7d300] text-black rotate-180"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-6 md:px-6 md:pb-6 text-neutral-400 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: SEO & SEARCH FAQs */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-[#c7d300]/10 border border-[#c7d300]/30 flex items-center justify-center text-[#c7d300]">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                SEO & Search FAQs
              </h3>
            </div>

            <div className="space-y-4">
              {seoFaqs.map((faq, idx) => {
                const isOpen = openSeoIndex === idx;
                return (
                  <div
                    key={faq._id || idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-[#181a10] border-[#c7d300]/50 shadow-[0_0_20px_rgba(199,211,0,0.1)]"
                        : "bg-[#0f100a] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => toggleSeo(idx)}
                      className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-[#c7d300] transition-colors">
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "bg-[#c7d300] text-black rotate-180"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-6 md:px-6 md:pb-6 text-neutral-400 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
