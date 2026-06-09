import { useEffect, useState } from 'react';
import { Edit2, Trash2, Search, Plus, ShieldCheck, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminActiveOrInactive, deleteSingleAdmin, fetchAllAdmin } from '../../services/admin/AdminServices';
import { useNavigate } from 'react-router';
import { allRoutes } from '../../routes/route';

interface adminData {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    profile_image: string,
    isActive: boolean,
    create_at: string,
}



export default function ViewAdminPage() {
    const [allAdmin, setAllAdmin] = useState<adminData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        getAllAdmin();
    }, []);

    // get All Admin Mathod
    const getAllAdmin = async () => {
        setLoader(true);
        const data = await fetchAllAdmin();

        if (data.status === 200) {
            console.log(data.result);
            setAllAdmin(data.result);
        } else {
            toast.error(data.message);
        }
        setLoader(false);

    };


    // delete mathode
    const deleteAdmin = async (id: string) => {
        console.log("Delete Mathod : ", id);


        const data = await deleteSingleAdmin(id);

        if (data.status === 200) {
            await getAllAdmin();

            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    }

    // Active Inactive mathod
    const onChangeStatus = async (id: string) => {
        const data = await adminActiveOrInactive(id);

        if (data.status === 200) {
            toast.success(data.message);
            await getAllAdmin();

        } else {
            toast.error(data.message);
        }
    }


    // Realtime search client-side execution matrix
    const filteredAdmins = allAdmin.filter((admin) => {
        const fullName = `${admin.first_name} ${admin.last_name}`.toLowerCase();
        const email = admin.email.toLowerCase();
        const phone = admin.phone;
        const query = searchQuery.toLowerCase();

        return fullName.includes(query) || email.includes(query) || phone.includes(query);
    });


    return (
        <div className="min-h-screen bg-slate-50/40 p-4 md:p-8 text-slate-800 font-sans w-full">

            {/* ─── HEADER SECTION ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <div className="p-1.5 bg-sky-50 rounded-xl border border-sky-100 text-[#0369a1]">
                            <ShieldCheck size={22} />
                        </div>
                        Admin Management
                    </h1>
                    <p className="text-xs font-medium text-slate-400">Manage system administrators, permissions, and framework security privileges.</p>
                </div>

                <button onClick={() => {
                    navigate('/dashboard/add-admin');
                }} className="inline-flex items-center justify-center gap-2 bg-[#0369a1] hover:bg-[#0284c7] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95">
                    <Plus size={14} className="stroke-[3]" />
                    Add New Admin
                </button>
            </div>

            {/* ─── CONTROLS SEARCH FILTER BAR ─── */}
            <div className="bg-white border border-slate-200/80 border-b-0 rounded-t-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search admins by name, email..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-50 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {loader ? "Fetching Registry..." : `Total Records: ${filteredAdmins.length}`}
                </div>
            </div>

            {/* ─── RUNTIME LOADING SKELETON semmer effect ─── */}
            {loader && (
                <div className="bg-white border border-slate-200/80 rounded-b-2xl shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                                    <th className="py-3.5 px-4 w-16 text-center">ID</th>
                                    <th className="py-3.5 px-4">Name</th>
                                    <th className="py-3.5 px-4">Email</th>
                                    <th className="py-3.5 px-4">Phone</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Created At</th>
                                    <th className="py-3.5 px-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {...Array(5).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="py-4 px-4 text-center">
                                            <div className="h-3.5 bg-slate-200 rounded-md w-8 mx-auto" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
                                                <div className="h-3.5 bg-slate-200 rounded-md w-24" />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-3.5 bg-slate-200 rounded-md w-36" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-3.5 bg-slate-200 rounded-md w-20" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-5 bg-slate-200 rounded-full w-16" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-3.5 bg-slate-200 rounded-md w-16" />
                                        </td>
                                        <td className="py-4 px-4 text-right pr-6">
                                            <div className="inline-flex items-center gap-1.5 justify-end w-full<span>">
                                                <div className="w-7 h-7 bg-slate-200 rounded-lg" />
                                                <div className="w-7 h-7 bg-slate-200 rounded-lg" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}



            {/* ─── DATA TABLE ARCHITECTURE CONTAINER ─── */}
            {!loader && (
                <div className="bg-white border border-slate-200/80 rounded-b-2xl shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                                    <th className="py-3.5 px-4 w-16 text-center">ID</th>
                                    <th className="py-3.5 px-4">Administrator</th>
                                    <th className="py-3.5 px-4">Email</th>
                                    <th className="py-3.5 px-4">Phone</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Created At</th>
                                    <th className="py-3.5 px-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredAdmins.length > 0 ? (
                                    filteredAdmins.map((admin, index) => (
                                        <tr key={admin._id || index} className="hover:bg-slate-50/60 transition-colors group">
                                            {/* Serial Tracker */}
                                            <td className="py-3.5 px-4 text-center font-mono text-[11px] text-slate-400 font-medium">
                                                #{index + 101}
                                            </td>

                                            {/* Avatar Profile Mesh */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={admin.profile_image}
                                                        alt={`${admin.first_name} profile`}
                                                        className="w-9 h-9 rounded-full object-cover border border-slate-100 ring-2 ring-slate-100"
                                                        onError={(e) => {
                                                            // Fallback in case avatar URL is corrupt
                                                            // (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=60";
                                                        }}
                                                    />
                                                    <div>
                                                        <div className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                                                            {admin.first_name} {admin.last_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email Address String */}
                                            <td className="py-3.5 px-4 text-slate-500 font-semibold truncate max-w-[180px]">
                                                {admin.email}
                                            </td>

                                            {/* Phone Metrics */}
                                            <td className="py-3.5 px-4 text-slate-500 font-medium">
                                                {admin.phone || "—"}
                                            </td>

                                            {/* Flag Status Badges */}
                                            <td className="py-3.5 px-4">
                                                <button onClick={() => onChangeStatus(admin._id)} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${admin.isActive
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${admin.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                    {admin.isActive ? "Active" : "Inactive"}
                                                </button>
                                            </td>

                                            {/* Date String */}
                                            <td className="py-4 px-4 text-slate-500 font-medium">
                                                {admin.create_at}
                                            </td>

                                            {/* Modification Direct Action Buttons */}
                                            <td className="py-3.5 px-4 text-right pr-6 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-1">
                                                    <button onClick={() => {
                                                        navigate(`${allRoutes.dashboard + "/" + allRoutes.editAdmin}/${admin._id}`);
                                                    }} title="Edit Admin Details" className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all active:scale-90">
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button onClick={() => deleteAdmin(admin._id)} title="Delete Admin Account" className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* ─── EMPTY ENGINES FALLBACK STATE ─── */
                                    <tr>
                                        <td colSpan={7} className="py-12 px-4 text-center">
                                            <div className="flex flex-col items-center justify-center max-w-xs mx-auto space-y-2 select-none">
                                                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400">
                                                    <HelpCircle size={24} />
                                                </div>
                                                <h3 className="text-slate-700 font-bold text-sm tracking-tight">No Admins Found</h3>
                                                <p className="text-slate-400 text-[11px] font-medium">We couldn't find any administrator matching your current query parameters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}