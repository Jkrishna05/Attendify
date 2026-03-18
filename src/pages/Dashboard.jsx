import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function Dashboard({ students }) {
  const today = new Date().toISOString().split("T")[0];
  const [presentCount, setPresentCount] = useState(0);
  const [exportDays, setExportDays] = useState(7);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendanceData")) || {};
    const todayAttendance = saved[today] || {};
    const present = Object.values(todayAttendance).filter(
      (r) => r.status === "Present"
    ).length;
    setPresentCount(present);
  }, [students]);

  const absentCount = students.length - presentCount;

  const exportCSV = (days) => {
    const n = Number(days);
    if (!n || n <= 0) return alert("Enter valid days (>=1)");

    const allAttendance = JSON.parse(localStorage.getItem("attendanceData")) || {};

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
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-zinc-400 text-sm mt-1">
            {new Date().toDateString()}
          </p>
        </div>

        {/* Export Box */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl shadow">
          <input
            type="number"
            min={1}
            value={exportDays}
            onChange={(e) => setExportDays(e.target.value)}
            className="w-20 px-2 py-1 rounded bg-zinc-800 text-white text-sm outline-none"
          />
          <span className="text-zinc-400 text-sm">days</span>
          <button
            onClick={() => exportCSV(exportDays)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={students.length} color="blue" />
        <StatCard title="Present Today" value={presentCount} color="green" />
        <StatCard title="Absent Today" value={absentCount} color="red" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "from-blue-500/20 to-blue-500/5 text-blue-400",
    green: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
    red: "from-red-500/20 to-red-500/5 text-red-400",
  };

  return (
    <div className={`relative p-6 rounded-2xl border border-zinc-800 bg-gradient-to-br ${colors[color]} backdrop-blur shadow-lg hover:scale-[1.02] transition`}>
      <p className="text-zinc-400 text-sm">{title}</p>
      <h3 className="text-4xl font-bold mt-2">{value}</h3>

      {/* subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition" />
    </div>
  );
}
