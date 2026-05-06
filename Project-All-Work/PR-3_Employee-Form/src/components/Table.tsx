import type { employeeType } from "../App";

type propsType = {
  allEmployee: employeeType[],
  deleteEmployee: (index: number) => void,
  updateEmployee: (index: number) => void
}

export default function Table({ allEmployee, deleteEmployee, updateEmployee }: propsType) {
  return (
    <div className="p-6">
      <div className="overflow-hidden bg-white shadow-md rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          {/* Header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 font-bold text-center">#</th>
              <th className="px-4 py-4 font-bold">Full Name</th>
              <th className="px-4 py-4 font-bold">Email</th>
              <th className="px-4 py-4 font-bold">Contact</th>
              <th className="px-4 py-4 font-bold text-center">Gender</th>
              <th className="px-4 py-4 font-bold">Dept</th>
              <th className="px-4 py-4 font-bold">City</th>
              <th className="px-4 py-4 font-bold">Salary</th>
              <th className="px-4 py-4 font-bold">Joining Date</th>
              <th className="px-4 py-4 font-bold text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {allEmployee.length > 0 ? (
              allEmployee.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-4 text-center font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    {emp.fName} {emp.lName}
                  </td>
                  <td className="px-4 py-4">{emp.email}</td>
                  <td className="px-4 py-4">{emp.phone}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                      {emp.gender}
                    </span>
                  </td>
                  <td className="px-4 py-4 uppercase tracking-wider text-[11px] font-bold text-gray-500">
                    {emp.dep}
                  </td>
                  <td className="px-4 py-4">{emp.city}</td>
                  <td className="px-4 py-4 font-mono font-bold text-teal-600">
                    ₹{Number(emp.salary).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-xs font-medium">{emp.date}</td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => updateEmployee(index)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-all font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(index)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-all font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-gray-400 italic">
                  No employee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}