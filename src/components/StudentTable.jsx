export default function StudentTable({ students }) {
  if (students.length === 0) {
    return (
      <div className="mt-6 p-6 text-center bg-zinc-950/70 border border-zinc-800 rounded-2xl text-zinc-400">
        No students added yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-lg overflow-hidden  w-[60%] sm:w-[90%]">
      
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-white">Students</h2>
        <span className="text-xs text-zinc-400">
          Total: {students.length}
        </span>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Name</th>
              <th className="px-5 py-3 text-left font-medium">Roll No</th>
              <th className="px-5 py-3 text-left font-medium">Added On</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-t border-zinc-800 hover:bg-zinc-900/50 transition"
              >
                <td className="px-5 py-4 text-white font-medium">
                  {s.name}
                </td>
                <td className="px-5 py-4 text-zinc-400">
                  {s.roll}
                </td>
                <td className="px-5 py-4 text-zinc-500 text-xs">
                  {s.joinedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}