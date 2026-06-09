import React, { useState } from 'react';
import { UserPlus, Upload, ShieldAlert, ArrowLeft, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { addAdmin } from '../../services/admin/AdminServices';

export interface adminForm {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    profile_image: File | null,

}

export default function AddUserPage() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);


    // Controlled Data Matrix state
    const [adminFormData, setAdminFormData] = useState<adminForm>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        profile_image: null,
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Input state handler mechanics
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAdminFormData(adminFormData => ({ ...adminFormData, [name]: value }));

        // Real-time error clearance
        if (errors[name]) {
            setErrors(adminFormData => {
                const updated = { ...adminFormData };
                delete updated[name];
                return updated;
            });
        }
    };

    // Profile Image Stream Handler & Preview generator
    const handleImageChange = (e: any) => {
        console.log("handleImageChange fired");
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Limit checks to images only
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file.');
                return;
            }

            setProfileImage(file);

            setAdminFormData(prev => ({
                ...prev,
                profile_image: file
            }));

            setImagePreview(URL.createObjectURL(file));

            if (errors['profile_image']) {
                setErrors(prev => {
                    const updated = { ...prev };
                    delete updated['profile_image'];
                    return updated;
                });
            }
        }
    };

    // Client Side Validation Filter Engine
    const validateForm = () => {
        const tempErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!adminFormData.first_name.trim()) tempErrors.first_name = 'First name is required.';
        if (!adminFormData.last_name.trim()) tempErrors.last_name = 'Last name is required.';

        if (!adminFormData.email.trim()) {
            tempErrors.email = 'Email address is required.';
        } else if (!emailRegex.test(adminFormData.email)) {
            tempErrors.email = 'Invalid email syntax template.';
        }

        if (!adminFormData.password) {
            tempErrors.password = 'Security password string is required.';
        } else if (adminFormData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters.';
        }

        if (!adminFormData.phone.trim()) {
            tempErrors.phone = 'Contact number string required.';
        } else if (adminFormData.phone.length < 10) {
            tempErrors.phone = 'Invalid communication string depth.';
        }

        if (!profileImage) {
            tempErrors.profile_image = 'Administrative avatar signature required.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const onFormSubmit = async (event: any) => {
        event.preventDefault();
        console.log(adminFormData);
        console.log(adminFormData.profile_image);

        if (!validateForm()) {
            toast.error('Please patch validation errors before override sequence.');
            return;
        }

        setLoader(true);
        try {
            const data = await addAdmin(adminFormData);

            if (data.status === 201) {
                toast.success(data.message || "Administrator registered successfully!");
                setAdminFormData({ // form clear
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    phone: "",
                    profile_image: null,
                });
                setErrors({});
            } else {
                toast.error(data.message || "An error occurred during provisioning.");
            }
        }
        catch (error: any) {
            console.log("Add Admin Error:", error);
            console.log("Response:", error?.response);
            console.log("Data:", error?.response?.data);

            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
        finally {
            setLoader(false);
        }
    };





    return (
        <div className="min-h-screen bg-slate-50/40 p-4 md:p-8 text-slate-800 font-sans w-full">

            {/* ─── HEADER BAR MODULE ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-12 mb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <div className="p-1.5 bg-sky-50 rounded-xl border border-sky-100 text-[#0369a1]">
                            <UserPlus size={22} />
                        </div>
                        Create New Users
                    </h1>
                    <p className="text-xs font-medium text-slate-400">Generate fresh identity strings with localized access privileges.</p>
                </div>

                <button
                    onClick={() => navigate('/dashboard/view-admin')}
                    className="inline-flex items-center  gap-0.5 text-slate-500 hover:text-sky-600 bg-white border border-slate-200 hover:border-sky-100 px-2 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95"
                >
                    <ArrowLeft size={14} className="stroke-[2.5]" />
                    Back to Registry
                </button>
            </div>

            {/* ─── MAIN FORM MASTER GRID CARD ─── */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 max-w-xl">
                <form onSubmit={onFormSubmit} className="space-y-6" noValidate>

                    {/* AVATAR UPLOAD CONTAINER SECTION */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 pb-4 border-b border-slate-100">
                        <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 ring-4 ring-slate-50">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Avatar profile preview" className="w-full h-full object-cover" />
                            ) : (
                                <Upload size={22} className="text-slate-400" />
                            )}
                        </div>
                        <div className="space-y-1.5 text-center sm:text-left">
                            <label className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold px-3 py-2 rounded-lg text-[11px] uppercase tracking-wider cursor-pointer transition-all active:scale-95 border border-slate-200/40">
                                <Upload size={12} className="stroke-[2.5]" />
                                Upload Profile Photo
                                <input type="file" name="profile_image" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Supports PNG, JPG, or WEBP. Max resolution threshold asset.</p>
                            {errors.profile_image && (
                                <p className="text-red-500 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 mt-1 justify-center sm:justify-start">
                                    <ShieldAlert size={11} /> {errors.profile_image}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* INPUT COMPACT GRID CORES */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* First Name Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={adminFormData.first_name}
                                onChange={handleInputChange}
                                placeholder="e.g., John"
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/40 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.first_name ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                                    }`}
                            />
                            {errors.first_name && <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.first_name}</p>}
                        </div>

                        {/* Last Name Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={adminFormData.last_name}
                                onChange={handleInputChange}
                                placeholder="e.g., Doe"
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/40 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.last_name ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                                    }`}
                            />
                            {errors.last_name && <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.last_name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={adminFormData.email}
                                onChange={handleInputChange}
                                placeholder="john.doe@whitecart.com"
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/40 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                                    }`}
                            />
                            {errors.email && <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Security Password</label>
                            <input
                                type="password"
                                name="password"
                                value={adminFormData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/40 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                                    }`}
                            />
                            {errors.password && <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.password}</p>}
                        </div>

                        {/* Phone Number Input */}
                        <div className="space-y-1 sm:col-span-2">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Phone Matrix</label>
                            <input
                                type="tel"
                                name="phone"
                                value={adminFormData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter 10-digit mobile number"
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/40 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                                    }`}
                            />
                            {errors.phone && <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* ACTION ENGAGE TRIGGER BUTTON */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={loader}
                            className="bg-[#0369a1] hover:bg-[#0284c7] disabled:bg-slate-300 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all active:scale-98 inline-flex items-center justify-center min-w-[120px]"
                        >
                            {loader ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <span>Add Admin</span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}