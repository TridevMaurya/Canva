import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CANVA_INVITE_LINK } from "@/lib/canvaLinks";

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvaLink?: string;
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, canvaLink }) => {
  const [adCompleted, setAdCompleted] = useState(false);
  const [followCompleted, setFollowCompleted] = useState(false);
  const { toast } = useToast();
  
  // Use the link provided or fall back to the constant
  const finalCanvaLink = canvaLink || CANVA_INVITE_LINK;

  const handleWatchAd = () => {
    // Simulate ad watching
    setTimeout(() => {
      setAdCompleted(true);
      toast({
        title: "Ad watched successfully!",
        description: "Thank you for supporting us.",
        variant: "default",
      });
    }, 2000);
  };

  const handleFollowInstagram = () => {
    // Open Instagram in a new tab
    window.open("https://www.instagram.com/tridev.maurya/", "_blank");
    
    // Set follow as completed
    setFollowCompleted(true);
    
    toast({
      title: "Instagram Opened!",
      description: "After following, return here to get your Canva Pro access.",
      variant: "default",
    });
  };
  
  const handleOpenCanva = () => {
    // Open Canva invite link
    window.open(finalCanvaLink, "_blank");
    
    // Close modal and reset state
    handleCloseAndReset();
    
    toast({
      title: "Canva Team Access Granted!",
      description: "You now have access to Canva Pro features.",
      variant: "default",
    });
  };

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setAdCompleted(false);
      setFollowCompleted(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAndReset}>
      <DialogContent className="glass-panel rounded-xl p-6 max-w-md mx-auto neon-border-blue bg-[#0D0D1A]/90 backdrop-blur-sm">
        <DialogTitle className="font-space font-bold text-2xl mb-2 neon-text-blue">
          Almost There!
        </DialogTitle>
        <DialogDescription className="text-text-light mb-6">
          Complete these steps to get your free Canva Pro access.
        </DialogDescription>
        
        <div className="mb-6 bg-space-blue p-4 rounded-lg">
          <div className="aspect-video bg-deep-space rounded-lg flex items-center justify-center">
            {adCompleted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neon-green flex flex-col items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-center mt-2">Ad watched successfully!</p>
              </motion.div>
            ) : (
              <div className="text-text-light/60 text-center flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Click "Watch Ad" to continue</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <div className="space-y-1">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${adCompleted ? "bg-neon-green text-black" : "bg-gray-700 text-gray-400"}`}>
                1
              </div>
              <span className={adCompleted ? "text-neon-green" : "text-gray-400"}>Watch Ad</span>
            </div>
            <Button 
              disabled={adCompleted}
              onClick={handleWatchAd}
              className="neon-button-purple rounded-lg py-3 px-6 font-space text-center w-full"
            >
              {adCompleted ? "Ad Completed ✓" : "Watch Ad"}
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${followCompleted ? "bg-neon-green text-black" : "bg-gray-700 text-gray-400"}`}>
                2
              </div>
              <span className={followCompleted ? "text-neon-green" : "text-gray-400"}>Follow on Instagram</span>
            </div>
            <Button 
              disabled={!adCompleted}
              onClick={handleFollowInstagram}
              className="neon-button-green rounded-lg py-3 px-6 font-space text-center w-full"
            >
              {followCompleted ? "Followed ✓" : "Follow on Instagram"}
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${followCompleted ? "bg-neon-green text-black" : "bg-gray-700 text-gray-400"}`}>
                3
              </div>
              <span className={followCompleted ? "text-neon-green" : "text-gray-400"}>Get Canva Pro Access</span>
            </div>
            <Button 
              disabled={!followCompleted}
              onClick={handleOpenCanva}
              className="neon-button-blue rounded-lg py-3 px-6 font-space text-center w-full"
            >
              Open Canva Pro
            </Button>
          </div>
          
          <button 
            onClick={handleCloseAndReset} 
            className="text-text-light/60 hover:text-text-light text-sm mt-4"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdModal;
