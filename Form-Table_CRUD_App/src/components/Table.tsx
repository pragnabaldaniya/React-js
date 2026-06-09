import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import type { studentType } from '../utils/global';

// object ka type banaya
type propsType = {
  allStudent: studentType[],
  deleteStudent: (index: number) => void
  updateStudent: (index: number) => void
}
// ye ek object he
export default function Table({ allStudent, deleteStudent, updateStudent, }: propsType) {

  // city Count state  
  const [numberOfCity, setNumberOfCity] = useState<number>(0);

  useEffect(() => {
    console.log("TableALL Student", allStudent);


    // city Count logic
    let allCity: any;
    allCity = allStudent.map((student) => {
      return student.city;
    });

    console.log("All City : ", allCity);

    allCity = new Set([...allCity]);
    console.log("All City : ", allCity.size);

    setNumberOfCity(allCity.size);


  }, [allStudent])

  console.log(allStudent);


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Student Admin Panel</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">20</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">AD</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards - Dynamic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">{allStudent.length}</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Male Students</p>
                <p className="text-2xl font-bold text-gray-800">{allStudent.filter((student) => student.gender === 'Male').length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Female Students</p>
                <p className="text-2xl font-bold text-gray-800">{allStudent.filter((student) => student.gender === 'Female').length}</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Cities</p>
                <p className="text-2xl font-bold text-gray-800">{numberOfCity}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Table Header with Search and Filters */}
          <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-white font-semibold text-lg">Student Records</h2>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg text-sm bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-3 items-center">
            <span className="text-sm text-gray-600 font-medium">Filter by:</span>
            <select className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>All Cities</option>

            </select>
            <select className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>All Genders</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <button className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
              Apply Filters
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Reset
            </button>

            <div className="ml-auto flex gap-2">
              <button className="p-1.5 text-gray-600 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <button className="p-1.5 text-gray-600 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Responsive Table - Dynamic with map() */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">

              {/* {thead} */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>

                  {/* heading */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hobby</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              {/* TBody */}
              <tbody className="bg-white divide-y divide-gray-200">

                {allStudent.map((student, index) => {
                  return <tr key={index} className="hover:bg-teal-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.fName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.lName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <a href={`mailto: ${student.email}`} className=''>{student.email}</a></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.phone}</td>

                    {/* gender */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${student.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {student.hobby}

                      </div>
                    </td>

                    {/* {city} */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${student.city === 'Surat' ? 'bg-blue-100 text-blue-700' :
                        student.city === 'Mumbai' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                        {student.city}
                      </span>
                    </td>

                    {/*Address */}
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{student.address}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {/* Edit */}
                      <button onClick={() => updateStudent(index)} className="text-teal-600 hover:text-teal-800 mr-3">
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button onClick={() => {
                        deleteStudent(index);
                      }} className="text-red-600 hover:text-red-800">
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                })}
                {allStudent.length === 0 && <div>
                  <p className='text-center'>Student Not Found..</p></div>}

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {/* <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{students.length}</span> of <span className="font-medium">{students.length}</span> results
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">1</button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  )
}