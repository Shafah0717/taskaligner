import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PMDashboard from "./pages/PMDashboard";
import TechLeadReview from "./pages/TechLeadReview";

export default function App() {
  return (
    <>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pm" element={<PMDashboard />} />
        <Route path="/tech-lead" element={<TechLeadReview />} />
      </Routes>
    </>
  );
}
