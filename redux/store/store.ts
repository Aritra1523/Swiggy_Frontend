import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/auth/authSlice";
import partnerReducer from "../slice/partner/partnerSlice";
import foodReducer from "@/redux/slice/foodList/foodList";
import orderReducer from "@/redux/slice/order/order";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    food: foodReducer,
    order: orderReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
