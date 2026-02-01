export default function Header({ title }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      <p className="text-zinc-400 text-sm">Modern Student Management System</p>
    </div>
  );
}
