import { NavLink } from "react-router";


export default function Header() {
    return <>

        {/* Header with Emerald (Fresh) Border */}
        <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Section - Mix Store Idea */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="bg-emerald-500 p-2 rounded-lg shadow-sm">
                            <span className="text-2xl">🍭</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                            Sweet & Fresh
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav>
                        <ul className="flex items-center space-x-6">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `${isActive ? "text-emerald-600 bg-slate-100 p-1.5 rounded" : "text-slate-600"} hover:text-orange-500 font-semibold transition-colors duration-200`}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/view-product"
                                    className={({ isActive }) => `${isActive ? "text-emerald-600 bg-slate-100 p-1.5 rounded" : "text-slate-600"} hover:text-orange-500 font-semibold transition-colors duration-200`}
                                >
                                    View Store 🍦
                                </NavLink>
                            </li>

                            {/* View Product as a Special Button */}
                            <li>
                                <NavLink
                                    to="/add-product"
                                    className="inline-flex items-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-emerald-200 active:scale-95"
                                >
                                    + Add Product
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>







    </>
}
