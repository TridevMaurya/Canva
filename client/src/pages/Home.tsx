import React, { useEffect } from "react";
import Header from "@/components/Header";
import BlogSection from "@/components/BlogSection";
import CanvaAccessSection from "@/components/CanvaAccessSection";
import InternshipSection from "@/components/InternshipSection";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import BannerAd from "@/components/BannerAd";
import { ThreeScene } from "@/lib/ThreeScene";

const Home: React.FC = () => {
  useEffect(() => {
    // Initialize Three.js scene
    const scene = new ThreeScene();
    return () => {
      // Cleanup Three.js scene
      scene.dispose();
    };
  }, []);

  return (
    <div className="text-text-light font-inter overflow-x-hidden grid-overlay min-h-screen">
      {/* Background Blobs (Will be rendered by Three.js) */}
      <div className="relative">
        <Header />
        <BannerAd position="top" />
        <BlogSection />
        <BannerAd position="middle" />
        <CanvaAccessSection />
        <InternshipSection />
        <BannerAd position="bottom" />
        <ApplicationForm />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
