import { useState } from "react";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("https://taskaligner.onrender.com/parse-resume", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    setFile(null);

    // 🔁 Refresh PM dashboard
    window.location.reload();
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="font-semibold mb-2">Upload Developer Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={e => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        disabled={loading}
        className="ml-3 bg-blue-600 text-white px-4 py-1 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
