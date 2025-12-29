import { useEffect, useState } from "react";
import DeveloperEditModal from "../components/DeveloperEditModal";

export default function TechLeadReview() {
  const [developers, setDevelopers] = useState([]);
  const [selectedDev, setSelectedDev] = useState(null);

  useEffect(() => {
    fetch("https://taskaligner-backend.onrender.com/developers")
      .then(res => res.json())
      .then(setDevelopers);
  }, []);useEffect(() => {
  const fetchDevelopers = () => {
    fetch("https://taskaligner-backend.onrender.com/developers")
      .then(res => res.json())
      .then(setDevelopers);
  };

  // Initial load
  fetchDevelopers();

  // 🔁 Refresh when tab becomes active
  window.addEventListener("focus", fetchDevelopers);

  return () => {
    window.removeEventListener("focus", fetchDevelopers);
  };
}, []);

  const unverified = developers.filter(d => d.status === "UNVERIFIED");
  const approved = developers.filter(d => d.status === "APPROVED");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tech Lead Review</h1>

      {/* PENDING FIRST */}
      <h2 className="text-lg font-semibold text-yellow-700">
        Pending Review
      </h2>

      {unverified.length === 0 && (
        <p className="text-gray-500 mt-2">No pending developers</p>
      )}

      {unverified.map(dev => (
        <DeveloperRow
          key={dev.id}
          developer={dev}
          label="Review & Edit"
          color="bg-yellow-600"
          onClick={() => setSelectedDev(dev)}
        />
      ))}

      {/* APPROVED */}
      <h2 className="text-lg font-semibold text-green-700 mt-8">
        Approved Developers
      </h2>

      {approved.length === 0 && (
        <p className="text-gray-500 mt-2">No approved developers</p>
      )}

      {approved.map(dev => (
        <DeveloperRow
          key={dev.id}
          developer={dev}
          label="View"
          color="bg-green-600"
          onClick={() => setSelectedDev(dev)}
        />
      ))}

      {/* MODAL */}
      {selectedDev && (
        <DeveloperEditModal
          developer={selectedDev}
          onClose={() => setSelectedDev(null)}
          onSaved={() => {
          setSelectedDev(null);

          // 🔁 REFRESH LIST FROM BACKEND
          fetch("https://taskaligner-backend.onrender.com/developers")
            .then(res => res.json())
            .then(setDevelopers);
        }}
        />
      )}
    </div>
  );
}

/* ---------- ROW COMPONENT ---------- */

function DeveloperRow({ developer, label, color, onClick }) {
  return (
    <div className="border p-4 mt-3 rounded flex justify-between items-center">
      <div>
        <p className="font-semibold">{developer.name}</p>
        <p>Level: {developer.experience_level}</p>
        <p>Status: {developer.status}</p>
      </div>

      <button
        onClick={onClick}
        className={`${color} text-white px-4 py-2 rounded`}
      >
        {label}
      </button>
    </div>
  );
}
