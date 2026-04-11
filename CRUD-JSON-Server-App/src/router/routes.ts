import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddProductPage from "../page/AddProduct";
import ViewProductPage from "../page/ViewProduct";
import NotFoundPage from "../page/NotFoundPage";

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
        path: "*",
        Component: NotFoundPage
      },
    ],
  },
]);