import { Heart, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { loadWishList, removeFromWishList } from "../utils/localStorage";

const WishList = () => {
  const [wishListState, setWishListState] = useState(() => loadWishList());
  const [sortOrder, setSortOrder] = useState("none");

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
    // remove from localStorage
    removeFromWishList(productId);
    // for UI instant update
    setWishListState((prev) => prev.filter((p) => p.id !== productId));
  };

  // generate chart data
  const totalsByCategory = {};
  wishListState.forEach((product) => {
    const category = product.category;
    totalsByCategory[category] =
      (totalsByCategory[category] || 0) + product.price;
  });

  const chartData = Object.keys(totalsByCategory).map((category) => ({
    category,
    total: totalsByCategory[category],
  }));

  if (wishListState.length === 0) {
    return (
      <div>
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
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
          <h1 className=" flex flex-wrap items-center text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <span>My Wishlist </span>
            <span className="text-lg text-gray-500 ml-2">
              ({wishListState.length}{" "}
              {wishListState.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <div className="w-full sm:w-auto">
            <select
              className="select w-full sm:w-48"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by price</option>
              <option value="price-asc">Low -&gt; High</option>
              <option value="price-desc">High -&gt; Low</option>
            </select>
          </div>
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

        {/* chart */}
        {chartData.length > 0 && (
          <div className="my-10">
            <div
              className="bg-base-100 rounded-2xl h-64"
              style={{ minWidth: 0 }}
            >
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  data={chartData}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default WishList;
