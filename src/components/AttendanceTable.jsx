export default function AttendanceTable({ students, attendance, setAttendance }) {
  const mark = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: {
        status,
        time: new Date().toLocaleTimeString(),
      },
    }));
  };

  return (
    <div className="w-[60%] sm:w-[90%] bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
      
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-white">Attendance</h2>
        <span className="text-xs text-zinc-400">Live Marking</span>
      </div>

    
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Student</th>
              <th className="px-5 py-3 text-center font-medium">Action</th>
              <th className="px-5 py-3 text-center font-medium">Status</th>
              <th className="px-5 py-3 text-center font-medium">Time</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => {
              const record = attendance[s.id];

              return (
                <tr
                  key={s.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900/50 transition"
                >
                  
                  <td className="px-5 py-4 text-white font-medium">
                    {s.name}
                  </td>
                     <td className="px-5 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => mark(s.id, "Present")}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/90 hover:bg-emerald-400 text-black text-xs font-semibold transition shadow"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => mark(s.id, "Absent")}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-400 text-white text-xs font-semibold transition shadow"
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                  
                  <td className="px-5 py-4 text-center">
                    {record ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                        ${record.status === "Present"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                          }`}
                      >
                        {record.status}
                      </span>
                    ) : (
                      <span className="text-zinc-500">Not marked</span>
                    )}
                  </td>

                  
                  <td className="px-5 py-4 text-center text-zinc-400">
                    {record?.time || "--"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
