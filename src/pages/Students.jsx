import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

export default function Students({ students, setStudents }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Students</h2>
      <StudentForm setStudents={setStudents} />
      <StudentTable students={students} />
    </div>
  );
}
