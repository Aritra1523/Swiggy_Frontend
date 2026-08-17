// "use client";

// import { useMyRestaurant } from "@/customHooks/owner/useFoodManagement";


// export default function OwnerDashboard() {
//   const {
//     data,
//     isLoading,
//     isError,
//   } = useMyRestaurant();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Failed to load restaurant</div>;
//   }

//   const restaurant = data?.data;

//   return (
//     <main className="min-h-screen p-8">
//       <h1 className="text-3xl font-bold">
//         Restaurant Owner Dashboard
//       </h1>

//       <p className="mt-3">
//         Restaurant: {restaurant?.restaurantName}
//       </p>

//       <p>
//         Location: {restaurant?.location}
//       </p>
//     </main>
//   );
// }

import OwnerDashboardPage from '@/componets/owner/OwnerDashboard/OwnerDashboardPage'
import React from 'react'

const page = () => {
  return (
    <div>
      <OwnerDashboardPage/>
    </div>
  )
}

export default page