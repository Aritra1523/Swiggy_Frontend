import Image from "next/image";

const CartItem = ({ item, onRemove }) => {
  const food = item.food;
  if (!food) return null;

  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 0);
  const itemTotal = price * quantity;
  const originalPrice = Number(food.basePrice || 0);
  const hasDiscount = originalPrice > price;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
          {food.image ? (
            <Image src={food.image} alt={food.itemName} width={112} height={112} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">🍽️ No Image</div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between gap-3">
            <div>
              <h2 className="font-bold text-lg text-gray-900">{food.itemName}</h2>
              <p className="text-sm text-gray-500 mt-1">{food.restaurant?.restaurantName}</p>
              <p className="text-xs text-gray-400 mt-1">{food.restaurant?.location}</p>
            </div>
            <button onClick={() => onRemove(food._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
              Remove
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-orange-600">₹{price}</span>
              {hasDiscount && <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Qty:</span>
              <span className="font-bold bg-orange-50 text-orange-600 px-3 py-1 rounded-lg">{quantity}</span>
            </div>
          </div>

          <div className="mt-3 text-right">
            <span className="font-bold text-gray-900">₹{itemTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CartList = ({ items, onRemoveItem }) => (
  <div className="lg:col-span-2 space-y-4">
    {items.map((item) => (
      <CartItem key={item._id || item.food?._id} item={item} onRemove={onRemoveItem} />
    ))}
  </div>
);