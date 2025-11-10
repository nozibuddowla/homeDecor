import React, { useEffect, useState } from "react";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const existingWishList = JSON.parse(localStorage.getItem("wishList"));

    if (wishList) {
      setWishList(existingWishList);
    }
  }, [])
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">{wishList.length}</h1>
    </div>
  );
};

export default WishList;
