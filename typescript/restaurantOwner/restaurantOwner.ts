export interface OwnerFood {
  _id: string;
  itemName: string;
  slug: string;
  description: string;
  image: string;
  foodType: "Starter" | "Main Course" | "Dessert" | "Beverage" | "Snack";
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
  isRecommended?: boolean;
  approvalStatus: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt?: string;
  restaurantName: string;
  restaurantEmail: string;
  restaurantPhone: string;
}

// Fields the owner actually submits — server derives slug, discountPercentage,
// restaurant (from the logged-in owner's token), etc.
export interface AddFoodPayload {
  itemName: string;
  description: string;
  foodType: OwnerFood["foodType"];
  category: string;
  cuisine: string;
  basePrice: number;
  discountPrice: number;
  gst: number;
  preparationTime: number;
  isAvailable: boolean;
  isRecommended: boolean;
  isVeg: boolean;
  image?: File;
}

// All fields optional — editmenu only overwrites what's sent
export type EditFoodPayload = Partial<AddFoodPayload>;

export interface OwnerRestaurant {
  _id: string;
  owner: string;
  restaurantName: string;
  ownerName: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  isOpen: boolean;
  outletType: string;
  onboardingStep: number;
  createdAt?: string;
  approvedAt?: string;
}

export interface FoodListPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface FoodListStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  available: number;
}

export interface FoodListResponse {
  success: boolean;
  fromCache?: boolean;
  message?: string;
  pagination: FoodListPagination;
  stats: FoodListStats;
  data: OwnerFood[];
}

// GET /food/details/:id returns this shape — note "restaurant" here is a
// plain string id, NOT the flattened restaurantName/Email/Phone that
// GET /food/list returns. The two endpoints genuinely disagree in shape.
export interface OwnerFoodDetails {
  _id: string;
  restaurant: string;
  itemName: string;
  slug: string;
  description: string;
  image: string;
  foodType: "Starter" | "Main Course" | "Dessert" | "Beverage" | "Snack";
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
}

export interface FoodDetailsResponse {
  success: boolean;
  data: OwnerFoodDetails;
}

export interface AddFoodResponse {
  success: boolean;
  message: string;
  data?: OwnerFood;
}

export interface MyRestaurantResponse {
  status: boolean;
  hasRestaurant: boolean;
  message: string;
  data?: OwnerRestaurant;
}

export interface DeleteFoodResponse {
  success: boolean;
  message: string;
}

export interface ToggleAvailabilityResponse {
  success: boolean;
  message: string;
  data: OwnerFood;
}

// --- Owner-side order types ---

export interface OwnerOrderItem {
  food: { _id: string; itemName: string; price?: number };
  quantity: number;
  price?: number;
  basePrice:number
}

export interface OwnerOrder {
  _id: string;
  user: string;
  restaurant: { _id: string; name: string };
  items: OwnerOrderItem[];
  totalAmount: number;
  status:
    | "placed"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface OwnerOrderListResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  data: OwnerOrder[];
}

export interface UpdateOrderStatusResponse {
  status: boolean;
  message: string;
  data: OwnerOrder;
}

export interface RestaurantStatusPayload {
  isOpen: boolean;
}

export interface RestaurantStatusResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    restaurantName: string;
    isOpen: boolean;
  };
}

export interface PendingFoodCountResponse {
  status: boolean;
  message: string;
  count: number;
}