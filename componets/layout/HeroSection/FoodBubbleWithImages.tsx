"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FoodItem {
  id: number;
  name: string;
  image: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

const foodImages = [
  { name: "Pizza", image: "/images/food/pizza.png" },
  { name: "Burger", image: "/images/food/burger.png" },
  { name: "Sushi", image: "/images/food/sushi.png" },
  { name: "Biryani", image: "/images/food/biryani.png" },
  { name: "Pasta", image: "/images/food/pasta.png" },
  { name: "Ice Cream", image: "/images/food/icecream.png" },
];

export default function FoodBubbleWithImages() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const items: FoodItem[] = [];
    const count = Math.min(8, Math.floor(width / 100));

    for (let i = 0; i < count; i++) {
      const food = foodImages[i % foodImages.length];
      items.push({
        id: i,
        name: food.name,
        image: food.image,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        size: 50 + Math.random() * 60,
        speed: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      });
    }

    setFoodItems(items);

    const handleResize = () => {
      // Recalculate on resize if needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {foodItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: item.speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200/30 to-orange-400/10 blur-xl animate-pulse" />
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(255, 107, 53, 0.2))',
              }}
            />
            <div className="absolute -inset-2 rounded-full border border-orange-200/20 animate-ping" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}