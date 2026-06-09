import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddProductPage from "../page/AddProduct";
import ViewProductPage from "../page/ViewProduct";
import NotFoundPage from "../page/NotFoundPage";
import EditProductPage from "../page/EditProductPage";
import productDetailPage from "../page/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: "add-product",
        Component: AddProductPage
      },
      {
        path: "view-product",
        Component: ViewProductPage

      },
       {
        path: "edit-product/:productId",
        Component: EditProductPage

      },
       {
        path: "product-detail/:productId",
        Component: productDetailPage

      },
      {
        path: "*",
        Component: NotFoundPage
      },
    ],
  },
]);