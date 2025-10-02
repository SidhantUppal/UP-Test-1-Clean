"use client";

export default function ManageIncidents() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Manage Incidents</h1>
            <p className="text-gray-600 mt-1">Simple test page to verify routing</p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold mb-4">Test Page</h2>
          <p>If you can see this, the routing is working correctly.</p>
          <p>The full incidents table will be restored once we resolve the server issues.</p>
        </div>
      </div>
    </div>
  );
}