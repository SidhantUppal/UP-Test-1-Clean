'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StandardFireRiskAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    siteName: '',
    buildingName: '',
    address: '',
    assessmentDate: new Date().toISOString().split('T')[0],
    assessorName: '',
    responsiblePerson: '',
    
    // Building Details
    buildingType: '',
    numberOfFloors: '',
    maxOccupancy: '',
    primaryUse: '',
    
    // Fire Hazards
    hazards: {
      sources: [] as string[],
      combustibles: [] as string[],
      workProcesses: [] as string[]
    },
    
    // People at Risk
    peopleAtRisk: {
      employees: '',
      visitors: '',
      contractors: '',
      vulnerableGroups: [] as string[]
    },
    
    // Fire Safety Measures
    safetyMeasures: {
      detection: [] as string[],
      alarm: [] as string[],
      extinguishers: [] as string[],
      escapeRoutes: [] as string[],
      signage: [] as string[],
      emergencyLighting: [] as string[]
    },
    
    // Risk Assessment
    riskLevel: 'low',
    recommendations: [] as string[],
    
    // Action Plan
    actions: [] as any[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Submit to API
      console.log('Submitting fire risk assessment:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to success page or list
      router.push('/risk-assessments');
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Site Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.siteName}
                    onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Building Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.buildingName}
                    onChange={(e) => setFormData({...formData, buildingName: e.target.value})}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address <span className="text-red-500">*</span></label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={formData.assessmentDate}
                    onChange={(e) => setFormData({...formData, assessmentDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assessor Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.assessorName}
                    onChange={(e) => setFormData({...formData, assessorName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Responsible Person <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.responsiblePerson}
                    onChange={(e) => setFormData({...formData, responsiblePerson: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Building Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Building Type</label>
                  <select
                    className="select select-bordered w-full"
                    value={formData.buildingType}
                    onChange={(e) => setFormData({...formData, buildingType: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="factory">Factory</option>
                    <option value="residential">Residential</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Floors</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.numberOfFloors}
                    onChange={(e) => setFormData({...formData, numberOfFloors: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Maximum Occupancy</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.maxOccupancy}
                    onChange={(e) => setFormData({...formData, maxOccupancy: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Use</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.primaryUse}
                    onChange={(e) => setFormData({...formData, primaryUse: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Fire Hazards Identification</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sources of Ignition</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Electrical equipment',
                      'Heating systems',
                      'Cooking facilities',
                      'Smoking materials',
                      'Hot work',
                      'Lightning'
                    ].map(source => (
                      <label key={source} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={formData.hazards.sources.includes(source)}
                          onChange={(e) => {
                            const sources = e.target.checked 
                              ? [...formData.hazards.sources, source]
                              : formData.hazards.sources.filter(s => s !== source);
                            setFormData({
                              ...formData,
                              hazards: {...formData.hazards, sources}
                            });
                          }}
                        />
                        <span className="text-sm">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Combustible Materials</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Paper/cardboard',
                      'Flammable liquids',
                      'Gases',
                      'Textiles',
                      'Plastics',
                      'Wood'
                    ].map(material => (
                      <label key={material} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={formData.hazards.combustibles.includes(material)}
                          onChange={(e) => {
                            const combustibles = e.target.checked 
                              ? [...formData.hazards.combustibles, material]
                              : formData.hazards.combustibles.filter(c => c !== material);
                            setFormData({
                              ...formData,
                              hazards: {...formData.hazards, combustibles}
                            });
                          }}
                        />
                        <span className="text-sm">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Work Processes</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Welding/cutting',
                      'Cooking',
                      'Chemical processes',
                      'Spray painting',
                      'Dust producing',
                      'None'
                    ].map(process => (
                      <label key={process} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={formData.hazards.workProcesses.includes(process)}
                          onChange={(e) => {
                            const workProcesses = e.target.checked 
                              ? [...formData.hazards.workProcesses, process]
                              : formData.hazards.workProcesses.filter(p => p !== process);
                            setFormData({
                              ...formData,
                              hazards: {...formData.hazards, workProcesses}
                            });
                          }}
                        />
                        <span className="text-sm">{process}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">People at Risk</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Employees</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.peopleAtRisk.employees}
                    onChange={(e) => setFormData({
                      ...formData,
                      peopleAtRisk: {...formData.peopleAtRisk, employees: e.target.value}
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Typical Visitors</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.peopleAtRisk.visitors}
                    onChange={(e) => setFormData({
                      ...formData,
                      peopleAtRisk: {...formData.peopleAtRisk, visitors: e.target.value}
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Contractors</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.peopleAtRisk.contractors}
                    onChange={(e) => setFormData({
                      ...formData,
                      peopleAtRisk: {...formData.peopleAtRisk, contractors: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Vulnerable Groups Present</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Children',
                    'Elderly',
                    'Disabled persons',
                    'Pregnant women',
                    'Lone workers',
                    'Night workers'
                  ].map(group => (
                    <label key={group} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={formData.peopleAtRisk.vulnerableGroups.includes(group)}
                        onChange={(e) => {
                          const vulnerableGroups = e.target.checked 
                            ? [...formData.peopleAtRisk.vulnerableGroups, group]
                            : formData.peopleAtRisk.vulnerableGroups.filter(g => g !== group);
                          setFormData({
                            ...formData,
                            peopleAtRisk: {...formData.peopleAtRisk, vulnerableGroups}
                          });
                        }}
                      />
                      <span className="text-sm">{group}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Fire Safety Measures</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fire Detection</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Smoke detectors',
                      'Heat detectors',
                      'Manual call points',
                      'Automatic system',
                      'None present'
                    ].map(item => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={formData.safetyMeasures.detection.includes(item)}
                          onChange={(e) => {
                            const detection = e.target.checked 
                              ? [...formData.safetyMeasures.detection, item]
                              : formData.safetyMeasures.detection.filter(d => d !== item);
                            setFormData({
                              ...formData,
                              safetyMeasures: {...formData.safetyMeasures, detection}
                            });
                          }}
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fire Fighting Equipment</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Water extinguishers',
                      'CO2 extinguishers',
                      'Foam extinguishers',
                      'Powder extinguishers',
                      'Fire blankets',
                      'Hose reels'
                    ].map(item => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={formData.safetyMeasures.extinguishers.includes(item)}
                          onChange={(e) => {
                            const extinguishers = e.target.checked 
                              ? [...formData.safetyMeasures.extinguishers, item]
                              : formData.safetyMeasures.extinguishers.filter(ex => ex !== item);
                            setFormData({
                              ...formData,
                              safetyMeasures: {...formData.safetyMeasures, extinguishers}
                            });
                          }}
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Escape Routes</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Adequate width',
                      'Clear of obstructions',
                      'Well lit',
                      'Signed',
                      'Protected routes',
                      'Alternative routes'
                    ].map(item => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={formData.safetyMeasures.escapeRoutes.includes(item)}
                          onChange={(e) => {
                            const escapeRoutes = e.target.checked 
                              ? [...formData.safetyMeasures.escapeRoutes, item]
                              : formData.safetyMeasures.escapeRoutes.filter(er => er !== item);
                            setFormData({
                              ...formData,
                              safetyMeasures: {...formData.safetyMeasures, escapeRoutes}
                            });
                          }}
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Risk Level Assessment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Overall Fire Risk Level</label>
                  <div className="grid grid-cols-3 gap-4">
                    <label className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-colors ${
                      formData.riskLevel === 'low' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="riskLevel"
                        value="low"
                        checked={formData.riskLevel === 'low'}
                        onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                        className="sr-only"
                      />
                      <div className="font-medium text-green-700">Low</div>
                      <div className="text-xs text-gray-600 mt-1">Acceptable level</div>
                    </label>
                    
                    <label className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-colors ${
                      formData.riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="riskLevel"
                        value="medium"
                        checked={formData.riskLevel === 'medium'}
                        onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                        className="sr-only"
                      />
                      <div className="font-medium text-yellow-700">Medium</div>
                      <div className="text-xs text-gray-600 mt-1">Action required</div>
                    </label>
                    
                    <label className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-colors ${
                      formData.riskLevel === 'high' ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="riskLevel"
                        value="high"
                        checked={formData.riskLevel === 'high'}
                        onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                        className="sr-only"
                      />
                      <div className="font-medium text-red-700">High</div>
                      <div className="text-xs text-gray-600 mt-1">Urgent action</div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Key Recommendations</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={4}
                    placeholder="List key recommendations to reduce fire risk..."
                    value={formData.recommendations.join('\n')}
                    onChange={(e) => setFormData({
                      ...formData,
                      recommendations: e.target.value.split('\n').filter(r => r.trim())
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Standard Fire Risk Assessment</h1>
        <p className="text-gray-600 mt-1">Complete a standard fire risk assessment for your premises</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <ul className="steps steps-horizontal w-full">
          <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Basic Information</li>
          <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Hazards & People</li>
          <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Safety Measures</li>
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="btn btn-outline"
          >
            Previous
          </button>

          <div className="flex gap-3">
            <Link href="/risk-assessments/create/fire" className="btn btn-ghost">
              Cancel
            </Link>
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Assessment'
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}