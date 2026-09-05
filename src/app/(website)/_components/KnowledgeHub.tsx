/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ExternalLink,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  LayoutGrid,
  List,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

// --- Stacked Card Component for Knowledge Hub ---
const StackedKnowledgeCard = ({
  item,
  index,
  total,
  onOpen,
}: {
  item: any;
  index: number;
  total: number;
  onOpen: (item: any) => void;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const itemImage = item.images?.[0]?.url || "/placeholder.jpg";

  return (
    <div
      ref={container}
      onClick={() => onOpen(item)}
      className="h-[550px] md:h-[650px] flex items-start justify-center sticky top-0 lg:px-2 md:px-0 cursor-pointer"
    >
      <motion.div
        style={{ scale, top: `calc(80px + ${index * 30}px)` }}
        className="relative h-[480px] md:h-[480px] w-full max-w-[1250px] border border-white/[0.15] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0f100a] group"
      >
        <div className="md:hidden w-full h-40 relative">
          <Image
            fill
            src={itemImage}
            alt={item.title}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f100a] to-transparent" />
        </div>

        <div className="flex-1 p-6 md:p-12 flex flex-col justify-between relative z-10 bg-[#0f100a]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 md:w-10 h-[1px] bg-[#c7d300]" />
              <span className="text-[#c7d300] text-[10px] font-bold tracking-[0.4em] uppercase">
                INSIGHT 0{index + 1}
              </span>
              <span className="text-neutral-500 text-xs font-mono ml-auto">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter leading-tight group-hover:text-[#c7d300] transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-400 text-xs md:text-base leading-relaxed mb-6 line-clamp-3">
              {item.shortDescription}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#c7d300] px-3 py-1 bg-[#c7d300]/10 border border-[#c7d300]/20 rounded-md uppercase">
                {item.category}
              </span>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <button
              onClick={() => onOpen(item)}
              className="w-full md:w-[220px] h-[48px] md:h-[54px] bg-[#c7d300] text-black text-[12px] uppercase font-bold hover:shadow-[0_0_25px_rgba(199,211,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              Read Full Article
              <SquareArrowOutUpRight
                size={16}
                className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="hidden md:block flex-1 relative overflow-hidden">
          <Image
            fill
            src={itemImage}
            alt={item.title}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f100a] via-[#0f100a]/60 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

// --- Grid Card Component for Knowledge Hub ---
const GridKnowledgeCard = ({
  item,
  onOpen,
}: {
  item: any;
  onOpen: (item: any) => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={() => onOpen(item)}
      className="group bg-[#1a1b14] border border-neutral-800/50 overflow-hidden flex flex-col hover:border-[#c7d300]/30 transition-all duration-500 cursor-pointer shadow-xl"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          fill
          src={item.images?.[0]?.url || "/placeholder.jpg"}
          alt={item.title}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c7d300] transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {item.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[9px] font-bold text-[#c7d300] px-3 py-1 bg-[#c7d300]/5 border border-[#c7d300]/10 rounded-lg uppercase">
            {item.category}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(item);
            }}
            className="p-3 bg-neutral-800/50 hover:bg-[#c7d300] rounded-2xl text-neutral-400 hover:text-black transition-all"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- List Card Component for Knowledge Hub ---
const ListKnowledgeCard = ({
  item,
  index,
  onOpen,
}: {
  item: any;
  index: number;
  onOpen: (item: any) => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    onClick={() => onOpen(item)}
    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer gap-6"
  >
    <div className="flex items-center gap-4 md:gap-8 flex-1">
      <span className="text-white/10 font-black text-2xl md:text-4xl tracking-tighter group-hover:text-[#c7d300] transition-colors">
        0{index + 1}
      </span>
      <div className="relative w-20 h-16 md:w-28 md:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
        <Image
          fill
          src={item.images?.[0]?.url || "/placeholder.jpg"}
          alt={item.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#c7d300] transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-neutral-400 text-xs md:text-sm line-clamp-1 mt-1">
          {item.shortDescription}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[9px] font-bold text-[#c7d300] uppercase">
            {item.category}
          </span>
          <span className="text-neutral-600 text-[10px] font-mono">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
    <div className="mt-2 md:mt-0 self-end md:self-center">
      <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#c7d300] group-hover:text-black transition-all">
        <SquareArrowOutUpRight size={18} />
      </div>
    </div>
  </motion.div>
);

export default function KnowledgeHub() {
  const [view, setView] = useState<"stack" | "grid" | "list">("stack");
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const itemsPerPage = 10;

  // API থেকে ডেটা ফেচ করা
  const { data: response, isLoading } = useQuery({
    queryKey: ["knowledge", filter, searchQuery, currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/knowledge/all-knowledge?limit=1000`,
      );
      return res.json();
    },
  });

  const insightsData = useMemo(() => response?.data?.data || [], [response]);

  // ফিল্টারিং এবং সার্চিং লজিক (Client Side)
  const filteredData = useMemo(() => {
    return insightsData.filter((item: any) => {
      const matchesFilter = filter === "All" || item.category === filter;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, insightsData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (selectedPost) setActiveImage(0);
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [selectedPost]);

  const categories = ["All", "Blog", "Logic", "Problem Solving"];

  if (isLoading) return <div className="min-h-screen bg-[#15160e]" />;

  return (
    <section className="bg-[#15160e] py-16 lg:py-24 font-sans selection:bg-[#c7d300] selection:text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header, Search & View Modes */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
              Insights & <span className="text-[#c7d300]">Solutions</span>
            </h2>
            <div className="flex items-center gap-1.5 bg-black/40 p-1.5 border border-white/10 rounded-xl max-w-full overflow-x-auto no-scrollbar scroll-smooth sm:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 relative rounded-lg flex-shrink-0 ${
                    filter === cat
                      ? "text-black font-black"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {filter === cat && (
                    <motion.div
                      layoutId="activeCategoryKnowledge"
                      className="absolute inset-0 bg-[#c7d300] rounded-lg shadow-[0_0_15px_rgba(199,211,0,0.3)]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative group w-full sm:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#c7d300] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1b14] border border-neutral-800 py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* View Mode Buttons (Stack, Grid, List) */}
            <div className="flex items-center justify-between bg-[#15160e] p-1 border border-white/10 shadow-2xl relative z-20 w-full sm:w-fit">
              {(["stack", "grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setView(mode)}
                  className={`p-3 rounded-lg transition-all duration-300 relative ${view === mode ? "text-black" : "text-white/40 hover:text-white"}`}
                >
                  {view === mode && (
                    <motion.div
                      layoutId="activeTabKnowledge"
                      className="absolute inset-0 bg-[#c7d300] rounded-lg"
                    />
                  )}
                  <span className="relative z-10">
                    {mode === "stack" && (
                      <Layers size={18} />
                    )}
                    {mode === "grid" && (
                      <LayoutGrid size={18} />
                    )}
                    {mode === "list" && (
                      <List size={18} />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Display (Stack / Grid / List) */}
        <AnimatePresence mode="wait">
          {view === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {paginatedData.map((item: any, i: number) => (
                <StackedKnowledgeCard
                  key={item._id}
                  index={i}
                  item={item}
                  total={paginatedData.length}
                  onOpen={setSelectedPost}
                />
              ))}
            </motion.div>
          )}

          {view === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
            >
              {paginatedData.map((item: any) => (
                <GridKnowledgeCard
                  key={item._id}
                  item={item}
                  onOpen={setSelectedPost}
                />
              ))}
            </motion.div>
          )}

          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col bg-[#15160e]/50 rounded-2xl md:rounded-[30px] border border-white/10 overflow-hidden"
            >
              {paginatedData.map((item: any, i: number) => (
                <ListKnowledgeCard
                  key={item._id}
                  index={i}
                  item={item}
                  onOpen={setSelectedPost}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-4 border border-neutral-800 rounded-2xl text-neutral-500 hover:text-[#c7d300] disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-[#c7d300] text-black"
                      : "border border-neutral-800 text-neutral-500 hover:border-neutral-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-4 border border-neutral-800 rounded-2xl text-neutral-500 hover:text-[#c7d300] disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* --- MODAL SECTION --- */}
        <AnimatePresence>
          {selectedPost && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] cursor-pointer"
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "5%" }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 h-[95%] bg-[#0f100a] border-t border-neutral-800 z-[101] rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-neutral-800 rounded-full z-40" />

                <div className="absolute top-6 right-6 md:right-10 z-50">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all border border-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                  <div className="w-full lg:w-[55%] h-[45vh] lg:h-full bg-[#0a0b07] relative flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-800">
                    <div className="flex flex-col h-full">
                      <div className="flex-1 relative m-6 md:m-10 rounded-[2rem] overflow-hidden border border-neutral-800 bg-neutral-900/50">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full h-full"
                          >
                            <Image
                              fill
                              src={
                                selectedPost.images?.[activeImage]?.url ||
                                "/placeholder.jpg"
                              }
                              alt="Preview"
                              className="object-cover"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {selectedPost.images?.length > 1 && (
                        <div className="h-28 px-10 pb-10 flex gap-4 justify-center items-center overflow-x-auto no-scrollbar">
                          {selectedPost.images.map((img: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImage(idx)}
                              className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all border-2 ${activeImage === idx ? "border-[#c7d300] scale-110" : "border-transparent opacity-40 hover:opacity-100"}`}
                            >
                              <Image
                                fill
                                src={img.url}
                                alt={`thumb-${idx}`}
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-[45%] h-full overflow-y-auto bg-[#0f100a] custom-scrollbar">
                    <div className="p-8 md:p-16 lg:p-20 space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <span className="bg-[#c7d300] text-black px-4 py-1 text-[10px] font-black uppercase tracking-tighter rounded-sm">
                            {selectedPost.category}
                          </span>
                          <span className="text-neutral-600 font-mono text-xs">
                            {new Date(
                              selectedPost.createdAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                          {selectedPost.title}
                        </h2>
                      </div>

                      <div className="space-y-8">
                        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light border-l-4 border-[#c7d300] pl-8">
                          {selectedPost.shortDescription}
                        </p>
                        <div className="text-neutral-500 text-lg leading-loose space-y-6 pt-4 whitespace-pre-wrap">
                          {selectedPost.fullContent ||
                            "Detailed content coming soon."}
                        </div>
                      </div>

                      {selectedPost.logicSnippet && (
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Code2 size={16} className="text-[#c7d300]" />
                            <span>Implementation Logic</span>
                          </div>
                          <pre className="bg-black p-8 rounded-3xl border border-neutral-800 overflow-x-auto text-sm font-mono text-[#c7d300]/90">
                            <code>{selectedPost.logicSnippet}</code>
                          </pre>
                        </div>
                      )}

                      <button className="w-full py-6 bg-[#c7d300] text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all rounded-[2rem] group">
                        Launch Live Project{" "}
                        <ExternalLink
                          size={20}
                          className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
