"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantList } from "@/redux/slice/restaurantSlice/restaurantSlice";
import { AppDispatch ,RootState} from "@/redux/store/store";

const useRestaurantList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { restaurants, loading, error } = useSelector(
   (state: RootState) => state.restaurantList
  );

  useEffect(() => {
    dispatch(fetchRestaurantList());
  }, [dispatch]);

  return {
    restaurants,
    loading,
    error,
  };
};

export default useRestaurantList;