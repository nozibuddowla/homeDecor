import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const term = search.trim().toLocaleLowerCase();
  const searchProducts = term
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(term)
      )
    : products;

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h1 className="text-3xl font-semibold">
          All Products
          <span className="text-sm text-gray-500">
            ({searchProducts.length}) products found
          </span>
        </h1>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search Products"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchProducts.length === 0 ? (
          <div className="card bg-base-100 flex justify-center items-center p-5 shadow-sm hover:scale-105 transition ease-out">
            <p>Product not found</p>
          </div>
        ) : (
          searchProducts.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
