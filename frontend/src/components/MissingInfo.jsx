export default function MissingInfo({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-4 p-4 border border-red-300 bg-red-50 rounded">
      <h3 className="font-semibold text-red-600 mb-2">
        Missing Client Information
      </h3>
      <ul className="list-disc pl-4 text-sm">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
