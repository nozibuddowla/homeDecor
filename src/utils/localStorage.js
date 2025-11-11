// get
export const loadWishList = () => {
  try {
    const data = localStorage.getItem("wishList");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// save
export const updateList = (product) => {
  const wishList = loadWishList();
  try {
    const isDuplicate = wishList.some((p) => p.id === product.id);
    if (isDuplicate) {
      return alert("Already added in wishList");
    } else {
      const updateWishList = [...wishList, product];
      localStorage.setItem("wishList", JSON.stringify(updateWishList));
    }
  } catch (error) {
    console.log(error);
  }
};

// delete
export const removeFromWishList = (productId) => {
  const wishList = loadWishList();
  try {
    const updateWishList = wishList.filter((item) => item.id !== productId);
    localStorage.setItem("wishList", JSON.stringify(updateWishList));
  } catch (error) {
    console.log(error);
  }
};
