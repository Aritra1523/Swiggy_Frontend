"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppDispatch,
  RootState,
} from "@/redux/store/store";
import { fetchFoodList } from "@/redux/slice/foodList/foodList";


const useFoodList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    foods,
    loading,
    error,
  } = useSelector(
    (state: RootState) => state.food,
  );

  useEffect(() => {
    dispatch(fetchFoodList());
  }, [dispatch]);

  return {
    foods,
    loading,
    error,
  };
};

export default useFoodList;