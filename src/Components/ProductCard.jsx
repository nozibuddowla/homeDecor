import React from "react";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    category,
    price,
    material,
    dimensions,
    stock,
    image,
    description,
  } = product;
  return (
    <div>
      <div className="card bg-base-100 border shadow-sm hover:scale-105 transition ease-out">
        <figure className="h-52 overflow-hidden">
          <img src={image} alt={name} className="w-ull object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="line-clamp-1">{description}</p>
          <p>Category: {category}</p>
          <p>Price: ${price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
