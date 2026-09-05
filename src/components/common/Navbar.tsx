// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Home,
//   User,
//   Briefcase,
//   ClipboardList,
//   Hash,
//   FileText,
//   MessageSquare,
//   Cpu,
// } from "lucide-react";
// import { motion } from "framer-motion";

// type NavItem = {
//   id: string;
//   icon: React.ReactNode;
//   label: string;
// };

// const navItems: NavItem[] = [
//   { id: "home", icon: <Home size={22} />, label: "Home" },
//   { id: "about", icon: <User size={22} />, label: "Profile" },
//   { id: "skills", icon: <Cpu size={22} />, label: "Skills" },
//   { id: "resume", icon: <FileText size={22} />, label: "Resume" },
//   { id: "projects", icon: <Briefcase size={22} />, label: "Projects" },
//   { id: "experience", icon: <ClipboardList size={22} />, label: "Experience" },
//   { id: "knowledge", icon: <Hash size={22} />, label: "Knowledge" },
//   { id: "contact", icon: <MessageSquare size={22} />, label: "Contact" },
// ];

// export default function Navbar() {
//   const [active, setActive] = useState("home");

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = navItems.map((item) => document.getElementById(item.id));
//       let currentActive = active;
//       sections.forEach((section) => {
//         if (section) {
//           const rect = section.getBoundingClientRect();
//           if (rect.top <= 160 && rect.bottom >= 160) {
//             currentActive = section.id;
//           }
//         }
//       });
//       setActive(currentActive);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [active]);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const headerOffset = 80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition =
//         elementPosition + window.pageYOffset - headerOffset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <>
//       {/* ─── DESKTOP SIDEBAR ─── */}
//       <nav className="hidden lg:flex fixed top-0 left-6 z-50 flex-col items-center w-[76px] h-screen bg-transparent py-8 gap-6">
//         <div className="mb-6 flex items-center justify-center w-full">
//           <div className="flex items-center gap-1 group cursor-pointer">
//             <span className="text-[#c8e63b] text-2xl font-black leading-none">
//               i
//             </span>
//             <span className="text-white text-2xl font-black tracking-tighter leading-none">
//               Sti
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col gap-4 w-full px-2">
//           {navItems.map((item) => {
//             const isActive = active === item.id;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className={`group relative flex items-center justify-center w-[56px] h-[56px] rounded-2xl transition-all duration-300 border ${
//                   isActive
//                     ? "bg-[#c8e63b] border-[#c8e63b] text-[#15160e] shadow-[0_0_20px_rgba(200,230,59,0.3)] scale-110"
//                     : "bg-[#1a1b14]/80 backdrop-blur-md border-white/5 text-white/70 hover:border-[#c8e63b]/50 hover:text-white"
//                 }`}
//               >
//                 {item.icon}
//                 <span className="absolute left-[calc(100%+20px)] z-50 whitespace-nowrap rounded-lg bg-[#1a1b14] text-[#c8e63b] text-[10px] font-bold uppercase tracking-widest px-3 py-2 opacity-0 group-hover:opacity-100 transition-all border border-white/10">
//                   {item.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </nav>

//       {/* ─── MOBILE STICKY FLOATING DOCK (FIXED CENTERING) ─── */}
//       <div className="lg:hidden fixed bottom-6 left-0 w-full z-[60] flex justify-center items-center px-4">
//         <motion.div
//           initial={{ y: 80, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="flex items-center justify-center gap-2 p-2 bg-[#1a1b14]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl w-fit mx-auto overflow-hidden"
//         >
//           {navItems.map((item) => {
//             const isActive = active === item.id;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 ${
//                   isActive
//                     ? "bg-[#c8e63b] text-[#15160e] scale-105 shadow-[0_0_15px_rgba(200,230,59,0.4)]"
//                     : "bg-transparent text-white/60 hover:text-white"
//                 }`}
//               >
//                 {React.cloneElement(item.icon as React.ReactElement, {
//                   size: 18,
//                 })}

//                 {isActive && (
//                   <motion.span
//                     layoutId="mobileActive"
//                     className="absolute -bottom-1 w-1 h-1 bg-[#c8e63b] rounded-full"
//                   />
//                 )}
//               </button>
//             );
//           })}
//         </motion.div>
//       </div>

//       {/* Mobile Top Logo */}
//       <div className="lg:hidden fixed top-0 left-0 w-full z-50 p-5 flex justify-start pointer-events-none">
//         <div className="bg-[#0d0d0d]/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 pointer-events-auto">
//           <span className="text-[#c8e63b] text-xl font-black">i</span>
//           <span className="text-white text-xl font-black tracking-tighter">
//             Sti
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Briefcase,
  ClipboardList,
  Award,
  Workflow,
  Hash,
  HelpCircle,
  FileText,
  MessageSquare,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: <Home size={22} />, label: "Home" },
  { id: "about", icon: <User size={22} />, label: "Profile" },
  { id: "skills", icon: <Cpu size={22} />, label: "Skills" },
  { id: "resume", icon: <FileText size={22} />, label: "Resume" },
  { id: "projects", icon: <Briefcase size={22} />, label: "Projects" },
  { id: "experience", icon: <ClipboardList size={22} />, label: "Experience" },
  { id: "certifications", icon: <Award size={22} />, label: "Certifications" },
  { id: "process", icon: <Workflow size={22} />, label: "Process" },
  { id: "knowledge", icon: <Hash size={22} />, label: "Knowledge" },
  { id: "faq", icon: <HelpCircle size={22} />, label: "FAQ" },
  { id: "contact", icon: <MessageSquare size={22} />, label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let requestRunning = false;
    const handleScroll = () => {
      if (!requestRunning) {
        window.requestAnimationFrame(() => {
          const sections = navItems.map((item) => document.getElementById(item.id));
          let currentActive = active;
          
          sections.forEach((section) => {
            if (section) {
              const rect = section.getBoundingClientRect();
              // অপ্টিমাইজড থ্রেশহোল্ড
              if (rect.top <= 160 && rect.bottom >= 160) {
                currentActive = section.id;
              }
            }
          });
          
          if (currentActive !== active) {
            setActive(currentActive);
          }
          requestRunning = false;
        });
        requestRunning = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─── */}
      <nav className="hidden lg:flex fixed top-0 left-6 z-50 flex-col items-center w-[76px] h-screen bg-transparent py-8 gap-6">
        <div className="mb-6 flex items-center justify-center w-full">
          <div className="flex items-center gap-0.5 group cursor-pointer">
            <span className="text-[#c8e63b] text-2xl font-black leading-none drop-shadow-[0_0_8px_rgba(200,230,59,0.3)]">S@</span>
            <span className="text-white text-2xl font-black tracking-tighter leading-none group-hover:text-[#c8e63b] transition-colors">BIT</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full px-2">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center justify-center w-[56px] h-[56px] rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? "bg-[#c8e63b] border-[#c8e63b] text-[#15160e] shadow-[0_0_20px_rgba(200,230,59,0.3)] scale-110"
                    : "bg-[#1a1b14]/80 backdrop-blur-md border-white/5 text-white/70 hover:border-[#c8e63b]/50 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="absolute left-[calc(100%+20px)] z-50 whitespace-nowrap rounded-lg bg-[#1a1b14] text-[#c8e63b] text-[10px] font-bold uppercase tracking-widest px-3 py-2 opacity-0 group-hover:opacity-100 transition-all border border-white/10 shadow-2xl">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─── MOBILE STICKY FLOATING DOCK ─── */}
      <div className="lg:hidden fixed bottom-4 left-0 w-full z-[60] flex justify-center items-center px-3 pointer-events-none">
        <motion.div 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#1a1b14]/95 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)] max-w-[calc(100vw-24px)] overflow-x-auto no-scrollbar scroll-smooth"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  scrollToSection(item.id);
                  document.getElementById(`mobile-nav-${item.id}`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                className={`relative flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-[#c8e63b] text-[#15160e] scale-105 shadow-[0_0_15px_rgba(200,230,59,0.5)]" 
                    : "bg-transparent text-white/60 hover:text-white"
                }`}
                title={item.label}
              >
                {React.cloneElement(item.icon as React.ReactElement, { size: 17 })}
                
                {isActive && (
                  <motion.span 
                    layoutId="mobileActive"
                    className="absolute -bottom-0.5 w-1 h-1 bg-[#c8e63b] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile Top Logo */}
      {/* <div className="lg:hidden fixed top-0 left-0 w-full z-50 p-5 flex justify-start pointer-events-none">
         <div className="bg-[#1a1b14]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
            <span className="text-[#c8e63b] text-xl font-black">T</span>
            <span className="text-white text-xl font-black tracking-tighter">anvir</span>
         </div>
      </div> */}
    </>
  );
}