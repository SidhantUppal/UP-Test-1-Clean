'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Hazard {
  id: string;
  description: string;
  riskLevel: 'high' | 'medium' | 'low';
}

interface ControlMeasure {
  id: string;
  hazardId: string;
  description: string;
}

export default function CreateBasicRiskAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [peopleAtRiskOptions, setPeopleAtRiskOptions] = useState<any[]>([]);
  
  // Refs for date inputs
  const assessmentDateRef = useRef<HTMLInputElement>(null);
  const reviewDateRef = useRef<HTMLInputElement>(null);
  const monitoringDateRef = useRef<HTMLInputElement>(null);
  
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    activity: '',
    location: '',
    assessedBy: '',
    assessmentDate: new Date().toISOString().split('T')[0],
    peopleAtRisk: [] as string[],
    // Review fields
    reviewerName: '',
    reviewPeriod: '12', // months
    reviewDate: '',
    // Monitoring fields
    monitoringPeriod: '3', // months
    monitoringDate: '',
    monitoringPerson: ''
  });

  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [controlMeasures, setControlMeasures] = useState<ControlMeasure[]>([]);
  const [showPeopleModal, setShowPeopleModal] = useState(false);

  useEffect(() => {
    fetchPeopleAtRiskOptions();
  }, []);

  const fetchPeopleAtRiskOptions = async () => {
    try {
      // For now use hardcoded data, later fetch from API
      const options = [
        { id: 1, name: 'Employees' },
        { id: 2, name: 'Contractors' },
        { id: 3, name: 'Visitors' },
        { id: 4, name: 'Members of Public' },
        { id: 5, name: 'Young Persons' },
        { id: 6, name: 'New/Expectant Mothers' },
        { id: 7, name: 'Disabled Persons' },
        { id: 8, name: 'Lone Workers' },
        { id: 9, name: 'Maintenance Staff' },
        { id: 10, name: 'Delivery Drivers' },
        { id: 11, name: 'Cleaners' },
        { id: 12, name: 'Emergency Services' }
      ];
      setPeopleAtRiskOptions(options);
    } catch (error) {
      console.error('Error fetching people at risk options:', error);
    }
  };

  const addHazard = () => {
    const newHazard: Hazard = {
      id: Date.now().toString(),
      description: '',
      riskLevel: 'low',
    };
    setHazards([...hazards, newHazard]);
    
    // Add a corresponding control measure entry
    const newControlMeasure: ControlMeasure = {
      id: Date.now().toString() + '-cm',
      hazardId: newHazard.id,
      description: ''
    };
    setControlMeasures([...controlMeasures, newControlMeasure]);
  };

  const updateHazard = (id: string, updates: Partial<Hazard>) => {
    setHazards(hazards.map(hazard => 
      hazard.id === id ? { ...hazard, ...updates } : hazard
    ));
  };

  const deleteHazard = (id: string) => {
    setHazards(hazards.filter(hazard => hazard.id !== id));
    setControlMeasures(controlMeasures.filter(cm => cm.hazardId !== id));
  };

  const updateControlMeasure = (hazardId: string, description: string) => {
    setControlMeasures(controlMeasures.map(cm => 
      cm.hazardId === hazardId ? { ...cm, description } : cm
    ));
  };

  const getRiskLevelColor = (level: string) => {
    switch(level) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assessmentData.title || !assessmentData.activity || !assessmentData.location) {
      alert('Please fill in all required fields');
      return;
    }

    if (hazards.length === 0) {
      alert('Please add at least one hazard');
      return;
    }

    if (assessmentData.peopleAtRisk.length === 0) {
      alert('Please select people at risk');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        ...assessmentData,
        hazards: hazards.map(h => ({
          ...h,
          controlMeasures: controlMeasures
            .filter(cm => cm.hazardId === h.id)
            .map(cm => cm.description)
            .filter(desc => desc.trim() !== '')
        })),
        nextReviewDate: new Date(
          Date.now() + parseInt(assessmentData.reviewPeriod) * 30 * 24 * 60 * 60 * 1000
        ).toISOString()
      };

      const response = await fetch('/api/risk-assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1',
          'x-user-id': '1'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create risk assessment');
      
      const result = await response.json();
      router.push(`/risk-assessments/${result.data?.id || ''}`);
    } catch (error) {
      console.error('Error creating risk assessment:', error);
      alert('Failed to create risk assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePerson = (person: string) => {
    setAssessmentData(prev => ({
      ...prev,
      peopleAtRisk: prev.peopleAtRisk.includes(person)
        ? prev.peopleAtRisk.filter(p => p !== person)
        : [...prev.peopleAtRisk, person]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Create Basic Risk Assessment</h1>
              <p className="text-gray-600 mt-1">Simple and quick risk assessment</p>
            </div>
            <div className="flex gap-3">
              <Link href="/risk-assessments">
                <button style={{ 
                  backgroundColor: '#e77726', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} className="hover:opacity-80">
                  Back to Assessments
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.title}
                onChange={(e) => setAssessmentData({...assessmentData, title: e.target.value})}
                placeholder="Enter assessment title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.location}
                onChange={(e) => setAssessmentData({...assessmentData, location: e.target.value})}
                placeholder="Enter location"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity/Process <span className="text-red-600">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                rows={2}
                value={assessmentData.activity}
                onChange={(e) => setAssessmentData({...assessmentData, activity: e.target.value})}
                placeholder="Describe the activity or process being assessed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assessed By</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.assessedBy}
                onChange={(e) => setAssessmentData({...assessmentData, assessedBy: e.target.value})}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Date</label>
              <div 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 cursor-pointer"
                onClick={() => assessmentDateRef.current?.showPicker?.() || assessmentDateRef.current?.focus()}
              >
                <input
                  ref={assessmentDateRef}
                  type="date"
                  className="w-full text-sm border-none outline-none cursor-pointer"
                  value={assessmentData.assessmentDate}
                  onChange={(e) => setAssessmentData({...assessmentData, assessmentDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* People at Risk */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">People at Risk</h2>
          
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowPeopleModal(true)}
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} 
              className="hover:opacity-80"
            >
              Select People at Risk
            </button>
          </div>

          {assessmentData.peopleAtRisk.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {assessmentData.peopleAtRisk.map((person) => (
                <span
                  key={person}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }}
                >
                  {person}
                  <button
                    type="button"
                    onClick={() => togglePerson(person)}
                    className="ml-2 hover:opacity-70"
                    style={{ color: '#3d3a72' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hazards Identified */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Hazards Identified</h2>
            <button
              type="button"
              onClick={addHazard}
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'opacity 0.2s'
              }} 
              className="hover:opacity-80"
            >
              Add Hazard
            </button>
          </div>

          {hazards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hazards added yet. Click "Add Hazard" to begin.
            </p>
          ) : (
            <div className="space-y-4">
              {hazards.map((hazard, index) => (
                <div key={hazard.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900">Hazard #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => deleteHazard(hazard.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hazard Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        rows={2}
                        value={hazard.description}
                        onChange={(e) => updateHazard(hazard.id, { description: e.target.value })}
                        placeholder="Describe the hazard"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Risk Level
                      </label>
                      <select
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm ${getRiskLevelColor(hazard.riskLevel)}`}
                        value={hazard.riskLevel}
                        onChange={(e) => updateHazard(hazard.id, { riskLevel: e.target.value as 'high' | 'medium' | 'low' })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Control Measures */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Control Measures</h2>
          
          {hazards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Add hazards first to define control measures for each.
            </p>
          ) : (
            <div className="space-y-4">
              {hazards.map((hazard, index) => {
                const controlMeasure = controlMeasures.find(cm => cm.hazardId === hazard.id);
                return (
                  <div key={hazard.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <h3 className="font-medium text-sm text-gray-700">
                        Control Measures for Hazard #{index + 1}
                      </h3>
                      {hazard.description && (
                        <p className="text-sm text-gray-500 mt-1">{hazard.description}</p>
                      )}
                    </div>
                    
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      rows={3}
                      value={controlMeasure?.description || ''}
                      onChange={(e) => updateControlMeasure(hazard.id, e.target.value)}
                      placeholder="Describe the control measures to mitigate this hazard"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Review Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Review Schedule</h2>
          <p className="text-sm text-gray-600 mb-4">
            Define when and by whom this assessment should be reviewed
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Period <span className="text-red-600">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.reviewPeriod}
                onChange={(e) => setAssessmentData({...assessmentData, reviewPeriod: e.target.value})}
              >
                <option value="1">Monthly</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="9">9 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Review Date
              </label>
              <div 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 cursor-pointer"
                onClick={() => reviewDateRef.current?.showPicker?.() || reviewDateRef.current?.focus()}
              >
                <input
                  ref={reviewDateRef}
                  type="date"
                  className="w-full text-sm border-none outline-none cursor-pointer"
                  value={assessmentData.reviewDate}
                  onChange={(e) => setAssessmentData({...assessmentData, reviewDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  placeholder="Select review date"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reviewer Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.reviewerName}
                onChange={(e) => setAssessmentData({...assessmentData, reviewerName: e.target.value})}
                placeholder="Name of person responsible for review"
              />
            </div>
          </div>
        </div>

        {/* Monitoring Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Monitoring Schedule</h2>
          <p className="text-sm text-gray-600 mb-4">
            Establish ongoing monitoring to ensure control measures remain effective
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monitoring Period <span className="text-red-600">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.monitoringPeriod}
                onChange={(e) => setAssessmentData({...assessmentData, monitoringPeriod: e.target.value})}
              >
                <option value="0.25">Weekly</option>
                <option value="0.5">Fortnightly</option>
                <option value="1">Monthly</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="9">9 months</option>
                <option value="12">12 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Monitoring Date
              </label>
              <div 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 cursor-pointer"
                onClick={() => monitoringDateRef.current?.showPicker?.() || monitoringDateRef.current?.focus()}
              >
                <input
                  ref={monitoringDateRef}
                  type="date"
                  className="w-full text-sm border-none outline-none cursor-pointer"
                  value={assessmentData.monitoringDate}
                  onChange={(e) => setAssessmentData({...assessmentData, monitoringDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  placeholder="Select monitoring date"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monitoring Person
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                value={assessmentData.monitoringPerson}
                onChange={(e) => setAssessmentData({...assessmentData, monitoringPerson: e.target.value})}
                placeholder="Name of person responsible for monitoring"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/risk-assessments">
            <button
              type="button"
              style={{ 
                backgroundColor: '#e77726', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} 
              className="hover:opacity-80"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={loading}
            style={{ 
              backgroundColor: '#3d3a72', 
              color: '#ffffff', 
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s',
              opacity: loading ? '0.6' : '1'
            }} 
            className="hover:opacity-80"
          >
            {loading ? 'Creating...' : 'Create Assessment'}
          </button>
        </div>
      </form>

      {/* People at Risk Modal */}
      {showPeopleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setShowPeopleModal(false)}
            ></div>

            {/* Modal panel */}
            <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {/* Modal header */}
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select People at Risk
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowPeopleModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal body */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="grid grid-cols-2 gap-3">
                  {peopleAtRiskOptions.map((option) => (
                    <label key={option.id} className="cursor-pointer">
                      <div className={`p-3 bg-white rounded-lg border-2 transition-all ${
                        assessmentData.peopleAtRisk.includes(option.name)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            checked={assessmentData.peopleAtRisk.includes(option.name)}
                            onChange={() => togglePerson(option.name)}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {option.name}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Modal footer */}
              <div className="bg-white px-6 py-3 border-t border-gray-200">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPeopleModal(false)}
                    style={{ 
                      backgroundColor: '#e77726', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }} 
                    className="hover:opacity-80"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPeopleModal(false)}
                    style={{ 
                      backgroundColor: '#3d3a72', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }} 
                    className="hover:opacity-80"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}