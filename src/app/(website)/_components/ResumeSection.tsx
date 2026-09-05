"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, Copy, Check, ArrowUpRight, CirclePlay, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}) {
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

  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            className="relative w-full max-w-4xl overflow-hidden rounded-md border border-[#c7d300]/25 bg-[#030617] shadow-[0_0_60px_rgba(199,211,0,0.16)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c7d300]">
                  Resume Intro Video
                </p>
                <h3 className="mt-1 text-base font-bold uppercase text-white md:text-lg">
                  Saimun Sabit
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close intro video"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-[#c7d300]/60 hover:text-[#c7d300]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative bg-black aspect-video w-full">
              {isYouTube ? (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title="Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="aspect-video w-full object-cover"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OptimizedResumeSection() {
  const [copied, setCopied] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // API থেকে রেজুমি ডাটা নিয়ে আসা
  const { data: response, isLoading } = useQuery({
    queryKey: ["activeResume"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/resume/activeresume`);
      return res.json();
    },
  });

  const rawResumeData = response?.data;
  const resumeData = rawResumeData || {
    version: "v1.0.0",
    resumeUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace('/api/v1', '') || 'http://localhost:5001'}/uploads/resumes/saimun_sabit_resume.pdf`,
    videoUrl: "",
  };

  const resumeLink = resumeData?.resumeUrl || "#";
  const videoLink = resumeData?.videoUrl || "";

  const handleCopy = () => {
    if (!resumeLink || resumeLink === "#") return;
    navigator.clipboard.writeText(resumeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <div className="bg-[#15160e] py-16 h-[400px]" />;

  return (
    <section id="resume" className="bg-[#15160e] py-16 px-6 font-sans border-t border-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative bg-[#1a1b14] border border-neutral-800 p-8 md:p-20 overflow-hidden shadow-none"
        >
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c7d300' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="flex items-center gap-3 text-[#c7d300] tracking-[0.5em] font-black text-[10px] uppercase"
                >
                  <span className="w-8 h-[1px] bg-[#c7d300]" />
                  Curriculum Vitae
                </motion.div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                  Experience <br /> 
                  <span className="text-neutral-800 [-webkit-text-stroke:1px_#c7d300]">In Detail.</span>
                </h2>
              </div>
              
              <p className="text-neutral-500 text-sm md:text-base max-w-lg leading-relaxed font-medium">
                I focus on building high-performance logic and seamless user interfaces. Download my detailed resume or watch my intro video to explore my technical stack and professional journey.
              </p>

              {videoLink && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-3 px-6 py-3.5 bg-[#c7d300]/10 border border-[#c7d300]/30 text-[#c7d300] rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#c7d300] hover:text-black transition-all cursor-pointer"
                >
                  <CirclePlay size={18} /> Watch Resume Intro Video
                </button>
              )}
            </div>

            {/* Action Side - Optimized Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* View Button */}
              <motion.a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: "#22231b" }}
                className="flex flex-col justify-between p-8 bg-[#11120d] border border-neutral-800 text-white transition-all group relative overflow-hidden cursor-pointer"
              >
                <Eye size={24} className="text-[#c7d300] mb-12" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest">Preview</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-bold">Open PDF</h4>
                </div>
              </motion.a>

              {/* Download Button */}
              <motion.a
                href={resumeLink}
                download={`Saimun_Sabit_Resume_${resumeData.version || "v1"}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex flex-col justify-between p-8 bg-[#c7d300] text-black transition-all shadow-[8px_8px_0px_#22231b] cursor-pointer"
              >
                <Download size={24} className="mb-12" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Offline Copy</span>
                  <h4 className="text-lg font-bold uppercase">Download CV</h4>
                </div>
              </motion.a>

              {/* Copy Link Button */}
              <button
                onClick={handleCopy}
                className="sm:col-span-2 flex items-center justify-between p-6 bg-transparent border border-neutral-800 text-neutral-500 hover:text-white hover:border-[#c7d300]/50 transition-all text-[10px] font-bold uppercase tracking-widest group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[#c7d300]">
                        <Check size={16} /> Link Stored in Clipboard
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                        <Copy size={16} /> Copy Direct Link
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-neutral-800 font-mono lowercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {resumeData.version || "v1.0.0"}
                </span>
              </button>

            </div>
          </div>
        </motion.div>

        {/* Bottom Label */}
        <div className="mt-12 flex justify-between items-center text-neutral-800 text-[9px] font-black uppercase tracking-[0.3em]">
          <span>© 2026 Saimun Sabit</span>
          <span className="h-[1px] flex-1 mx-8 bg-neutral-900" />
          <span>Next.js + Framer Motion</span>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoLink}
      />
    </section>
  );
}