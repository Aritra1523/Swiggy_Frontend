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

  updateOrderStatus: (id: string) => `/orders/${id}/status`,

  //Partner
  applyRestaurat: "/auth/apply/restaurant",
  restaruntOtp: "/restaurant/otp",
  restaruntDetails: "/restaurant/details",
  restaruntDocument: "/restaurant/documents",
  addFood: "/add-food",
  partnerCOntract: "/partner-contract",
};
