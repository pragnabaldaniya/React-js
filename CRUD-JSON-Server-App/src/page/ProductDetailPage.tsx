import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { fetchSingleProduct } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";

export default function ProductDetailPage() {
  const { productId } = useParams();

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
      getSingleProduct();
    }
  }, [productId]);

  const getSingleProduct = async () => {
    const data = await fetchSingleProduct(productId || "");
    setProductData(data);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Simple Back Button */}
        <Link to="/view-product" className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 group-hover:border-indigo-100 group-hover:bg-indigo-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Product Image Showcase */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-transparent opacity-50"></div>
              <img
                src={productData.p_image || "https://via.placeholder.com/800"}
                alt={productData.p_name}
                className="h-full w-full object-contain p-12 transition-transform duration-700 group-hover:scale-110"
              />
              {/* Floating Badge */}
              <div className="absolute top-6 left-6">
                <span className="backdrop-blur-md bg-white/70 border border-white px-4 py-2 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                  {productData.p_category}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Content */}
          <div className="lg:col-span-5 flex flex-col pt-4">

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2 tracking-tight">
                  {productData.p_name || "Modern Product Title"}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">(4.8 / 5 Rating)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-indigo-600">₹{productData.p_price.toLocaleString()}</span>
                <span className="text-slate-400 line-through text-lg">₹{(productData.p_price * 1.2).toFixed(0)}</span>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">About this item</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {productData.p_description || "Experience the perfect blend of style and functionality. Designed for modern living and crafted with premium materials."}
                </p>
              </div>

              {/* Stock Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-700">{productData.p_stock} items left in stock</span>
              </div>

              {/* Main Action Button */}
              <div className="pt-6">
                <button className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 px-8 py-3 transition-all hover:bg-indigo-600 active:scale-95 shadow-xl shadow-slate-200">
                  <div className="relative flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-white transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-lg font-bold text-white">Add to Cart</span>
                  </div>
                </button>
              </div>

              <p className="text-center text-xs font-medium text-slate-400">
                Free shipping on orders over ₹1,000 • 30-day return policy
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}