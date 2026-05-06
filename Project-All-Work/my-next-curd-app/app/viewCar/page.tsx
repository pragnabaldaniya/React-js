"use client";

import { useState, useEffect } from "react";
import { formCarDataType } from "../utils/type";
import {
    Car,
    Building2,
    Fuel,
    CircleDollarSign,
    Edit3,
    Trash2,
    AlertCircle,
    Package,
    PlusCircle,
    TrendingUp,
    Hash
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ViewCars() {
    const [allCars, setAllCars] = useState<formCarDataType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedCars = localStorage.getItem('cars');
        if (storedCars) {
            setAllCars(JSON.parse(storedCars));
        }
    }, []);

    const deleteCar = (id: number) => {
        const deletedCarData = allCars.filter((car) => car.id !== id);
        setAllCars(deletedCarData);
        localStorage.setItem('cars', JSON.stringify(deletedCarData));
        toast.success("Cars removed from hangar.");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-black">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-teal-500/10 rounded-lg border border-teal-500/20">
                                <Car className="w-6 h-6 text-teal-400" />
                            </div>
                            <span className="text-teal-500 font-bold tracking-[0.3em] text-xs uppercase">Inventory System</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-white italic">
                            FLEET <span className="text-teal-400">MANAGEMENT</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => router.push('/addCar')}
                        className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-4 rounded-2xl flex items-center gap-2 transition-all font-black uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(20,184,166,0.2)] active:scale-95"
                    >
                        <PlusCircle className="w-5 h-5" /> Add New Unit
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Total Units", val: allCars.length, icon: Hash, color: "teal" },
                        { label: "Manufacturers", val: new Set(allCars.map(c => c.carBrand)).size, icon: Building2, color: "blue" },
                        { label: "Propulsion", val: new Set(allCars.map(c => c.carFuel)).size, icon: Fuel, color: "purple" },
                        { label: "Avg Value", val: `₹${allCars.length > 0 ? Math.round(allCars.reduce((s, c) => s + Number(c.carPrice), 0) / allCars.length).toLocaleString() : 0}`, icon: TrendingUp, color: "emerald" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-[2rem] hover:border-teal-500/30 transition-all group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-100 tracking-tight">{stat.val}</p>
                                </div>
                                <stat.icon className="w-8 h-8 text-teal-500/50 group-hover:text-teal-400 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/60">
                                    {["ID", "Vehicle Details", "Pricing", "Manufacturer", "Configuration", "Power", "Actions"].map((head) => (
                                        <th key={head} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-teal-500">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {allCars.length > 0 ? (
                                    allCars.map((car, index) => (
                                        <tr key={car.id} className="hover:bg-teal-500/[0.02] transition-colors group">
                                            <td className="px-8 py-6 text-slate-500 font-mono text-sm">#{String(index + 1).padStart(2, '0')}</td>
                                            <td className="px-8 py-6">
                                                <div>
                                                    <p className="text-slate-100 font-bold text-lg group-hover:text-teal-400 transition-colors">{car.carName}</p>
                                                    <p className="text-slate-500 text-xs uppercase tracking-tighter">{car.carModel}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-1.5 text-emerald-400 font-black">
                                                    <CircleDollarSign className="w-4 h-4" />
                                                    <span>{Number(car.carPrice).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-[10px] font-black border border-slate-700 uppercase">
                                                    {car.carBrand}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex -space-x-1">
                                                    {car.carColor.map((color, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-6 h-6 rounded-full border-2 border-slate-900 shadow-lg transition-transform hover:scale-125 hover:z-10 cursor-help"
                                                            style={{ backgroundColor: color.toLowerCase() }}
                                                            title={color}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20 w-fit text-[10px] font-black uppercase tracking-widest">
                                                    <Fuel className="w-3 h-3" />
                                                    {car.carFuel}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => router.push(`/editCar/${car.id}`)}
                                                        className="p-2 hover:bg-teal-500/20 text-teal-500 rounded-xl transition-all border border-transparent hover:border-teal-500/30"
                                                    >
                                                        <Edit3 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteCar(car.id)}
                                                        className="p-2 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/30"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center max-w-xs mx-auto">
                                                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700">
                                                    <Package className="w-10 h-10 text-slate-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-200 mb-2">Hangar is Empty</h3>
                                                <p className="text-slate-500 text-sm mb-8 italic">No experimental vehicles detected in your current inventory database.</p>
                                                <button
                                                    onClick={() => router.push('/addCar')}
                                                    className="w-full py-4 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 border border-teal-500/30 rounded-2xl font-black transition-all uppercase tracking-widest text-xs"
                                                >
                                                    Deploy First Unit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}