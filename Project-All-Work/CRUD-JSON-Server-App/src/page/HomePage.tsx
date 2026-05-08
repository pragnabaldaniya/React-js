import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";
import { fetchAllProducts } from "../Services/ProductServices";

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<productFetchType[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    getAllProductData();
  }, []);

  useEffect(() => {
    let allCategory: any = new Set(allProducts.map((product) => product.p_category));
    allCategory = Array.from(allCategory);
    setAllCategories(["All", ...allCategory]);
  }, [allProducts]);

  const getAllProductData = async () => {
    const allProductData = await fetchAllProducts();
    setAllProducts(allProductData);
  };

  const filterProducts = (filterCategory === "All")
    ? allProducts
    : allProducts.filter((product) => product.p_category === filterCategory);

  return (
    <div className="bg-emerald-50/30 min-h-screen pb-12">
      {/* Hero Section - Fresh & Sweet Theme */}
      <div className="bg-white border-b border-emerald-100 mb-8">
        <div className="max-w-7xl mx-auto py-2 px-4 text-center">
          <h1 className="text-4xl font-black text-emerald-900 tracking-tight sm:text-6xl">
            Freshly <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Sweetened 🍭</span>
          </h1>
          <p className="mt-4 text-lg text-emerald-600 font-medium max-w-2xl mx-auto">
            Discover our collection of delicious chocolates, fresh fruits, and sweet treats.
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-6 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex justify-center gap-3 min-w-max">
          {allCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-sm border ${filterCategory === category
                ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200"
                : "bg-white text-emerald-700 border-emerald-100 hover:bg-emerald-50"
                } active:scale-95`}
            >
              {category === "All" ? "🌈 All Items" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filterProducts.map((product, index) => (
            <Link key={product.id || index} to={`product-detail/${product.id}`} className="group">
              <div className="bg-white rounded-[2rem] border border-emerald-50 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 overflow-hidden flex flex-col h-full">

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-emerald-50">
                  <img
                    src={product.p_image}
                    alt={product.p_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-emerald-50">
                      {product.p_category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors mb-0.5">
                    {product.p_name}
                  </h2>

                  <p className="text-slate-500 text-sm line-clamp-2 mb-3 flex-grow leading-relaxed">
                    {product.p_description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">Price</span>
                      <span className="text-2xl font-black text-slate-900">₹{Number(product.p_price).toLocaleString()}</span>
                    </div>

                    <button className="bg-emerald-100 hover:bg-emerald-600 text-emerald-600 hover:text-white p-3 rounded-2xl transition-all shadow-sm active:scale-90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filterProducts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-emerald-50 shadow-sm mt-10">
            <div className="text-6xl mb-4">🍯</div>
            <p className="text-emerald-800 font-bold text-xl">Oops! This jar is empty.</p>
            <p className="text-emerald-500">No products found in the {filterCategory} category.</p>
          </div>
        )}
      </div>
    </div>
  );
}