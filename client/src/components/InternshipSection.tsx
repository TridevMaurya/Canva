import React from "react";
import { motion } from "framer-motion";
import Card3D from "./Card3D";

const InternshipSection: React.FC = () => {
  return (
    <motion.section 
      className="py-12 px-4 md:px-12 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <div className="container mx-auto">
        <div className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden">
          {/* Holographic 3D Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-neon-purple opacity-20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-neon-green opacity-20 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <motion.h2 
              className="font-space font-bold text-3xl md:text-5xl mb-6 text-center neon-text-green"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Internship Opportunity
            </motion.h2>
            <motion.p 
              className="text-center text-text-light opacity-80 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Exclusive internship opportunity for <span className="neon-text-purple font-semibold">NIT Raipur</span> students. Join our tech team and gain valuable experience in the digital space.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              <Card3D className="rounded-xl overflow-hidden bg-space-blue p-6 neon-border-green">
                <h3 className="font-space font-bold text-xl mb-4 neon-text-green">Eligibility</h3>
                <ul className="space-y-2 text-text-light opacity-80">
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    Currently enrolled at NIT Raipur
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    Basic knowledge of web technologies
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    Passion for technology and design
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    Available for 3-6 months commitment
                  </li>
                </ul>
              </Card3D>
              
              <Card3D className="rounded-xl overflow-hidden bg-space-blue p-6 neon-border-purple">
                <h3 className="font-space font-bold text-xl mb-4 neon-text-purple">How to Apply</h3>
                <ul className="space-y-2 text-text-light opacity-80">
                  <li className="flex items-start">
                    <span className="text-neon-purple mr-2">1.</span>
                    Complete the application form below
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-purple mr-2">2.</span>
                    Upload your resume/CV
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-purple mr-2">3.</span>
                    Submit a brief statement of interest
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-purple mr-2">4.</span>
                    Wait for our team to contact you
                  </li>
                </ul>
              </Card3D>
              
              <Card3D className="rounded-xl overflow-hidden bg-space-blue p-6 neon-border-blue">
                <h3 className="font-space font-bold text-xl mb-4 neon-text-blue">Internship Benefits</h3>
                <ul className="space-y-2 text-text-light opacity-80">
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">★</span>
                    Certificate of completion
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">★</span>
                    Letter of recommendation
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">★</span>
                    Hands-on experience with latest tech
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">★</span>
                    Networking opportunities
                  </li>
                </ul>
              </Card3D>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default InternshipSection;
