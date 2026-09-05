"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeHero from "./_components/HomeHero";
import AboutSection from "./_components/AboutSection";
import SkillSection from "./_components/SkillSection";
import ProjectSection from "./_components/ProjectSection";
import Experience from "./_components/ExperienceSection";
import CertificationSection from "./_components/CertificationSection";
import WorkProcessSection from "./_components/WorkProcessSection";
import RecruiterSection from "./_components/RecruiterSection";
import KnowledgeHub from "./_components/KnowledgeHub";
import ProvenResultsSection from "./_components/ProvenResultsSection";
import FaqSection from "./_components/FaqSection";
import ContactSection from "./_components/ContactSection";
import ResumeSection from "./_components/ResumeSection";
import ProfessionalFooter from "./_components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

function Page() {
  const [isLoading, setIsLoading] = useState(true);

  // রিলোড দিলে যেন সবসময় লোডিং স্ক্রিন দেখায়
  useEffect(() => {
    // আপনি চাইলে এখানে উইন্ডো লোড হওয়ার ওয়েট করতে পারেন
    // অথবা টাইপিং অ্যানিমেশন নিজে থেকেই setIsLoading(false) কল করবে
  }, []);

  return (
    <main className="">
      <AnimatePresence mode="wait">
        {isLoading ? (
          // ১. লোডিং স্ক্রিন
          <LoadingScreen key="loader" onFinished={() => setIsLoading(false)} />
        ) : (
          // ২. মেইন সাইট কন্টেন্ট
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <section id="home">
              <HomeHero />
            </section>
            <section id="about">
              <AboutSection />
            </section>
            <section id="skills">
              <SkillSection />
            </section>
            <section id="resume">
              <ResumeSection />
            </section>
            <section id="projects">
              <ProjectSection />
            </section>
            <section id="experience">
              <Experience />
            </section>
            <section id="certifications">
              <CertificationSection />
            </section>
            <section id="process">
              <WorkProcessSection />
            </section>
            <section id="">
              <RecruiterSection />
            </section>
            <section id="knowledge">
              <KnowledgeHub />
            </section>
            <section id="results">
              <ProvenResultsSection />
            </section>
            <section id="faq">
              <FaqSection />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
            <ProfessionalFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Page;
