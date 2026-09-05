import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Outfit ফন্ট ইম্পোর্ট করা হয়েছে
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import AppProvider from "@/provider/AppProvider";
import AuthProvider from "@/provider/AuthProvider";
import { Toaster } from "sonner";

// Outfit ফন্ট কনফিগারেশন
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saimun Sabit | Web Developer & SEO Expert",
  description: "I am Saimun Sabit, a passionate Web Developer and SEO Expert. Building high-performance websites and ranking #1 on search engines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={`${outfit.className} antialiased bg-[#15160e] text-white selection:bg-[#c7d300] selection:text-black`}
      >
        <NextTopLoader 
          color="#c7d300" 
          height={3} 
          showSpinner={false} 
          shadow="0 0 10px #c7d300,0 0 5px #c7d300"
        />
        <AppProvider>
          <AuthProvider>
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors position="bottom-right" />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}