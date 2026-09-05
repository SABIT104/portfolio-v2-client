"use client"
import Navbar from "@/components/common/Navbar";
import React from "react";
import { ReactLenis } from '@studio-freight/react-lenis'
import ScrollToTop from "@/components/ScrollToTop";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="">
          <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
          >
            {children}
          </ReactLenis>
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}

export default layout;
