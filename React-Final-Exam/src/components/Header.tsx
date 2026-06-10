import { Link, NavLink } from 'react-router';

export default function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* 1. Logo / Brand Name */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200 group-hover:bg-blue-700 transition-colors">
                        <span className="text-white font-black text-xl tracking-tighter">C</span>
                    </div>
                    <span className="text-xl font-bold text-gray-950 tracking-tight">
                        Crypto<span className="text-blue-600">Verse</span>
                    </span>
                </Link>

                {/* 2. Navigation Links */}
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `transition-colors duration-200 py-1 border-b-2 ${isActive
                                ? 'text-blue-600 border-blue-600 font-semibold'
                                : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <a
                        href="https://api.coingecko.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors py-1 border-b-2 border-transparent"
                    >
                        API Docs
                    </a>
                </nav>

                {/* 3. Right Side Button (Light Theme Badge) */}
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">
                        Live Markets
                    </span>
                </div>

            </div>
        </header>
    );
}