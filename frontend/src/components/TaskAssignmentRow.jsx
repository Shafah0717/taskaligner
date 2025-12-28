export default function TaskAssignmentRow({
  task,
  developers,
  onAssign
}) {
  return (
    <div className="flex justify-between items-center border p-2 rounded mb-2">
      <span>{task}</span>

      <select
        className="border p-1"
        onChange={e => onAssign(e.target.value)}
      >
        <option value="">Assign</option>
        {developers.map(dev => (
          <option key={dev.id} value={dev.id}>
            {dev.name}
          </option>
        ))}
      </select>
    </div>
  );
}
