export default function DeveloperDetailsModal({ developer, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Developer Details</h2>

        <p><b>Name:</b> {developer.name}</p>
        <p><b>Experience Level:</b> {developer.experience_level}</p>
        <p><b>Status:</b> {developer.status}</p>

        <div className="mt-3">
          <b>Approved Skills:</b>
          <ul className="list-disc ml-5">
            {(developer.approved_skills || []).map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        {developer.inferred_skills && (
          <div className="mt-3">
            <b>Inferred Skills (AI):</b>
            <ul className="list-disc ml-5 text-gray-700">
              {Object.entries(developer.inferred_skills).map(([k, v]) => (
                <li key={k}>
                  {k}: {v.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}

        {developer.notes && (
          <div className="mt-3">
            <b>Tech Lead Notes:</b>
            <p>{developer.notes}</p>
          </div>
        )}

        {developer.missing_info?.length > 0 && (
          <div className="mt-3 text-red-600">
            <b>Missing Info:</b>
            <ul className="list-disc ml-5">
              {developer.missing_info.map(m => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
