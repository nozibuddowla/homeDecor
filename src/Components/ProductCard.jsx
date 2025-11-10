import React from "react";
import { Link } from "react-router";

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
          <img src={image} alt={name} className="w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="line-clamp-1">{description}</p>
          <p>Category: {category}</p>
          <p>Price: ${price}</p>
          <div className="card-actions justify-end">
            <Link to={`/products/${id}`} className="btn btn-outline">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
