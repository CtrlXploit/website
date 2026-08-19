"use client";

/**
 * Pure CSS Neo-Brutal Background
 * Completely replaces the Canvas/JS approach to guarantee 0% JS overhead 
 * and buttery smooth 60fps on any device (even unaccelerated Linux browsers).
 */
export function FlowFieldCanvas() {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0" 
      aria-hidden="true"
    >
      {/* 
        The grid layer. 
        Sized slightly larger than the viewport so we can pan it infinitely 
        without exposing the edges.
      */}
      <div 
        className="absolute top-[-48px] left-[-48px] w-[calc(100%+96px)] h-[calc(100%+96px)] opacity-[0.12] dark:opacity-[0.25]"
        style={{
          // Creates a stark brutalist dot grid using the current theme's ink color
          backgroundImage: `radial-gradient(circle at 3px 3px, hsl(var(--ink)) 2px, transparent 0)`,
          backgroundSize: '48px 48px',
          // Offloads all animation work directly to the GPU compositor
          animation: 'brutal-pan 20s linear infinite',
        }}
      />
      
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes brutal-pan {
            0% { transform: translate(0px, 0px); }
            100% { transform: translate(-48px, -48px); } /* Exactly one grid cell to loop seamlessly */
          }
        }
      `}</style>
    </div>
  );
}
