import { CartItem, GroupedRestaurant, BillDetails } from "@/typescript/cartTypes/cartTypes";

export const calculateTotals = (items: CartItem[]): BillDetails => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce((total, item) => {
    const price = item.food?.discountPrice || item.food?.basePrice || 0;
    return total + price * item.quantity;
  }, 0);

  const deliveryFee = totalPrice > 200 ? 0 : 40;
  const platformFee = 10;
  const gst = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + platformFee + gst;

  return {
    totalItems,
    totalPrice,
    deliveryFee,
    platformFee,
    gst,
    grandTotal,
  };
};

export const groupByRestaurant = (items: CartItem[]): Record<string, GroupedRestaurant> => {
  return items.reduce((groups: Record<string, GroupedRestaurant>, item) => {
    const restaurantId = item.restaurant?._id;
    if (!groups[restaurantId]) {
      groups[restaurantId] = {
        restaurant: item.restaurant,
        items: [],
      };
    }
    groups[restaurantId].items.push(item);
    return groups;
  }, {});
};

export const getItemPrice = (food: any): number => {
  return food?.discountPrice || food?.basePrice || 0;
};

export const getDiscountPercentage = (food: any): number | null => {
  if (!food?.basePrice || !food?.discountPrice) return null;
  if (food.basePrice <= food.discountPrice) return null;
  return Math.round(((food.basePrice - food.discountPrice) / food.basePrice) * 100);
};

export const isFreeDelivery = (totalPrice: number): boolean => {
  return totalPrice > 200;
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount}`;
};