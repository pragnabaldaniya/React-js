import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { setNewPasswordAdmin } from "../../services/auth/AuthServices";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { allRoutes } from "../../routes/route";

export default function NewPasswordPage() {
    const [newPasswordData, setNewPasswordData] = useState({ new_password: "", conform_password: "" });
    const [loader, setLoader] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>("");
    const navigate = useNavigate();

    // Password fields match sequence tracking handler
    const handlePasswordInput = (field: "new_password" | "conform_password", value: string) => {
        const updatedData = { ...newPasswordData, [field]: value };
        setNewPasswordData(updatedData);

        if (updatedData.new_password && updatedData.conform_password) {
            if (updatedData.new_password !== updatedData.conform_password) {
                setValidationError("Passwords do not match.");
            } else {
                setValidationError("");
            }
        } else {
            setValidationError("");
        }
    };

    const onFormSubmit = async (event: any) => {
        event.preventDefault();

        if (newPasswordData.new_password !== newPasswordData.conform_password) {
            toast.error("New Password and Conform Password do not match.");
            setValidationError("Passwords do not match.");
            return;
        }

        setLoader(true);

        // New Password API
        const data = await setNewPasswordAdmin(newPasswordData.new_password);

        if (data.status === 200) {
            toast.success(data.message);
            navigate(allRoutes.login);
            sessionStorage.clear();
        }
        else {
            toast.error(data.message);
        }

        setLoader(false);
    };

    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden w-full">

            {/* ─── LEFT SIDE: LAYERED SKY CIRCLES + SECURITY KEY CONTENT VECTORS ─── */}
            <div className="hidden lg:flex w-1/2 bg-[#0284c7] items-center justify-center relative overflow-hidden h-screen select-none">
                {/* Main Curve Partition (from image_962cd7.png) */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[120%] h-[140%] rounded-full bg-[#0369a1]" />

                {/* CSS Vector Mesh Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Top Subtle Overlay */}
                <div className="absolute -top-40 -left-20 w-[90%] h-[90%] rounded-full bg-[#0c4a6e]/20 blur-md" />

                {/* Bottom Floating Bubble */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[10%] w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] shadow-2xl shadow-sky-950/40"
                />
                {/* Bottom Left Corner Circle */}
                <div className="absolute bottom-[-15%] -left-10 w-[250px] h-[250px] rounded-full bg-[#0284c7]/60" />

                {/* Dynamic Content Configured for Reset Authorization Step */}
                <div className="z-10 text-left px-16 max-w-xl w-full space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-xl shadow-sky-950/20"
                    >
                        <Lock size={28} className="text-sky-200 animate-pulse" />
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl font-extrabold text-white leading-tight uppercase tracking-wider"
                        >
                            Update<br />Credentials
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sky-200 font-bold tracking-widest text-xs uppercase flex items-center gap-1.5"
                        >
                            <ShieldCheck size={14} /> Security Key Matrix
                        </motion.p>
                    </div>

                    <p className="text-sky-100/80 text-xs leading-relaxed pt-2 max-w-xs font-medium border-t border-white/10">
                        Establish your new cryptic security string password to authorize administrative privilege overrides.
                    </p>
                </div>
            </div>

            {/* ─── RIGHT SIDE: COMPACT PASSWORD RESET PANEL ─── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm space-y-6"
                >
                    {/* Header Details */}
                    <div className="text-left space-y-1">
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Set New Password</h1>
                        <p className="text-slate-400 text-[11px] font-medium">Please construct a strong secure password for account recovery.</p>
                    </div>

                    <form className="space-y-4" onSubmit={onFormSubmit} noValidate>

                        {/* New Password Input Box */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">New Password</label>
                            <input
                                type="password"
                                required
                                onChange={(e) => handlePasswordInput("new_password", e.target.value)}
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/50 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${validationError ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                                    }`}
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Confirm Password Input Box */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Confirm Password</label>
                            <input
                                type="password"
                                required
                                onChange={(e) => handlePasswordInput("conform_password", e.target.value)}
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/50 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${validationError ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                                    }`}
                                placeholder="••••••••"
                            />
                            {validationError && (
                                <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{validationError}</p>
                            )}
                        </div>

                        {/* Submission Engine Trigger Button */}
                        <div className="pt-2">
                            <motion.button
                                whileHover={!validationError ? { y: -0.5 } : {}}
                                whileTap={!validationError ? { scale: 0.99 } : {}}
                                type="submit"
                                disabled={loader || !!validationError}
                                className={`w-full font-bold py-2.5 rounded-lg shadow-sm transition-all text-xs uppercase tracking-wider text-white ${validationError ? "bg-slate-300 cursor-not-allowed shadow-none" : "bg-[#0369a1] hover:bg-[#0284c7] shadow-sky-100"
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {loader ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                    ) : (
                                        <span>Change Password</span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </form>

                    {/* Navigation System Footer Actions */}
                    <div className="border-t border-slate-100 pt-4 flex flex-col items-center gap-2">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-600 font-bold text-[11px] uppercase tracking-wider transition-colors"
                        >
                            <ArrowLeft size={12} /> Back to Sign In
                        </Link>

                        <p className="text-center text-slate-400 text-[11px] font-semibold pt-2">
                            Don't have an account? <Link to="/signup" className="text-sky-600 font-extrabold hover:underline ml-0.5">Sign up</Link>
                        </p>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}