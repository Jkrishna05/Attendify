import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function StudentForm({ setStudents }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const addStudent = () => {
    if (!name || !roll) return;
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        roll,
        joinedAt: new Date().toLocaleString(),
      },
    ]);
    setName("");
    setRoll("");
  };

  return (
    <div className="w-[80%] sm:w-[90%] bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-lg p-6">
      
      <div className="flex items-center gap-2 mb-5">
        <UserPlus className="text-emerald-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Add Student</h3>
      </div>

      
      <div className="grid md:grid-cols-3 gap-4">
        <input
          placeholder="Student Name"
          className="bg-zinc-900/80 border border-zinc-800 px-3 py-2 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500 w-[90%]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Roll No"
          className="bg-zinc-900/80 border border-zinc-800 px-3 py-2 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500 w-[90%] "
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <button
          onClick={addStudent}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-400 text-black text-sm font-semibold transition shadow w-[90%] "
        >
          <UserPlus size={16} /> Add Student
        </button>
      </div>
    </div>
  );
}
