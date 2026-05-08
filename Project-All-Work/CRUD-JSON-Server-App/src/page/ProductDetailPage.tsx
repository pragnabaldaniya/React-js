import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { productFetchType } from "../utils/global";
import { fetchSingleProduct } from "../Services/ProductServices";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState<productFetchType | null>(null);

    useEffect(() => {
        if (productId) getSingleProduct();
    }, [productId]);

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        setProductData(data);
    };

    if (!productData) return <div className="h-screen flex justify-center items-center text-emerald-600 font-bold italic">Sweetening the details...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Back Button - Minimal */}
            <button
                onClick={() => navigate(-1)}
                className="group mb-5 flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                BACK
            </button>

            {/* Main Content Grid - Tighter & Smaller */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-2xl shadow-emerald-900/5">

                {/* Left: Image (Medium Size & Fixed Height) */}
                <div className="relative group">
                    <div className="h-[350px] lg:h-[400px] w-full rounded-[2rem] overflow-hidden bg-emerald-50 border-4 border-white shadow-lg">
                        <img
                            src={productData.p_image}
                            alt={productData.p_name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-5 left-5">
                        <span className="bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-widest border border-emerald-50">
                            ✨ {productData.p_category}
                        </span>
                    </div>
                </div>

                {/* Right: Info (Compact) */}
                <div className="flex flex-col h-full py-2">
                    <div className="mb-4">
                        <h1 className="text-3xl font-black text-slate-900 leading-tight">
                            {productData.p_name}
                        </h1>
                        <div className="mt-4 flex items-center gap-4">
                            <span className="text-4xl font-black text-emerald-600">
                                ₹{Number(productData.p_price).toLocaleString()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${productData.p_stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {productData.p_stock > 0 ? `In Stock: ${productData.p_stock}` : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    {/* Description Box - Tightened */}
                    <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 mb-6">
                        <h3 className="text-xs font-black text-emerald-900 mb-2  tracking-widest"><span>✨</span> Why you'll love it</h3>
                        <p className="text-slate-600 leading-relaxed text-sm font-medium italic line-clamp-4">
                            "{productData.p_description}"
                        </p>
                    </div>

                    {/* Compact Features */}
                    <div className="flex gap-3 mb-6">
                        <div className="flex-1 flex items-center gap-2 p-3 bg-white border border-emerald-50 rounded-xl shadow-sm">
                            <span className="text-xl">🚚</span>
                            <span className="text-[10px] font-bold text-slate-600">Fast Delivery</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2 p-3 bg-white border border-emerald-50 rounded-xl shadow-sm">
                            <span className="text-xl">🌿</span>
                            <span className="text-[10px] font-bold text-slate-600">Pure Fresh</span>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="mt-auto space-y-3">
                        <div className="flex gap-3">
                            <button className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2 rounded-2xl shadow-lg shadow-emerald-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add To Bag
                            </button>
                            <button className="p-4 bg-white border border-emerald-100 text-emerald-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all shadow-sm active:scale-90">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-center text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em]">
                            ★ Premium Quality Verified ★
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}