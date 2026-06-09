import React from 'react';

export default function NavBar() {
    return (
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Brand / Logo - Modern Gradient Style */}
                    <div className="flex-shrink-0">
                        <a href="/" className="group flex items-center">
                            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-105">
                                WallScape
                            </span>
                        </a>
                    </div>

                    {/* Navigation Links - Interactive Hover State */}
                    <div className="hidden md:flex items-center space-x-10">
                        {['Home', 'Trending', 'Categories'].map((link) => (
                            <a
                                key={link}
                                href={`/${link.toLowerCase()}`}
                                className="relative text-gray-600 hover:text-cyan-600 text-[15px] font-semibold transition-all duration-300 group py-1"
                            >
                                {link}
                                {/* Animated Bottom Line */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Search Bar - Clean & Soft Design */}
                    <div className="flex items-center">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Discover wallpapers..."
                                className="bg-gray-50 border border-gray-200 text-gray-900 px-5 py-2.5 pl-11 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 text-sm w-48 lg:w-72 transition-all duration-300"
                            />
                        </div>

                        {/* Mobile Menu Icon (Keep it simple) */}
                        <div className="md:hidden ml-4">
                            <button className="text-gray-500 p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}