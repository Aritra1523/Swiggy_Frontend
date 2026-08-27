// "use client"
// import { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Store,
//   MapPin,
//   Clock,
//   Star,
//   ChevronRight,
//   Search,
//   Filter,
//   Grid3x3,
//   List,
//   RefreshCw,
//   AlertCircle,
//   Coffee,
//   Utensils,
//   Building2,
//   ChevronLeft,
//   ChevronRight as ChevronRightIcon,
//   XCircle,
//   SlidersHorizontal,
//   Heart,
//   Share2,
//   Clock8,
//   Award,
//   Flame,
//   TrendingUp,
//   Sparkles,
//   CheckCircle2,
//   Zap,
//   Timer,
//   Bike,
//   ShoppingBag,
//   Users,
//   Sun,
//   Moon,
//   Pizza,
//   Sandwich,
//   Cake,
//   Coffee as CoffeeIcon,
//   IceCream,
//   Wine,
// } from "lucide-react";
// import { socket } from "@/lib/socket/socket";
// import Swal from "sweetalert2";
// import {Restaurant} from "@/typescript/userRestarunt/restarunt"
// import axiosInstance from "@/api/baseUrl/Api";


// // ============== Constants ==============
// const OUTLET_TYPES = [
//   { value: "All", label: "All", icon: Store },
//   { value: "Restaurant", label: "Restaurant", icon: Utensils },
//   { value: "Cafe", label: "Cafe", icon: Coffee },
//   { value: "Fast Food", label: "Fast Food", icon: Zap },
//   { value: "Bakery", label: "Bakery", icon: Building2 },
// ];

// const SORT_OPTIONS = [
//   { value: "relevance", label: "Relevance", icon: Sparkles },
//   { value: "rating", label: "Top Rated", icon: Award },
//   { value: "deliveryTime", label: "Fast Delivery", icon: Timer },
//   { value: "distance", label: "Nearest", icon: MapPin },
//   { value: "name", label: "Name A-Z", icon: Store },
// ];

// // Hero Carousel Images (Food categories with random images)
// const HERO_SLIDES = [
//   {
//     id: 1,
//     title: "Pizza Delivery",
//     subtitle: "Hot & Fresh Pizzas",
//     image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
//     color: "from-red-500/70 to-orange-500/70",
//     icon: Pizza,
//   },
//   {
//     id: 2,
//     title: "Burgers & Fries",
//     subtitle: "Crispy & Juicy",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
//     color: "from-amber-500/70 to-orange-600/70",
//     icon: Sandwich,
//   },
//   {
//     id: 3,
//     title: "Coffee & Cakes",
//     subtitle: "Freshly Brewed",
//     image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop",
//     color: "from-brown-500/70 to-amber-600/70",
//     icon: CoffeeIcon,
//   },
//   {
//     id: 4,
//     title: "Desserts",
//     subtitle: "Sweet Treats",
//     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=400&fit=crop",
//     color: "from-pink-500/70 to-purple-500/70",
//     icon: Cake,
//   },
//   {
//     id: 5,
//     title: "Ice Cream",
//     subtitle: "Cool & Refreshing",
//     image: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800&h=400&fit=crop",
//     color: "from-blue-500/70 to-cyan-500/70",
//     icon: IceCream,
//   },
// ];

// // ============== Sub-Components ==============

// // Hero Carousel Component
// const HeroCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const slideInterval = useRef<NodeJS.Timeout | null>(null);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
//   }, []);

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
//   }, []);

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   // Auto-slide
//   useEffect(() => {
//     if (!isPaused) {
//       slideInterval.current = setInterval(nextSlide, 4000);
//     }
//     return () => {
//       if (slideInterval.current) clearInterval(slideInterval.current);
//     };
//   }, [isPaused, nextSlide]);

//   return (
//     <div 
//       className="relative overflow-hidden rounded-3xl mb-6 shadow-xl"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* Slides */}
//       <div 
//         className="flex transition-transform duration-700 ease-out"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {HERO_SLIDES.map((slide) => {
//           const Icon = slide.icon;
//           return (
//             <div
//               key={slide.id}
//               className="min-w-full relative h-[200px] md:h-[280px] lg:h-[320px] flex-shrink-0"
//             >
//               <Image
//                 src={slide.image}
//                 alt={slide.title}
//                 fill
//                 className="object-cover"
//                 priority={slide.id === 1}
//               />
//               <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
//               <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
//                 <div className="text-white">
//                   <div className="flex items-center gap-3 mb-2">
//                     <Icon className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
//                     <span className="text-xs md:text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                       Order Now
//                     </span>
//                   </div>
//                   <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
//                     {slide.title}
//                   </h2>
//                   <p className="text-sm md:text-lg text-white/90 mt-1 drop-shadow-md">
//                     {slide.subtitle}
//                   </p>
//                   <button className="mt-3 md:mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 text-sm md:text-base border border-white/30 hover:scale-105">
//                     Explore Now →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
//         aria-label="Next slide"
//       >
//         <ChevronRightIcon className="w-4 h-4 md:w-6 md:h-6" />
//       </button>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
//         {HERO_SLIDES.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-300 rounded-full ${
//               currentSlide === index
//                 ? "w-6 md:w-8 h-1.5 md:h-2 bg-white"
//                 : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/50 hover:bg-white/80"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Slide Counter */}
//       <div className="absolute bottom-3 md:bottom-4 right-4 md:right-6 text-white/80 text-xs md:text-sm bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
//         {currentSlide + 1} / {HERO_SLIDES.length}
//       </div>
//     </div>
//   );
// };

// // Image Carousel for Restaurant Card
// const RestaurantImageCarousel = ({ 
//   images, 
//   name, 
//   isHovered,
//   isClosed,
// }: { 
//   images?: string[]; 
//   name: string; 
//   isHovered: boolean;
//   isClosed?: boolean;
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [imageError, setImageError] = useState(false);
//   const slideInterval = useRef<NodeJS.Timeout | null>(null);
  
//   // If no images or error, show initials
//   if (!images || images.length === 0 || imageError) {
//     const initials = name
//       .split(" ")
//       .map((word) => word[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//     return (
//       <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
//         {initials}
//       </div>
//     );
//   }

//   // Auto-slide only when hovered
//   useEffect(() => {
//     if (isHovered && images.length > 1) {
//       slideInterval.current = setInterval(() => {
//         setCurrentImageIndex((prev) => (prev + 1) % images.length);
//       }, 2000);
//     } else {
//       if (slideInterval.current) {
//         clearInterval(slideInterval.current);
//         slideInterval.current = null;
//       }
//     }
//     return () => {
//       if (slideInterval.current) {
//         clearInterval(slideInterval.current);
//         slideInterval.current = null;
//       }
//     };
//   }, [isHovered, images.length]);

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   return (
//     <div className="relative w-full h-full">
//       <Image
//         src={images[currentImageIndex] || images[0]}
//         alt={name}
//         fill
//         className="object-cover transition-transform duration-700"
//         onError={handleImageError}
//       />
      
//       {/* Blur Overlay for Closed Restaurants (like Swiggy) */}
//       {isClosed && (
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
//             <Clock className="w-10 h-10 text-white mx-auto mb-2" />
//             <p className="text-white font-bold text-lg">Closed</p>
//             <p className="text-white/70 text-xs">Currently unavailable</p>
//           </div>
//         </div>
//       )}
      
//       {/* Image Counter for multiple images */}
//       {images.length > 1 && !isClosed && (
//         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               className={`transition-all duration-300 rounded-full ${
//                 currentImageIndex === index
//                   ? "w-4 h-1 bg-white"
//                   : "w-1 h-1 bg-white/50"
//               }`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Image Count Badge */}
//       {images.length > 1 && !isClosed && (
//         <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
//           {currentImageIndex + 1}/{images.length}
//         </div>
//       )}
//     </div>
//   );
// };

// // Premium Skeleton Loading
// const RestaurantCardSkeleton = ({ variant = "grid" }: { variant?: "grid" | "list" }) => (
//   <div className={`bg-white rounded-2xl border border-gray-100 animate-pulse overflow-hidden ${
//     variant === "grid" ? "p-4" : "p-4 flex items-center gap-4"
//   }`}>
//     <div className={variant === "grid" ? "space-y-4" : "flex items-center gap-4 w-full"}>
//       <div className={`bg-gray-200 rounded-xl flex-shrink-0 ${
//         variant === "grid" ? "w-full h-48" : "w-24 h-24"
//       }`} />
//       <div className="flex-1 space-y-3">
//         <div className="h-5 bg-gray-200 rounded w-3/4" />
//         <div className="h-4 bg-gray-200 rounded w-1/2" />
//         <div className="flex gap-2">
//           <div className="h-6 bg-gray-200 rounded-full w-16" />
//           <div className="h-6 bg-gray-200 rounded-full w-16" />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Premium Badge
// const Badge = ({ 
//   children, 
//   variant = "primary",
//   icon: Icon,
//   className = "",
// }: { 
//   children: React.ReactNode;
//   variant?: "primary" | "success" | "warning" | "danger" | "info" | "purple";
//   icon?: any;
//   className?: string;
// }) => {
//   const variants = {
//     primary: "bg-orange-50 text-orange-600 border-orange-200",
//     success: "bg-green-50 text-green-600 border-green-200",
//     warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
//     danger: "bg-red-50 text-red-600 border-red-200",
//     info: "bg-blue-50 text-blue-600 border-blue-200",
//     purple: "bg-purple-50 text-purple-600 border-purple-200",
//   };

//   return (
//     <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
//       {Icon && <Icon className="w-3 h-3" />}
//       {children}
//     </span>
//   );
// };

// // Premium Status Badge
// const StatusBadge = ({ isOpen }: { isOpen: boolean }) => (
//   <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
//     isOpen
//       ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
//       : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200"
//   }`}>
//     <span className={`w-1.5 h-1.5 rounded-full ${
//       isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
//     }`} />
//     {isOpen ? "Open Now" : "Closed"}
//   </span>
// );

// // Rating Display
// const RatingDisplay = ({ rating, totalRatings }: { rating?: number; totalRatings?: number }) => {
//   if (!rating) return null;
  
//   return (
//     <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
//       <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
//       <span className="text-sm font-bold text-green-700">{rating.toFixed(1)}</span>
//       {totalRatings && (
//         <span className="text-xs text-gray-500">({totalRatings})</span>
//       )}
//     </div>
//   );
// };

// // Premium Restaurant Card
// const RestaurantCard = ({ 
//   restaurant, 
//   variant = "grid",
//   onFavoriteToggle,
// }: { 
//   restaurant: Restaurant;
//   variant?: "grid" | "list";
//   onFavoriteToggle?: (id: string) => void;
// }) => {
//   const [isFavorite, setIsFavorite] = useState(restaurant.isFavorite || false);
//   const [isHovered, setIsHovered] = useState(false);

//   const formatTime = (time: string) => {
//     if (!time) return "";
//     const [hours, minutes] = time.split(":");
//     const h = parseInt(hours);
//     const ampm = h >= 12 ? "PM" : "AM";
//     const h12 = h % 12 || 12;
//     return `${h12}:${minutes} ${ampm}`;
//   };

//   const getOpeningHours = () => {
//     const slot = restaurant.openingClosing?.slots?.[0];
//     if (!slot) return "Hours not available";
//     return `${formatTime(slot.open)} - ${formatTime(slot.close)}`;
//   };

//   const handleFavoriteClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//     onFavoriteToggle?.(restaurant._id);
//   };

//   // Determine if restaurant has special status
//   const hasSpecialStatus = restaurant.isFeatured || restaurant.isTrending || restaurant.isNew;
//   const isClosed = !restaurant.isOpen;

//   // Generate random images for each restaurant if not provided
//   const getRestaurantImages = (name: string): string[] => {
//     if (restaurant.images && restaurant.images.length > 0) {
//       return restaurant.images;
//     }
    
//     // Generate deterministic random images based on restaurant name
//     const seed = name.length;
//     const imageSets: Record<string, string[]> = {
//       pizza: [
//         "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=400&fit=crop",
//       ],
//       burger: [
//         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f9?w=600&h=400&fit=crop",
//       ],
//       cafe: [
//         "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
//       ],
//       indian: [
//         "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1565557623262-b5c2c3f66533?w=600&h=400&fit=crop",
//       ],
//       dessert: [
//         "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=400&fit=crop",
//         "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop",
//       ],
//     };

//     const keys = Object.keys(imageSets);
//     const index = seed % keys.length;
//     const key = keys[index];
//     return imageSets[key];
//   };

//   const images = getRestaurantImages(restaurant.restaurantName);

//   return (
//      <div
//     className={`group block bg-white rounded-2xl border shadow-sm overflow-hidden relative ${
//       isClosed
//         ? "border-gray-200 opacity-75 cursor-not-allowed"
//         : "border-gray-100 hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 cursor-pointer"
//     }`}
//     onMouseEnter={() => !isClosed && setIsHovered(true)}
//     onMouseLeave={() => !isClosed && setIsHovered(false)}
//     onClick={() => {
//       if (isClosed) return;

//       window.location.href = `/restaurant/${restaurant._id}`;
//     }}
//   >
//       {/* Special Status Banner */}
//       {hasSpecialStatus && !isClosed && (
//         <div className="absolute top-3 left-3 z-10 flex gap-1.5">
//           {restaurant.isFeatured && (
//             <Badge variant="primary" icon={Sparkles}>
//               Featured
//             </Badge>
//           )}
//           {restaurant.isTrending && (
//             <Badge variant="danger" icon={Flame}>
//               Trending
//             </Badge>
//           )}
//           {restaurant.isNew && (
//             <Badge variant="success" icon={CheckCircle2}>
//               New
//             </Badge>
//           )}
//         </div>
//       )}

//       {/* Favorite Button */}
//       <button
//         onClick={handleFavoriteClick}
//         className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
//       >
//         <Heart className={`w-4 h-4 transition-colors duration-300 ${
//           isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
//         }`} />
//       </button>

//       {/* Image Section with Carousel */}
//       <div className={`relative overflow-hidden ${
//         variant === "grid" ? "h-56" : "h-40"
//       } bg-gradient-to-br from-gray-100 to-gray-200`}>
//         <RestaurantImageCarousel
//           images={images}
//           name={restaurant.restaurantName}
//           isHovered={isHovered}
//           isClosed={isClosed}
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//         {/* Bottom Info Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <StatusBadge isOpen={restaurant.isOpen} />
//               {restaurant.discount && !isClosed && (
//                 <Badge variant="warning" icon={Zap}>
//                   {restaurant.discount}
//                 </Badge>
//               )}
//             </div>
//             {restaurant.distance && !isClosed && (
//               <Badge variant="info" icon={MapPin}>
//                 {restaurant.distance}
//               </Badge>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className={`p-4 ${isClosed ? "opacity-70" : ""}`}>
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex-1 min-w-0">
//             <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 text-lg truncate">
//               {restaurant.restaurantName}
//             </h3>
//             <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
//               <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
//               <span className="truncate">{restaurant.location}</span>
//             </div>
//           </div>
//           {!isClosed && <RatingDisplay rating={restaurant.rating} totalRatings={restaurant.totalRatings} />}
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
//           <Badge variant="purple" icon={Store}>
//             {restaurant.outletType}
//           </Badge>
//           <Badge variant="info" icon={Clock}>
//             {getOpeningHours()}
//           </Badge>
//           {restaurant.averageCost && !isClosed && (
//             <Badge variant="primary" icon={ShoppingBag}>
//               ₹{restaurant.averageCost} avg
//             </Badge>
//           )}
//           {isClosed && (
//             <Badge variant="danger" icon={Clock}>
//               Currently Unavailable
//             </Badge>
//           )}
//         </div>

//         {/* Cuisine Tags */}
//         {restaurant.cuisine && restaurant.cuisine.length > 0 && !isClosed && (
//           <div className="flex items-center gap-1.5 mt-2.5">
//             <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
//               {restaurant.cuisine.slice(0, 3).map((cuisine, index) => (
//                 <span
//                   key={index}
//                   className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 whitespace-nowrap"
//                 >
//                   {cuisine}
//                 </span>
//               ))}
//               {restaurant.cuisine.length > 3 && (
//                 <span className="text-xs text-gray-400 font-medium px-2">
//                   +{restaurant.cuisine.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Delivery Info */}
//         <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
//           {restaurant.deliveryTime && !isClosed && (
//             <div className="flex items-center gap-1.5 text-xs text-gray-500">
//               <Timer className="w-3.5 h-3.5 text-orange-500" />
//               <span className="font-medium text-gray-700">{restaurant.deliveryTime}</span>
//             </div>
//           )}
//           {restaurant.minimumOrder && !isClosed && (
//             <div className="flex items-center gap-1.5 text-xs text-gray-500">
//               <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
//               <span className="font-medium text-gray-700">Min ₹{restaurant.minimumOrder}</span>
//             </div>
//           )}
//           {restaurant.offers && restaurant.offers.length > 0 && !isClosed && (
//             <div className="flex items-center gap-1.5 text-xs text-orange-500">
//               <Flame className="w-3.5 h-3.5" />
//               <span className="font-medium">{restaurant.offers.length} offers</span>
//             </div>
//           )}
//           {isClosed && (
//             <div className="flex items-center gap-1.5 text-xs text-red-500">
//               <Clock className="w-3.5 h-3.5" />
//               <span className="font-medium">Unavailable</span>
//             </div>
//           )}
//         </div>

//         {/* Hover Action Buttons */}
       
//       </div>
//     </div>
//   );
// };

// // Filter Chip Component
// const FilterChip = ({
//   label,
//   icon: Icon,
//   active,
//   onClick,
//   count,
// }: {
//   label: string;
//   icon?: any;
//   active: boolean;
//   onClick: () => void;
//   count?: number;
// }) => (
//   <button
//     onClick={onClick}
//     className={`
//       group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
//       ${
//         active
//           ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
//           : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
//       }
//     `}
//   >
//     {Icon && <Icon className={`w-4 h-4 transition-colors ${
//       active ? "text-white" : "group-hover:text-orange-500"
//     }`} />}
//     <span>{label}</span>
//     {count !== undefined && count > 0 && (
//       <span
//         className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
//           active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600"
//         }`}
//       >
//         {count}
//       </span>
//     )}
//   </button>
// );

// // Sort Option Button
// const SortOption = ({
//   label,
//   icon: Icon,
//   active,
//   onClick,
// }: {
//   label: string;
//   icon?: any;
//   active: boolean;
//   onClick: () => void;
// }) => (
//   <button
//     onClick={onClick}
//     className={`
//       flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
//       ${
//         active
//           ? "bg-orange-50 text-orange-600 border border-orange-200"
//           : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
//       }
//     `}
//   >
//     {Icon && <Icon className="w-4 h-4" />}
//     {label}
//   </button>
// );

// // ============== Main Component ==============

// export default function RestaurantListPage() {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState("All");
//   const [sortBy, setSortBy] = useState("relevance");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [activeFilterCount, setActiveFilterCount] = useState(0);
//   const [socketConnected, setSocketConnected] = useState(false);

//   // ====== SOCKET CONNECTION (shared socket, same as FoodList) ======
//   useEffect(() => {
//     socket.connect();

//     const handleConnect = () => {
//       setSocketConnected(true);
//     };

//     const handleDisconnect = () => {
//       setSocketConnected(false);
//     };

//     // Live restaurant open/close status — same event FoodList listens for,
//     // so an owner toggling their shop reflects here on the "/" list page too.
//     const handleRestaurantStatus = (data: any) => {
//       setRestaurants((prevRestaurants) =>
//         prevRestaurants.map((restaurant) =>
//           restaurant._id === data._id
//             ? { ...restaurant, isOpen: data.isOpen }
//             : restaurant
//         )
//       );

//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3500,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener("mouseenter", Swal.stopTimer);
//           toast.addEventListener("mouseleave", Swal.resumeTimer);
//         },
//       });

//       Toast.fire({
//         icon: data.isOpen ? "success" : "error",
//         title: data.isOpen
//           ? `${data.restaurantName} just opened`
//           : `${data.restaurantName} is now closed`,
//       });
//     };

//     socket.on("connect", handleConnect);
//     socket.on("restaurant:status", handleRestaurantStatus);
//     socket.on("disconnect", handleDisconnect);

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("restaurant:status", handleRestaurantStatus);
//       socket.off("disconnect", handleDisconnect);
//       socket.disconnect();
//     };
//   }, []);

//   // Mock fetch function - using ORIGINAL restaurant names from your API
//  const fetchRestaurants = async (refresh = false) => {
//   try {
//     if (refresh) setIsRefreshing(true);
//     else setLoading(true);

//     setError(null);

//     const response = await axiosInstance.get("/user/restaurant-list");

//     setRestaurants(response.data.data || []);
//   } catch (err) {
//     setError(
//       err instanceof Error
//         ? err.message
//         : "Failed to load restaurants"
//     );
//   } finally {
//     setLoading(false);
//     setIsRefreshing(false);
//   }
// };

//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   // Scroll to top button
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Filter and sort restaurants
//   const filteredRestaurants = useMemo(() => {
//     let result = [...restaurants];

//     // Search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (r) =>
//           r.restaurantName.toLowerCase().includes(query) ||
//           r.location.toLowerCase().includes(query) ||
//           r.outletType.toLowerCase().includes(query) ||
//           r.cuisine?.some(c => c.toLowerCase().includes(query))
//       );
//     }

//     // Outlet type filter
//     if (selectedType !== "All") {
//       result = result.filter((r) => r.outletType === selectedType);
//     }

//     // Sort
//     switch (sortBy) {
//       case "name":
//         result.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
//         break;
//       case "rating":
//         result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       case "deliveryTime":
//         result.sort((a, b) => {
//           const aTime = parseInt(a.deliveryTime?.split("-")[0] || "60");
//           const bTime = parseInt(b.deliveryTime?.split("-")[0] || "60");
//           return aTime - bTime;
//         });
//         break;
//       case "distance":
//         result.sort((a, b) => {
//           const aDist = parseFloat(a.distance?.replace(" km", "") || "10");
//           const bDist = parseFloat(b.distance?.replace(" km", "") || "10");
//           return aDist - bDist;
//         });
//         break;
//       default:
//         // relevance - featured and trending first
//         result.sort((a, b) => {
//           const aScore = (a.isFeatured ? 10 : 0) + (a.isTrending ? 5 : 0) + (a.isNew ? 3 : 0);
//           const bScore = (b.isFeatured ? 10 : 0) + (b.isTrending ? 5 : 0) + (b.isNew ? 3 : 0);
//           return bScore - aScore;
//         });
//         break;
//     }

//     return result;
//   }, [restaurants, searchQuery, selectedType, sortBy]);

//   // Get counts for filter chips
//   const typeCounts = useMemo(() => {
//     const counts: Record<string, number> = {};
//     restaurants.forEach((r) => {
//       counts[r.outletType] = (counts[r.outletType] || 0) + 1;
//     });
//     return counts;
//   }, [restaurants]);

//   // Update active filter count
//   useEffect(() => {
//     let count = 0;
//     if (selectedType !== "All") count++;
//     if (searchQuery) count++;
//     setActiveFilterCount(count);
//   }, [selectedType, searchQuery]);

//   const handleFavoriteToggle = (id: string) => {
//     setRestaurants(prev =>
//       prev.map(r =>
//         r._id === id ? { ...r, isFavorite: !r.isFavorite } : r
//       )
//     );
//   };

//   const clearAllFilters = () => {
//     setSearchQuery("");
//     setSelectedType("All");
//     setSortBy("relevance");
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Premium Header Skeleton */}
//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 animate-pulse">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 bg-gray-200 rounded-2xl" />
//               <div>
//                 <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
//                 <div className="h-4 bg-gray-200 rounded w-64" />
//               </div>
//             </div>
//           </div>

//           {/* Hero Carousel Skeleton */}
//           <div className="h-[200px] md:h-[280px] lg:h-[320px] bg-gray-200 rounded-3xl mb-6 animate-pulse" />

//           {/* Filters Skeleton */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 animate-pulse">
//             <div className="flex flex-wrap gap-2">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <div key={i} className="h-12 bg-gray-200 rounded-xl w-28" />
//               ))}
//             </div>
//           </div>

//           {/* Cards Skeleton */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <RestaurantCardSkeleton key={i} />
//             ))}
//           </div>
//         </div>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
//           <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-10 h-10 text-red-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">
//             Oops! Something went wrong
//           </h3>
//           <p className="text-gray-500 text-sm">{error}</p>
//           <button
//             onClick={() => fetchRestaurants()}
//             className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
//           >
//             Try Again
//           </button>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Socket Connection Status */}
//         <div className="mb-4 flex items-center justify-end">
//           <div className={`flex items-center gap-2 text-xs ${
//             socketConnected ? "text-green-500" : "text-gray-400"
//           }`}>
//             <span className={`w-2 h-2 rounded-full ${
//               socketConnected ? "bg-green-500 animate-pulse" : "bg-gray-300"
//             }`} />
//             {socketConnected ? "Live Updates" : "Connecting..."}
//           </div>
//         </div>

//         {/* ====== HERO CAROUSEL ====== */}
//         <HeroCarousel />

//         {/* ====== PREMIUM HEADER ====== */}
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3" />
//           <div className="relative">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
//                   <Store className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     Restaurants Near You
//                     <span className="ml-2 text-sm font-normal text-gray-400">
//                       {filteredRestaurants.length} places
//                     </span>
//                   </h1>
//                   <p className="text-sm text-gray-500 flex items-center gap-2">
//                     <span>Discover the best restaurants in your area</span>
//                     <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                     <span className="flex items-center gap-1">
//                       <Sparkles className="w-3.5 h-3.5 text-orange-400" />
//                       Curated for you
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => fetchRestaurants(true)}
//                   disabled={isRefreshing}
//                   className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-all duration-200 disabled:opacity-50"
//                   title="Refresh"
//                 >
//                   <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
//                 </button>
//                 {activeFilterCount > 0 && (
//                   <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
//                     {activeFilterCount}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="mt-5 relative">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search for restaurants, cuisines, or locations..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder:text-gray-400"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//               {searchQuery && (
//                 <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-20 max-h-64 overflow-y-auto">
//                   <div className="text-xs text-gray-400 px-3 py-2 font-medium">
//                     Search results for "{searchQuery}"
//                   </div>
//                   {filteredRestaurants.slice(0, 5).map((r) => (
//                     <Link
//                       key={r._id}
//                       href={`/restaurant/${r._id}`}
//                       className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors"
//                     >
//                       <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xs">
//                         {r.restaurantName.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{r.restaurantName}</p>
//                         <p className="text-xs text-gray-500">{r.location}</p>
//                       </div>
//                     </Link>
//                   ))}
//                   {filteredRestaurants.length === 0 && (
//                     <div className="text-center py-6 text-gray-400 text-sm">
//                       No restaurants found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ====== PREMIUM FILTERS ====== */}
//         <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             {/* Type Filters */}
//             <div className="flex flex-wrap gap-2">
//               {OUTLET_TYPES.map((type) => (
//                 <FilterChip
//                   key={type.value}
//                   label={type.label}
//                   icon={type.icon}
//                   active={selectedType === type.value}
//                   onClick={() => setSelectedType(type.value)}
//                   count={type.value === "All" ? restaurants.length : typeCounts[type.value]}
//                 />
//               ))}
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-2">
//               {/* Sort Dropdown */}
//               <div className="relative group">
//                 <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all duration-200">
//                   <SlidersHorizontal className="w-4 h-4" />
//                   <span className="hidden sm:inline">Sort</span>
//                   <span className="text-xs text-gray-400">|</span>
//                   <span className="text-orange-500 font-semibold">
//                     {SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Relevance"}
//                   </span>
//                 </button>
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
//                   {SORT_OPTIONS.map((option) => (
//                     <SortOption
//                       key={option.value}
//                       label={option.label}
//                       icon={option.icon}
//                       active={sortBy === option.value}
//                       onClick={() => setSortBy(option.value)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* View Toggle */}
//               <div className="flex bg-gray-100 rounded-xl p-1">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2.5 rounded-lg transition-all duration-200 ${
//                     viewMode === "grid"
//                       ? "bg-white shadow-sm text-gray-900"
//                       : "text-gray-400 hover:text-gray-600"
//                   }`}
//                   title="Grid view"
//                 >
//                   <Grid3x3 className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2.5 rounded-lg transition-all duration-200 ${
//                     viewMode === "list"
//                       ? "bg-white shadow-sm text-gray-900"
//                       : "text-gray-400 hover:text-gray-600"
//                   }`}
//                   title="List view"
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Clear Filters */}
//               {(activeFilterCount > 0 || sortBy !== "relevance") && (
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors px-3 py-2 hover:bg-orange-50 rounded-lg"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ====== RESTAURANT RESULTS ====== */}
//         {filteredRestaurants.length === 0 ? (
//           <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-16 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Store className="w-12 h-12 text-gray-300" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No restaurants found
//               </h3>
//               <p className="text-gray-500 text-sm">
//                 {searchQuery
//                   ? `We couldn't find any restaurants matching "${searchQuery}".`
//                   : "No restaurants available in this area."}
//               </p>
//               {(searchQuery || selectedType !== "All") && (
//                 <button
//                   onClick={clearAllFilters}
//                   className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Results Stats */}
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm text-gray-500">
//                 Showing <span className="font-semibold text-gray-700">{filteredRestaurants.length}</span> restaurants
//                 {searchQuery && ` matching "${searchQuery}"`}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {filteredRestaurants.length === restaurants.length ? (
//                   "All restaurants displayed"
//                 ) : (
//                   `${filteredRestaurants.length} of ${restaurants.length}`
//                 )}
//               </p>
//             </div>

//             {/* Restaurant Grid */}
//             <div
//               className={
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
//                   : "space-y-4"
//               }
//             >
//               {filteredRestaurants.map((restaurant) => (
//                 <RestaurantCard
//                   key={restaurant._id}
//                   restaurant={restaurant}
//                   variant={viewMode}
//                   onFavoriteToggle={handleFavoriteToggle}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* ====== SCROLL TO TOP BUTTON ====== */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-110 group"
//         >
//           <ChevronRightIcon className="w-6 h-6 rotate-[-90deg] group-hover:-translate-y-0.5 transition-transform" />
//         </button>
//       )}
//     </main>
//   );
// }


"use client"
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Search,
  Filter,
  Grid3x3,
  List,
  RefreshCw,
  AlertCircle,
  Coffee,
  Utensils,
  Building2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  XCircle,
  SlidersHorizontal,
  Heart,
  Share2,
  Clock8,
  Award,
  Flame,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Zap,
  Timer,
  Bike,
  ShoppingBag,
  Users,
  Sun,
  Moon,
  Pizza,
  Sandwich,
  Cake,
  Coffee as CoffeeIcon,
  IceCream,
  Wine,
} from "lucide-react";
import { socket } from "@/lib/socket/socket";
import Swal from "sweetalert2";
import { Restaurant } from "@/typescript/userRestarunt/restarunt";
import axiosInstance from "@/api/baseUrl/Api";

// ============== Constants ==============
const OUTLET_TYPES = [
  { value: "All", label: "All", icon: Store },
  { value: "Restaurant", label: "Restaurant", icon: Utensils },
  { value: "Cafe", label: "Cafe", icon: Coffee },
  { value: "Fast Food", label: "Fast Food", icon: Zap },
  { value: "Bakery", label: "Bakery", icon: Building2 },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance", icon: Sparkles },
  { value: "rating", label: "Top Rated", icon: Award },
  { value: "deliveryTime", label: "Fast Delivery", icon: Timer },
  { value: "distance", label: "Nearest", icon: MapPin },
  { value: "name", label: "Name A-Z", icon: Store },
];

// Hero Carousel Images
const HERO_SLIDES = [
  {
    id: 1,
    title: "Pizza Delivery",
    subtitle: "Hot & Fresh Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
    color: "from-red-500/70 to-orange-500/70",
    icon: Pizza,
  },
  {
    id: 2,
    title: "Burgers & Fries",
    subtitle: "Crispy & Juicy",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
    color: "from-amber-500/70 to-orange-600/70",
    icon: Sandwich,
  },
  {
    id: 3,
    title: "Coffee & Cakes",
    subtitle: "Freshly Brewed",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop",
    color: "from-brown-500/70 to-amber-600/70",
    icon: CoffeeIcon,
  },
  {
    id: 4,
    title: "Desserts",
    subtitle: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=400&fit=crop",
    color: "from-pink-500/70 to-purple-500/70",
    icon: Cake,
  },
  {
    id: 5,
    title: "Ice Cream",
    subtitle: "Cool & Refreshing",
    image: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800&h=400&fit=crop",
    color: "from-blue-500/70 to-cyan-500/70",
    icon: IceCream,
  },
];

// ============== Sub-Components ==============

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative overflow-hidden rounded-3xl mb-6 shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => {
          const Icon = slide.icon;
          return (
            <div
              key={slide.id}
              className="min-w-full relative h-[200px] md:h-[280px] lg:h-[320px] flex-shrink-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
              <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
                    <span className="text-xs md:text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      Order Now
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg text-white/90 mt-1 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <button className="mt-3 md:mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 text-sm md:text-base border border-white/30 hover:scale-105">
                    Explore Now →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-6 md:w-8 h-1.5 md:h-2 bg-white"
                : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-3 md:bottom-4 right-4 md:right-6 text-white/80 text-xs md:text-sm bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
        {currentSlide + 1} / {HERO_SLIDES.length}
      </div>
    </div>
  );
};

// Image Carousel for Restaurant Card
const RestaurantImageCarousel = ({ 
  images, 
  name, 
  isHovered,
  isClosed,
}: { 
  images?: string[]; 
  name: string; 
  isHovered: boolean;
  isClosed?: boolean;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  
  if (!images || images.length === 0 || imageError) {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
        {initials}
      </div>
    );
  }

  useEffect(() => {
    if (isHovered && images.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
        slideInterval.current = null;
      }
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
        slideInterval.current = null;
      }
    };
  }, [isHovered, images.length]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src={images[currentImageIndex] || images[0]}
        alt={name}
        fill
        className="object-cover transition-transform duration-700"
        onError={handleImageError}
      />
      
      {isClosed && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
            <Clock className="w-10 h-10 text-white mx-auto mb-2" />
            <p className="text-white font-bold text-lg">Closed</p>
            <p className="text-white/70 text-xs">Currently unavailable</p>
          </div>
        </div>
      )}
      
      {images.length > 1 && !isClosed && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <span
              key={index}
              className={`transition-all duration-300 rounded-full ${
                currentImageIndex === index
                  ? "w-4 h-1 bg-white"
                  : "w-1 h-1 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && !isClosed && (
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
          {currentImageIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
};

// Premium Skeleton Loading
const RestaurantCardSkeleton = ({ variant = "grid" }: { variant?: "grid" | "list" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 animate-pulse overflow-hidden ${
    variant === "grid" ? "p-4" : "p-4 flex items-center gap-4"
  }`}>
    <div className={variant === "grid" ? "space-y-4" : "flex items-center gap-4 w-full"}>
      <div className={`bg-gray-200 rounded-xl flex-shrink-0 ${
        variant === "grid" ? "w-full h-48" : "w-24 h-24"
      }`} />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      </div>
    </div>
  </div>
);

// Premium Badge
const Badge = ({ 
  children, 
  variant = "primary",
  icon: Icon,
  className = "",
}: { 
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "purple";
  icon?: any;
  className?: string;
}) => {
  const variants = {
    primary: "bg-orange-50 text-orange-600 border-orange-200",
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    danger: "bg-red-50 text-red-600 border-red-200",
    info: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

// Premium Status Badge
const StatusBadge = ({ isOpen }: { isOpen: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
    isOpen
      ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
      : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200"
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${
      isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
    }`} />
    {isOpen ? "Open Now" : "Closed"}
  </span>
);

// Rating Display
const RatingDisplay = ({ rating, totalRatings }: { rating?: number; totalRatings?: number }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
      <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
      <span className="text-sm font-bold text-green-700">{rating.toFixed(1)}</span>
      {totalRatings && (
        <span className="text-xs text-gray-500">({totalRatings})</span>
      )}
    </div>
  );
};

// Premium Restaurant Card
const RestaurantCard = ({ 
  restaurant, 
  variant = "grid",
  onFavoriteToggle,
}: { 
  restaurant: Restaurant;
  variant?: "grid" | "list";
  onFavoriteToggle?: (id: string) => void;
}) => {
  // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL - NO CONDITIONAL RETURNS BEFORE THIS
  const [isFavorite, setIsFavorite] = useState(restaurant?.isFavorite || false);
  const [isHovered, setIsHovered] = useState(false);

  // Helper functions (not hooks, can be defined anywhere)
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getOpeningHours = () => {
    try {
      const slot = restaurant?.openingClosing?.slots?.[0];
      if (!slot) return "Hours not available";
      return `${formatTime(slot.open)} - ${formatTime(slot.close)}`;
    } catch (error) {
      return "Hours not available";
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(restaurant._id);
  };

  // Safe access to restaurant properties with fallbacks
  const isClosed = !restaurant?.isOpen;
  const hasSpecialStatus = restaurant?.isFeatured || restaurant?.isTrending || restaurant?.isNew;
  
  // Generate images for each restaurant if not provided
  const getRestaurantImages = (name: string): string[] => {
    if (restaurant?.images && restaurant.images.length > 0) {
      return restaurant.images;
    }
    
    const seed = name?.length || 0;
    const imageSets: Record<string, string[]> = {
      pizza: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=400&fit=crop",
      ],
      burger: [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f9?w=600&h=400&fit=crop",
      ],
      cafe: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
      ],
      indian: [
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565557623262-b5c2c3f66533?w=600&h=400&fit=crop",
      ],
      dessert: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop",
      ],
    };

    const keys = Object.keys(imageSets);
    const index = seed % keys.length;
    const key = keys[index] || "pizza";
    return imageSets[key] || imageSets.pizza;
  };

  const images = getRestaurantImages(restaurant?.restaurantName || "");

  // NOW RENDER - all hooks are called above, no conditional returns before this point
  return (
    <div
      className={`group block bg-white rounded-2xl border shadow-sm overflow-hidden relative ${
        isClosed
          ? "border-gray-200 opacity-75 cursor-not-allowed"
          : "border-gray-100 hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 cursor-pointer"
      }`}
      onMouseEnter={() => !isClosed && setIsHovered(true)}
      onMouseLeave={() => !isClosed && setIsHovered(false)}
      onClick={() => {
        if (isClosed || !restaurant?._id) return;
        window.location.href = `/restaurant/${restaurant._id}`;
      }}
    >
      {/* Special Status Banner */}
      {hasSpecialStatus && !isClosed && (
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {restaurant?.isFeatured && (
            <Badge variant="primary" icon={Sparkles}>
              Featured
            </Badge>
          )}
          {restaurant?.isTrending && (
            <Badge variant="danger" icon={Flame}>
              Trending
            </Badge>
          )}
          {restaurant?.isNew && (
            <Badge variant="success" icon={CheckCircle2}>
              New
            </Badge>
          )}
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Heart className={`w-4 h-4 transition-colors duration-300 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
        }`} />
      </button>

      {/* Image Section with Carousel */}
      <div className={`relative overflow-hidden ${
        variant === "grid" ? "h-56" : "h-40"
      } bg-gradient-to-br from-gray-100 to-gray-200`}>
        <RestaurantImageCarousel
          images={images}
          name={restaurant?.restaurantName || "Restaurant"}
          isHovered={isHovered}
          isClosed={isClosed}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge isOpen={restaurant?.isOpen || false} />
              {restaurant?.discount && !isClosed && (
                <Badge variant="warning" icon={Zap}>
                  {restaurant.discount}
                </Badge>
              )}
            </div>
            {restaurant?.distance && !isClosed && (
              <Badge variant="info" icon={MapPin}>
                {restaurant.distance}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-4 ${isClosed ? "opacity-70" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 text-lg truncate">
              {restaurant?.restaurantName || "Unknown Restaurant"}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{restaurant?.location || "Location not available"}</span>
            </div>
          </div>
          {!isClosed && <RatingDisplay rating={restaurant?.rating} totalRatings={restaurant?.totalRatings} />}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <Badge variant="purple" icon={Store}>
            {restaurant?.outletType || "Restaurant"}
          </Badge>
          <Badge variant="info" icon={Clock}>
            {getOpeningHours()}
          </Badge>
          {restaurant?.averageCost && !isClosed && (
            <Badge variant="primary" icon={ShoppingBag}>
              ₹{restaurant.averageCost} avg
            </Badge>
          )}
          {isClosed && (
            <Badge variant="danger" icon={Clock}>
              Currently Unavailable
            </Badge>
          )}
        </div>

        {/* Cuisine Tags */}
        {restaurant?.cuisine && restaurant.cuisine.length > 0 && !isClosed && (
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
              {restaurant.cuisine.slice(0, 3).map((cuisine, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 whitespace-nowrap"
                >
                  {cuisine}
                </span>
              ))}
              {restaurant.cuisine.length > 3 && (
                <span className="text-xs text-gray-400 font-medium px-2">
                  +{restaurant.cuisine.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Delivery Info */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          {restaurant?.deliveryTime && !isClosed && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Timer className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-medium text-gray-700">{restaurant.deliveryTime}</span>
            </div>
          )}
          {restaurant?.minimumOrder && !isClosed && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-medium text-gray-700">Min ₹{restaurant.minimumOrder}</span>
            </div>
          )}
          {restaurant?.offers && restaurant.offers.length > 0 && !isClosed && (
            <div className="flex items-center gap-1.5 text-xs text-orange-500">
              <Flame className="w-3.5 h-3.5" />
              <span className="font-medium">{restaurant.offers.length} offers</span>
            </div>
          )}
          {isClosed && (
            <div className="flex items-center gap-1.5 text-xs text-red-500">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">Unavailable</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter Chip Component
const FilterChip = ({
  label,
  icon: Icon,
  active,
  onClick,
  count,
}: {
  label: string;
  icon?: any;
  active: boolean;
  onClick: () => void;
  count?: number;
}) => (
  <button
    onClick={onClick}
    className={`
      group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
      ${
        active
          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
          : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
      }
    `}
  >
    {Icon && <Icon className={`w-4 h-4 transition-colors ${
      active ? "text-white" : "group-hover:text-orange-500"
    }`} />}
    <span>{label}</span>
    {count !== undefined && count > 0 && (
      <span
        className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// Sort Option Button
const SortOption = ({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: any;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${
        active
          ? "bg-orange-50 text-orange-600 border border-orange-200"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      }
    `}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

// ============== Main Component ==============

export default function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);

  // ====== SOCKET CONNECTION ======
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    const handleRestaurantStatus = (data: any) => {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant._id === data._id
            ? { ...restaurant, isOpen: data.isOpen }
            : restaurant
        )
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: data.isOpen ? "success" : "error",
        title: data.isOpen
          ? `${data.restaurantName} just opened`
          : `${data.restaurantName} is now closed`,
      });
    };

    socket.on("connect", handleConnect);
    socket.on("restaurant:status", handleRestaurantStatus);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("restaurant:status", handleRestaurantStatus);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, []);

  // Fetch restaurants from API
  const fetchRestaurants = async (refresh = false) => {
    try {
      if (refresh) setIsRefreshing(true);
      else setLoading(true);

      setError(null);

      const response = await axiosInstance.get("/user/restaurant-list");

      // Handle different response structures
      const restaurantData = response.data?.data || response.data || [];
      setRestaurants(Array.isArray(restaurantData) ? restaurantData : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load restaurants"
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.restaurantName?.toLowerCase().includes(query) ||
          r.location?.toLowerCase().includes(query) ||
          r.outletType?.toLowerCase().includes(query) ||
          r.cuisine?.some(c => c.toLowerCase().includes(query))
      );
    }

    if (selectedType !== "All") {
      result = result.filter((r) => r.outletType === selectedType);
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.restaurantName?.localeCompare(b.restaurantName) || 0);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "deliveryTime":
        result.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime?.split("-")[0] || "60");
          const bTime = parseInt(b.deliveryTime?.split("-")[0] || "60");
          return aTime - bTime;
        });
        break;
      case "distance":
        result.sort((a, b) => {
          const aDist = parseFloat(a.distance?.replace(" km", "") || "10");
          const bDist = parseFloat(b.distance?.replace(" km", "") || "10");
          return aDist - bDist;
        });
        break;
      default:
        result.sort((a, b) => {
          const aScore = (a.isFeatured ? 10 : 0) + (a.isTrending ? 5 : 0) + (a.isNew ? 3 : 0);
          const bScore = (b.isFeatured ? 10 : 0) + (b.isTrending ? 5 : 0) + (b.isNew ? 3 : 0);
          return bScore - aScore;
        });
        break;
    }

    return result;
  }, [restaurants, searchQuery, selectedType, sortBy]);

  // Get counts for filter chips
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    restaurants.forEach((r) => {
      counts[r.outletType] = (counts[r.outletType] || 0) + 1;
    });
    return counts;
  }, [restaurants]);

  // Update active filter count
  useEffect(() => {
    let count = 0;
    if (selectedType !== "All") count++;
    if (searchQuery) count++;
    setActiveFilterCount(count);
  }, [selectedType, searchQuery]);

  const handleFavoriteToggle = (id: string) => {
    setRestaurants(prev =>
      prev.map(r =>
        r._id === id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSortBy("relevance");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-2xl" />
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-64" />
              </div>
            </div>
          </div>
          <div className="h-[200px] md:h-[280px] lg:h-[320px] bg-gray-200 rounded-3xl mb-6 animate-pulse" />
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 animate-pulse">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-xl w-28" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => fetchRestaurants()}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Socket Connection Status */}
        <div className="mb-4 flex items-center justify-end">
          <div className={`flex items-center gap-2 text-xs ${
            socketConnected ? "text-green-500" : "text-gray-400"
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              socketConnected ? "bg-green-500 animate-pulse" : "bg-gray-300"
            }`} />
            {socketConnected ? "Live Updates" : "Connecting..."}
          </div>
        </div>

        {/* ====== HERO CAROUSEL ====== */}
        <HeroCarousel />

        {/* ====== PREMIUM HEADER ====== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3" />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Restaurants Near You
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      {filteredRestaurants.length} places
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span>Discover the best restaurants in your area</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      Curated for you
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchRestaurants(true)}
                  disabled={isRefreshing}
                  className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-all duration-200 disabled:opacity-50"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-5 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-20 max-h-64 overflow-y-auto">
                  <div className="text-xs text-gray-400 px-3 py-2 font-medium">
                    Search results for "{searchQuery}"
                  </div>
                  {filteredRestaurants.slice(0, 5).map((r) => (
                    <div
                      key={r._id}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                      onClick={() => {
                        window.location.href = `/restaurant/${r._id}`;
                      }}
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xs">
                        {r.restaurantName?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{r.restaurantName}</p>
                        <p className="text-xs text-gray-500">{r.location}</p>
                      </div>
                    </div>
                  ))}
                  {filteredRestaurants.length === 0 && (
                    <div className="text-center py-6 text-gray-400 text-sm">
                      No restaurants found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ====== PREMIUM FILTERS ====== */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {OUTLET_TYPES.map((type) => (
                <FilterChip
                  key={type.value}
                  label={type.label}
                  icon={type.icon}
                  active={selectedType === type.value}
                  onClick={() => setSelectedType(type.value)}
                  count={type.value === "All" ? restaurants.length : typeCounts[type.value]}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all duration-200">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-orange-500 font-semibold">
                    {SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Relevance"}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                  {SORT_OPTIONS.map((option) => (
                    <SortOption
                      key={option.value}
                      label={option.label}
                      icon={option.icon}
                      active={sortBy === option.value}
                      onClick={() => setSortBy(option.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {(activeFilterCount > 0 || sortBy !== "relevance") && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors px-3 py-2 hover:bg-orange-50 rounded-lg"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ====== RESTAURANT RESULTS ====== */}
        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No restaurants found
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? `We couldn't find any restaurants matching "${searchQuery}".`
                  : "No restaurants available in this area."}
              </p>
              {(searchQuery || selectedType !== "All") && (
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredRestaurants.length}</span> restaurants
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              <p className="text-xs text-gray-400">
                {filteredRestaurants.length === restaurants.length ? (
                  "All restaurants displayed"
                ) : (
                  `${filteredRestaurants.length} of ${restaurants.length}`
                )}
              </p>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  variant={viewMode}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ====== SCROLL TO TOP BUTTON ====== */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronRightIcon className="w-6 h-6 rotate-[-90deg] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </main>
  );
}