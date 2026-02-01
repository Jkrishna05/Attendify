import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 border-r border-zinc-800 p-6 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:static md:translate-x-0 md:block`}
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-emerald-400">EduTrack</h1>
        <button
          className="md:hidden p-1 rounded bg-zinc-800"
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      <nav className="space-y-4">
        <NavLink to="/" className="block text-zinc-300 hover:text-white">
          Dashboard
        </NavLink>
        <NavLink to="/students" className="block text-zinc-300 hover:text-white">
          Students
        </NavLink>
        <NavLink to="/attendance" className="block text-zinc-300 hover:text-white">
          Attendance
        </NavLink>
      </nav>
    </aside>
  );
}
