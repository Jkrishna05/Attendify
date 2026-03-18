import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, X } from "lucide-react";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const linkClass =
    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition";

  const activeClass = "bg-emerald-500/20 text-emerald-400";
  const inactiveClass = "text-zinc-400 hover:bg-zinc-800 hover:text-white";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-800 p-5 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:static md:translate-x-0 md:block`}
    >
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          <span className="text-emerald-400">Attend</span>ify
        </h1>
        <button
          className="md:hidden p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

    
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Users size={18} />
          Students
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <ClipboardList size={18} />
          Attendance
        </NavLink>
      </nav>

    
      <div className="absolute bottom-6 left-5 right-5 p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-zinc-800">
        <p className="text-xs text-zinc-400">System Status</p>
        <p className="text-sm font-semibold text-emerald-400 mt-1">
          All systems running 🚀
        </p>
      </div>
    </aside>
  );
}