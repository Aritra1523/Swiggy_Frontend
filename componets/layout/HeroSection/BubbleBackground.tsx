"use client";

import { useEffect, useRef } from "react";

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bubbles: Bubble[] = [];
    const emojis = ['🍕', '🍔', '🍣', '🍛', '🍦', '🍝', '🌮', '🍩', '☕', '🥞', '🎂', '🍜'];

    class Bubble {
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
      emoji: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 20 + Math.random() * 30;
        this.speed = 0.5 + Math.random() * 1.5;
        this.angle = Math.random() * Math.PI * 2;
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.opacity = 0.3 + Math.random() * 0.4;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * 0.3;
        this.angle += 0.01;

        if (this.y < -this.radius) {
          this.y = canvas.height + this.radius;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.radius * 1.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, 'rgba(255, 107, 53, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Emoji
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowColor = 'rgba(255, 107, 53, 0.3)';
        ctx.shadowBlur = 20;
        ctx.fillText(this.emoji, this.x, this.y);
        
        ctx.restore();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create bubbles
    const numBubbles = Math.min(20, Math.floor(window.innerWidth / 80));
    for (let i = 0; i < numBubbles; i++) {
      bubbles.push(new Bubble());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}