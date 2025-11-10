import React, { useState } from "react";
import { Link, useParams } from "react-router";
import useProducts from "../hooks/useProducts";
import { ChevronLeft, RulerDimensionLine, Star } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  // Handle loading state
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products
      </div>
    );
  }

  // Find the product
  const product = products.find((item) => String(item.id) === id);

  // Handle product not found
  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const {
    name,
    category,
    price,
    material,
    dimensions,
    stock,
    image,
    description,
  } = product;

  if (!product) return null;

  const handleAddToWishList = () => {
    const existingWishList = JSON.parse(localStorage.getItem("wishList"));
    let updatedWishList = [];
    if (existingWishList) {
      const isDuplicate = existingWishList.some((p) => p.id === product.id);

      if (isDuplicate) {
        return alert("Product already added in your wishlist!");
      }

      updatedWishList = [...existingWishList, product];
    } else {
      updatedWishList.push(product);
    }

    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
          <Link
            to="/products"
            aria-label="Back"
            className="btn p-2 rounded-md hover:bg-slate-100"
          >
            <ChevronLeft size={18} />
          </Link>
          <span>
            Products / {category} /{" "}
            <strong className="text-slate-800">{name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7 rounded-2xl shadow-sm overflow-hidden">
            <figure className="w-full h-96 md:h-[520px] bg-gray-100 flex items-center justify-center">
              <img
                src={image}
                alt={name}
                className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </figure>
          </div>
          <div className="md:col-span-5 bg-gray-50 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{name}</h1>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-extrabold text-slate-900">
                  ${price}
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stock
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {stock ? `In stock` : "Out of stock"}
              </div>
            </div>

            <p className="text-sm text-slate-600 line-clamp-3">{description}</p>

            <div className="flex justify-between items-center gap-3 text-sm text-slate-600">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Material</span>
                <span className="font-medium text-slate-800">
                  {material || "—"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Dimension</span>
                <span className="flex items-center gap-2 font-medium text-slate-800">
                  <RulerDimensionLine />
                  {dimensions}
                </span>
              </div>
            </div>
            <div>
              <button onClick={handleAddToWishList} className="btn btn-outline">
                Add to WishList
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
