/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  SquareArrowOutUpRight,
  LayoutGrid,
  Layers,
  List,
  ExternalLink,
  Code2,
  X,
  Play,
  Github,
  Globe,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

// --- Stacked Card Component ---
const StackedCard = ({
  project,
  index,
  total,
  onOpen,
}: {
  project: any;
  index: number;
  total: number;
  onOpen: (p: any) => void;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const projectImage = project.images?.[0]?.url || "";

  return (
    <div
      ref={container}
      onClick={() => onOpen(project)}
      className="min-h-[500px] h-[600px] sm:h-[650px] md:h-[800px] flex items-start justify-center sticky top-0 lg:px-2 md:px-0"
    >
      <motion.div
        style={{ scale, top: `calc(70px + ${index * 20}px)` }}
        className="relative min-h-[440px] md:h-[520px] w-full max-w-[1250px] border border-white/[0.15] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0f100a] rounded-2xl md:rounded-none"
      >
        <div className="md:hidden w-full h-40 relative">
          {projectImage && (
            <Image
              fill
              src={projectImage}
              alt={project.title}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f100a] to-transparent" />
        </div>

        <div className="flex-1 p-6 md:p-14 flex flex-col justify-between relative z-10 bg-[#0f100a]">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-8 md:w-10 h-[1px] bg-[#c7d300]" />
              <span className="text-[#c7d300] text-[10px] font-bold tracking-[0.4em] uppercase">
                Project 0{index + 1}
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-none">
              {project.title}
            </h3>
            <div
              className="text-slate-400 text-xs md:text-base leading-relaxed mb-6 md:mb-8 max-w-sm line-clamp-2 md:line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: Array.isArray(project.description)
                  ? project.description[0]
                  : project.description,
              }}
            />

            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-full text-[9px] md:text-[11px] text-white/80 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-6">
            <button
              onClick={() => onOpen(project)}
              className="w-full md:w-[200px] h-[50px] md:h-[60px] bg-[#c7d300] text-black text-[12px] md:text-[13px] uppercase font-bold hover:shadow-[0_0_25px_rgba(199,211,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Explore Project
              <SquareArrowOutUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="hidden md:block flex-1 relative overflow-hidden group">
          {projectImage && (
            <Image
              fill
              src={projectImage}
              alt={project.title}
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f100a] via-[#0f100a]/60 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

// --- Grid & List Card (বাকি অংশ একই থাকবে) ---
const GridCard = ({
  project,
  onOpen,
}: {
  project: any;
  onOpen: (p: any) => void;
}) => {
  const projectImage = project.images?.[0]?.url || "";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onOpen(project)}
      className="bg-[#15160e] border border-white/10 overflow-hidden group flex flex-col shadow-xl cursor-pointer"
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        {projectImage && (
          <Image
            fill
            src={projectImage}
            alt={project.title}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tighter group-hover:text-[#c7d300] transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="text-[9px] md:text-[10px] text-[#c7d300] border border-[#c7d300]/30 px-2 py-1 rounded-full uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
          <SquareArrowOutUpRight size={16} className="text-white/40" />
        </div>
      </div>
    </motion.div>
  );
};

const ListCard = ({
  project,
  index,
  onOpen,
}: {
  project: any;
  index: number;
  onOpen: (p: any) => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={() => onOpen(project)}
    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer"
  >
    <div className="flex items-center gap-4 md:gap-8">
      <span className="text-white/10 font-black text-2xl md:text-4xl tracking-tighter group-hover:text-[#c7d300] transition-colors">
        0{index + 1}
      </span>
      <div>
        <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-[#c7d300] transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-3 mt-1">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-[9px] md:text-[11px] text-slate-500 font-medium tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-4 md:mt-0">
      <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#c7d300] group-hover:text-black transition-all">
        <SquareArrowOutUpRight size={18} />
      </div>
    </div>
  </motion.div>
);

export default function ProjectSection() {
  const [view, setView] = useState<"stack" | "grid" | "list">("stack");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/project/getallproject?limit=1000`,
      );
      return res.json();
    },
  });

  const projects = response?.data?.projects || [];

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setActiveMedia(project.images?.[0]?.url || project.video || null);
  };

  if (isLoading) return <div className="bg-[#0f100a] min-h-screen" />;

  const isVideo = (url: string) =>
    url?.match(/\.(mp4|webm|ogg)$/i) || url?.includes("video");

  return (
    <section className="relative bg-[#0f100a] px-4 md:px-6 min-h-screen selection:bg-[#c7d300] selection:text-black">
      {/* Header (Same as before) */}
      <div className="max-w-7xl mx-auto pt-16 md:pt-24 lg:pb-12 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="text-left relative z-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4 md:mb-6">
              MY <span className="text-[#c7d300]">PROJECTS</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-lg max-w-4xl leading-relaxed">
              Merging aesthetics with robust functionality to build scalable web applications. I specialize in crafting seamless user experiences with modern tech stacks that turn complex ideas into high-performing digital solutions.
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#15160e] p-1.5 border border-white/10 shadow-2xl relative z-20 lg:w-fit w-full">
            {(["stack", "grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={`p-3 md:p-4 rounded-lg transition-all duration-300 relative ${view === mode ? "text-black" : "text-white/40"}`}
              >
                {view === mode && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#c7d300] rounded-lg"
                  />
                )}
                <span className="relative z-10">
                  {mode === "stack" && (
                    <Layers size={18} className="md:w-5 md:h-5" />
                  )}
                  {mode === "grid" && (
                    <LayoutGrid size={18} className="md:w-5 md:h-5" />
                  )}
                  {mode === "list" && (
                    <List size={18} className="md:w-5 md:h-5" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid, Stack, List Display */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projects.map((project: any, i: number) => (
                <StackedCard
                  key={project._id}
                  index={i}
                  project={project}
                  total={projects.length}
                  onOpen={handleOpenModal}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-10"
            >
              {projects.map((project: any) => (
                <GridCard
                  key={project._id}
                  project={project}
                  onOpen={handleOpenModal}
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
              className="mt-6 md:mt-10 flex flex-col bg-[#15160e]/50 rounded-2xl md:rounded-[40px] border border-white/10 overflow-hidden"
            >
              {projects.map((project: any, i: number) => (
                <ListCard
                  key={project._id}
                  index={i}
                  project={project}
                  onOpen={handleOpenModal}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Responsive Project Modal (Updated Buttons) --- */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/98 md:bg-black/95 backdrop-blur-xl z-[100] cursor-pointer"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-full md:h-[95%] bg-[#0f100a] border-t border-neutral-800 z-[101] rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden flex flex-col"
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 md:p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full">
                <div className="w-full lg:w-[40%] h-[40vh] md:h-[60vh] lg:h-full bg-[#0a0b07] relative border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col p-4 md:p-10">
                  <div className="flex-1 relative rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-neutral-800 bg-black">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMedia}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full h-full"
                      >
                        {isVideo(activeMedia || "") ? (
                          <video
                            src={activeMedia!}
                            autoPlay
                            loop
                            muted
                            controls
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            fill
                            src={activeMedia || ""}
                            alt="Preview"
                            className="object-contain md:object-cover"
                            priority
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex gap-3 md:gap-4 mt-4 md:mt-6 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedProject.images?.map((img: any, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => setActiveMedia(img.url)}
                        className={`relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeMedia === img.url ? "border-[#c7d300] scale-90" : "border-white/10 opacity-60 hover:opacity-100"}`}
                      >
                        <Image
                          fill
                          src={img.url}
                          alt="Thumb"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[60%] h-[60vh] lg:h-full overflow-y-auto bg-[#0f100a] scrollbar-thin scrollbar-thumb-[#c7d300] scrollbar-track-transparent">
                  <div className="p-6 md:p-16 space-y-10 md:space-y-12">
                    <div className="space-y-4 md:space-y-6">
                      <span className="inline-block bg-[#c7d300] text-black px-3 py-1 text-[9px] md:text-[10px] font-black uppercase rounded-sm">
                        {selectedProject.category || "Featured Project"}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag: any) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-400 text-[10px] font-bold uppercase"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      {Array.isArray(selectedProject.description) ? (
                        selectedProject.description.map(
                          (desc: string, i: number) => (
                            <div
                              key={i}
                              className="text-lg md:text-2xl text-neutral-300 leading-relaxed font-light border-l-4 border-[#c7d300] pl-6 md:pl-8"
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                          ),
                        )
                      ) : (
                        <div
                          className="text-lg md:text-2xl text-neutral-300 leading-relaxed font-light border-l-4 border-[#c7d300] pl-6 md:pl-8"
                          dangerouslySetInnerHTML={{
                            __html: selectedProject.description,
                          }}
                        />
                      )}
                    </div>

                    {/* --- Action Buttons Grid --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
                      {/* Live Link */}
                      {selectedProject.links?.find((l: any) =>
                        l.name?.toLowerCase().includes("live"),
                      ) && (
                        <a
                          href={
                            selectedProject.links.find((l: any) =>
                              l.name?.toLowerCase().includes("live"),
                            ).url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-4 bg-[#c7d300] text-black font-black uppercase text-[11px] rounded-xl hover:bg-white transition-all"
                        >
                          <Globe size={16} /> Live Preview
                        </a>
                      )}

                      {/* Frontend Source */}
                      {selectedProject.links?.find((l: any) =>
                        l.name?.toLowerCase().includes("frontend"),
                      ) && (
                        <a
                          href={
                            selectedProject.links.find((l: any) =>
                              l.name?.toLowerCase().includes("frontend"),
                            ).url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] rounded-xl hover:bg-white/10 transition-all"
                        >
                          <Github size={16} /> Frontend Code
                        </a>
                      )}

                      {/* Backend Source */}
                      {selectedProject.links?.find((l: any) =>
                        l.name?.toLowerCase().includes("backend"),
                      ) && (
                        <a
                          href={
                            selectedProject.links.find((l: any) =>
                              l.name?.toLowerCase().includes("backend"),
                            ).url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] rounded-xl hover:bg-white/10 transition-all"
                        >
                          <Github size={16} /> Backend Code
                        </a>
                      )}

                      {/* Dashboard Source */}
                      {selectedProject.links?.find((l: any) =>
                        l.name?.toLowerCase().includes("dashboard"),
                      ) && (
                        <a
                          href={
                            selectedProject.links.find((l: any) =>
                              l.name?.toLowerCase().includes("dashboard"),
                            ).url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] rounded-xl hover:bg-white/10 transition-all"
                        >
                          <Settings size={16} /> Dashboard Code
                        </a>
                      )}
                    </div>

                    {selectedProject.logicSnippet && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase">
                          <Code2 size={16} className="text-[#c7d300]" />
                          <span>Logic Snippet</span>
                        </div>
                        <pre className="bg-black/50 p-6 rounded-2xl border border-neutral-800 overflow-x-auto text-[11px] font-mono text-[#c7d300]/90">
                          <code>{selectedProject.logicSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
