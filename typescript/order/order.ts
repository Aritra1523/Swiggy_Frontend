export interface CartFood {
  _id: string;
  itemName: string;
  image: string;
  basePrice: number;
  discountPrice: number;
  isVeg: boolean;
  isAvailable: boolean;
}

export interface CartRestaurant {
  _id: string;
  restaurantName: string;
  location: string;
  status: string;
}

export interface CartItem {
  food: CartFood;
  restaurant: CartRestaurant;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddCartPayload {
  foodId: string;
  quantity: number;
}

export interface AddCartResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data?: Cart;
}

export interface CartListResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data: Cart;
}

export interface DeleteCartItemResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data?: Cart;
}

export interface PlaceOrderPayload {
  address: string;
}

export interface PlaceOrderResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data?: Order;
}

export interface OrderItem {
  food: CartFood;
  restaurant: CartRestaurant;
  quantity: number;
  price?: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  address: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data: Order[];
}

export interface OrderResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data: Order;
}

export interface CancelOrderResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data?: Order;
}

export interface UpdateOrderStatusPayload {
  status: string;
}


// export interface OrderRestaurant {
//   _id: string;
//   restaurantName?: string;
//   location?: string;
// }
// export interface Order {
//   _id: string;
//   user: string;
//   restaurant: OrderRestaurant;
//   items: OrderItem[];
//   totalAmount: number;
//   address: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }