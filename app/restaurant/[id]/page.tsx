"use client";

import { useParams } from "next/navigation";
import FoodList from "@/componets/food/FoodList";
import Navbar from "@/componets/layout/Navbar/Navbar";
import Footer from "@/componets/layout/Footer/Footer";

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <FoodList restaurantId={restaurantId} />
      {/* <Footer /> */}
    </main>
  );
}