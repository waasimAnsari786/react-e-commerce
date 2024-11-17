import React from "react";

export default function AdminStats() {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold">Activity 1</h3>
        <p className="text-gray-600">Details about activity 1.</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold">Activity 2</h3>
        <p className="text-gray-600">Details about activity 2.</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold">Activity 3</h3>
        <p className="text-gray-600">Details about activity 3.</p>
      </div>
    </div>
  );
}
