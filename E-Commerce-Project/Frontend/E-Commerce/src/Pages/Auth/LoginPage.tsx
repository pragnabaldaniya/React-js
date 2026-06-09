import { useState } from "react";
import { loginAdmin } from "../../services/auth/AuthServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { allRoutes } from "../../routes/route";

export default function LoginPage() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loader, setLoader] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Validation State Management
    const [errors, setErrors] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    // Client-side Realtime Validation Logic
    const validateField = (name: string, value: string) => {
        let errorMsg = "";

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMsg = "Email is required.";
            } else if (!emailRegex.test(value)) {
                errorMsg = "Please enter a valid email address.";
            }
        }

        if (name === "password") {
            if (!value) {
                errorMsg = "Password is required.";
            } else if (value.length < 6) {
                errorMsg = "Password must be at least 6 characters.";
            }
        }

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleInputChange = (name: string, value: string) => {
        setLoginData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const onFormSubmit = async (event: any) => {
        event.preventDefault();

        // Final check before hitting API
        if (errors.email || errors.password || !loginData.email || !loginData.password) {
            toast.error("Please fix the validation errors before submitting.");
            return;
        }

        setLoader(true);
        try {

            const data = await loginAdmin(loginData);
            console.log("Login Response:", data);
            if (data.status === 200) {
                toast.success(data.message);
                navigate(allRoutes.dashboard);

                localStorage.setItem('authAdminToken', data.result.token);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Login Error:", error);
            console.log("Response:", error.response?.data);
            toast.error("An unexpected error occurred.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden w-full">

            {/* ─── LEFT SIDE: FULL-SCREEN LAYERED SKY CIRCLES (Exact image_962cd7.png Layout) ─── */}
            <div className="hidden lg:flex w-1/2 bg-[#0284c7] items-center justify-center relative overflow-hidden h-screen select-none">
                {/* Main Curve */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[120%] h-[140%] rounded-full bg-[#0369a1]" />
                {/* Top Overlay */}
                <div className="absolute -top-40 -left-20 w-[90%] h-[90%] rounded-full bg-[#0c4a6e]/20 blur-md" />
                {/* Bottom Floating Bubble */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[10%] w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] shadow-2xl shadow-sky-950/40"
                />
                {/* Bottom Left Corner Circle */}
                <div className="absolute bottom-[-15%] -left-10 w-[250px] h-[250px] rounded-full bg-[#0284c7]/60" />

                {/* Content Layout */}
                <div className="z-10 text-left px-16 max-w-xl w-full space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl font-extrabold text-white leading-tight uppercase tracking-wider"
                    >
                        Welcome
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sky-200 font-bold tracking-widest text-sm uppercase"
                    >
                        Your Headline Name
                    </motion.p>
                    <p className="text-sky-100/80 text-sm leading-relaxed pt-2 max-w-sm font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                    </p>
                </div>
            </div>

            {/* ─── RIGHT SIDE: COMPACT WHITE LOGIN PANEL (Validation Ready) ─── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm space-y-6"
                >
                    {/* Header Title */}
                    <div className="space-y-1 text-left">
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight ...">Sign in</h1>
                        <p className="text-slate-400 text-[11px] font-medium tracking-wide ...">Access your account to explore and manage your orders.</p>
                    </div>

                    <form className="space-y-4" onSubmit={onFormSubmit} noValidate>

                        {/* User Name / Email Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">User Name</label>
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                required
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className={`w-full px-3 py-2.5 text-xs rounded-lg border bg-slate-50/50 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1 relative">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={loginData.password}
                                    required
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    className={`w-full pl-3 pr-10 py-2.5 text-xs rounded-lg border bg-slate-50/50 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-sky-600 transition-colors uppercase tracking-wider"
                                >
                                    {showPassword ? <EyeOff size={14} /> : "Show"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-[10px] font-semibold mt-0.5 ml-0.5">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between px-0.5 pt-0.5">
                            <div className="flex items-center space-x-1.5">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600 accent-sky-600 focus:ring-0 cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-[11px] font-bold text-slate-500 cursor-pointer select-none">
                                    Remember me
                                </label>
                            </div>
                            <Link to={allRoutes.forgotPassword} className="text-[11px] font-bold text-sky-600 hover:text-sky-700 transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Buttons section */}
                        <div className="space-y-3 pt-2">
                            <motion.button
                                whileHover={{ y: -0.5 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loader || !!errors.email || !!errors.password}
                                className={`w-full text-white font-bold py-2.5 rounded-lg shadow-sm transition-all text-xs uppercase tracking-wider ${errors.email || errors.password ? "bg-slate-300 cursor-not-allowed shadow-none" : "bg-[#0369a1] hover:bg-[#0284c7]"
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {loader ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                    ) : (
                                        <span>Sign in</span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <div className="relative flex py-0.5 items-center">
                                <div className="flex-grow border-t border-slate-100"></div>
                                <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">or</span>
                                <div className="flex-grow border-t border-slate-100"></div>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-lg transition-colors text-xs uppercase tracking-wider"
                            >
                                Sign in with other
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-slate-400 text-[11px] font-semibold">
                        Don't have an account? <Link to="/signup" className="text-sky-600 font-bold hover:underline ml-0.5">Sign up</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}