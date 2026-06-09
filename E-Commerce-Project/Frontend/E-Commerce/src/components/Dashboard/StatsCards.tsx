// components/Dashboard/StatsCards.tsx
import { Users, Package, ShoppingCart, DollarSign, Loader, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardsProps {
    stats: {
        totalUsers: number;
        totalProducts: number;
        totalOrders: number;
        earnings: number;
    };
    loading: boolean;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string;       // Custom icon background configuration
    trend: {
        percentage: string;
        isPositive: boolean;
    };
}

function StatCard({ title, value, icon, colorClass, trend }: StatCardProps) {
    return (
        /* Card static rahega, koi movement nahi (hover:-translate-y hataya) */
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 p-5 shadow-xs transition-shadow duration-300 ease-out cursor-pointer hover:shadow-md group">

            <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1.5">
                    {/* Card Label */}
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                        {title}
                    </p>

                    {/* Main Counter Value - Font Size Chota Kiya (text-2xl) */}
                    <p className="text-2xl font-black text-slate-800 tracking-tight">
                        {value}
                    </p>

                    {/* Trend Badge */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${trend.isPositive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                            }`}>
                            {trend.isPositive ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
                            {trend.percentage}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">vs last week</span>
                    </div>
                </div>

                {/* Icon Container - Card wahi rahega, sirf inner icon image zoom hogi (group-hover:scale-110) */}
                <div className={`p-3.5 rounded-xl transition-all duration-300 ease-out ${colorClass}`}>
                    <div className="transition-transform duration-300 ease-out group-hover:scale-115">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="relative flex items-center justify-center">
                    <Loader className="animate-spin text-sky-500" size={32} />
                    <span className="absolute text-[9px] font-bold text-sky-600 mt-12 animate-pulse">Syncing...</span>
                </div>
            </div>
        );
    }

    const cardsData = [
        {
            title: "Total Earnings",
            value: `₹${stats.earnings.toLocaleString()}`,
            icon: <DollarSign size={20} className="text-sky-600" />,
            colorClass: "bg-sky-50",
            trend: { percentage: "+18.2%", isPositive: true }
        },
        {
            title: "Total Orders",
            value: stats.totalOrders.toLocaleString(),
            icon: <ShoppingCart size={20} className="text-blue-600" />,
            colorClass: "bg-blue-50",
            trend: { percentage: "+12.4%", isPositive: true }
        },
        {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            icon: <Users size={20} className="text-indigo-600" />,
            colorClass: "bg-indigo-50",
            trend: { percentage: "+8.1%", isPositive: true }
        },
        {
            title: "Total Products",
            value: stats.totalProducts.toLocaleString(),
            icon: <Package size={20} className="text-violet-600" />,
            colorClass: "bg-violet-50",
            trend: { percentage: "-2.3%", isPositive: false }
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardsData.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
}