import React from 'react';

function Toast({ handleConfirmNo, handleConfirmYes }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/20 rounded-lg p-6 shadow-2xl max-w-sm">
        <h3 className="text-lg font-semibold text-white mb-4">
          Are you sure, to approve leave request?
        </h3>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleConfirmNo}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
          >
            No
          </button>
          <button
            onClick={handleConfirmYes}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white font-medium transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
