// import FoodList from "@/componets/food/FoodList";
// import FoodSkeleton from "@/componets/food/FoodSkeleton";
// import { Suspense } from "react";


// export default function FoodsPage() {
//   return (
//     <Suspense fallback={<FoodSkeleton />}>
//       <FoodList />
//     </Suspense>
//   );
// }
import FoodList from "@/componets/food/FoodList";
import FoodSkeleton from "@/componets/food/FoodSkeleton";
import Footer from "@/componets/layout/Footer/Footer";
import Navbar from "@/componets/layout/Navbar/Navbar";
import { Suspense } from "react";


export default function FoodsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Suspense fallback={<FoodSkeleton />}>
          <FoodList />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}