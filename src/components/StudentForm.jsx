import { useState } from "react";

export default function StudentForm({ setStudents }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const addStudent = () => {
    if (!name || !roll) return;
    setStudents(prev => [...prev, {
      id: Date.now(),
      name,
      roll,
      joinedAt: new Date().toLocaleString()
    }]);
    setName(""); setRoll("");
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 w-[60%] sm:w-[90%]">
      <h3 className="font-semibold mb-4">Add Student</h3>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          placeholder="Student Name"
          className="bg-zinc-800 p-2 rounded w-[90%] sm:w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Roll No"
          className="bg-zinc-800 p-2 rounded w-[90%] sm:w-full"
          value={roll}
          onChange={e => setRoll(e.target.value)}
        />
        <button
          onClick={addStudent}
          className="bg-emerald-500 px-4 rounded font-semibold text-black w-[90%] sm:w-full md:w-auto"
        >
          Add
        </button>
      </div>
    </div>
  );
}
