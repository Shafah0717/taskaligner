export default function ProjectCard({ project, onOpen }) {
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="font-bold">{project.name}</h3>
        <p>Timeline: {project.timeline}</p>
        <span className="text-sm text-blue-600">
          {project.status.replace("_", " ")}
        </span>
      </div>

      <button
        onClick={onOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Project
      </button>
    </div>
  );
}
