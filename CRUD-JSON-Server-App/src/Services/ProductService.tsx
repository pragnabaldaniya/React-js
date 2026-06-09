import type { productFetchType, productType } from "../utils/global";

const productURL = "http://localhost:8000/product/";

// new product backend (json-server) me save karta hai
export const addProduct = async (body: productType) => {
    const res = await fetch(productURL, {
        method: "POST",
        body: JSON.stringify(body)
    });

    return res.ok;
}

export const fetchAllProducts = async () => {
    const res = await fetch(productURL); //backend se sab products laata hai
    const allProductData = await res.json();

    return allProductData;
}

//product delete karta hai
export const deleteProduct = async (id: string) => {

    const res = await fetch(productURL + id, {
        method: "DELETE"
    });

    return res.ok;
}

//ek product detail ke liye
export const fetchSingleProduct = async (id: string) => {
    const res = await fetch(productURL + id, { method: "GET" }); //yha string formet hi data ata he so 👇

    const singleProduct = await res.json(); // object ma convert karne k liye

    return singleProduct;

}

//product update karta hai
export const updateProduct = async (body: productFetchType) => {
    const res = await fetch(productURL + body.id, {
        method: "PATCH", // updat mathod he
        body: JSON.stringify(body)
    });

    return res.ok;
}