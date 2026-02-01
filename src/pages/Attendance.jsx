import { useEffect, useState } from "react";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance({ students }) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const [allAttendance, setAllAttendance] = useState({});
  const [attendance, setAttendance] = useState({});

  // 🔹 Load attendance from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendanceData")) || {};
    setAllAttendance(saved);
    setAttendance(saved[today] || {});
  }, []);

  // 🔹 Save attendance whenever changed (use functional update to avoid overwriting existing data)
  useEffect(() => {
    setAllAttendance((prev) => {
      const updated = { ...prev, [today]: attendance };
      localStorage.setItem("attendanceData", JSON.stringify(updated));
      return updated;
    });
  }, [attendance, today]);

  // Export attendance for the last N days as CSV
  const exportCSV = (days) => {
    const n = Number(days);
    if (!n || n <= 0) return alert("Please enter a valid number of days (>=1)");

    // build array of dates from today backward
    const dates = [];
    for (let i = 0; i < n; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }

    // CSV header
    const header = ["Student ID", "Student Name", ...dates];

    // Create a map of students by id for consistent ordering
    const studentsById = students.reduce((acc, s) => {
      acc[s.id] = s;
      return acc;
    }, {});

    // Build rows
    const rows = students.map((s) => {
      const row = [s.id, s.name];
      for (const date of dates) {
        const record = allAttendance[date]?.[s.id];
        row.push(record ? record.status : "Not marked");
      }
      return row;
    });

    // Convert to CSV string (escape commas & quotes)
    const csv = [header, ...rows]
      .map((r) =>
        r
          .map((cell) => {
            if (cell == null) return "";
            const str = String(cell);
            return str.includes(",") || str.includes("\"") || str.includes("\n")
              ? `"${str.replace(/"/g, '""')}"`
              : str;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_last_${n}_days.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const [exportDays, setExportDays] = useState(7);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Daily Attendance</h2>
      <p className="text-zinc-400 mb-6">Date: {today}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
        <label className="text-zinc-300 text-sm">Export last</label>
        <input
          type="number"
          min={1}
          value={exportDays}
          onChange={(e) => setExportDays(e.target.value)}
          className="w-[40%] sm:w-24 px-2 py-1 rounded bg-zinc-800 text-white text-sm"
        />
        <span className="text-zinc-300 text-sm">days</span>
        <button
          onClick={() => exportCSV(exportDays)}
          className="px-3 py-1 rounded bg-emerald-500 text-black text-sm font-semibold"
        >
          Export CSV
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-zinc-400">
          No students found. Please add students first.
        </p>
      ) : (
        <AttendanceTable
          students={students}
          attendance={attendance}
          setAttendance={setAttendance}
        />
      )}
    </div>
  );
}
