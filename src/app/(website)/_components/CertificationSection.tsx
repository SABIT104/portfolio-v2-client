"use client";

import React, { useEffect, useRef } from "react";
import { CompleteShelfLandingPage } from "@/shaders/landing-pages/LandingPages";
import "@/shaders/threeui.css";

export default function CertificationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Helper to send initial visibility & certification data to iframe
    const notifyIframe = (data: any) => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(data, "*");
      }
    };

    // 1. Synchronize Live Certifications from Backend Database to 3D Shader Book
    async function syncCertifications() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5001/api/v1";
        const res = await fetch(`${backendUrl}/certification/all-certifications?limit=1000`);
        if (!res.ok) return;
        const data = await res.json();
        const rawCerts = data?.data?.data || data?.data || [];

        if (Array.isArray(rawCerts) && rawCerts.length > 0) {
          notifyIframe({
            type: "UPDATE_CERTIFICATIONS",
            certifications: rawCerts,
          });
        }
      } catch (err) {
        console.error("Error fetching certifications for 3D showcase:", err);
      }
    }

    // Initial attempt to push visibility & certs
    notifyIframe({ type: "SET_VISIBILITY", visible: true });
    syncCertifications();

    // 2. IntersectionObserver to notify 3D WebGL renderer on scroll
    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            notifyIframe({
              type: "SET_VISIBILITY",
              visible: entry.isIntersecting,
            });
            if (entry.isIntersecting) {
              syncCertifications();
            }
          });
        },
        { threshold: 0.01 }
      );
      observer.observe(sectionRef.current);
    }

    // 3. Handle messages from iframe (Ready handshake)
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;

      if (event.data.type === "IFRAME_READY") {
        notifyIframe({ type: "SET_VISIBILITY", visible: true });
        syncCertifications();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="w-full relative bg-[#080808] py-6 sm:py-10 px-2 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full" ref={containerRef}>
        <div className="shader-frame w-full h-[440px] sm:h-[520px] md:h-[580px] relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl bg-[#171a24]">
          <CompleteShelfLandingPage
            headingFont="iowan-old-style"
            bodyFont="inter"
            headingWeight="400"
            bodyWeight="400"
            primaryColor="#c87046"
            headingSize={60}
            bodySize={12}
            headingLetterSpacing={-0.055}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
