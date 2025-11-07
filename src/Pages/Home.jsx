import React from "react";
import { useLoaderData } from "react-router";

const Home = () => {
  const products = useLoaderData();
  console.log(products);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <h1 key={product.id} product={product}>
            {product.name}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Home;
