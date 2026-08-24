export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
  otp: "/auth/otp",

  //user
  restaurantList:"/user/restaurant-list",
  restaurantFood:(restaurantId:string)=>`/user/restaurant/${restaurantId}/foods`,
  foodList: "/user/food_list",

  addCart: "/add/cart",
  cartList: "/list/cart",

  deleteCartItem: (foodId: string) => `/cart/item/${foodId}`,

  placeOrder: "/order/place",

  myOrders: "/orders/my-orders",

  orderDetails: (id: string) => `/orders/${id}`,

  cancelOrder: (id: string) => `/orders/${id}/cancel`,

  // updateOrderStatus: (id: string) => `/orders/${id}/status`,

  //Partner
  applyRestaurat: "/auth/apply/restaurant",
  restaruntOtp: "/restaurant/otp",
  restaruntDetails: "/restaurant/details",
  restaruntDocument: "/restaurant/documents",
  partnerCOntract: "/partner-contract",
  restaurantResendOtp: "/restaurant/resend-otp",



  
  //OWNER

  restaurantDetails: "/restaurant/details",
  myRestaurant: "/my-restaurant",
  restaurantfoodDetails: (id: string) => `/food/details/${id}`,

  foodlistOwner: "/food/list",
  addFood: "/add-food",
  editFood: (id: string) => `/food/edit/${id}`,
  deleteFood: (id: string) => `/food/${id}`,
  ownerOrders: "/restaurant/orders",
  toggleAvailability: (id: string) => `/${id}/toggle-availability`,
  updateOrderStatus: (id: string) => `/orders/${id}/status`,
  restaurantStatus: "/restaurant/status",
  pendingFoodCount: "/restaurant/foods/pending-count",
};
