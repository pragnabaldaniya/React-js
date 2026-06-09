// pages/Dashboard/DashboardContent.tsx
"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, ArrowUpRight, TrendingUp, Smartphone, Monitor, ShoppingBag } from "lucide-react";
import CountdownTimer from "../../../components/Dashboard/CountdownTimer";
import StatsCards from "../../../components/Dashboard/StatsCards";


// Dummy Data Arrays
const recentOrders = [
    { id: "ORD-9482", customer: "Rahul Sharma", email: "rahul@example.com", product: "Wireless Earbuds", amount: 2999, status: "Delivered", date: "2026-05-28" },
    { id: "ORD-8392", customer: "Priya Patel", email: "priya@example.com", product: "Smart Watch S5", amount: 5499, status: "Pending", date: "2026-05-30" },
    { id: "ORD-7281", customer: "Amit Verma", email: "amit@example.com", product: "Mechanical Kbd", amount: 3500, status: "Delivered", date: "2026-05-25" },
];

const topProducts = [
    { name: "Wireless Earbuds Pro", sales: "142 Items", revenue: "₹4,25,658", growth: "+12%" },
    { name: "Smart Watch Series 5", sales: "98 Items", revenue: "₹5,38,902", growth: "+8%" },
    { name: "Premium Leather Wallet", sales: "64 Items", revenue: "₹76,800", growth: "-2%" },
];

export default function DashboardContent() {
  
    const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, earnings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStats({ totalUsers: 1248, totalProducts: 342, totalOrders: 856, earnings: 45678 });
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans antialiased">
          

            <div className="flex-1 overflow-y-auto h-screen custom-scrollbar transition-all duration-300">
                {/* Header Navbar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl w-64 border border-slate-200/50">
                        <Search size={16} className="text-slate-400" />
                        <input type="text" placeholder="Global search..." className="bg-transparent text-xs outline-hidden w-full text-slate-700" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-800">Super Admin</p>
                            <p className="text-[10px] text-sky-600 font-semibold">WhiteCart Hub</p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 font-bold flex items-center justify-center text-sm border border-sky-200">SA</div>
                    </div>
                </header>

                {/* Main Body Grid Container */}
                <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Control Matrix</h1>
                            <p className="text-slate-500 text-xs mt-1">Welcome back! Real-time metrics visualization panel.</p>
                        </div>
                        <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs hover:bg-slate-50 shadow-xs transition-all">
                            <SlidersHorizontal size={14} /> Filter Analytics
                        </button>
                    </div>

                    <CountdownTimer targetDate="2026-12-31T23:59:59" />
                    <StatsCards stats={stats} loading={loading} />

                    {/* ─── NEW CHARTS ROW: LINE CHART (LEFT) + DONUT CHART (RIGHT) ─── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Side: Premium Curve Linear Graph (Spans 2 columns) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs lg:col-span-2 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                    Revenue Streams Line Wave
                                    <span className="inline-flex items-center text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping mr-1"></span> Vector Path
                                    </span>
                                </h3>
                                <p className="text-slate-400 text-xs mt-0.5">Smooth spline bezier tracking analytics metrics.</p>
                            </div>

                            {/* SVG Graph Canvas */}
                            <div className="relative w-full h-56 pt-4 mt-4">
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 pl-6 pb-6">
                                    {[...Array(4)].map((_, i) => <div key={i} className="border-b border-slate-100 w-full h-0" />)}
                                </div>

                                <div className="absolute inset-0 pl-6 pb-6 w-full h-full">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="ultraSkyArea" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.22} />
                                                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.0} />
                                            </linearGradient>
                                        </defs>
                                        {/* Ultra Smooth Curved path using Cubic Bezier Anchor Points */}
                                        <path d="M 0,160 C 60,180 90,110 150,130 C 210,150 240,40 300,50 C 360,60 410,120 470,80 C 530,40 560,15 600,10 L 600,200 L 0,200 Z" fill="url(#ultraSkyArea)" />
                                        <path d="M 0,160 C 60,180 90,110 150,130 C 210,150 240,40 300,50 C 360,60 410,120 470,80 C 530,40 560,15 600,10" fill="none" stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" />

                                        <circle cx="150" cy="130" r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />
                                        <circle cx="300" cy="50" r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />
                                        <circle cx="470" cy="80" r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />
                                        <circle cx="600" cy="10" r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-5 pl-6 flex justify-between text-[10px] font-bold text-slate-400">
                                    <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Round Donut Chart (Spans 1 column) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">Traffic Source</h3>
                                <p className="text-slate-400 text-xs mt-0.5">Where your users are purchasing from.</p>
                            </div>

                            {/* Circular SVG Donut Diagram */}
                            <div className="relative flex items-center justify-center my-3">
                                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                                    {/* Background Gray Circle */}
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                                    {/* Sky-Blue Slice (65% Mobile Sales) */}
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#0ea5e9" strokeWidth="3.5" strokeDasharray="65 100" strokeDashoffset="0" strokeLinecap="round" />
                                    {/* Dark Indigo Slice (35% Desktop Sales) */}
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4338ca" strokeWidth="3.5" strokeDasharray="35 100" strokeDashoffset="-65" strokeLinecap="round" />
                                </svg>
                                <div className="absolute text-center">
                                    <p className="text-xl font-black text-slate-800">65%</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mobile</p>
                                </div>
                            </div>

                            {/* Donut Legend Indicators */}
                            <div className="flex items-center justify-around text-xs font-semibold text-slate-600 border-t border-slate-50 pt-3">
                                <div className="flex items-center gap-1.5">
                                    <Smartphone size={14} className="text-sky-500" />
                                    <span>Mobile (65%)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Monitor size={14} className="text-indigo-600" />
                                    <span>Desktop (35%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── BOTTOM TWO TABLES ROW: RECENT ORDERS (LEFT) + TOP SELLING PRODUCTS (RIGHT) ─── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Bottom Left: Recent Activity Table (Spans 2 columns) */}
                        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs lg:col-span-2">
                            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">Recent Transactions</h3>
                                    <p className="text-slate-400 text-xs mt-0.5">Real-time listing monitors tracking checkout logs.</p>
                                </div>
                                <button className="text-xs font-bold text-sky-600 flex items-center gap-1 hover:text-sky-700 transition-colors">
                                    View All <ArrowUpRight size={14} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="py-2.5 px-5">ID</th>
                                            <th className="py-2.5 px-5">Customer</th>
                                            <th className="py-2.5 px-5">Product</th>
                                            <th className="py-2.5 px-5">Amount</th>
                                            <th className="py-2.5 px-5 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-3 px-5 font-mono text-slate-500 text-[10px]">{order.id}</td>
                                                <td className="py-3 px-5 font-bold text-slate-800">{order.customer}</td>
                                                <td className="py-3 px-5 text-slate-500">{order.product}</td>
                                                <td className="py-3 px-5 font-bold text-slate-900">₹{order.amount.toLocaleString()}</td>
                                                <td className="py-3 px-5 text-center">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${order.status === "Delivered" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                                        }`}>{order.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bottom Right: Top Products List Card (Spans 1 column) */}
                        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
                            <div className="p-5 border-b border-slate-100">
                                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                    <ShoppingBag size={16} className="text-sky-500" /> Top Selling Products
                                </h3>
                                <p className="text-slate-400 text-xs mt-0.5">Highest margin inventory items this month.</p>
                            </div>
                            <div className="divide-y divide-slate-100 px-5">
                                {topProducts.map((prod, index) => (
                                    <div key={index} className="py-3.5 flex items-center justify-between hover:bg-slate-50/30 transition-all">
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-bold text-slate-800">{prod.name}</p>
                                            <p className="text-[11px] text-slate-400 font-semibold">{prod.sales}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-slate-900">{prod.revenue}</p>
                                            <p className={`text-[10px] font-bold ${prod.growth.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {prod.growth}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}