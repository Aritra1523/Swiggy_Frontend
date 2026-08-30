// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion,Variants  } from "framer-motion";

// interface FoodBubble {
//   id: number;
//   name: string;
//   emoji: string;
//   image?: string;
//   x: number;
//   y: number;
//   size: number;
//   speed: number;
//   delay: number;
//   rotation: number;
//   floatRange: number;
//   opacity: number;
// }

// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// interface Sparkle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// export default function FoodBubbles() {
//   const [bubbles, setBubbles] = useState<FoodBubble[]>([]);
//   const [particles, setParticles] = useState<Particle[]>([]);
//   const [sparkles, setSparkles] = useState<Sparkle[]>([]);

//   const containerRef = useRef<HTMLDivElement>(null);

//   const [dimensions, setDimensions] = useState({
//     width: 0,
//     height: 0,
//   });

//   const foodItems = [
//     { name: "Pizza", emoji: "🍕" },
//     { name: "Burger", emoji: "🍔" },
//     { name: "Sushi", emoji: "🍣" },
//     { name: "Biryani", emoji: "🍛" },
//     { name: "Ice Cream", emoji: "🍦" },
//     { name: "Pasta", emoji: "🍝" },
//     { name: "Taco", emoji: "🌮" },
//     { name: "Donut", emoji: "🍩" },
//     { name: "Coffee", emoji: "☕" },
//     { name: "Pancake", emoji: "🥞" },
//     { name: "Cake", emoji: "🎂" },
//     { name: "Noodles", emoji: "🍜" },
//   ];

//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     setDimensions({
//       width,
//       height,
//     });

//     // -------------------------
//     // Food bubbles
//     // -------------------------

//     const numBubbles = Math.min(15, Math.floor(width / 80));

//     const newBubbles: FoodBubble[] = [];

//     for (let i = 0; i < numBubbles; i++) {
//       const food = foodItems[i % foodItems.length];

//       newBubbles.push({
//         id: i,
//         name: food.name,
//         emoji: food.emoji,
//         image: "",
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: 40 + Math.random() * 60,
//         speed: 1 + Math.random() * 3,
//         delay: Math.random() * 10,
//         rotation: Math.random() * 360,
//         floatRange: 20 + Math.random() * 40,
//         opacity: 0.6 + Math.random() * 0.4,
//       });
//     }

//     setBubbles(newBubbles);

//     // -------------------------
//     // Particles
//     // -------------------------

//     const newParticles: Particle[] = [];

//     for (let i = 0; i < 20; i++) {
//       newParticles.push({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         duration: 5 + Math.random() * 10,
//         delay: Math.random() * 10,
//       });
//     }

//     setParticles(newParticles);

//     // -------------------------
//     // Sparkles
//     // -------------------------

//     const newSparkles: Sparkle[] = [];

//     for (let i = 0; i < 10; i++) {
//       newSparkles.push({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         duration: 2 + Math.random() * 3,
//         delay: Math.random() * 5,
//       });
//     }

//     setSparkles(newSparkles);

//     // -------------------------
//     // Resize
//     // -------------------------

//     const handleResize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const bubbleVariants = {
//     float: (custom: FoodBubble) => ({
//       y: [
//         -custom.floatRange,
//         custom.floatRange,
//         -custom.floatRange,
//         custom.floatRange,
//         -custom.floatRange,
//       ],

//       x: [
//         0,
//         custom.floatRange * 0.3,
//         -custom.floatRange * 0.3,
//         custom.floatRange * 0.2,
//         0,
//       ],

//       rotate: [
//         0,
//         custom.rotation,
//         0,
//         -custom.rotation,
//         0,
//       ],

//       transition: {
//         duration: custom.speed * 3,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: custom.delay,
//       },
//     }),

//     pulse: (custom: FoodBubble) => ({
//       scale: [1, 1.1, 1, 0.9, 1],

//       transition: {
//         duration: custom.speed * 2,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: custom.delay * 0.5,
//       },
//     }),
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="absolute inset-0 pointer-events-none overflow-hidden"
//       style={{
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       {/* ================= FOOD BUBBLES ================= */}

//       {bubbles.map((bubble) => (
//         <motion.div
//           key={bubble.id}
//           className="absolute"
//           style={{
//             left: `${bubble.x}%`,
//             top: `${bubble.y}%`,
//             width: bubble.size,
//             height: bubble.size,
//             opacity: bubble.opacity,
//           }}
//           custom={bubble}
//           variants={bubbleVariants}
//           animate={["float", "pulse"]}
//         >
//           <div className="relative w-full h-full">

//             {/* Glow */}

//             <div
//               className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse"
//               style={{
//                 background:
//                   "radial-gradient(circle, #FF6B35, transparent)",
//                 transform: "scale(1.5)",
//               }}
//             />

//             {/* Food */}

//             <div className="relative w-full h-full flex items-center justify-center">
//               {bubble.image ? (
//                 <div className="relative w-full h-full">
//                   <Image
//                     src={bubble.image}
//                     alt={bubble.name}
//                     fill
//                     sizes="100px"
//                     className="object-contain drop-shadow-lg"
//                     style={{
//                       filter:
//                         "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
//                     }}
//                   />

//                   <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
//                 </div>
//               ) : (
//                 <span className="text-4xl md:text-5xl lg:text-6xl select-none">
//                   {bubble.emoji}
//                 </span>
//               )}
//             </div>

//             {/* Label */}

//             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] md:text-[10px] font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
//               {bubble.name}
//             </div>
//           </div>
//         </motion.div>
//       ))}

//       {/* ================= PARTICLES ================= */}

//       <div className="absolute inset-0 pointer-events-none">
//         {particles.map((particle) => (
//           <motion.div
//             key={`particle-${particle.id}`}
//             className="absolute w-1 h-1 rounded-full bg-orange-300/30"
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//             }}
//             animate={{
//               y: [0, -50, 0, 50, 0],
//               x: [0, 30, 0, -30, 0],
//               opacity: [0, 1, 0.5, 1, 0],
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* ================= SPARKLES ================= */}

//       <div className="absolute inset-0 pointer-events-none">
//         {sparkles.map((sparkle) => (
//           <motion.div
//             key={`sparkle-${sparkle.id}`}
//             className="absolute"
//             style={{
//               left: `${sparkle.x}%`,
//               top: `${sparkle.y}%`,
//             }}
//           >
//             <motion.div
//               className="w-1 h-1 bg-orange-400 rounded-full"
//               animate={{
//                 scale: [0, 1, 0],
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: sparkle.duration,
//                 repeat: Infinity,
//                 delay: sparkle.delay,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface FoodBubble {
  id: number;
  name: string;
  emoji: string;
  image?: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  rotation: number;
  floatRange: number;
  opacity: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function FoodBubbles() {
  const [bubbles, setBubbles] = useState<FoodBubble[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const foodItems = [
    { name: "Pizza", emoji: "🍕" },
    { name: "Burger", emoji: "🍔" },
    { name: "Sushi", emoji: "🍣" },
    { name: "Biryani", emoji: "🍛" },
    { name: "Ice Cream", emoji: "🍦" },
    { name: "Pasta", emoji: "🍝" },
    { name: "Taco", emoji: "🌮" },
    { name: "Donut", emoji: "🍩" },
    { name: "Coffee", emoji: "☕" },
    { name: "Pancake", emoji: "🥞" },
    { name: "Cake", emoji: "🎂" },
    { name: "Noodles", emoji: "🍜" },
  ];

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setDimensions({
      width,
      height,
    });

    // -------------------------
    // Food bubbles
    // -------------------------

    const numBubbles = Math.min(15, Math.floor(width / 80));

    const newBubbles: FoodBubble[] = [];

    for (let i = 0; i < numBubbles; i++) {
      const food = foodItems[i % foodItems.length];
      
      // Safety check for undefined food
      if (!food) continue;

      newBubbles.push({
        id: i,
        name: food.name,
        emoji: food.emoji,
        image: "",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 40 + Math.random() * 60,
        speed: 1 + Math.random() * 3,
        delay: Math.random() * 10,
        rotation: Math.random() * 360,
        floatRange: 20 + Math.random() * 40,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }

    setBubbles(newBubbles);

    // -------------------------
    // Particles
    // -------------------------

    const newParticles: Particle[] = [];

    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 10,
      });
    }

    setParticles(newParticles);

    // -------------------------
    // Sparkles
    // -------------------------

    const newSparkles: Sparkle[] = [];

    for (let i = 0; i < 10; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      });
    }

    setSparkles(newSparkles);

    // -------------------------
    // Resize
    // -------------------------

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // FIX: Add Variants type and use "as const" for ease values
  const bubbleVariants: Variants = {
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

      rotate: [
        0,
        custom.rotation,
        0,
        -custom.rotation,
        0,
      ],

      transition: {
        duration: custom.speed * 3,
        repeat: Infinity,
        ease: "easeInOut" as const,  // FIX: Added "as const"
        delay: custom.delay,
      },
    }),

    pulse: (custom: FoodBubble) => ({
      scale: [1, 1.1, 1, 0.9, 1],

      transition: {
        duration: custom.speed * 2,
        repeat: Infinity,
        ease: "easeInOut" as const,  // FIX: Added "as const"
        delay: custom.delay * 0.5,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* ================= FOOD BUBBLES ================= */}

      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
          }}
          custom={bubble}
          variants={bubbleVariants}
          animate={["float", "pulse"]}
        >
          <div className="relative w-full h-full">

            {/* Glow */}

            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, #FF6B35, transparent)",
                transform: "scale(1.5)",
              }}
            />

            {/* Food */}

            <div className="relative w-full h-full flex items-center justify-center">
              {bubble.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={bubble.image}
                    alt={bubble.name}
                    fill
                    sizes="100px"
                    className="object-contain drop-shadow-lg"
                    style={{
                      filter:
                        "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                    }}
                  />

                  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                </div>
              ) : (
                <span className="text-4xl md:text-5xl lg:text-6xl select-none">
                  {bubble.emoji}
                </span>
              )}
            </div>

            {/* Label */}

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] md:text-[10px] font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
              {bubble.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* ================= PARTICLES ================= */}

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 rounded-full bg-orange-300/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -50, 0, 50, 0],
              x: [0, 30, 0, -30, 0],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ================= SPARKLES ================= */}

      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={`sparkle-${sparkle.id}`}
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
          >
            <motion.div
              className="w-1 h-1 bg-orange-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}