"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-slate-900 backdrop-blur-md border-b border-zinc-800 shadow-2xl sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand - reference image style */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className=" text-black font-black w-8 h-8 flex items-center justify-center rounded-sm text-lg">
                                <img className="w-20 h-12" src="https://static.vecteezy.com/system/resources/thumbnails/025/305/916/small/white-sport-car-on-transparent-background-3d-rendering-illustration-free-png.png" />
                            </div>
                            <h2 className="text-2xl font-bold text-teal-400 tracking-tight group-hover:text-teal-500 transition-colors">
                                Cars
                            </h2>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-sm uppercase tracking-widest text-gray-400 hover:text-teal-500 font-bold transition-all duration-300"
                        >
                            Home
                        </Link>

                        <Link
                            href="/addCar"
                            className="text-sm uppercase tracking-widest text-gray-400 hover:text-teal-500 font-bold transition-all duration-300"
                        >
                            Add Car
                        </Link>

                        <Link
                            href="/viewCar"
                            className="text-sm uppercase tracking-widest text-gray-400 hover:text-teal-500 font-bold transition-all duration-300"
                        >
                            View Car
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-emerald-500 focus:outline-none p-2"
                        >
                            <svg className="h-7 w-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-6 bg-[#0a0a0a] border-t border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 text-gray-300 hover:text-teal-500 font-bold uppercase tracking-widest text-sm"
                            >
                                Home
                            </Link>
                            <Link
                                href="/addCar"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 text-gray-300 hover:text-teal-500 font-bold uppercase tracking-widest text-sm"
                            >
                                Add Car
                            </Link>
                            <Link
                                href="/viewCar"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 text-gray-300 hover:text-teal-500 font-bold uppercase tracking-widest text-sm"
                            >
                                View Car
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}