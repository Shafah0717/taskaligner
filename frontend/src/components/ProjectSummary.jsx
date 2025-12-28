export default function ProjectSummary({ project }) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h2 className="font-semibold mb-2">Project Summary</h2>

      <pre className="text-sm overflow-auto">
        {JSON.stringify(project, null, 2)}
      </pre>

      {project.assumptions?.length > 0 && (
        <div className="mt-3 text-sm text-orange-600">
          <strong>AI Assumptions:</strong>
          <ul className="list-disc pl-4">
            {project.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
