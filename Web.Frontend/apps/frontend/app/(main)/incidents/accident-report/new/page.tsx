"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccidentReportForm() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Link href="/incidents/dashboard" className="hover:text-primary">Incidents</Link>
          <span>/</span>
          <Link href="/incidents/form" className="hover:text-primary">New Incident</Link>
          <span>/</span>
          <span>Accident Report Form</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Accident Report Form</h1>
        <p className="text-gray-600 mt-2">Comprehensive accident investigation report</p>
      </div>

      {/* Placeholder Content */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Accident Report Form</h2>
            <p className="text-gray-600 mb-6">This comprehensive form is under development</p>
            <button 
              onClick={() => router.push("/incidents/form")}
              className="btn btn-primary"
            >
              Back to Form Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}