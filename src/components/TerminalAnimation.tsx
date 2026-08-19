"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TerminalAnimation() {
  const [text, setText] = useState("");
  const fullText = "root@cyberlabs:~$ ./init_defense.sh\n[+] Initializing encrypted payload...\n[+] Bypassing security measures...\n[+] Access Granted.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] border border-border bg-[#050505] rounded-md overflow-hidden flex flex-col font-mono text-xs shadow-2xl relative">
      <div className="h-8 border-b border-border flex items-center px-4 gap-2 bg-[#0a0a0a]">
        <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
      </div>
      <div className="p-4 flex-1 text-foreground/80 whitespace-pre-wrap">
        {text}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-foreground ml-1 align-middle"
        />
      </div>
    </div>
  );
}
