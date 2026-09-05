"use client";
import React from "react";
import { motion } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";

// ১. ডামি কন্টেন্টকে ফাংশনের উপরে নিয়ে আসা হয়েছে এরর ফিক্স করার জন্য
const dummyContent = [
  {
    title: "Revolutionizing Digital Architecture",
    description: (
      <>
        <p>
          In this project, I focused on creating a scalable system that handles high-traffic
          real-time data. The core challenge was maintaining low latency while ensuring
          the user experience remained fluid and responsive.
        </p>
        <p>
          Using advanced state management and optimized rendering patterns, we achieved 
          a 40% increase in load speeds across all global regions.
        </p>
      </>
    ),
    badge: "Full Stack",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540",
  },
  {
    title: "Minimalism in UI Design",
    description: (
      <>
        <p>
          Design is not just how it looks, but how it works. This exploration into 
          minimalist UI focuses on removing noise and emphasizing function over fashion.
        </p>
        <p>
          The result is a clean, sharp, and brutalist aesthetic that aligns perfectly with 
          modern technical requirements and user expectations.
        </p>
      </>
    ),
    badge: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540",
  },
  {
    title: "Future of Web Interaction",
    description: (
      <>
        <p>
          Exploring Framer Motion and GSAP to bring life to static components. 
          Interactions should feel natural, intentional, and non-intrusive.
        </p>
      </>
    ),
    badge: "Animation",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506",
  },
];

export default function TracingBeamDemo() {
  return (
    // সেকশনটির ব্যাকগ্রাউন্ড আপনার থিমের সাথে ম্যাচ করা হয়েছে
    <section className="bg-[#15160e] py-20 overflow-hidden">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {dummyContent.map((item, index) => (
            <motion.div 
              key={`content-${index}`} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              {/* Badge: Sharp square style with #c7d300 color */}
              <h2 className="bg-[#c7d300] text-black font-black uppercase text-[10px] tracking-[0.3em] w-fit px-4 py-1.5 mb-6">
                {item.badge}
              </h2>

              {/* Title: Big, Bold, and Sharp */}
              <p className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                {item.title}
              </p>

              <div className="prose prose-sm dark:prose-invert">
                {item?.image && (
                  <div className="relative group overflow-hidden border border-neutral-800 mb-10">
                    <Image
                    width={399}
                    height={499}
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                )}
                
                {/* Description Text Styling */}
                <div className="text-neutral-500 text-sm md:text-base leading-relaxed space-y-5 font-medium">
                  {item.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </TracingBeam>
    </section>
  );
}