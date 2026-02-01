import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Attendance from "./Pages/Attendance";

export default function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 SAVE students whenever changed
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-zinc-100">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* overlay for mobile when sidebar open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 sm:p-6">
          {/* mobile hamburger */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded bg-zinc-800"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard students={students} />} />
            <Route
              path="/students"
              element={<Students students={students} setStudents={setStudents} />}
            />
            <Route path="/attendance" element={<Attendance students={students} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
