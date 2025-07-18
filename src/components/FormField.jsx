
// File: components/FormField.jsx
export default function FormField({ label, name, type, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          rows="4"
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
        />
      )}
    </div>
  );
}