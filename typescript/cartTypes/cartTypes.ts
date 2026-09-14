// types/cartTypes.ts
export interface Food {
  _id: string;
  itemName: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
  image?: string;
}

export interface Restaurant {
  _id: string;
  restaurantName: string;
  logo?: string;
  deliveryTime?: string;
  location?: string;
}

export interface CartItem {
  _id: string;
 
  food: Food;
  restaurant: Restaurant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems?: number;
  totalPrice?: number;
}

export interface GroupedRestaurant {
  restaurant: Restaurant;
  items: CartItem[];
}

export interface BillDetails {
  totalItems: number;
  totalPrice: number;
  deliveryFee: number;
  platformFee: number;
  gst: number;
  grandTotal: number;
}

export interface CheckoutData {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  restaurant: Restaurant;
  timestamp: number;
}
export interface CartHeaderProps {
  totalItems: number;
  grandTotal: number;
}

export interface CartItemProps {
  item: CartItem;
  isUpdating: boolean;
  onIncrement: (foodId: string) => void;
  onDecrement: (foodId: string) => void;
}
export interface OrderSummaryProps {
  billDetails: BillDetails;
  isCheckingOut: boolean;
  itemsCount: number;
  onCheckout: () => void;
}
export interface RestaurantGroupProps {
  group: GroupedRestaurant;
  updatingItemId: string | null;
  onIncrement: (foodId: string) => void;
  onDecrement: (foodId: string) => void;
}