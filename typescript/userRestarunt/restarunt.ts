export interface Restaurant {
  _id: string;
  restaurantName: string;
  location: string;
  outletType: string;
  isOpen: boolean;
  status: string;
  workingDays: string[];
  openingClosing: {
    sameForAllDays: boolean;
    slots: Array<{
      open: string;
      close: string;
      _id: string;
    }>;
  };
  rating?: number;
  totalRatings?: number;
  deliveryTime?: string;
  minimumOrder?: number;
  cuisine?: string[];
  image?: string;
  banner?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  distance?: string;
  discount?: string;
  offers?: string[];
  averageCost?: number;
  isFavorite?: boolean;
  images?: string[]; // Multiple images for carousel
}