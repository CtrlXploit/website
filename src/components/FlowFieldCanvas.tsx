"use client";

import { useEffect, useRef } from "react";

/**
 * Perlin noise flow field with trailing particles.
 * Renders ~2000 amber-tinted particles flowing through a vector field.
 * The effect looks like data flowing through a network — organic, alive.
 */

// Simple 2D Perlin noise implementation
class PerlinNoise {
  private perm: number[];

  constructor() {
    const p = Array.from({ length: 256 }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j]!, p[i]!];
    }
    this.perm = [...p, ...p];
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -v : v);
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);

    const aa = this.perm[this.perm[X]! + Y]!;
    const ab = this.perm[this.perm[X]! + Y + 1]!;
    const ba = this.perm[this.perm[X + 1]! + Y]!;
    const bb = this.perm[this.perm[X + 1]! + Y + 1]!;

    return this.lerp(
      this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
      this.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
      v
    );
  }
}

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function FlowFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const perlin = new PerlinNoise();
    const PARTICLE_COUNT = 1500;
    const NOISE_SCALE = 0.003;
    const SPEED = 1.5;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let time = 0;

    let voidColor = "48, 20%, 95%";
    let inkColor = "0, 0%, 0%";

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      const v = style.getPropertyValue("--void").trim().replace(/ /g, ", ");
      const i = style.getPropertyValue("--ink").trim().replace(/ /g, ", ");
      if (v && i) {
        voidColor = v;
        inkColor = i;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateColors();
      
      // Reset trail canvas
      ctx.fillStyle = `hsl(${voidColor})`;
      ctx.fillRect(0, 0, width, height);
    };

    const createParticle = (): Particle => {
      const maxLife = 120 + Math.random() * 180;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        prevX: 0,
        prevY: 0,
        speed: 0.5 + Math.random() * SPEED,
        opacity: 0.1 + Math.random() * 0.4,
        life: Math.random() * maxLife,
        maxLife,
      };
    };

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    };

    const tick = () => {
      if (still) return;
      time += 0.002;

      // Fade trail — darker overlay gives longer trails
      ctx.fillStyle = `hsla(${voidColor}, 0.08)`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.prevX = p.x;
        p.prevY = p.y;

        // Two octaves of noise for more organic flow
        const angle =
          perlin.noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE + time) *
            Math.PI *
            4 +
          perlin.noise(
            p.x * NOISE_SCALE * 2 + 100,
            p.y * NOISE_SCALE * 2 + time * 0.5
          ) *
            Math.PI *
            2;

        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life++;

        // Life cycle fade
        const lifeRatio = p.life / p.maxLife;
        const lifeFade =
          lifeRatio < 0.1
            ? lifeRatio / 0.1
            : lifeRatio > 0.9
              ? (1 - lifeRatio) / 0.1
              : 1;

        // Reset if out of bounds or expired
        if (
          p.x < -10 ||
          p.x > width + 10 ||
          p.y < -10 ||
          p.y > height + 10 ||
          p.life > p.maxLife
        ) {
          Object.assign(p, createParticle());
          p.prevX = p.x;
          p.prevY = p.y;
          continue;
        }

        // Draw trail line
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${inkColor}, ${p.opacity * lifeFade * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      frame = requestAnimationFrame(tick);
    };

    init();

    if (still) {
      // Draw a single static frame for reduced-motion
      for (let i = 0; i < 300; i++) {
        tick();
      }
    } else {
      frame = requestAnimationFrame(tick);
    }

    const handleResize = () => {
      resize();
      // Redistribute particles
      for (const p of particles) {
        if (p.x > width || p.y > height) {
          Object.assign(p, createParticle());
        }
      }
    };

    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      updateColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
