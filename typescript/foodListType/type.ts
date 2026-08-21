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