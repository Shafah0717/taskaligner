import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">

        {/* LOGO / TITLE */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Task<span className="text-blue-500">Aligner</span> AI
        </h1>

        {/* TAGLINE */}
        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          From client requirements to task assignments automatically.
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Upload client documents or PDFs, clarify missing requirements with AI,
          break projects into role-based tasks, review developers, and track
          progress all in one intelligent project management flow.
        </p>

        {/* CTA BUTTON */}
        <Link
          to="/dashboard"
          className="inline-block px-10 py-4 text-lg font-semibold rounded-lg
                     bg-blue-600 hover:bg-blue-700 transition-all shadow-lg"
        >
          Go to PM Dashboard →
        </Link>

        {/* FEATURES */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Feature
            title="AI-Clarified Projects"
            text="Automatically extract requirements, detect missing details, and generate clear project scopes."
          />
          <Feature
            title="Smart Task Breakdown"
            text="Tasks are split by Fresher, Mid, and Senior levels — ready for real teams."
          />
          <Feature
            title="Execution-Ready Workflow"
            text="Assign developers, track completion, and move projects from In-Progress to Completed."
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- FEATURE CARD ---------- */

function Feature({ title, text }) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}
