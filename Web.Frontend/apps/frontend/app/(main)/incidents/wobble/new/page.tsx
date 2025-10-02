"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WobbleForm() {
  const router = useRouter();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().slice(0, 16),
    location: "",
    locationName: "",
    customLocation: "",
    description: "",
    injuryOccurred: "no",
    injuryDetails: "",
    immediateAction: "",
    reportedTo: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    witnesses: "",
    photos: null as FileList | null,
    additionalNotes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, would save form data
    console.log("Submitting Wobble form:", formData);
    router.push("/incidents/75680"); // Mock case ID
  };

  const handleSaveDraft = () => {
    // In real app, would save as draft
    console.log("Saving draft:", formData);
    router.push("/incidents/incomplete");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Link href="/incidents/dashboard" className="hover:text-primary">Incidents</Link>
              <span>/</span>
              <Link href="/incidents/form" className="hover:text-primary">New Incident</Link>
              <span>/</span>
              <span>Wobble Form</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Wobble Form - Quick Incident Report</h1>
            <p className="text-gray-600 mt-1">Use this form for quick reporting of minor incidents that need to be logged</p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 max-w-4xl mx-auto">

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Date & Time of Incident <span className="text-error">*</span></span>
                </label>
                <input 
                  type="datetime-local" 
                  className="input input-bordered w-full" 
                  value={formData.dateTime}
                  onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Location <span className="text-error">*</span></span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.locationName}
                    readOnly
                    className="flex-1 input input-bordered bg-gray-50"
                    placeholder="Click to select location"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLocationModal(true)}
                    className="btn text-white hover:opacity-80"
                    style={{ backgroundColor: '#3d3a72', border: 'none' }}
                  >
                    Select Location
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Incident Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Incident Details</h2>
            
            <div>
              <label className="label">
                <span className="label-text">Brief Description of Incident <span className="text-error">*</span></span>
              </label>
              <textarea 
                className="textarea textarea-bordered w-full" 
                rows={4}
                placeholder="Describe what happened..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <label className="label">
                <span className="label-text-alt">Minimum 20 characters</span>
                <span className="label-text-alt">{formData.description.length}/500</span>
              </label>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Was anyone injured? <span className="text-error">*</span></span>
              </label>
              <div className="flex gap-4">
                <label className="label cursor-pointer">
                  <input 
                    type="radio" 
                    name="injured" 
                    value="yes"
                    className="radio radio-primary" 
                    checked={formData.injuryOccurred === "yes"}
                    onChange={(e) => setFormData({...formData, injuryOccurred: e.target.value})}
                  />
                  <span className="label-text ml-2">Yes</span>
                </label>
                <label className="label cursor-pointer">
                  <input 
                    type="radio" 
                    name="injured" 
                    value="no"
                    className="radio radio-primary" 
                    checked={formData.injuryOccurred === "no"}
                    onChange={(e) => setFormData({...formData, injuryOccurred: e.target.value})}
                  />
                  <span className="label-text ml-2">No</span>
                </label>
              </div>
            </div>

            {formData.injuryOccurred === "yes" && (
              <div>
                <label className="label">
                  <span className="label-text">Injury Details <span className="text-error">*</span></span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full" 
                  rows={3}
                  placeholder="Describe the injury and any first aid provided..."
                  value={formData.injuryDetails}
                  onChange={(e) => setFormData({...formData, injuryDetails: e.target.value})}
                  required
                />
              </div>
            )}

            <div>
              <label className="label">
                <span className="label-text">Immediate Action Taken <span className="text-error">*</span></span>
              </label>
              <input 
                type="text" 
                className="input input-bordered w-full" 
                placeholder="e.g., Area cordoned off, First aid provided, Manager notified"
                value={formData.immediateAction}
                onChange={(e) => setFormData({...formData, immediateAction: e.target.value})}
                required
              />
            </div>
          </div>
        </div>

        {/* Reporter Information Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Reporter Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Your Name <span className="text-error">*</span></span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  value={formData.reporterName}
                  onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Reported To</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="Name of supervisor/manager notified"
                  value={formData.reportedTo}
                  onChange={(e) => setFormData({...formData, reportedTo: e.target.value})}
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Email <span className="text-error">*</span></span>
                </label>
                <input 
                  type="email" 
                  className="input input-bordered w-full" 
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({...formData, reporterEmail: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input 
                  type="tel" 
                  className="input input-bordered w-full" 
                  value={formData.reporterPhone}
                  onChange={(e) => setFormData({...formData, reporterPhone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Additional Information</h2>
            
            <div>
              <label className="label">
                <span className="label-text">Witnesses</span>
              </label>
              <textarea 
                className="textarea textarea-bordered w-full" 
                rows={2}
                placeholder="Names and contact details of any witnesses..."
                value={formData.witnesses}
                onChange={(e) => setFormData({...formData, witnesses: e.target.value})}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Photos/Evidence</span>
              </label>
              <input 
                type="file" 
                className="file-input file-input-bordered w-full" 
                multiple
                accept="image/*"
                onChange={(e) => setFormData({...formData, photos: e.target.files})}
              />
              <label className="label">
                <span className="label-text-alt">Upload photos of the incident scene (max 10MB per file)</span>
              </label>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Additional Notes</span>
              </label>
              <textarea 
                className="textarea textarea-bordered w-full" 
                rows={3}
                placeholder="Any other relevant information..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between">
          <button 
            type="button"
            onClick={() => router.push("/incidents/form")}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={handleSaveDraft}
              className="btn btn-outline"
            >
              Save as Draft
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
            >
              Submit Report
            </button>
          </div>
        </div>
      </form>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationPickerModal
          onSelect={(location) => {
            setFormData({ ...formData, location: location.locationId, locationName: location.locationName });
            setShowLocationModal(false);
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
}

// Location Picker Modal Component
function LocationPickerModal({ onSelect, onClose }: { 
  onSelect: (location: { locationId: string; locationName: string }) => void;
  onClose: () => void;
}) {
  const [selectedLocation, setSelectedLocation] = useState<{ locationId: string; locationName: string } | null>(null);
  const [filterText, setFilterText] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['main', 'warehouse', 'other']));
  
  const locationGroups = {
    main: {
      title: 'Main Facilities',
      reference: 'MAIN',
      items: [
        { LocationID: 1, LocationName: 'Main Office HQ', Reference: 'MAIN.HQ' },
        { LocationID: 2, LocationName: 'Reception Area', Reference: 'MAIN.REC' },
        { LocationID: 3, LocationName: 'Conference Rooms', Reference: 'MAIN.CONF' },
      ]
    },
    warehouse: {
      title: 'Warehouse & Production',
      reference: 'WARE',
      items: [
        { LocationID: 4, LocationName: 'Warehouse North', Reference: 'WARE.N' },
        { LocationID: 5, LocationName: 'Production Floor', Reference: 'WARE.PROD' },
        { LocationID: 6, LocationName: 'Loading Dock', Reference: 'WARE.DOCK' },
        { LocationID: 7, LocationName: 'Storage Area', Reference: 'WARE.STOR' },
      ]
    },
    other: {
      title: 'Other Locations',
      reference: 'OTHER',
      items: [
        { LocationID: 8, LocationName: 'Parking Lot', Reference: 'OTHER.PARK' },
        { LocationID: 9, LocationName: 'Kitchen/Break Room', Reference: 'OTHER.BREAK' },
        { LocationID: 10, LocationName: 'Emergency Exits', Reference: 'OTHER.EXIT' },
        { LocationID: 11, LocationName: 'Rooftop Access', Reference: 'OTHER.ROOF' },
      ]
    }
  };

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const handleSelectLocation = (location: any) => {
    setSelectedLocation({
      locationId: location.LocationID.toString(),
      locationName: location.LocationName
    });
  };

  const handleOK = () => {
    if (selectedLocation) {
      onSelect(selectedLocation);
    }
  };

  const filterLocations = (items: any[]) => {
    if (!filterText) return items;
    return items.filter(item => 
      item.LocationName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.Reference.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl" style={{ width: '600px' }}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Select Location</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Filter visible items</label>
              <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => {}} style={{ backgroundColor: '#3d3a72', color: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }} className="hover:opacity-80">Apply filter</button>
              <span className="text-gray-400">or</span>
              <button onClick={() => { setFilterText(''); setExpandedGroups(new Set(['main', 'warehouse', 'other'])); }} style={{ backgroundColor: '#3d3a72', color: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }} className="hover:opacity-80">Show all items</button>
            </div>
          </div>
          
          <div className="p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-2 text-sm font-medium text-gray-700">Title</th>
                  <th className="text-left pb-2 text-sm font-medium text-gray-700">Reference</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(locationGroups).map(([groupKey, group]) => {
                  const filteredItems = filterLocations(group.items);
                  if (filterText && filteredItems.length === 0) return null;
                  
                  return (
                    <React.Fragment key={groupKey}>
                      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleGroup(groupKey)}>
                        <td className="py-2 text-sm">
                          <div className="flex items-center">
                            <span className="mr-2 text-gray-500">{expandedGroups.has(groupKey) ? '−' : '+'}</span>
                            <span className="font-medium">{group.title}</span>
                          </div>
                        </td>
                        <td className="py-2 text-sm text-gray-600">{group.reference}</td>
                      </tr>
                      
                      {expandedGroups.has(groupKey) && filteredItems.map((location) => (
                        <tr key={location.LocationID} className={`hover:bg-gray-50 cursor-pointer ${selectedLocation?.locationId === location.LocationID.toString() ? 'bg-blue-50' : ''}`} onClick={() => handleSelectLocation(location)}>
                          <td className="py-2 text-sm">
                            <div className="flex items-center pl-8">
                              <input type="checkbox" checked={selectedLocation?.locationId === location.LocationID.toString()} onChange={() => handleSelectLocation(location)} className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" onClick={(e) => e.stopPropagation()} />
                              <span>{location.LocationName}</span>
                            </div>
                          </td>
                          <td className="py-2 text-sm text-gray-600">{location.Reference}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-start p-4 border-t border-gray-200">
            <button style={{ backgroundColor: '#3d3a72', color: '#ffffff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontWeight: '500', cursor: selectedLocation ? 'pointer' : 'not-allowed', fontSize: '14px', opacity: selectedLocation ? 1 : 0.5 }} className="hover:opacity-80" onClick={handleOK} disabled={!selectedLocation}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}