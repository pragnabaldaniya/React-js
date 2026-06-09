import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { themeChanger } from '../features/theme/themeSlice';

export default function Header() {
    // Make sure 'themeReducer' is the correct key in your store
    const theme = useSelector((state: RootState) => state.themeReducer.theme);
    const dispatch = useDispatch();


    return (
        <nav className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${theme === 'light'
            ? 'border-slate-200 bg-white/80 backdrop-blur-md text-slate-900'
            : 'border-slate-700 bg-slate-900 text-white'
            }`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <h1 className={`text-xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        Home
                    </h1>
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {['Home', 'About', 'Contact'].map((item) => (
                        <li key={item}>
                            <a href="#" className={`text-sm font-medium transition-colors hover:text-green-500 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                                }`}>
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Actions Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button - Fix: Added dispatch here */}

                    <button
                        onClick={() => dispatch(themeChanger())}
                        className={`inline-flex items-center justify-center rounded-full p-2 transition-all active:scale-90 ${theme === 'light' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                            }`}
                    >
                        {/* Yahan 'theme === light' check karein */}
                        <span className="text-lg leading-none">{theme === 'light' ? '☀️' : '🌛'}</span>
                    </button>

                    <button className={`hidden sm:block rounded-full px-5 py-2 text-sm font-medium transition-all active:scale-95 ${theme === 'light' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-green-600 text-white hover:bg-green-500'
                        }`}>
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}