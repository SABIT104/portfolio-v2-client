/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const dashboardUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5001/api/v1";
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Invalid admin credentials");
      }

      // Store auth session details
      if (result.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));
      }

      setSuccessMsg("Authentication Successful! Redirecting to Dashboard...");

      // Redirect to Dashboard after 1 second
      setTimeout(() => {
        window.location.href = dashboardUrl;
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to authenticate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#15160e] flex items-center justify-center p-4 selection:bg-[#c7d300] selection:text-black relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c7d300]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#c7d300]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-[#0f100a] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 space-y-8 backdrop-blur-xl"
      >
        {/* Brand & Portal Badge Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c7d300]/10 border border-[#c7d300]/30 text-[#c7d300] text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <ShieldCheck size={14} /> S@BIT ADMIN PORTAL
          </div>

          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            ADMIN <span className="text-[#c7d300]">LOGIN</span>
          </h1>

          <p className="text-neutral-400 text-xs font-mono">
            Enter your credentials to access the portfolio control center
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs font-mono flex items-center gap-3"
          >
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#c7d300]/10 border border-[#c7d300]/40 text-[#c7d300] p-4 rounded-2xl text-xs font-mono flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="shrink-0 text-[#c7d300]" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email / Username Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Mail size={13} className="text-[#c7d300]" /> Email Address / Username
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@sabit.com"
                className="w-full bg-[#15160e] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:border-[#c7d300] outline-none transition-all font-mono placeholder:text-neutral-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Lock size={13} className="text-[#c7d300]" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#15160e] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:border-[#c7d300] outline-none transition-all font-mono placeholder:text-neutral-600 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#c7d300] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <label className="flex items-center gap-2 text-neutral-400 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                defaultChecked
                className="rounded accent-[#c7d300] bg-neutral-900 border-neutral-800"
              />
              Remember session
            </label>
            <span className="text-[#c7d300]/80 text-[11px] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-[#c7d300] text-black font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-[#d9e600] shadow-lg shadow-[#c7d300]/20 transition-all duration-300 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2 font-mono">
                <Sparkles size={16} className="animate-spin" /> Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In to Admin Dashboard <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        {/* Back to Home Link */}
        <div className="pt-4 border-t border-white/5 text-center">
          <Link
            href="/"
            className="text-xs font-mono text-neutral-500 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Public Portfolio Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
