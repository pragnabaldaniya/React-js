"use client";

import { carColor, carBrand, carFuel, formCarDataType } from "@/app/utils/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditCarPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formCarData, setFormCarData] = useState<formCarDataType>({
        id: 0,
        carName: "",
        carModel: "",
        carPrice: 0,
        carBrand: "",
        carColor: [],
        carFuel: ""
    });

    const [errorForm, setErrorForm] = useState<any>({});

    useEffect(() => {
        const allCars: formCarDataType[] = JSON.parse(localStorage.getItem('cars') || '[]');
        const carData = allCars.find((car) => car.id === Number(id));

        if (carData) {
            setFormCarData(carData);
        }
    }, [id]);

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;
        setFormCarData(carData => ({
            ...carData,
            [name]: (name === 'carPrice') ? Number(value) : value
        }));
    };

    const onColorChange = (event: any) => {
        const { value, checked } = event.target;
        setFormCarData(carData => ({
            ...carData,
            carColor: (checked)
                ? [...carData.carColor, value]
                : carData.carColor.filter((color) => color !== value)
        }));
    };

    const validation = () => {
        const error: any = {};
        if (!formCarData.carName.trim()) error.carName = "Required";
        if (!formCarData.carModel.trim()) error.carModel = "Required";
        if (!formCarData.carPrice || formCarData.carPrice <= 0) error.carPrice = "Invalid price";
        if (!formCarData.carBrand) error.carBrand = "Select brand";
        if (formCarData.carColor.length === 0) error.carColor = "Pick color";
        if (!formCarData.carFuel) error.carFuel = "Select fuel";

        setErrorForm(error);
        return Object.keys(error).length === 0;
    };

    const onSubmit = (event: any) => {
        event.preventDefault();

        // Fix: Added () to validation call
        if (!validation()) {
            return;
        }

        let allCars: formCarDataType[] = JSON.parse(localStorage.getItem('cars') || '[]');
        allCars = allCars.map((car) => {
            if (car.id === Number(id)) {
                return formCarData;
            }
            return car;
        });

        localStorage.setItem('cars', JSON.stringify(allCars));
        toast.success("Car updated successfully!");
        router.push('/viewCar');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-black">
            <div className="max-w-2xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black tracking-tighter text-teal-400 mb-3 italic">
                        EDIT <span className="text-slate-200">CARS
                            
                        </span>
                    </h1>
                    <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full"></div>
                </div>

                {/* Form Card */}
                <form onSubmit={onSubmit} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2rem] shadow-2xl p-10 md:p-14 space-y-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                        {/* Car Name */}
                        <div className="relative group">
                            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-500 mb-2 block ml-1">Car Name</label>
                            <input
                                type="text"
                                name="carName"
                                value={formCarData.carName}
                                onChange={onHandleChange}
                                className={`w-full bg-transparent border-b-2 ${errorForm.carName ? 'border-red-500' : 'border-slate-700'} focus:border-teal-500 py-3 outline-none transition-all text-lg font-medium`}
                            />
                            {errorForm.carName && <p className="text-red-500 text-[10px] mt-1">{errorForm.carName}</p>}
                        </div>

                        {/* Car Model */}
                        <div className="relative group">
                            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-500 mb-2 block ml-1">Model Variant</label>
                            <input
                                type="text"
                                name="carModel"
                                value={formCarData.carModel}
                                onChange={onHandleChange}
                                className={`w-full bg-transparent border-b-2 ${errorForm.carModel ? 'border-red-500' : 'border-slate-700'} focus:border-teal-500 py-3 outline-none transition-all text-lg font-medium`}
                            />
                            {errorForm.carModel && <p className="text-red-500 text-[10px] mt-1">{errorForm.carModel}</p>}
                        </div>

                        {/* Car Price */}
                        <div className="relative group">
                            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-500 mb-2 block ml-1">Price ($)</label>
                            <input
                                type="number"
                                name="carPrice"
                                value={formCarData.carPrice || ""}
                                onChange={onHandleChange}
                                className={`w-full bg-transparent border-b-2 ${errorForm.carPrice ? 'border-red-500' : 'border-slate-700'} focus:border-teal-500 py-3 outline-none transition-all text-lg font-medium`}
                            />
                            {errorForm.carPrice && <p className="text-red-500 text-[10px] mt-1">{errorForm.carPrice}</p>}
                        </div>

                        {/* Car Brand */}
                        <div className="relative group">
                            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-500 mb-2 block ml-1">Manufacturer</label>
                            <select
                                name="carBrand"
                                value={formCarData.carBrand}
                                onChange={onHandleChange}
                                className="w-full bg-transparent border-b-2 border-slate-700 focus:border-teal-500 py-3 outline-none transition-all text-lg font-medium cursor-pointer appearance-none"
                            >
                                <option value="" className="bg-slate-900">Select Brand</option>
                                {carBrand.map((brand, i) => <option key={i} value={brand} className="bg-slate-900">{brand}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-500">Exterior Finishes</label>
                        <div className="flex flex-wrap gap-3">
                            {carColor.map((color, index) => (
                                <label key={index} className={`flex items-center px-5 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-xs font-bold ${formCarData.carColor.includes(color) ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                                    <input type="checkbox" value={color} checked={formCarData.carColor.includes(color)} onChange={onColorChange} className="hidden" />
                                    {color}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Fuel Type */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-500">Fuel Configuration</label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {carFuel.map((fuel, index) => (
                                <label key={index} className={`py-4 rounded-xl border-2 cursor-pointer transition-all text-[10px] font-black text-center uppercase tracking-tighter ${formCarData.carFuel === fuel ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-800/30 border-slate-800 text-slate-500'}`}>
                                    <input type="radio" name="carFuel" value={fuel} checked={formCarData.carFuel === fuel} onChange={onHandleChange} className="hidden" />
                                    {fuel}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(20,184,166,0.3)] hover:shadow-teal-500/40 active:scale-[0.97] uppercase tracking-[0.3em] text-base"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}