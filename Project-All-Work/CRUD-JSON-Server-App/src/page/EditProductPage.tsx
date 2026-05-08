import { useEffect, useState } from "react";
import { type productFetchType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../Services/ProductServices";

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

  const productCategory = ["Chocolates", "Fruits", "Juices", "Candies", "Ice Cream"];

  const labelClasses = "text-sm font-bold text-emerald-900 ml-1";
  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 text-slate-700 transition-all";

  useEffect(() => {
    if (productId) getSingleProductData();
  }, [productId]);

  async function getSingleProductData() {
    const data = await fetchSingleProduct(productId || "");
    setProductData(data);
  }

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value
    }));
  }

  const onHandleSubmit = async (e: any) => {
    e.preventDefault();
    const status = await updateProduct(productData);
    if (status) {
      toast.success("Updated! 🍬");
      navigate('/view-product');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-black text-emerald-800">Edit Product Details</h1>
        <p className="text-emerald-600 text-sm italic font-medium">Update your inventory item</p>
      </div>

      {/* Form Card */}
      <form onSubmit={onHandleSubmit} className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-xl shadow-emerald-900/5 space-y-5">

        {/* Name & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClasses}>Product Name</label>
            <input type="text" name="p_name" value={productData.p_name} onChange={onHandleChange} className={inputClasses} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClasses}>Category</label>
            <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={inputClasses}>
              {productCategory.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Price & Stock Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClasses}>Price (₹)</label>
            <input type="number" name="p_price" value={productData.p_price} onChange={onHandleChange} className={inputClasses} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClasses}>Available Stock</label>
            <input type="number" name="p_stock" value={productData.p_stock} onChange={onHandleChange} className={inputClasses} />
          </div>
        </div>

        {/* Image URL with Small Preview Overlay */}
        <div className="space-y-1.5 relative">
          <label className={labelClasses}>Image URL</label>
          <div className="flex gap-3 items-center">
            <div className="w-40 h-40 rounded-lg border border-emerald-200 overflow-hidden bg-emerald-50 flex-shrink-0 shadow-inner">
              <img src={productData.p_image} alt="thumb" className="w-full h-full object-cover" />
            </div>
            <input type="text" name="p_image" value={productData.p_image} onChange={onHandleChange} className={inputClasses} placeholder="Paste link here..." />
          </div>
        </div>

        {/* Description Full Width */}
        <div className="space-y-1.5">
          <label className={labelClasses}>Description</label>
          <textarea name="p_description" rows={3} value={productData.p_description} onChange={onHandleChange} className={`${inputClasses} resize-none`} />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate('/view-product')} className="flex-1 py-3 font-bold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all">
            Cancel
          </button>
          <button type="submit" className="flex-[2] py-3 font-black text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
            Save Changes ✨
          </button>
        </div>
      </form>
    </div>
  );
}