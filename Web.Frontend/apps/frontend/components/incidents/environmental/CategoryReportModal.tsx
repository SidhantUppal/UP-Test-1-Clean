"use client";

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

interface CategoryReportModalProps {
  category: Category;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CategoryReportModal({ category, onClose, onSubmit }: CategoryReportModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'Medium',
    immediateAction: '',
    photoEvidence: false,
    witnessPresent: false,
    witnessName: '',
    urgentResponse: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category: category.id,
      ...formData,
      submittedAt: new Date().toISOString()
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{category.name} Report</h2>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder={`Brief title for this ${category.name.toLowerCase()} report`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Provide detailed description of what was observed..."
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Where did this occur? (e.g., Building A, Line 3, Parking Lot)"
                />
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity Level
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => handleInputChange('severity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Low">Low - Minor impact, easily managed</option>
                  <option value="Medium">Medium - Moderate impact, requires attention</option>
                  <option value="High">High - Significant impact, immediate action needed</option>
                </select>
              </div>

              {/* Immediate Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Immediate Action Taken
                </label>
                <textarea
                  rows={2}
                  value={formData.immediateAction}
                  onChange={(e) => handleInputChange('immediateAction', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="What immediate actions were taken to address this issue?"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="photoEvidence"
                    checked={formData.photoEvidence}
                    onChange={(e) => handleInputChange('photoEvidence', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="photoEvidence" className="ml-2 block text-sm text-gray-700">
                    Photo evidence available
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="witnessPresent"
                    checked={formData.witnessPresent}
                    onChange={(e) => handleInputChange('witnessPresent', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="witnessPresent" className="ml-2 block text-sm text-gray-700">
                    Witness present
                  </label>
                </div>

                {formData.witnessPresent && (
                  <div className="ml-6">
                    <input
                      type="text"
                      value={formData.witnessName}
                      onChange={(e) => handleInputChange('witnessName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Witness name"
                    />
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="urgentResponse"
                    checked={formData.urgentResponse}
                    onChange={(e) => handleInputChange('urgentResponse', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="urgentResponse" className="ml-2 block text-sm text-gray-700">
                    Requires urgent response
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}