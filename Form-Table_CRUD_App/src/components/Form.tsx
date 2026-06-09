import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import type { studentType } from '../utils/global';

// ye object ka type banaya
type propsType = {
    allStudent: studentType[],
    setAllStudent: (allStudent: React.SetStateAction<studentType[]>) => void
    editStudent: studentType | null,
    editIndex: number | null,
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
}

//ye ek object he
export default function Form({ allStudent,
    setAllStudent,
    editStudent,
    editIndex,
    setEditIndex, }: propsType) {

    const [fName, setfName] = useState<string>('');
    const [lName, setlName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [hobby, setHobby] = useState<string[]>([]);
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const [error, setError] = useState<any>({});


    const allHobby = ["Reading", "Music", "Traveling", "Other"];
    const allCity = ["Surat", "Baroda", "Ahmdabad", "Mumbai"];

    useEffect(() => {
        console.log("Use Effect : ", allStudent);

        localStorage.setItem("students", JSON.stringify(allStudent));

    }, [allStudent]);

    useEffect(() => {
        if (editStudent) {
            setfName(editStudent.fName);
            setlName(editStudent.lName);
            setEmail(editStudent.email);
            setPhone(editStudent.phone);
            setGender(editStudent.gender);
            setHobby(editStudent.hobby);
            setCity(editStudent.city);
            setAddress(editStudent.address);
        }
    }, [editStudent]);




    const getStudentHobby = (event: any) => {
        const data = event.target.value;
        const isChecked = event.target.checked;

        console.log(data, isChecked);

        if (isChecked) {
            setHobby((prevHobby) => [...prevHobby, data]);
        } else {
            setHobby((prevHobby) =>
                prevHobby.filter((myHobby) => myHobby !== data) // hobby remove logic
            );
        }
    };

    //validation mathod
    const validation = () => {
        let newError = {};

        if (!fName) {
            newError.fName = "First name is required..";
        }

        if (!lName) {
            newError.lName = "last name is required..";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newError.email = "email is required..";
        } else if (!emailPattern.test(email)) {
            newError.email = "Invalid email address...";
        }

        const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phone) {
            newError.phone = "phone no is required..";
        } else if (phone.length !== 10 || !phonePattern.test(phone)) {
            newError.phone = "Inavalid phone number...";
        }

        if (!gender) {
            newError.gender = "gender is required..";
        }

        if (hobby.length === 0) {
            newError.hobby = "hobby is required..";
        }

        if (!city) {
            newError.city = "city is required..";
        }

        if (!address) {
            newError.address = "address is required..";
        }

        setError(newError);


        console.log("Error Length : ", Object.keys(newError).length);

        return Object.keys(newError).length;

    }


    const studentFormSubmit = (event: any) => {
        // page reload na ho so...
        event.preventDefault(); // Event se ata he

        if (validation() !== 0) {   // validation call  8 !== 0
            return;
        }

        const studentData = {
            fName,
            lName,
            email,
            phone,
            gender,
            hobby,
            city,
            address
        }


        if (editIndex !== null) {
            // Edit Logic

            let updateStudent = [...allStudent];
            updateStudent[editIndex] = studentData;
            setAllStudent(updateStudent);

            setEditIndex(null);

            toast.success("Student updated successfully...");
        } else {
            // Insert Logic
            // setAllStudents([...allStudents, studentData]);
            setAllStudent((allStudents) => [...allStudents, studentData]);

            toast.success("Student added succussfully...");
        }


        // Old student k sath new student add ... thi
        // setAllStudent(allStudent => [...allStudent, studentData]);

        console.log("Student :", studentData);

        // localstorag ma key student ema deta....
        // localStorage.setItem('student ', JSON.stringify(studentData));

        // form submit k bad emty
        setfName("");
        setlName("");
        setEmail("");
        setPhone("");
        setGender("");
        setHobby([]);
        setCity("");
        setAddress("");

        // toast.success("Student added succussfully...")


    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <div className="inline-block p-2 bg-white rounded-full shadow-md mb-3">
                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Student Registration</h1>
                    <p className="text-gray-600 text-sm">Please fill in the student information below</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600">
                        <h2 className="text-lg font-semibold text-white">Student Information</h2>
                        <p className="text-teal-100 text-xs mt-0.5">All fields marked with * are required</p>
                    </div>

                    <form className="px-6 py-6 space-y-5" onSubmit={studentFormSubmit}>
                        {/* Name Row - First & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='text'
                                    id='fName'
                                    value={fName}
                                    onChange={(event) => { setfName(event.target.value); }}
                                    className={`w-full px-3 py-1.5 border ${(error.fName) ? 'border-red-600' : 'border-gray-300 '} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-sm`}
                                    placeholder="Enter first name"
                                />
                                {/* {fname ma value hoy toj inspact element ma span dekhay} */}
                                {error.fName && <span className='text-red-400'>{error.fName}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input

                                    type='text'
                                    id='lName'
                                    value={lName}
                                    onChange={(event) => setlName(event.target.value)}
                                    className={`w-full px-3 py-1.5 border ${(error.lName) ? 'border-red-600' : 'border-gray-300 '} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-sm`}
                                    placeholder="Enter last name"
                                />
                                {error.lName && <span className='text-red-400'>{error.lName}</span>}
                            </div>
                        </div>

                        {/* Email & Phone Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className={`w-full px-3 py-1.5 border ${(error.email) ? 'border-red-600' : 'border-gray-300 '} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-sm`}
                                    placeholder="student@example.com"
                                />
                                {error.email && <span className='text-red-400'>{error.email}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='tel'
                                    id='phone'
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    className={`w-full px-3 py-1.5 border ${(error.phone) ? 'border-red-600' : 'border-gray-300 '} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-sm`}
                                    placeholder="+1 234 567 8900"
                                />
                                {error.phone && <span className='text-red-400'>{error.phone}</span>}
                            </div>
                        </div>

                        {/* Gender Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type='radio'
                                        name='gender'
                                        value='Male'
                                        checked={(gender === "Male") ? true : false}
                                        onChange={(event) => setGender(event.target.value)}
                                        className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Male</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type='radio'
                                        name='gender'
                                        value='Female'
                                        checked={(gender === "Female") ? true : false}
                                        onChange={(event) => setGender(event.target.value)}
                                        className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Female</span>
                                </label>
                            </div>
                            {error.gender && <span className='text-red-400'>{error.gender}</span>}
                        </div>

                        {/* Hobby Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hobbies & Interests
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {allHobby.map((myHobby) => {
                                    return <label key={myHobby} className="flex items-center cursor-pointer p-1.5 rounded hover:bg-gray-50 transition-colors">
                                        <input
                                            type='checkbox'
                                            name='hobby'
                                            value={myHobby}
                                            checked={hobby.includes(myHobby)}
                                            onChange={getStudentHobby}
                                            className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{myHobby}</span>
                                    </label>

                                })}
                            </div>
                            {error.hobby && <span className='text-red-400'>{error.hobby}</span>}
                        </div>

                        {/* City Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City <span className="text-red-500">*</span>
                            </label>
                            <select
                                id='city'
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                className={`w-full px-3 py-1.5 border ${(error.city) ? 'border-red-600' : 'border-gray-300 '} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-sm`}
                            >
                                <option value='select'>Select a city</option>
                                {allCity.map((myCity) => {
                                    return <option key={myCity} value={myCity}>{myCity}</option>
                                })}

                            </select>
                            {error.city && <span className='text-red-400'>{error.city}</span>}
                        </div>

                        {/* Address Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Residential Address
                            </label>
                            <textarea
                                id='address'
                                rows={3}
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                className={`w-full px-3 py-1.5 border ${(error.address) ? 'border-red-600' : 'border-gray-300 '} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-sm`}
                                placeholder="Enter complete address..."
                            ></textarea>
                            {error.address && <span className='text-red-400'>{error.address}</span>}
                            <p className="text-xs text-gray-500 mt-1">Include house number, street, and landmark if any</p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold py-2 px-4 rounded-md hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-md text-sm"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Add Student</span>
                                </div>
                            </button>
                        </div>

                        {/* Form Footer */}
                        <div className="text-center pt-3">
                            <p className="text-xs text-gray-500">
                                By submitting this form, you agree to our
                                <a href="#" className="text-teal-600 hover:underline mx-1">Terms of Service</a>
                                and
                                <a href="#" className="text-teal-600 hover:underline ml-1">Privacy Policy</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}