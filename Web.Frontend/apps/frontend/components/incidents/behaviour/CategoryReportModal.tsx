"use client";

import { useState } from 'react';

interface CategoryReportModalProps {
  category: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CategoryReportModal({ category, onClose, onSubmit }: CategoryReportModalProps) {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    peopleInvolved: '',
    severity: 'medium',
    actionTaken: '',
    topic: '',
    personRecognized: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      category: category.id,
      categoryName: category.name,
      points: category.points,
      timestamp: new Date().toISOString()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Report {category.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Body - Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {/* Location - Required for all */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Warehouse B - Loading Bay"
                />
              </div>

              {/* Description - Required for all */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe what you observed..."
                />
              </div>

              {/* Category-specific fields */}
              {(category.id === 'intervention' || category.id === 'save') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      People Involved
                    </label>
                    <input
                      type="text"
                      name="peopleInvolved"
                      value={formData.peopleInvolved}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Names or number of people"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Immediate Action Taken
                    </label>
                    <textarea
                      name="actionTaken"
                      value={formData.actionTaken}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="What action did you take?"
                    />
                  </div>
                </>
              )}

              {(category.id === 'hazard' || category.id === 'near-miss') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low - Minor risk</option>
                    <option value="medium">Medium - Moderate risk</option>
                    <option value="high">High - Serious risk</option>
                    <option value="critical">Critical - Immediate danger</option>
                  </select>
                </div>
              )}

              {category.id === 'quick-training' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Training Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What did you train on?"
                  />
                </div>
              )}

              {category.id === 'good-behavior' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Person Recognized
                  </label>
                  <input
                    type="text"
                    name="personRecognized"
                    value={formData.personRecognized}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Who demonstrated good behavior?"
                  />
                </div>
              )}

              {/* Photo Upload (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
              <button 
                type="submit"
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
                Submit Report
              </button>
              
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
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}