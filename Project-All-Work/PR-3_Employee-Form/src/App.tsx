import { useEffect, useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'

export type employeeType = {
  fName: string,
  lName: string,
  email: string,
  phone: string,
  gender: string,
  dep: string,
  city: string,
  salary: string,
  date: string,
  address: string
}

export default function App() {

  const [allEmployee, setAllEmployee] = useState<employeeType[]>(
    JSON.parse(localStorage.getItem('employee') || "[]")
  );

  const [editEmployee, setEditEmployee] = useState<employeeType | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("employee", JSON.stringify(allEmployee));
  }, [allEmployee]);

  // delete
  const deleteEmployee = (index: number) => {
    setAllEmployee(prev => prev.filter((_, i) => i !== index));
  };

  // edit
  const updateEmployee = (index: number) => {
    setEditIndex(index);
    setEditEmployee(allEmployee[index]);
  };

  return (
    <>
      <Form
        allEmployee={allEmployee}
        setAllEmployee={setAllEmployee}
        editEmployee={editEmployee}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />

      <Table
        allEmployee={allEmployee}
        deleteEmployee={deleteEmployee}
        updateEmployee={updateEmployee}
      />
    </>
  )
}