function Column({ title, tasks }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="flex-1 border rounded p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="list-disc pl-4 text-sm">
        {safeTasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TaskBoard({ tasks }) {
  if (!tasks) return null;

  return (
    <div className="mt-6 flex gap-4">
      <Column title="Fresher" tasks={tasks.fresher} />
      <Column title="Mid" tasks={tasks.mid} />
      <Column title="Senior" tasks={tasks.senior} />
    </div>
  );
}
