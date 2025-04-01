import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <motion.header 
      className="py-6 px-4 md:px-12 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <div className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0">
            <motion.h1 
              className="font-space font-bold text-4xl md:text-6xl neon-text-green tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🟢 NoPay Club <span className="text-text-light text-2xl md:text-3xl font-normal">by Tridev</span>
            </motion.h1>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <motion.button 
              className="neon-button-green rounded-full py-3 px-8 font-space font-bold tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CANVA TEAM
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
