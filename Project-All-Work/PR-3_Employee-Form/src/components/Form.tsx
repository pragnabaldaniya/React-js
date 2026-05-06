import { useState, useEffect } from "react";

// type define
type employeeType = {
    fName: string;
    lName: string;
    email: string;
    phone: string;
    gender: string;
    dep: string;
    city: string;
    salary: string;
    date: string;
    address: string;
};

type propsType = {
    allEmployee: employeeType[];
    setAllEmployee: React.Dispatch<React.SetStateAction<employeeType[]>>;
    editEmployee: employeeType | null;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function Form({
    allEmployee,
    setAllEmployee,
    editEmployee,
    editIndex,
    setEditIndex
}: propsType) {

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [dep, setDep] = useState("");
    const [city, setCity] = useState("");
    const [salary, setSalary] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");

    const [error, setError] = useState<any>({});

    const allDep = ["HR", "IT", "Sales", "Marketing"];
    const allCity = ["Surat", "Baroda", "Ahmdabad", "Mumbai"];

    // edit data fill
    useEffect(() => {
        if (editEmployee) {
            setfName(editEmployee.fName);
            setlName(editEmployee.lName);
            setEmail(editEmployee.email);
            setPhone(editEmployee.phone);
            setGender(editEmployee.gender);
            setDep(editEmployee.dep);
            setCity(editEmployee.city);
            setSalary(editEmployee.salary);
            setDate(editEmployee.date);
            setAddress(editEmployee.address);
        }
    }, [editEmployee]);

    // validation
    const validation = () => {
        let newError: any = {};

        if (!fName) newError.fName = "First name required";
        if (!lName) newError.lName = "Last name required";
        if (!email) newError.email = "Email required";
        if (!phone) newError.phone = "Phone required";
        if (!gender) newError.gender = "Gender required";
        if (!dep) newError.dep = "Department required";
        if (!salary) newError.salary = "Salary required";
        if (!date) newError.date = "Date required";
        if (!address) newError.address = "Address required";

        setError(newError);
        return Object.keys(newError).length;
    };

    // submit
    const employeeFormSubmit = (e: any) => {
        e.preventDefault();

        if (validation() !== 0) return;

        const employeeData = {
            fName,
            lName,
            email,
            phone,
            gender,
            dep,
            city,
            salary,
            date,
            address
        };

        if (editIndex !== null) {
            let updated = [...allEmployee];
            updated[editIndex] = employeeData;
            setAllEmployee(updated);
            setEditIndex(null);
        } else {
            setAllEmployee(prev => [...prev, employeeData]);
        }

        // reset form
        setfName("");
        setlName("");
        setEmail("");
        setPhone("");
        setGender("");
        setDep("");
        setCity("");
        setSalary("");
        setDate("");
        setAddress("");
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {editIndex !== null ? "📝 Edit Employee" : "👤 Employee Profile"}
                </h2>
                <p className="text-sm text-gray-500">Please fill all required fields marked with *</p>
            </div>

            <form onSubmit={employeeFormSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">First Name *</label>
                        <input
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm"
                            value={fName} onChange={(e) => setfName(e.target.value)} placeholder="John"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
                        <input
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm"
                            value={lName} onChange={(e) => setlName(e.target.value)} placeholder="Doe"
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Email *</label>
                        <input
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                            value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Phone</label>
                        <input
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                            value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {/* Gender*/}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-4">
                            {["Male", "Female"].map((g) => (
                                <label key={g} className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={gender === g}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-teal-600 transition-colors">{g}</span>
                                </label>
                            ))}
                        </div>
                        {error.gender && <span className="text-xs text-red-500 mt-1">{error.gender}</span>}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                            {allDep.map((d) => (
                                <label key={d} className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="dept"
                                        value={d}
                                        checked={dep === d}
                                        onChange={(e) => setDep(e.target.value)}
                                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-teal-600 transition-colors">{d}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* City, Salary, Date Row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 mb-1">CITY</label>
                        <select
                            className="px-2 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                            value={city} onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">Select</option>
                            {allCity.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 mb-1">SALARY</label>
                        <input
                            className="px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="0.00"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 mb-1">JOIN DATE</label>
                        <input
                            type="date"
                            className="px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            value={date} onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Full Address</label>
                    <textarea
                        rows={2}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none text-sm resize-none"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter street, building etc."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95 text-sm uppercase tracking-wider"
                >
                    {editIndex !== null ? "Confirm Update" : "Create Employee Profile"}
                </button>
            </form>
        </div>
    );



}