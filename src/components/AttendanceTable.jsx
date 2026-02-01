export default function AttendanceTable({
  students,
  attendance,
  setAttendance,
}) {
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden w-[60%] sm:w-[90%]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Time</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => {
              const record = attendance[s.id];
              return (
                <tr
                  key={s.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-3">{s.name}</td>

                  <td className="p-3 text-center">
                    {record ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          record.status === "Present"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {record.status}
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-sm">
                        Not marked
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center text-zinc-400 text-sm">
                    {record?.time || "--"}
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => mark(s.id, "Present")}
                      className="px-3 py-1 rounded bg-emerald-500 text-black text-sm font-semibold"
                    >
                      Present
                    </button>
                    <button
                      onClick={() => mark(s.id, "Absent")}
                      className="px-3 py-1 rounded bg-rose-500 text-white text-sm font-semibold"
                    >
                      Absent
                    </button>
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
