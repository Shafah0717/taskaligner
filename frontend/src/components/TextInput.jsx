export default function TextInput({ value, onChange, onSubmit }) {
  return (
    <div>
      <textarea
        className="w-full h-40 p-4 border rounded"
        placeholder="Paste client requirement document here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Generate Project Plan
      </button>
    </div>
  );
}
