import Link from 'next/link';

export default function IncidentsNotFound() {
  return (
    <div className="p-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Incident Not Found</h2>
        <p className="text-gray-600 mb-6">The incident you're looking for doesn't exist.</p>
        <Link href="/incidents" className="btn btn-primary">
          Back to Incidents
        </Link>
      </div>
    </div>
  );
}