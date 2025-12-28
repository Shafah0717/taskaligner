import ResumeUpload from "../components/ResumeUpload";
import { useEffect, useState } from "react";
import DeveloperDetailsModal from "../components/DeveloperDetailsModal";
import ProjectCard from "../components/ProjectCard";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

export default function PMDashboard() {
  const [selectedDev, setSelectedDev] = useState(null);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/projects")
      .then(res => res.json())
      .then(setProjects);

    fetch("http://localhost:8000/developers")
      .then(res => res.json())
      .then(setDevelopers);
  }, []);

  const grouped = {
    fresher: developers.filter(d => d.experience_level === "fresher"),
    mid: developers.filter(d => d.experience_level === "mid"),
    senior: developers.filter(d => d.experience_level === "senior"),
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">PM Dashboard</h1>

      {/* Upload resume */}
      <ResumeUpload />

      {/* ================= PROJECTS ================= */}
      <h2 className="mt-6 font-semibold text-lg">Client Projects</h2>

      <div className="grid gap-4 mt-3">
        {projects.length === 0 && (
          <p className="text-gray-500">No projects yet</p>
        )}

        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          developers={developers}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ================= DEVELOPERS ================= */}
      <h2 className="font-semibold mt-8 text-lg">Developers</h2>

      {["fresher", "mid", "senior"].map(level => (
        <div key={level} className="mt-4">
          <h3 className="text-md font-bold capitalize">
            {level} Developers
          </h3>

          {grouped[level].length === 0 && (
            <p className="text-gray-500 text-sm mt-1">
              No {level} developers
            </p>
          )}

          {grouped[level].map(dev => (
            <div
              key={dev.id}
              className="border p-4 mt-2 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{dev.name}</p>
                <p>Status: {dev.status}</p>

                {dev.status === "APPROVED" && (
                  <p className="text-green-600 font-semibold">✔ Approved</p>
                )}
                {dev.status === "UNVERIFIED" && (
                  <p className="text-yellow-600">
                    ⏳ Pending Tech Lead Review
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedDev(dev)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* ================= DEV MODAL ================= */}
      {selectedDev && (
        <DeveloperDetailsModal
          developer={selectedDev}
          onClose={() => setSelectedDev(null)}
        />
      )}
    </div>
  );
}
