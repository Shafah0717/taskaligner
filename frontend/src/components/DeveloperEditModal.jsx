import { useState, useEffect } from "react";

export default function DeveloperEditModal({ developer, onClose, onSaved }) {
  // 🔥 SAFE INITIAL STATE
  const [dev, setDev] = useState({
    ...developer,
    approved_skills: developer.approved_skills || []
  });

  // 🔥 SYNC WHEN DEVELOPER PROP CHANGES
  useEffect(() => {
    setDev({
      ...developer,
      approved_skills: developer.approved_skills || []
    });
  }, [developer]);

  const isEditable = dev.status === "UNVERIFIED";

  const updateField = (field, value) => {
    setDev(prev => ({ ...prev, [field]: value }));
  };

  // 🔥 SAFE ADD SKILL
  const addSkill = (skill) => {
    if (!skill.trim()) return;

    setDev(prev => {
      if (prev.approved_skills.includes(skill)) return prev;

      return {
        ...prev,
        approved_skills: [...prev.approved_skills, skill]
      };
    });
  };

  const removeSkill = (skill) => {
    setDev(prev => ({
      ...prev,
      approved_skills: prev.approved_skills.filter(s => s !== skill)
    }));
  };

  // 🔥 SAVE ALWAYS SENDS CURRENT STATE
  const saveAndApprove = async () => {
    console.log("FINAL DEV SENT:", dev);

    await fetch("http://localhost:8000/approve-developer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...dev,
        approved_skills: dev.approved_skills,
        status: "APPROVED"
      })
    });

    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditable ? "Review Developer" : "Developer Details"}
        </h2>

        {/* NAME */}
        <label className="font-semibold">Name</label>
        <input
          className="w-full border p-2 mb-3"
          value={dev.name}
          disabled={!isEditable}
          onChange={e => updateField("name", e.target.value)}
        />

        {/* EXPERIENCE */}
        <label className="font-semibold">Experience Level</label>
        <select
          className="w-full border p-2 mb-3"
          value={dev.experience_level}
          disabled={!isEditable}
          onChange={e => updateField("experience_level", e.target.value)}
        >
          <option value="fresher">Fresher</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        {/* APPROVED SKILLS */}
        <label className="font-semibold">Approved Skills</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {dev.approved_skills.map(skill => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex gap-2"
            >
              {skill}
              {isEditable && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-600"
                >
                  ✕
                </button>
              )}
            </span>
          ))}
        </div>

        {isEditable && <AddSkillInput onAdd={addSkill} />}

        {/* INFERRED SKILLS */}
        {dev.inferred_skills && (
          <div className="mt-4 text-sm">
            <b>Inferred Skills (AI):</b>
            <ul className="list-disc ml-5">
              {Object.entries(dev.inferred_skills).map(([k, v]) => (
                <li key={k}>
                  {k}: {v.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* MISSING INFO */}
        {dev.missing_info?.length > 0 && (
          <div className="mt-4 text-sm text-red-600">
            <b>Missing Info:</b>
            <ul className="list-disc ml-5">
              {dev.missing_info.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* NOTES */}
        <label className="font-semibold mt-4 block">Tech Lead Notes</label>
        <textarea
          className="w-full border p-2"
          rows={3}
          disabled={!isEditable}
          value={dev.notes || ""}
          onChange={e => updateField("notes", e.target.value)}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>

          {isEditable && (
            <button
              onClick={saveAndApprove}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve & Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- SUB COMPONENT ---------- */

function AddSkillInput({ onAdd }) {
  const [skill, setSkill] = useState("");

  return (
    <div className="flex gap-2 mt-2">
      <input
        className="border p-2 flex-1"
        placeholder="Add skill (e.g. Security)"
        value={skill}
        onChange={e => setSkill(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(skill);
          setSkill("");
        }}
        className="bg-gray-800 text-white px-3"
      >
        Add
      </button>
    </div>
  );
}
