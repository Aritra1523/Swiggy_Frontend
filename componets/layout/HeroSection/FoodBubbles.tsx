"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FoodBubble {
  id: number;
  name: string;
  emoji: string;
  image: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  rotation: number;
  floatRange: number;
}

export default function FoodBubbles() {
  const [bubbles, setBubbles] = useState<FoodBubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Food items with emojis and images
 
   const foodItems = [
    { name: "Pizza", emoji: "🍕",  },
    { name: "Burger", emoji: "🍔",  },
    { name: "Sushi", emoji: "🍣",  },
    { name: "Biryani", emoji: "🍛",  },
    { name: "Ice Cream", emoji: "🍦", },
    { name: "Pasta", emoji: "🍝", },
    { name: "Taco", emoji: "🌮",  },
    { name: "Donut", emoji: "🍩",  },
    { name: "Coffee", emoji: "☕",  },
    { name: "Pancake", emoji: "🥞",  },
    { name: "Cake", emoji: "🎂",  },
    { name: "Noodles", emoji: "🍜",  },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });

      // Create random bubbles
      const newBubbles: FoodBubble[] = [];
      const numBubbles = Math.min(15, Math.floor(width / 80));

      for (let i = 0; i < numBubbles; i++) {
        const food = foodItems[i % foodItems.length];
        newBubbles.push({
          id: i,
          name: food.name,
          emoji: food.emoji,
          image: food.image,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 40 + Math.random() * 60,
          speed: 1 + Math.random() * 3,
          delay: Math.random() * 10,
          rotation: Math.random() * 360,
          floatRange: 20 + Math.random() * 40,
        });
      }

      setBubbles(newBubbles);
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bubble animation variants
  const bubbleVariants = {
    float: (custom: FoodBubble) => ({
      y: [
        -custom.floatRange,
        custom.floatRange,
        -custom.floatRange,
        custom.floatRange,
        -custom.floatRange,
      ],
      x: [
        0,
        custom.floatRange * 0.3,
        -custom.floatRange * 0.3,
        custom.floatRange * 0.2,
        0,
      ],
      rotate: [0, custom.rotation, 0, -custom.rotation, 0],
      transition: {
        duration: custom.speed * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom.delay,
      },
    }),
    pulse: (custom: FoodBubble) => ({
      scale: [1, 1.1, 1, 0.9, 1],
      transition: {
        duration: custom.speed * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom.delay * 0.5,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            opacity: 0.6 + Math.random() * 0.4,
          }}
          custom={bubble}
          variants={bubbleVariants}
          animate={["float", "pulse"]}
        >
          <div className="relative w-full h-full">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse"
              style={{
                background: `radial-gradient(circle, #FF6B35, transparent)`,
                transform: 'scale(1.5)',
              }}
            />

            {/* Food item with emoji or image */}
            <div className="relative w-full h-full flex items-center justify-center">
              {bubble.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={bubble.image}
                    alt={bubble.name}
                    fill
                    className="object-contain drop-shadow-lg"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    }}
                  />
                  {/* Bounce bubble effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                </div>
              ) : (
                <span className="text-4xl md:text-5xl lg:text-6xl select-none">
                  {bubble.emoji}
                </span>
              )}
            </div>

            {/* Label (visible on hover or desktop) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] md:text-[10px] font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
              {bubble.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Additional floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-orange-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0, 50, 0],
              x: [0, 30, 0, -30, 0],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <motion.div
              className="w-1 h-1 bg-orange-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}