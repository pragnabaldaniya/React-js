// components/Sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import {
    LayoutDashboard, Users, UserPlus, Layers, LogOut,
    ChevronDown, Menu, ChevronLeft, ChevronRight, ShieldUser
} from "lucide-react";
import { NavLink } from "react-router";
import { allRoutes } from "../../routes/route";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authAdminToken");
        window.location.href = allRoutes.login;
    };

    return (
        <aside className={`sticky top-0 left-0 z-40 h-screen bg-gradient-to-b from-sky-400 to-sky-600 text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 shadow-xl border-r border-sky-500/30 ${isCollapsed ? "w-20" : "w-64"
            }`}>
            {/* Branding & Header Toggle Button */}
            <div className={`p-5 border-b border-white/10 flex items-center justify-between ${isCollapsed ? "justify-center" : ""}`}>
                {!isCollapsed && (
                    <div className="flex items-center gap-2.5 animate-fadeIn">
                        <div className="h-8 w-8 rounded-xl bg-white text-sky-600 flex items-center justify-center font-black text-sm shadow-md">
                            W
                        </div>
                        <div>
                            <h1 className="text-base font-bold tracking-tight leading-tight">WhiteCart</h1>
                            <p className="text-[10px] font-medium text-sky-100/70">Admin Panel</p>
                        </div>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white focus:outline-hidden"
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation Links Body */}
            <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1 custom-scrollbar">

                <NavLink
                    to={allRoutes.dashboard}
                    end // end ensures exact matching for main dashboard root path
                    className={({ isActive }) => `w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 py-3 ${isCollapsed ? "justify-center px-0" : "px-4 space-x-3"
                        } ${isActive ? 'bg-white text-sky-600 shadow-md font-bold' : 'text-sky-100 hover:bg-white/10 hover:text-white'}`}
                >
                    <LayoutDashboard size={20} />
                    {!isCollapsed && <span className="animate-fadeIn">Dashboard</span>}
                </NavLink>

                {/* Section Separator */}
                {!isCollapsed ? (
                    <div className="pt-6 px-4 mb-2 text-[10px] font-bold text-sky-200/60 uppercase tracking-widest animate-fadeIn">
                        Management
                    </div>
                ) : (
                    <div className="w-full border-t border-white/10 my-4" />
                )}

                {/* Dropdown Admin Section */}
                <div className="space-y-1">
                    <button
                        onClick={() => !isCollapsed && setIsAdminOpen(!isAdminOpen)}
                        className={`w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 py-3 text-sky-100 hover:bg-white/10 hover:text-white ${isCollapsed ? "justify-center px-0" : "px-4 justify-between"
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <ShieldUser size={20} />
                            {!isCollapsed && <span className="animate-fadeIn">Admin</span>}
                        </div>
                        {!isCollapsed && (
                            <ChevronDown size={14} className={`transform transition-transform duration-200 ${isAdminOpen ? "rotate-180" : ""}`} />
                        )}
                    </button>

                    {/* Animated Collapsible Children Links */}
                    {isAdminOpen && !isCollapsed && (
                        <div className="pl-4 pr-1 space-y-1 mt-1 animate-slideDown">

                            {/* 🌟 Add New Admin: ACTIVE LINK MANAGED SYSTEM */}
                            <NavLink
                                to={allRoutes.dashboard + "/" + allRoutes.addAdmin}
                                className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white text-sky-600 shadow-sm font-bold scale-[1.02]'
                                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <UserPlus size={15} />
                                <span>Add New Admin</span>
                            </NavLink>

                            {/* 🌟 View Admin: ACTIVE LINK MANAGED SYSTEM */}
                            <NavLink
                                to={allRoutes.dashboard + "/" + allRoutes.viewAdmin}
                                className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white text-sky-600 shadow-sm font-bold scale-[1.02]'
                                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <Layers size={15} />
                                <span>View Admin</span>
                            </NavLink>

                        </div>
                    )}
                </div>

                {/* Dropdown User Section */}
                <div className="space-y-1">
                    <button
                        onClick={() => !isCollapsed && setIsUserOpen(!isUserOpen)}
                        className={`w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 py-3 text-sky-100 hover:bg-white/10 hover:text-white ${isCollapsed ? "justify-center px-0" : "px-4 justify-between"
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <Users size={20} />
                            {!isCollapsed && <span className="animate-fadeIn">Users</span>}
                        </div>
                        {!isCollapsed && (
                            <ChevronDown size={14} className={`transform transition-transform duration-200 ${isUserOpen ? "rotate-180" : ""}`} />
                        )}
                    </button>

                    {/* Animated Collapsible Children Links */}
                    {isUserOpen && !isCollapsed && (
                        <div className="pl-4 pr-1 space-y-1 mt-1 animate-slideDown">

                            {/* 🌟 Add New Admin: ACTIVE LINK MANAGED SYSTEM */}
                            <NavLink
                                to={allRoutes.dashboard + "/" + allRoutes.addAdmin}
                                className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white text-sky-600 shadow-sm font-bold scale-[1.02]'
                                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <UserPlus size={15} />
                                <span>Add New User</span>
                            </NavLink>

                            {/* 🌟 View Admin: ACTIVE LINK MANAGED SYSTEM */}
                            <NavLink
                                to={allRoutes.dashboard + "/" + allRoutes.viewUsers}
                                className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white text-sky-600 shadow-sm font-bold scale-[1.02]'
                                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <Layers size={15} />
                                <span>View User</span>
                            </NavLink>

                        </div>
                    )}
                </div>


            </nav>

            {/* Logout Footer Section */}
            <div className="p-3 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className={`flex items-center rounded-xl text-sm font-medium text-sky-100 hover:bg-blue-400 hover:text-white transition-all duration-200 w-full py-3 ${isCollapsed ? "justify-center px-0" : "px-4 space-x-3"
                        }`}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="animate-fadeIn">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}