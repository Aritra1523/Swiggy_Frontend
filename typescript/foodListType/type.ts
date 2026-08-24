export interface RestaurantInfo {
  _id: string;
  restaurantName: string;
  location: string;
  status: string;
  isOpen: boolean;
}

export interface Food {
  _id: string;

  restaurant: RestaurantInfo;

  itemName: string;
  slug: string;
  description: string;
  image: string;

  foodType: string;
  isVeg: boolean;

  category: string;
  cuisine: string;

  basePrice: number;
  discountPrice: number;
  discountPercentage: number;

  gst: number;
  preparationTime: number;

  rating: number;
  totalRatings: number;
  totalOrders: number;

  isAvailable: boolean;
  isRecommended: boolean;
  isDeleted: boolean;

  approvalStatus: "pending" | "approved" | "rejected";

  approvedAt: string | null;
  rejectedReason: string;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

export interface FoodListResponse {
  success: boolean;
  fromCache: boolean;
  message: string;
  data: Food[];
}
// types/restaurant.ts

export interface RestaurantResponse {
  success: boolean;
  fromCache: boolean;
  message: string;
  data: Restaurant[];
}

export interface Restaurant {
  _id: string;
  restaurantName: string;
  location: string;
  workingDays: string[];
  isOpen: boolean;
  status: "approved" | "pending" | "rejected";
  outletType: "Restaurant" | "Cafe";
  openingClosing: OpeningClosing;
}

export interface OpeningClosing {
  sameForAllDays: boolean;
  slots: OpeningSlot[];
}

export interface OpeningSlot {
  open: string;
  close: string;
  _id: string;
}