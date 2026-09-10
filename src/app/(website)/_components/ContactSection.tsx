/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Dribbble,
  Github,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Loader2,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UpdatedContactSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const devServices = [
    { id: "web-dev", label: "Web Development" },
    { id: "web-design", label: "Web Design" },
    { id: "mobile-design", label: "Mobile App Design" },
  ];

  const seoServices = [
    { id: "technical-seo", label: "Technical SEO" },
    { id: "on-page-seo", label: "On-Page SEO" },
    { id: "off-page-seo", label: "Off-Page SEO" },
    { id: "local-seo", label: "Local SEO" },
    { id: "seo-audit", label: "Full SEO Audit" },
  ];

  const otherServices = [
    { id: "collaboration", label: "Collaboration" },
    { id: "others", label: "Others" },
  ];

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to send message");
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Message sent successfully!");
      setSelectedServices([]);
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong!");
    },
  });

  const handleServiceChange = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements as any;

    const payload = {
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      email: elements.email.value,
      phoneNumber: elements.phoneNumber.value,
      services: selectedServices,
      message: elements.message.value,
      status: "Pending",
    };

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    mutation.mutate(payload);
    form.reset();
  };

  const { data: publicInfo } = useQuery({
    queryKey: ["public-contact-info"],
    queryFn: async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5001/api/v1";
      const res = await fetch(`${backendUrl}/contact/get-public-info`);
      const json = await res.json();
      return json?.data || {};
    },
  });

  const contactCards = [
    {
      icon: <Mail className="text-[#c7d300]" size={20} />,
      label: "You can Email Me Here",
      value: publicInfo?.email || "saimunsabit767@gmail.com",
      href: `mailto:${publicInfo?.email || "saimunsabit767@gmail.com"}`,
      external: false,
    },
    {
      icon: <Phone className="text-[#c7d300]" size={20} />,
      label: "Give Me a Call on",
      value: publicInfo?.phone || "+880 1797475204",
      href: `tel:${publicInfo?.phone || "+8801797475204"}`,
      external: false,
    },
    {
      icon: <MapPin className="text-[#c7d300]" size={20} />,
      label: "Location",
      value: publicInfo?.location || "Dhaka, Bangladesh",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(publicInfo?.location || "Dhaka, Bangladesh")}`,
      external: true,
    },
    {
      icon: <Globe className="text-[#c7d300]" size={20} />,
      label: "Google My Business",
      value: publicInfo?.gmbTitle || "Saimun Sabit | Web Developer & SEO Expert",
      href: publicInfo?.gmbUrl || "https://share.google/xVIlf56ciUTodaBZT",
      external: true,
    },
  ];

  // 8 Social links with slightly smaller 17px icon sizes
  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={17} />, href: publicInfo?.facebook || "https://facebook.com", bg: "#1877F2" },
    { name: "LinkedIn", icon: <Linkedin size={17} />, href: publicInfo?.linkedin || "https://linkedin.com", bg: "#0077B5" },
    { name: "GitHub", icon: <Github size={17} />, href: publicInfo?.github || "https://github.com", bg: "#333333" },
    { name: "Instagram", icon: <Instagram size={17} />, href: publicInfo?.instagram || "https://instagram.com", bg: "#E4405F" },
    { name: "YouTube", icon: <Youtube size={17} />, href: publicInfo?.youtube || "https://youtube.com", bg: "#FF0000" },
    { name: "Twitter", icon: <Twitter size={17} />, href: publicInfo?.twitter || "https://twitter.com", bg: "#1DA1F2" },
    {
      name: "Pinterest",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z"/>
        </svg>
      ),
      href: publicInfo?.pinterest || "https://pinterest.com",
      bg: "#E60023",
    },
    { name: "Dribbble", icon: <Dribbble size={17} />, href: publicInfo?.dribbble || "https://dribbble.com", bg: "#EA4C89" },
  ];

  return (
    <section className="bg-[#15160e] pt-20 pb-12 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
          >
            Get In <span className="text-[#c7d300]">Touch</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Side: Contact Cards & Social Profiles */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              {contactCards.map((card, index) => (
                <motion.a
                  key={index}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between p-5 md:p-6 bg-[#1a1b14] border border-neutral-800 hover:border-[#c7d300]/30 transition-all duration-300 rounded-xl"
                >
                  <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <div className="p-3 bg-neutral-900 rounded-lg shrink-0">{card.icon}</div>
                    <div className="overflow-hidden min-w-0">
                      <p className="text-neutral-500 text-[9px] uppercase font-bold tracking-widest mb-1">{card.label}</p>
                      <p className="text-white font-semibold text-sm md:text-base truncate">{card.value}</p>
                    </div>
                  </div>
                  <div className="p-2.5 bg-neutral-800 group-hover:bg-[#c7d300] rounded-md transition-all shrink-0 ml-3">
                    <ArrowRight size={16} className="text-white group-hover:text-black" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Profile Section (Slightly Smaller & Compact 4x2 Grid Matrix) */}
            <div className="pt-4 space-y-4">
              <h5 className="text-white font-bold text-xs tracking-widest uppercase ml-1">My Social Profiles</h5>
              <div className="bg-[#1a1b14] border border-neutral-800 p-4 md:p-5 w-full rounded-2xl shadow-xl">
                <div className="grid grid-cols-4 gap-2.5 md:gap-3 max-w-[280px]">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      whileHover={{ y: -3, scale: 1.05 }}
                      style={{ background: social.bg }}
                      className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl text-white transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-[#1a1b14] border border-neutral-800 p-6 md:p-10 shadow-2xl order-1 lg:order-2 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Name & Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
                <input name="firstName" required type="text" placeholder="First Name" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-700 rounded-xl" />
                <input name="lastName" required type="text" placeholder="Last Name" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-700 rounded-xl" />
                <input name="email" required type="email" placeholder="Email Address" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-700 rounded-xl" />
                <input name="phoneNumber" required type="text" placeholder="Phone Number" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-700 rounded-xl" />
              </div>

              {/* Categorized Service Selection */}
              <div className="space-y-4">
                <h5 className="text-white font-bold text-xs tracking-widest uppercase ml-1">Why are you contacting me?</h5>
                <div className="bg-[#11120d] border border-neutral-800 p-5 md:p-7 rounded-2xl space-y-6">

                  {/* Section 1: Development & Design */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c7d300]"></span>
                      <span className="text-[#c7d300] text-[11px] font-black uppercase tracking-wider">
                        Development & Design
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {devServices.map((service) => {
                        const isSelected = selectedServices.includes(service.label);
                        return (
                          <div
                            key={service.id}
                            onClick={() => handleServiceChange(service.label)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#c7d300]/10 border-[#c7d300] text-[#c7d300]"
                                : "bg-[#181912] border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              id={service.id}
                              checked={isSelected}
                              onChange={() => {}}
                              className="w-4 h-4 border-2 border-neutral-600 bg-neutral-900 checked:bg-[#c7d300] checked:border-[#c7d300] appearance-none rounded cursor-pointer transition-all shrink-0"
                            />
                            <label
                              htmlFor={service.id}
                              className="cursor-pointer text-xs font-semibold tracking-wide whitespace-nowrap"
                            >
                              {service.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: SEO Services */}
                  <div className="space-y-3 pt-4 border-t border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c7d300]"></span>
                      <span className="text-[#c7d300] text-[11px] font-black uppercase tracking-wider">
                        SEO Services
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {seoServices.map((service) => {
                        const isSelected = selectedServices.includes(service.label);
                        return (
                          <div
                            key={service.id}
                            onClick={() => handleServiceChange(service.label)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#c7d300]/10 border-[#c7d300] text-[#c7d300]"
                                : "bg-[#181912] border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              id={service.id}
                              checked={isSelected}
                              onChange={() => {}}
                              className="w-4 h-4 border-2 border-neutral-600 bg-neutral-900 checked:bg-[#c7d300] checked:border-[#c7d300] appearance-none rounded cursor-pointer transition-all shrink-0"
                            />
                            <label
                              htmlFor={service.id}
                              className="cursor-pointer text-xs font-semibold tracking-wide whitespace-nowrap"
                            >
                              {service.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3: General & Others */}
                  <div className="space-y-3 pt-4 border-t border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c7d300]"></span>
                      <span className="text-[#c7d300] text-[11px] font-black uppercase tracking-wider">
                        General & Others
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {otherServices.map((service) => {
                        const isSelected = selectedServices.includes(service.label);
                        return (
                          <div
                            key={service.id}
                            onClick={() => handleServiceChange(service.label)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#c7d300]/10 border-[#c7d300] text-[#c7d300]"
                                : "bg-[#181912] border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              id={service.id}
                              checked={isSelected}
                              onChange={() => {}}
                              className="w-4 h-4 border-2 border-neutral-600 bg-neutral-900 checked:bg-[#c7d300] checked:border-[#c7d300] appearance-none rounded cursor-pointer transition-all shrink-0"
                            />
                            <label
                              htmlFor={service.id}
                              className="cursor-pointer text-xs font-semibold tracking-wide whitespace-nowrap"
                            >
                              {service.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-3">
                <textarea name="message" required rows={5} placeholder="Tell me about your project or inquiry..." className="w-full bg-[#11120d] border border-neutral-800 py-5 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-700 resize-none rounded-xl"></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={mutation.isPending}
                className="w-full h-14 md:h-[65px] bg-[#c7d300] text-black text-[13px] md:text-[14px] border-2 border-[#c7d300] uppercase font-black hover:bg-transparent hover:text-white transition-all duration-500 flex items-center justify-center gap-3 rounded-xl cursor-pointer"
              >
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}