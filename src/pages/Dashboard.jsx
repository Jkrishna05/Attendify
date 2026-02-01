import { useEffect, useState } from "react";

export default function Dashboard({ students }) {
  const today = new Date().toISOString().split("T")[0];
  const [presentCount, setPresentCount] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendanceData")) || {};
    const todayAttendance = saved[today] || {};
    const present = Object.values(todayAttendance).filter(
      (r) => r.status === "Present"
    ).length;
    setPresentCount(present);
  }, [students]);

  const absentCount = students.length - presentCount;

  const [exportDays, setExportDays] = useState(7);

  const exportCSV = (days) => {
    const n = Number(days);
    if (!n || n <= 0) return alert("Please enter a valid number of days (>=1)");

    // load attendance from localStorage
    const allAttendance = JSON.parse(localStorage.getItem("attendanceData")) || {};

    // build dates array
    const dates = [];
    for (let i = 0; i < n; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }

    const header = ["Student ID", "Student Name", ...dates];

    const rows = students.map((s) => {
      const row = [s.id, s.name];
      for (const date of dates) {
        const record = allAttendance[date]?.[s.id];
        row.push(record ? record.status : "Not marked");
      }
      return row;
    });

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <p className="text-zinc-400 mb-6">{new Date().toDateString()}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
        <label className="text-zinc-300 text-sm">Export last</label>
        <input
          type="number"
          min={1}
          value={exportDays}
          onChange={(e) => setExportDays(e.target.value)}
          className="w-[60%] sm:w-24 px-2 py-1 rounded bg-zinc-800 text-white text-sm"
        />
        <span className="text-zinc-300 text-sm">days</span>
        <button
          onClick={() => exportCSV(exportDays)}
          className="px-3 py-1 rounded bg-emerald-500 text-black text-sm font-semibold"
        >
          Export CSV
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard  title="Total Students" value={students.length} />
        <StatCard title="Present Today" value={presentCount} />
        <StatCard title="Absent Today" value={absentCount} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-zinc-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold text-emerald-400 mt-2">{value}</h3>
    </div>
  );
}
