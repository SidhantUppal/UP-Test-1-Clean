"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FarmingIncidentForm() {
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
          <span>Farming Incidents</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Farming Incidents Form</h1>
        <p className="text-gray-600 mt-2">Agriculture-specific incident reporting</p>
      </div>

      {/* Placeholder Content */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Farming Incidents Form</h2>
            <p className="text-gray-600 mb-6">This agriculture-specific form is under development</p>
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