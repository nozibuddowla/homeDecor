import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import WishList from "../Pages/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("/furnitureData.json")
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/wishList",
        element: <WishList />,
      },
    ],
  },
]);

export default router;
