// submit.js

export const SubmitButton = () => {
  return (
    <div className="p-4 bg-gray-900 border-t border-gray-800">
      <button
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
        type="submit"
      >
        <span>Submit Pipeline</span>
      </button>
    </div>
  );
};
