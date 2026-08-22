"use client";

import { motion } from "framer-motion";

export function RadarAnimation() {
  return (
    <div className="hidden md:flex absolute right-0 top-0 w-1/2 h-full items-center justify-center overflow-hidden border-l border-dashed border-border opacity-50">
      
      {/* Concentric Circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-foreground/10" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-foreground/10" />
      <div className="absolute w-[200px] h-[200px] rounded-full border border-foreground/10" />
      <div className="absolute w-[100px] h-[100px] rounded-full border border-foreground/10" />
      
      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-foreground/10" />
      <div className="absolute w-[1px] h-full bg-foreground/10" />
      
      {/* Sweeping radar arm */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-foreground/50 to-foreground origin-left rounded-full z-10"
        style={{ left: "50%", top: "50%", transformOrigin: "0% 50%" }}
      />
      
      {/* A static "blip" target */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.1, 1] }}
        className="absolute w-2 h-2 rounded-full bg-foreground shadow-[0_0_10px_#fff] z-20"
        style={{ left: "60%", top: "35%" }}
      />

    </div>
  );
}
