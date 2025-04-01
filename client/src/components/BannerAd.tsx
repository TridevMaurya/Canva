import React from "react";
import { motion } from "framer-motion";

interface BannerAdProps {
  position: "top" | "middle" | "bottom";
}

const BannerAd: React.FC<BannerAdProps> = ({ position }) => {
  // Different styles based on position
  const getStyle = () => {
    switch (position) {
      case "top":
        return "mt-4 mb-8";
      case "middle":
        return "my-12";
      case "bottom":
        return "mt-8 mb-4";
      default:
        return "my-8";
    }
  };

  return (
    <div className={`container mx-auto ${getStyle()}`}>
      <motion.div
        className="w-full h-24 md:h-32 glass-panel rounded-xl overflow-hidden relative neon-border-purple p-2 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-neon-purple/5 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <p className="text-text-light opacity-80 text-sm mb-2">Advertisement Space</p>
          <p className="font-space font-bold text-xl neon-text-purple">Your Ad Could Be Here</p>
          <p className="text-text-light/60 text-xs mt-1">Contact us to place your banner</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerAd;