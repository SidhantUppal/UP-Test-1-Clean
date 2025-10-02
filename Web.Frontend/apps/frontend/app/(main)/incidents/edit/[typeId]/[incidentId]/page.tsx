"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { incidentStaticDataService } from "@/services/incidentStaticDataService";

interface EditIncidentPageProps {
  params: Promise<{
    typeId: string;
    incidentId: string;
  }>;
}

export default function EditIncidentPage({ params }: EditIncidentPageProps) {
  const { typeId, incidentId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIncidentTypeAndRedirect = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch incident types from database
        const result = await incidentStaticDataService.getIncidentTypes();
        const incidentTypes = Array.isArray(result.data) ? result.data : [];

        // Find the incident type by ID
        const incidentType = incidentTypes.find(type =>
          type.IncidentTypeID === parseInt(typeId)
        );

        if (!incidentType) {
          console.error(`Incident type ID ${typeId} not found in database`);
          setError(`Incident type not found: ${typeId}`);
          return;
        }

        console.log(`Editing incident ${incidentId} of type:`, incidentType);

        // Get route based on TypeCode - using action parameters for clarity
        const getRouteForTypeCode = (typeCode: string): string => {
          // Hardcoded routes for built-in forms (use action=update parameter)
          const builtInRoutes: Record<string, string> = {
            'WOBBLE': `/incidents/high-potential/form?action=update&id=${incidentId}`,
            'ACCIDENT_BOOK': `/incidents/accident-book/form?action=update&id=${incidentId}`,
            'NEAR_MISS': `/incidents/near-miss/form?action=update&id=${incidentId}`,
            'DANGEROUS_OCCURRENCE': `/incidents/dangerous-occurrence/form?action=update&id=${incidentId}`,
            'ROAD_TRAFFIC': `/incidents/road-traffic/form?action=update&id=${incidentId}`
          };

          // Return built-in route if exists, otherwise use generic dynamic form
          return builtInRoutes[typeCode] || `/incidents/form/${typeCode}?action=update&id=${incidentId}`;
        };

        const route = getRouteForTypeCode(incidentType.Reference);

        console.log(`TypeCode: ${incidentType.Reference}, Redirecting to: ${route}`);

        // Redirect to the appropriate form
        router.replace(route);

      } catch (err) {
        console.error('Error loading incident type:', err);
        setError('Failed to load incident type information');
      } finally {
        setLoading(false);
      }
    };

    loadIncidentTypeAndRedirect();
  }, [typeId, incidentId, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Incident</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/incidents/manage')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Back to Incidents
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading incident editor...</p>
        </div>
      </div>
    );
  }

  return null; // Component will redirect before rendering
}