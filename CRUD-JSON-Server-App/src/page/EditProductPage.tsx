import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../Services/ProductService";




export default function EditProductPage() {


    const { productId } = useParams();
    const navigate = useNavigate();



    const [productData, setProductData] = useState<productFetchType>({
        id: "",
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    useEffect(() => {
        if (productId) {
            getSingleProductData()
        }
    }, [productId]);

    async function getSingleProductData() {
        const data = await fetchSingleProduct(productId || "");

        setProductData(data); // form auto fill hoga


    }

    // validation state
    // const [errorForm, seterrorForm] = useState<any>({});


    const productCategory = ["Electronic", "Home & Living", "Sport", "Fashion"];



    // form me jub value dalege to vo state me bi stor honi start hogi
    const onHandleChange = (event: any) => {
        const { name, value } = event.target;

        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }))
    }


    const onHandleSubmit = async (event: any) => {
        event.preventDefault();  // page relode na ho is liye



        toast.success("Product Update successfully ✅");

        console.log("product Data : ", productData);

        // Update Product

        const status = await updateProduct(productData);

        console.log("update status:", status);

        if (status) {
            navigate('/view-product');
        }
    }




    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            {/* Page Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Update Product
                </h1>
                <p className="mt-2 text-slate-500">
                    Fill in the details below to add a new item to your inventory.
                </p>
            </div>

            {/* Form Container */}
            <form onSubmit={onHandleSubmit} className="grid grid-cols-1 gap-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100">

                {/* Row 1: Product Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="p_name"
                        value={productData.p_name}
                        onChange={onHandleChange}
                        placeholder="e.g. Wireless Headphones"
                        className={`w-full rounded-xl border  border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                    />
                    {/* {errorForm.p_name && <p className="text-red-600 text-sm">{errorForm.p_name}</p>} */}
                </div>

                {/* Row 2: Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="p_price"
                            value={productData.p_price}
                            onChange={onHandleChange}
                            placeholder="0.00"
                            className={`w-full rounded-xl border  border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                        />

                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="p_stock"
                            value={productData.p_stock}
                            onChange={onHandleChange}
                            placeholder="100"
                            className={`w-full rounded-xl border  border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                        />


                    </div>


                </div>

                {/* Row 3: Image Link & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="p_image"
                            value={productData.p_image}
                            onChange={onHandleChange}
                            placeholder="https://images.com/product.jpg"
                            className={`w-full rounded-xl border  border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                        />
                        <img src={productData.p_image} width={80} alt="" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            Category
                        </label>
                        <select
                            name="p_category"
                            value={productData.p_category}
                            onChange={onHandleChange}
                            className={`w-full rounded-xl border  border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                        >
                            <option value="">Select Category</option>
                            {productCategory.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                {/* Row 4: Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                        Product Description
                    </label>
                    <textarea
                        name="p_description"
                        value={productData.p_description}
                        onChange={onHandleChange}
                        rows={4}
                        placeholder="Tell us more about the product..."
                        className={`w-full rounded-xl border  border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                    >
                    </textarea>

                </div >

                {/* Submit Button */}
                < div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100" >
                    <button
                        type="button"
                        className="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-yellow-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-yellow-200 transition-all hover:bg-yellow-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Update Product
                    </button>
                </div >
            </form >
        </div >
    );
}