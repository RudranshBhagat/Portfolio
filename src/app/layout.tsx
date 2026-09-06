import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import TransitionRouter from "@/components/TransitionRouter";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Rudransh Bhagat | Creative Developer",
  description:
    "Creative web developer crafting beautiful and engaging digital experiences. Specializing in React, Next.js, Three.js, GSAP, and modern web technologies.",
  authors: [{ name: "Rudransh Bhagat" }],
  keywords: [
    "web developer",
    "react",
    "next.js",
    "portfolio",
    "creative developer",
    "gsap",
    "three.js",
  ],
  icons: {
    icon: "/fav1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <SmoothScroll />
        <AppProvider>
          <TransitionRouter>
            <Navbar />
            <LoadingScreen>{children}</LoadingScreen>
          </TransitionRouter>
        </AppProvider>
      </body>
    </html>
  );
}
