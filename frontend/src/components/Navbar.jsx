import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-4 py-2 rounded-md text-sm font-medium transition
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-800"
          }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white">
            Task<span className="text-blue-500">Aligner</span>
          </span>
          <span className="text-sm text-gray-400 font-medium">
            AI
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-1">
          {navLink("/", "Home")}
          {navLink("/dashboard", "Dashboard")}
          {navLink("/pm", "PM Dashboard")}
          {navLink("/tech-lead", "Tech Lead")}
        </nav>
      </div>
    </header>
  );
}
