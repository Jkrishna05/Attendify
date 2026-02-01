export default function StudentTable({ students }) {
  if (students.length === 0) {
    return (
      <div className="text-zinc-400 text-sm mt-4">
        No students added yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden w-[60%] sm:w-[90%]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-zinc-800 text-zinc-300 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Added On</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-zinc-400">{s.roll}</td>
                <td className="p-3 text-zinc-500 text-sm">{s.joinedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
