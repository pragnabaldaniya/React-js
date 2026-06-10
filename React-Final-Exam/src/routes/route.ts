import { createBrowserRouter, type BrowserRouterProps } from "react-router";
import Dashbord from "../Pages/Dashbord";
import CoinDetail from "../Pages/CoinDetail";

export const router = createBrowserRouter([

    {
        path: "/",
        Component: Dashbord
    },
    {
        path: "coin/:id",
        Component: CoinDetail
    }


]);