import React from 'react';

export default function NavBar() {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Brand / Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-2xl font-bold tracking-tight text-indigo-600">
                            WallScape
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <a href="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Home
                        </a>
                        <a href="/trending" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Trending
                        </a>
                        <a href="/categories" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Categories
                        </a>
                    </div>

                    {/* Search Bar & Mobile Menu Icon */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block relative">
                            <input
                                type="text"
                                placeholder="Search wallpapers..."
                                className="bg-gray-100 text-gray-900 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-48 lg:w-64 transition-all"
                            />
                            {/* Search Icon */}
                            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Hamburger Icon for Mobile */}
                        <button className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}