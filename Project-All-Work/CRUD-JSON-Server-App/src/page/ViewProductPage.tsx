import { useEffect, useState } from "react"
import type { productFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../Services/ProductServices";
import { useNavigate } from "react-router";

export default function ViewProductPage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);



    const getAllProducts = async () => {
        const allProductData = await fetchAllProducts();
        setAllProducts(allProductData);
    }



    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-emerald-800">Store Inventory</h1>
                    <p className="text-emerald-600 font-medium">Manage your fresh sweets and stocks here.</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm">
                    Total Items: {allProducts.length}
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden bg-white rounded-3xl border border-emerald-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-emerald-600 text-white">
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">No.</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Product</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Price</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Stock</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Category</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Description</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-emerald-50">
                            {allProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-emerald-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-emerald-800 font-medium">{index + 1}</td>

                                    {/* Name & Image Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-xl overflow-hidden bg-emerald-100 border border-emerald-200 flex-shrink-0">
                                                <img
                                                    src={product.p_image}
                                                    alt={product.p_name}
                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                                                />
                                            </div>
                                            <span className="font-bold text-slate-700">{product.p_name}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-amber-100/50 text-amber-500 rounded-lg font-bold">
                                            ${product.p_price}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`font-semibold ${Number(product.p_stock) < 10 ? 'text-red-500' : 'text-emerald-600'}`}>
                                            {product.p_stock} pcs
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-bold uppercase">
                                            {product.p_category}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 max-w-xs">
                                        <p className="text-slate-500 text-sm line-clamp-2">{product.p_description}</p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div onClick={() => navigate(`/edit-product/${product.id}`)} className="flex justify-center items-center gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                <span className="text-xl">📝</span>
                                            </button>
                                            <button onClick={async () => {
                                                await deleteProduct(product.id);
                                                getAllProducts();
                                            }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                <span className="text-xl">🗑️</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {allProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-medium italic">No products found. Start adding some sweet items! 🍬</p>
                    </div>
                )}
            </div>
        </div>
    )
}