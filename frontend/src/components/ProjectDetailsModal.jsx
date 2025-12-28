import { useState } from "react";

export default function ProjectDetailsModal({
  project,
  developers,
  onClose
}) {
  const [localProject, setLocalProject] = useState(() => ({
    ...project,
    tasks: normalizeTasks(project.tasks)
  }));

  const [newTask, setNewTask] = useState({
    fresher: "",
    mid: "",
    senior: ""
  });

  // 🔥 normalize old string tasks
  function normalizeTasks(tasks) {
    const result = {};
    for (const level of ["fresher", "mid", "senior"]) {
      result[level] = (tasks[level] || []).map(t =>
        typeof t === "string"
          ? { title: t, assigned_to: "", completed: false }
          : { completed: false, ...t }
      );
    }
    return result;
  }

  const toggleCompleted = (level, index) => {
    setLocalProject(prev => {
      const updated = { ...prev };
      updated.tasks[level][index].completed =
        !updated.tasks[level][index].completed;
      return { ...updated };
    });
  };

  const assignDeveloper = (level, index, devId) => {
    setLocalProject(prev => {
      const updated = { ...prev };
      updated.tasks[level][index].assigned_to = devId;
      return { ...updated };
    });
  };

  const addTask = (level) => {
    const title = newTask[level].trim();
    if (!title) return;

    setLocalProject(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [level]: [
          ...prev.tasks[level],
          { title, assigned_to: "", completed: false }
        ]
      }
    }));

    setNewTask(prev => ({ ...prev, [level]: "" }));
  };

  const saveProject = async () => {
    await fetch("http://localhost:8000/update-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localProject)
    });

    alert("Project updated");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl h-[90vh] flex flex-col rounded">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            {localProject.name}
          </h2>
          <p className="text-sm text-gray-600">
            Status: <b>{localProject.status}</b>
          </p>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1">
          {["fresher", "mid", "senior"].map(level => (
            <div key={level} className="mb-6">
              <h3 className="font-semibold capitalize mb-2">
                {level} Tasks
              </h3>

              {localProject.tasks[level].map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border p-3 rounded mb-2"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        toggleCompleted(level, index)
                      }
                    />

                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <select
                    className="border p-1 text-sm"
                    value={task.assigned_to}
                    onChange={e =>
                      assignDeveloper(level, index, e.target.value)
                    }
                  >
                    <option value="">Unassigned</option>
                    {developers
                      .filter(
                        d =>
                          d.experience_level === level &&
                          d.status === "APPROVED"
                      )
                      .map(dev => (
                        <option key={dev.id} value={dev.id}>
                          {dev.name}
                        </option>
                      ))}
                  </select>
                </div>
              ))}

              {/* ADD TASK */}
              <div className="flex gap-2 mt-2">
                <input
                  className="border p-2 flex-1 text-sm"
                  placeholder={`Add ${level} task`}
                  value={newTask[level]}
                  onChange={e =>
                    setNewTask(prev => ({
                      ...prev,
                      [level]: e.target.value
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() => addTask(level)}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={saveProject}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
