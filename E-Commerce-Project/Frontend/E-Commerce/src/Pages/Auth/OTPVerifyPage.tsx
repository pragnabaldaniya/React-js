import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { forgotPasswordAdmin, OTPVerifyAdmin } from "../../services/auth/AuthServices";
import { ShieldCheck, MailWarning, ArrowLeft } from "lucide-react";
import { allRoutes } from "../../routes/route";

export default function OTPVerifyPage() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [loader, setLoader] = useState<boolean>(false);
    const [time, setTime] = useState<number>(120); // 2:00 mins
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    // Auto-focus first input on load
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Timer logic
    useEffect(() => {
        if (time <= 0) return;

        const timer = setInterval(() => {
            setTime(state => state - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onFormSubmit = async (event: any) => {
        event.preventDefault();
        const finalOtp = otp.join("");

        if (finalOtp.length < 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setLoader(true);

        try {
            const data = await OTPVerifyAdmin(finalOtp);
            if (data.status === 200) {
                toast.success(data.message);
                navigate(allRoutes.newPassword);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Verification failed. Please try again.");
        } finally {
            setLoader(false);
        }
    };

    const handleResendOTP = async () => {
        const email = sessionStorage.getItem('email') || "";
        const data = await forgotPasswordAdmin(email);

        if (data.status === 200) {
            toast.success(data.message || "OTP resent successfully");
        }
        else {
            toast.error(data.message || "Failed to resend OTP");
        }

        setTime(120); // Timer ko wapas 2 mins par reset karne ke liye
    };

    const minute = Math.floor(time / 60).toString().padStart(2, '0');
    const second = (time % 60).toString().padStart(2, '0');

    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden w-full">

            {/* ─── LEFT SIDE: LAYERED SKY CIRCLES + OTP CONTENT VECTOR GRID ─── */}
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

                {/* Vector Layout Context Elements */}
                <div className="z-10 text-left px-16 max-w-xl w-full space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-xl shadow-sky-950/20"
                    >
                        <ShieldCheck size={28} className="text-sky-200 animate-pulse" />
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl font-extrabold text-white leading-tight uppercase tracking-wider"
                        >
                            Two-Factor<br />Auth Sync
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sky-200 font-bold tracking-widest text-xs uppercase flex items-center gap-1.5"
                        >
                            <MailWarning size={14} /> Verification Token Matrix
                        </motion.p>
                    </div>

                    <p className="text-sky-100/80 text-xs leading-relaxed pt-2 max-w-xs font-medium border-t border-white/10">
                        Please enter the secure authentication sequence code sent to your master account endpoint address.
                    </p>
                </div>
            </div>

            {/* ─── RIGHT SIDE: COMPACT COMPONENT BLOCK (Smaler & Closer Boxes) ─── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm space-y-6"
                >
                    {/* Header Title */}
                    <div className="text-left space-y-1">
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Verify OTP</h1>
                        <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
                            We've sent a 6-digit code to your email. Please enter it below...
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={onFormSubmit}>

                        {/* 6 Grid Separated Compact Input Boxes */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-0.5">Secure Passcode</label>
                            <div className="flex justify-between gap-1.5">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        value={data}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-full h-11 text-center text-sm font-bold rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all outline-none text-slate-900 bg-slate-50/50 focus:bg-white"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Submission Engine Button Matrix */}
                        <div className="pt-1 space-y-3">
                            <motion.button
                                whileHover={{ y: -0.5 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loader}
                                className="w-full bg-[#0369a1] hover:bg-[#0284c7] text-white font-bold py-2.5 rounded-lg shadow-sm transition-all text-xs uppercase tracking-wider"
                            >
                                <AnimatePresence mode="wait">
                                    {loader ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                    ) : (
                                        <span>Verify Account</span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </form>

                    {/* Timer / Resend UI Controller block */}
                    <div className="text-center h-5 flex items-center justify-center text-[11px]">
                        <AnimatePresence mode="wait">
                            {time > 0 ? (
                                <motion.p
                                    key="timer"
                                    initial={{ opacity: 0, y: -2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 2 }}
                                    className="text-slate-400 font-semibold"
                                >
                                    Didn't receive the code?{" "}
                                    <span className="font-bold text-sky-600 inline-block ml-0.5">
                                        {minute}:{second}
                                    </span>
                                </motion.p>
                            ) : (
                                <motion.div
                                    key="resend"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        className="font-extrabold text-sky-600 hover:text-sky-700 hover:underline transition-all uppercase tracking-wider text-[11px]"
                                    >
                                        Resend OTP
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Back Action Trigger Layout Link */}
                    <div className="border-t border-slate-100 pt-3 text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-600 font-bold text-[11px] uppercase tracking-wider transition-colors"
                        >
                            <ArrowLeft size={12} /> Back to login
                        </button>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}