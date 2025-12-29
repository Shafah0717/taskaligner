import { useState } from "react";
import { generatePlan } from "../services/api";
import TaskBoard from "../components/TaskBoard";
import MissingInfo from "../components/MissingInfo";
import ProjectSummary from "../components/ProjectSummary";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim() && !file) {
      setError("Please enter requirements or upload a PDF");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let llmResult;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://taskaligner-backend.onrender.com/process-pdf", {
          method: "POST",
          body: formData
        });

        if (!res.ok) throw new Error("PDF processing failed");
        llmResult = await res.json();
      } else {
        llmResult = await generatePlan(input);
      }

      setResult(llmResult);

      // 🔥 Persist project
      await fetch("https://taskaligner-backend.onrender.com/create-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(llmResult)
      });

    } catch (err) {
      console.error(err);
      setError("Failed to generate project");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Project Manager Dashboard
      </h1>
      <p className="text-gray-500 mb-8">
        Generate structured projects from client requirements or PDFs
      </p>

      {/* INPUT CARD */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="font-semibold mb-4">Client Requirements</h2>

        {/* TEXT INPUT */}
        <textarea
          className="w-full h-40 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste client requirement document here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* DIVIDER */}
        <div className="my-4 flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-200" />
          OR
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* PDF UPLOAD */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className="px-4 py-2 bg-gray-100 rounded border text-sm">
            Upload PDF
          </span>
          {file && (
            <span className="text-sm text-gray-600">
              {file.name}
            </span>
          )}
        </label>

        {/* ACTION */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg
                     hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Generating project..." : "Generate Project Plan"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mt-4">
            {error}
          </p>
        )}
      </div>

      {/* RESULTS */}
      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-3">Missing Information</h2>
            <MissingInfo items={result.missing_fields} />
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-3">Project Summary</h2>
            <ProjectSummary project={result.project} />
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-3">Task Breakdown</h2>
            <TaskBoard tasks={result.tasks} />
          </div>
        </div>
      )}
    </div>
  );
}
