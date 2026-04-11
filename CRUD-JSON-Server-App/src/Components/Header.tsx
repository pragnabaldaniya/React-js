import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: Logo Section */}
          <NavLink to="/" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200 transition-transform group-hover:rotate-3">
              {/* Changed logo text to P as requested */}
              <span className="text-xl font-black italic text-white">P</span>
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-slate-900 sm:block text-indigo-600">
              Stockly
            </span>
          </NavLink>

          {/* Right: Navigation + Action Button */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* NavLinks moved to the right corner area */}
            <ul className="flex items-center gap-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 hover:text-indigo-600 ${
                      isActive ? "bg-slate-100 text-indigo-600" : "text-slate-600"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/view-product"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 hover:text-indigo-600 ${
                      isActive ? "bg-slate-100 text-indigo-600" : "text-slate-600"
                    }`
                  }
                >
                  View Products
                </NavLink>
              </li>
            </ul>

            {/* Blue Action Button */}
            <NavLink
              to="/add-product"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 hover:ring-4 hover:ring-indigo-100 active:scale-95"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Product</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}