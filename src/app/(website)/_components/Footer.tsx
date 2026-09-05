"use client";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  Globe,
  Sparkles,
} from "lucide-react";

export default function ProfessionalFooter() {
  const currentYear = new Date().getFullYear();

  const { data: publicInfo } = useQuery({
    queryKey: ["footer-contact-info"],
    queryFn: async () => {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5001/api/v1";
      const res = await fetch(`${backendUrl}/contact/get-public-info`);
      if (!res.ok) return {};
      const json = await res.json();
      return json?.data || {};
    },
  });

  const mainNav = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Resume", href: "resume" },
    { label: "Projects", href: "projects" },
    { label: "Experience", href: "experience" },
  ];

  const secondaryNav = [
    { label: "Certifications", href: "certifications" },
    { label: "Process", href: "process" },
    { label: "Knowledge Hub", href: "knowledge" },
    { label: "FAQ", href: "faq" },
    { label: "Contact", href: "contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={16} />,
      href: publicInfo?.facebook || "https://facebook.com",
      bg: "#1877F2",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={16} />,
      href: publicInfo?.linkedin || "https://linkedin.com",
      bg: "#0077B5",
    },
    {
      name: "GitHub",
      icon: <Github size={16} />,
      href: publicInfo?.github || "https://github.com",
      bg: "#333333",
    },
    {
      name: "Instagram",
      icon: <Instagram size={16} />,
      href: publicInfo?.instagram || "https://instagram.com",
      bg: "#E4405F",
    },
    {
      name: "YouTube",
      icon: <Youtube size={16} />,
      href: publicInfo?.youtube || "https://youtube.com",
      bg: "#FF0000",
    },
    {
      name: "Twitter",
      icon: <Twitter size={16} />,
      href: publicInfo?.twitter || "https://twitter.com",
      bg: "#1DA1F2",
    },
    {
      name: "Pinterest",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z" />
        </svg>
      ),
      href: publicInfo?.pinterest || "https://pinterest.com",
      bg: "#E60023",
    },
    {
      name: "Dribbble",
      icon: <Dribbble size={16} />,
      href: publicInfo?.dribbble || "https://dribbble.com",
      bg: "#EA4C89",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0d0e09] border-t border-neutral-800/80 pt-16 pb-12 px-6 font-sans text-neutral-400 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#c7d300]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800/60">
          
          {/* Brand & About Column (Spans 4) */}
          <div className="lg:col-span-4 space-y-5">
            <div
              onClick={scrollToTop}
              className="flex items-center gap-1 group cursor-pointer w-fit"
            >
              <span className="text-[#c7d300] text-3xl md:text-4xl font-black leading-none drop-shadow-[0_0_10px_rgba(199,211,0,0.4)]">
                S@
              </span>
              <span className="text-white text-3xl md:text-4xl font-black tracking-tighter leading-none group-hover:text-[#c7d300] transition-colors">
                BIT
              </span>
            </div>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
              Saimun Sabit — Web Developer & SEO Expert. Crafting high-performance web applications and search engine optimization strategies that deliver measurable results.
            </p>

            {/* Quick Contact Chips */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`mailto:${publicInfo?.email || "saimunsabit767@gmail.com"}`}
                className="flex items-center gap-2.5 text-sm text-neutral-300 hover:text-[#c7d300] transition-colors w-fit"
              >
                <Mail size={16} className="text-[#c7d300]" />
                {publicInfo?.email || "saimunsabit767@gmail.com"}
              </a>
              <a
                href={`tel:${publicInfo?.phone || "+8801797475204"}`}
                className="flex items-center gap-2.5 text-sm text-neutral-300 hover:text-[#c7d300] transition-colors w-fit"
              >
                <Phone size={16} className="text-[#c7d300]" />
                {publicInfo?.phone || "+880 1797475204"}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <MapPin size={16} className="text-[#c7d300]" />
                {publicInfo?.location || "Dhaka, Bangladesh"}
              </div>
            </div>
          </div>

          {/* Quick Links Column (Spans 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-[0.18em]">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm font-bold uppercase tracking-wider">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-neutral-400 hover:text-[#c7d300] transition-colors hover:translate-x-1 duration-200 inline-block cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Column (Spans 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-[0.18em]">
              Explore
            </h4>
            <ul className="space-y-3 text-sm font-bold uppercase tracking-wider">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-neutral-400 hover:text-[#c7d300] transition-colors hover:translate-x-1 duration-200 inline-block cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connect Column (Spans 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-[0.18em]">
              Connect With Me
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Follow me across my social profiles or reach out directly for collaborations.
            </p>
            {/* Social Grid */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  whileHover={{ y: -3, scale: 1.08 }}
                  style={{ background: social.bg }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-white transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {publicInfo?.gmbUrl && (
              <a
                href={publicInfo.gmbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 hover:text-[#c7d300] hover:border-[#c7d300]/40 transition-all"
              >
                <Globe size={15} className="text-[#c7d300]" /> Google Business Profile
              </a>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
              © {currentYear} SAIMUN SABIT. ALL RIGHTS RESERVED.
            </span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium">
              Built with <Heart size={13} className="fill-[#c7d300] text-[#c7d300]" /> by Saimun Sabit
            </span>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="group flex items-center gap-2 px-4 py-2 bg-[#1a1b14] border border-neutral-800 rounded-full hover:border-[#c7d300] hover:bg-[#c7d300] transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span className="text-xs font-black uppercase tracking-widest text-neutral-300 group-hover:text-black transition-colors">
              Back To Top
            </span>
            <div className="w-7 h-7 rounded-full bg-[#c7d300] text-black group-hover:bg-black group-hover:text-[#c7d300] flex items-center justify-center transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}