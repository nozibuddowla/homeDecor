import { Heart, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const WishList = () => {
  const [wishListState, setWishListState] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  useEffect(() => {
    const existingWishList = JSON.parse(localStorage.getItem("wishList")) || [];

    if (wishListState) {
      setWishListState(existingWishList);
    }
  }, []);

  const sortedItem = (() => {
    if (sortOrder === "price-asc") {
      return [...wishListState].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      return [...wishListState].sort((a, b) => b.price - a.price);
    } else {
      return wishListState;
    }
  })();

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishList = wishListState.filter(
      (item) => item.id !== productId
    );
    setWishListState(updatedWishList);
    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  };

  if (wishListState.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-20">
          <Heart size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500">
            Start adding products you love to your wishlist!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            My Wishlist
            <span className="text-lg text-gray-500 ml-2">
              ({wishListState.length}
              {wishListState.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <label className="form-control w-full max-w-xs">
            <select
              className="select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by price</option>
              <option value="price-asc">Low -&gt; High</option>
              <option value="price-desc">High -&gt; Low</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItem.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-56 bg-gray-100 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 transition-colors duration-200 group"
                  aria-label="Remove from wishlist"
                >
                  <Trash2
                    size={18}
                    className="text-gray-600 group-hover:text-red-500"
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default WishList;
