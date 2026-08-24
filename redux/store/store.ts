import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/auth/authSlice";
import partnerReducer from "../slice/partner/partnerSlice";
import foodReducer from "@/redux/slice/foodList/foodList";
import orderReducer from "@/redux/slice/order/order";
import restaruntListReducer from "@/redux/slice/restaurantSlice/restaurantSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    food: foodReducer,
    order: orderReducer,
    restaurantList:restaruntListReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
