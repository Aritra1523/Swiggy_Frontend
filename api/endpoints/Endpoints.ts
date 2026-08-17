export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
  otp: "/auth/otp",

  //user
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

  //OWNER

  restaurantDetails: "/restaurant/details",
  myRestaurant: "/my-restaurant",
  restaurantfoodDetails: (id: string) => `/food/details/${id}`,

  foodlistOwner: "/food/list",
  addFood: "/add-food",
  editFood: (id: string) => `/food/edit/${id}`,
  deleteFood: (id: string) => `/food/${id}`,
  // NOTE: guessed path — swap for whatever your owner-order-list route actually is
  ownerOrders: "/owner/orders",
  toggleAvailability: (id: string) => `/${id}/toggle-availability`,
  updateOrderStatus: (id: string) => `/orders/${id}/status`,
};
