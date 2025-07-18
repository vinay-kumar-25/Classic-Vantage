export default function FileUpload({ label, name, onChange, description, accept = "", multiple = false }) {
  const inputId = `file-input-${name}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-base font-medium text-gray-gemini-700 mb-2"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="file"
        name={name}
        accept={accept} // e.g. 'image/*,.pdf'
        multiple={multiple}
        onChange={onChange}
        className="block w-full text-sm text-gray-gemini-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-gemini-50 file:text-blue-gemini-700
                   hover:file:bg-blue-gemini-100 cursor-pointer
                   transition duration-200 ease-in-out"
      />
      {description && (
        <p className="text-sm text-gray-gemini-500 mt-1">{description}</p>
      )}
    </div>
  );
}
