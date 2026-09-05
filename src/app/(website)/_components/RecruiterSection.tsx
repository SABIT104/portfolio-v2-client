/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PencilLine, X, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TooltipState = {
  id: string;
  x: number;
  y: number;
  text: string;
  role: string;
} | null;

function TooltipPortal({ tooltip }: { tooltip: TooltipState }) {
  if (!tooltip) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={tooltip.id}
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "fixed",
          left: tooltip.x,
          top: tooltip.y,
          transform: "translateX(-50%)",
          zIndex: 99999,
          pointerEvents: "none",
        }}
        className="w-[90vw] md:w-[380px] p-4 md:p-6 bg-neutral-800 rounded-2xl md:rounded-3xl shadow-2xl border border-neutral-700 whitespace-normal"
      >
        <p className="text-xs md:text-sm text-neutral-100 italic leading-relaxed mb-4">
          {tooltip.text}
        </p>
        <div className="flex items-center gap-2 border-t border-neutral-700/50 pt-3">
          <span className="text-[9px] md:text-[10px] font-bold text-[#c7d300] uppercase">
            Verified Feedback
          </span>
          <p className="text-[9px] md:text-[10px] text-neutral-400 font-medium uppercase">
            {tooltip.role}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default function RecruiterFeedbackSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const queryClient = useQueryClient();

  // Mobile check for tooltip behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data: response, isLoading: isFetching } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/feedback/getAllfeedback?limit=1000`,
      );
      return res.json();
    },
  });

  const feedbacks = response?.data?.feedbacks || [];

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/feedback/createfeedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Feedback submitted!");
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      setIsOpen(false);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      status:
        (form.querySelector('[name="status"]') as HTMLInputElement)?.value ||
        "suggestion",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      name: "Anonymous Recruiter",
      role: "Hiring Professional",
      isActive: true,
    };
    mutation.mutate(data);
  };

  const handleMouseEnter = useCallback(
    (suggestion: any, key: string) => {
      if (isMobile) return; // Disable tooltip on mobile
      const el = cardRefs.current.get(key);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTooltip({
        id: suggestion._id,
        x: Math.min(
          Math.max(rect.left + rect.width / 2, 200),
          window.innerWidth - 200,
        ),
        y: rect.top - 10,
        text: suggestion.message,
        role: suggestion.role,
      });
    },
    [isMobile],
  );

  return (
    <section className="relative pt-16 md:pt-20 bg-[#15160e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
          Recruiter <span className="text-[#c7d300]">Feedback</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
          Your feedback is vital. Whether it&apos;s UI/UX, code, or performance,
          I value your input.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 px-6 py-4 bg-[#c7d300] text-black text-xs md:text-sm uppercase font-bold border-2 border-[#c7d300] hover:bg-transparent hover:text-white transition-all flex items-center gap-2 mx-auto"
        >
          Leave a Suggestion <PencilLine className="w-4 h-4" />
        </button>

        {/* Marquee Container */}
        <div className="mt-16 md:mt-28 relative mask-fade-edges overflow-hidden py-10">
          {!isFetching && feedbacks.length > 0 && (
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 md:gap-10 w-max"
              style={{ animationPlayState: tooltip ? "paused" : "running" }}
            >
              {[...feedbacks, ...feedbacks].map((suggestion, i) => {
                const key = `${suggestion._id}-${i}`;
                return (
                  <div
                    key={key}
                    ref={(el) => {
                      if (el) {
                        cardRefs.current.set(key, el);
                      } else {
                        cardRefs.current.delete(key);
                      }
                    }}
                    onMouseEnter={() => handleMouseEnter(suggestion, key)}
                    onMouseLeave={() => setTooltip(null)}
                    className="w-[280px] md:w-[340px] h-[220px] md:h-[240px] p-6 md:p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 text-left hover:border-[#c7d300]/50 transition-all group relative"
                  >
                    <p
                      className={`text-neutral-300 italic mb-6 text-xs md:text-sm leading-relaxed ${isMobile ? "line-clamp-3" : "line-clamp-4"}`}
                    >
                      {suggestion.message}
                    </p>
                    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 border-t border-neutral-800 pt-4">
                      <div className="w-8 h-8 rounded-full bg-[#c7d300]/10 flex items-center justify-center text-[#c7d300] text-xs font-bold">
                        {suggestion.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[11px] md:text-sm font-semibold text-white truncate w-32 md:w-40">
                          {suggestion.name}
                        </p>
                        <p className="text-[9px] md:text-xs text-neutral-500 font-medium">
                          {suggestion.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {!isMobile && <TooltipPortal tooltip={tooltip} />}

      {/* Modal Section */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-neutral-900 p-6 md:p-8 border border-neutral-800"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black text-white uppercase">
                  Recruiter Input
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-500 hover:text-white"
                >
                  <X />
                </button>
              </div>

              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <Select name="status" defaultValue="suggestion">
                  <SelectTrigger className="w-full h-12 md:h-14 bg-neutral-800 border-none text-white rounded-none">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                    <SelectItem value="suggestion">
                      Just a suggestion
                    </SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="not-fit">Not a fit</SelectItem>
                  </SelectContent>
                </Select>

                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your suggestions..."
                  className="w-full p-4 bg-neutral-800 border-none text-white focus:ring-1 focus:ring-[#c7d300] outline-none"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 text-xs uppercase font-bold border border-neutral-700 text-white hover:bg-neutral-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex-1 py-3 bg-[#c7d300] text-black text-xs uppercase font-bold hover:bg-transparent hover:text-white border border-[#c7d300] transition-all flex items-center justify-center"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}