// object type
export interface productType {

    p_name: string,
    p_price: number,
    p_stock: number,
    p_image: string,
    p_category: string,
    p_description: string
}

// viewproduct k liye  type with id
export interface productFetchType {
    id : string
    p_name: string,
    p_price: number,
    p_stock: number,
    p_image: string,
    p_category: string,
    p_description: string
}