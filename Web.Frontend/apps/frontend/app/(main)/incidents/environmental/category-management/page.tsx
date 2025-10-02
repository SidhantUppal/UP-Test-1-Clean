"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Initial environmental categories (can be modified by clients)
const initialEnvironmentalIssues = {
  Normal: [
    "Supply and use of materials",
    "Supply and use of utilities",
    "Generation and disposal of wastes",
    "Generation and release of atmospheric emissions",
    "Release of liquid effluent",
    "Water wastage",
    "Electricity wastage",
    "Mains gas and gas oil wastage",
    "Petrol and diesel wastage",
    "Indirect aspects related to decisions",
    "Contractor activities"
  ],
  Abnormal: [
    "Use of uncommon hazardous materials",
    "Abnormal disposal of waste materials",
    "Abnormal atmospheric emissions",
    "Abnormal release of liquids",
    "Abnormal creation of nuisance"
  ],
  Emergency: [
    "Emergency situations",
    "Historic legacy"
  ]
};

export default function CategoryManagementPage() {
  const router = useRouter();
  const [environmentalIssues, setEnvironmentalIssues] = useState(initialEnvironmentalIssues);
  const [newCategory, setNewCategory] = useState({
    name: '',
    condition: 'Normal',
    prefix: ''
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const addCategory = () => {
    if (newCategory.name.trim() && newCategory.prefix.trim()) {
      setEnvironmentalIssues(prev => ({
        ...prev,
        [newCategory.condition]: [...prev[newCategory.condition], newCategory.name.trim()]
      }));

      setNewCategory({
        name: '',
        condition: 'Normal',
        prefix: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteCategory = (condition, categoryName) => {
    setEnvironmentalIssues(prev => ({
      ...prev,
      [condition]: prev[condition].filter(name => name !== categoryName)
    }));
  };

  const editCategory = (condition, oldName, newName) => {
    if (newName.trim()) {
      setEnvironmentalIssues(prev => ({
        ...prev,
        [condition]: prev[condition].map(name => name === oldName ? newName.trim() : name)
      }));
    }
    setEditingCategory(null);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Normal': return 'border-green-500 bg-green-50';
      case 'Abnormal': return 'border-orange-500 bg-orange-50';
      case 'Emergency': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getConditionIcon = (condition) => {
    switch (condition) {
      case 'Normal': return '🟢';
      case 'Abnormal': return '🟠';
      case 'Emergency': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Environmental Category Management</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Customize environmental categories for your organization</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-opacity hover:opacity-80 flex-1 sm:flex-none"
                style={{ backgroundColor: '#3d3a72' }}
              >
                Add New Category
              </button>
              <button
                onClick={() => router.push('/incidents/environmental/aspect-impact-analysis')}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-opacity hover:opacity-80 flex-1 sm:flex-none"
                style={{ backgroundColor: '#e77726' }}
              >
                Back to Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Add New Category Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Environmental Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Chemical storage and handling"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition Type *</label>
                <select
                  value={newCategory.condition}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Normal">🟢 Normal</option>
                  <option value="Abnormal">🟠 Abnormal</option>
                  <option value="Emergency">🔴 Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Prefix *</label>
                <input
                  type="text"
                  value={newCategory.prefix}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, prefix: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., CS"
                  maxLength="3"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addCategory}
                className="px-4 py-2 text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#3d3a72' }}
              >
                Add Category
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Categories by Condition */}
        {Object.entries(environmentalIssues).map(([condition, categories]) => (
          <div key={condition} className={`bg-white rounded-lg shadow-sm border-2 ${getConditionColor(condition)}`}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>{getConditionIcon(condition)}</span>
                {condition} Conditions
                <span className="text-sm font-normal text-gray-500">({categories.length} categories)</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {condition === 'Normal' && 'Regular operational environmental aspects'}
                {condition === 'Abnormal' && 'Unusual or irregular environmental aspects'}
                {condition === 'Emergency' && 'Emergency and historical environmental aspects'}
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {editingCategory === `${condition}-${category}` ? (
                      <input
                        type="text"
                        defaultValue={category}
                        onBlur={(e) => editCategory(condition, category, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            editCategory(condition, category, e.target.value);
                          }
                          if (e.key === 'Escape') {
                            setEditingCategory(null);
                          }
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span className="flex-1 text-sm font-medium text-gray-700">{category}</span>
                    )}

                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => setEditingCategory(`${condition}-${category}`)}
                        className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                        title="Edit category"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteCategory(condition, category)}
                        className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
                        title="Delete category"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No categories in this condition type.</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Add the first category →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Usage Instructions */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Usage Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Adding Categories:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click "Add New Category" to create custom categories</li>
                <li>Choose the appropriate condition type (Normal/Abnormal/Emergency)</li>
                <li>Provide a unique reference prefix (1-3 characters)</li>
                <li>Category names should be descriptive and specific</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Managing Categories:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click the edit button (✏️) to modify category names</li>
                <li>Click the delete button (🗑️) to remove categories</li>
                <li>Changes are automatically saved and applied</li>
                <li>Categories are used in aspect-impact analysis</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}