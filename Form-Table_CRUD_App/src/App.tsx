
import { useEffect, useState } from 'react';
import Form from './components/Form'
import Table from './components/Table'
import { toast, ToastContainer } from 'react-toastify';
import type { studentType } from './utils/global';

export default function App() {

  const [allStudent, setAllStudent] = useState<studentType[]>(JSON.parse(localStorage.getItem('students') || "[]"));

  const [editStudent, setEditStudent] = useState<studentType | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log("Use Effect : ", allStudent);

    localStorage.setItem("students", JSON.stringify(allStudent) || "[]");

  }, [allStudent]);

  //delet logic
  const deleteStudent = (index: number) => {
    // index = 1

    // const deletedStudents = allStudent.filter((_, i) => i !== index);  // 4 !== 1 true

    // setAllStudent(deletedStudents);

    setAllStudent(allStudent => allStudent.filter((_, i) => i !== index)); // ek hi line vala esuy way



    toast.success("Student deleted Successfully...")
  }


  const updateStudent = (index: number) => {
    setEditIndex(index);
    console.log("Edit Student : ", allStudent[index]);
    setEditStudent(allStudent[index]);
  };


  return (
    <>

      {/* props pass kiya */}
      <Form allStudent={allStudent} setAllStudent={setAllStudent} editStudent={editStudent}
        editIndex={editIndex}
        setEditIndex={setEditIndex} />
      <Table allStudent={allStudent} deleteStudent={deleteStudent} updateStudent={updateStudent} />

      <ToastContainer />
    </>
  )
}
