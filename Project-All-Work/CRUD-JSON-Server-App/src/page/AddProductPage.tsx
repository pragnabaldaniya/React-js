import { useState } from "react";
import type { productType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addProduct } from "../Services/ProductServices";

export default function AddProductPage() {

    const navigate = useNavigate();

    const [productData, setProductData] = useState<productType>({

        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    const productCategory = ["Chocolates", "Fruits", "Juices", "Candies", "Ice Cream"];

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;

        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }));

    }

    const onSubmit = async (event: any) => {
        event.preventDefault();


        // validation
        if (!productData.p_name || productData.p_price === 0 || productData.p_stock === 0 || !productData.p_category || !productData.p_image || !productData.p_description) {
            toast.error("All filds are required...");
            return;
        };

        console.log("product data : ", productData);

        // Add product
       const status = await addProduct(productData);

       if (status){
                navigate('/view-product');
       }
    }



    return (
        <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-emerald-800 flex items-center justify-center gap-2">
                    <span>✨</span> Add New Fresh Item
                </h1>
                <p className="text-emerald-600 font-medium mt-1">Fill in the details to update your sweet inventory.</p>
            </div>

            {/* Form Card */}
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">

                {/* Product Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-emerald-900 ml-1">Product Name</label>
                    <input
                        type="text"
                        name="p_name"
                        onChange={onHandleChange}
                        placeholder="e.g. Dark Chocolate"
                        className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-emerald-50/30"
                    />
                </div>

                {/* Product Price */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-emerald-900 ml-1">Product Price ($)</label>
                    <input
                        type="number"
                        name="p_price"
                        onChange={onHandleChange}
                        placeholder="0.00"
                        className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-emerald-50/30"
                    />
                </div>

                {/* Product Stock */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-emerald-900 ml-1">Product Stock</label>
                    <input
                        type="number"
                        name="p_stock"
                        onChange={onHandleChange}
                        placeholder="Quantity"
                        className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-emerald-50/30"
                    />
                </div>

                {/* Product Category */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-emerald-900 ml-1">Category</label>
                    <select
                        name="p_category"
                        onChange={onHandleChange}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-emerald-50/30 appearance-none"
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Product Image URL */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-emerald-900 ml-1">Product Image URL</label>
                    <input
                        type="text"
                        name="p_image"
                        onChange={onHandleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-emerald-50/30"
                    />
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-emerald-900 ml-1">Product Description</label>
                    <textarea
                        name="p_description"
                        rows={3}
                        onChange={onHandleChange}
                        placeholder="Tell us more about this sweet delight..."
                        className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-emerald-50/30 resize-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]"
                    >
                        Save Product to Store
                    </button>
                </div>
            </form>
        </div>
    );
}