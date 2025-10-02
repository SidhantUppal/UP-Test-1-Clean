"use client";

import React, { useState, useEffect } from 'react';

interface EnvironmentalObjective {
  id: number;
  title: string;
  description: string;
  target: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline: string;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Completed';
  responsible: string;
  category: string;
}

export default function EnvironmentalObjectivesPage() {
  const [objectives, setObjectives] = useState<EnvironmentalObjective[]>([]);
  const [newObjectiveFromAspect, setNewObjectiveFromAspect] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newObjective, setNewObjective] = useState({
    title: '',
    description: '',
    target: '',
    currentValue: 0,
    targetValue: 0,
    unit: '',
    deadline: '',
    responsible: '',
    category: '',
    reminderEnabled: false,
    reminderFrequency: 'Monthly',
    reminderPersons: []
  });

  const [availablePersons] = useState([
    'Environmental Manager',
    'Facilities Manager',
    'Health & Safety Officer',
    'Operations Manager',
    'Maintenance Supervisor',
    'Quality Manager',
    'Site Manager',
    'Compliance Officer'
  ]);

  useEffect(() => {
    // Check if we have data from aspect-impact analysis
    const aspectData = sessionStorage.getItem('newObjectiveFromAspect');
    if (aspectData) {
      const parsedData = JSON.parse(aspectData);
      setNewObjectiveFromAspect(parsedData);
      setShowCreateForm(true);
      sessionStorage.removeItem('newObjectiveFromAspect'); // Clear after use
    }
  }, []);

  const createObjectiveFromAspect = () => {
    if (newObjectiveFromAspect) {
      const newObjective: EnvironmentalObjective = {
        id: Date.now(),
        title: newObjectiveFromAspect.title,
        description: newObjectiveFromAspect.description,
        target: `Reduce environmental impact score from ${newObjectiveFromAspect.score} to below 20`,
        currentValue: newObjectiveFromAspect.score,
        targetValue: 19,
        unit: 'Risk Score',
        deadline: newObjectiveFromAspect.dueDate,
        status: 'On Track',
        responsible: 'Environmental Manager',
        category: newObjectiveFromAspect.category
      };

      setObjectives(prev => [newObjective, ...prev]);
      setShowCreateForm(false);
      setNewObjectiveFromAspect(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Behind': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 0;
    const progress = Math.min(100, Math.max(0, ((current / target) * 100)));
    return Math.round(progress);
  };

  const createManualObjective = () => {
    if (newObjective.title && newObjective.target) {
      const objective: EnvironmentalObjective = {
        id: Date.now(),
        title: newObjective.title,
        description: newObjective.description,
        target: newObjective.target,
        currentValue: newObjective.currentValue,
        targetValue: newObjective.targetValue,
        unit: newObjective.unit,
        deadline: newObjective.deadline,
        status: 'On Track',
        responsible: newObjective.responsible,
        category: newObjective.category
      };

      // Create reminder tasks if enabled
      if (newObjective.reminderEnabled && newObjective.reminderPersons.length > 0) {
        createReminderTasks(objective, newObjective.reminderFrequency, newObjective.reminderPersons);
      }

      setObjectives(prev => [objective, ...prev]);
      setShowCreateForm(false);
      setNewObjective({
        title: '',
        description: '',
        target: '',
        currentValue: 0,
        targetValue: 0,
        unit: '',
        deadline: '',
        responsible: '',
        category: '',
        reminderEnabled: false,
        reminderFrequency: 'Monthly',
        reminderPersons: []
      });
    }
  };

  const createReminderTasks = (objective: EnvironmentalObjective, frequency: string, persons: string[]) => {
    // Mock function to create reminder tasks - integrate with your task system
    const reminderData = {
      objectiveId: objective.id,
      objectiveTitle: objective.title,
      frequency: frequency,
      assignedPersons: persons,
      taskType: 'Environmental Objective Reminder',
      description: `Regular check and update for environmental objective: ${objective.title}`,
      category: 'Environmental Management'
    };

    // In a real implementation, this would call your task creation API
    console.log('Creating reminder tasks:', reminderData);

    // Show success message
    alert(`Reminder tasks created successfully for ${persons.length} person(s) with ${frequency.toLowerCase()} frequency.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Environmental Objectives</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Set, track, and manage environmental objectives and targets</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-opacity hover:opacity-80 flex-1 sm:flex-none"
                style={{ backgroundColor: '#3d3a72' }}
              >
                Set New Objective
              </button>
              <button
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-opacity hover:opacity-80 flex-1 sm:flex-none"
                style={{ backgroundColor: '#3d3a72' }}
              >
                Progress Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 lg:px-12 xl:px-16 space-y-4 sm:space-y-6">

        {/* New Objective from Aspect-Impact Analysis Alert */}
        {newObjectiveFromAspect && showCreateForm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-800">High-Risk Environmental Aspect Identified</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p><strong>Issue:</strong> {newObjectiveFromAspect.title}</p>
                  <p><strong>Risk Score:</strong> {newObjectiveFromAspect.score}/35 ({newObjectiveFromAspect.category})</p>
                  <p><strong>Target:</strong> Reduce score to below 20</p>
                  <p><strong>Impact:</strong> {newObjectiveFromAspect.impact}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={createObjectiveFromAspect}
                    className="px-3 py-2 text-xs font-medium text-white rounded transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#3d3a72' }}
                  >
                    Create Environmental Objective
                  </button>
                  <button
                    onClick={() => {setShowCreateForm(false); setNewObjectiveFromAspect(null);}}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Create Form */}
        {showCreateForm && !newObjectiveFromAspect && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Set New Environmental Objective</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newObjective.title}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Reduce water consumption"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newObjective.category}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Energy">Energy</option>
                  <option value="Water">Water</option>
                  <option value="Waste">Waste</option>
                  <option value="Emissions">Emissions</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newObjective.description}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the environmental objective and its importance"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Target *</label>
                <input
                  type="text"
                  value={newObjective.target}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, target: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Reduce water usage by 25% from current levels"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
                <input
                  type="number"
                  value={newObjective.currentValue}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, currentValue: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Current measurement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                <input
                  type="number"
                  value={newObjective.targetValue}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, targetValue: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Target measurement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <input
                  type="text"
                  value={newObjective.unit}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, unit: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., liters, kWh, kg, %"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={newObjective.deadline}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsible Person</label>
                <input
                  type="text"
                  value={newObjective.responsible}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, responsible: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Environmental Manager"
                />
              </div>

              {/* Reminder Tasks Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    id="reminderEnabled"
                    checked={newObjective.reminderEnabled}
                    onChange={(e) => setNewObjective(prev => ({ ...prev, reminderEnabled: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="reminderEnabled" className="text-sm font-medium text-gray-700">
                    Schedule reminder tasks for regular monitoring
                  </label>
                </div>

                {newObjective.reminderEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Frequency</label>
                      <select
                        value={newObjective.reminderFrequency}
                        onChange={(e) => setNewObjective(prev => ({ ...prev, reminderFrequency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Bi-annually">Bi-annually</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assign Reminders To</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {availablePersons.map(person => (
                          <label key={person} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={newObjective.reminderPersons.includes(person)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewObjective(prev => ({
                                    ...prev,
                                    reminderPersons: [...prev.reminderPersons, person]
                                  }));
                                } else {
                                  setNewObjective(prev => ({
                                    ...prev,
                                    reminderPersons: prev.reminderPersons.filter(p => p !== person)
                                  }));
                                }
                              }}
                              className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                            />
                            <span className="text-xs text-gray-700">{person}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={createManualObjective}
                className="px-4 py-2 text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#3d3a72' }}
              >
                Create Objective
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Objectives List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold">Current Environmental Objectives</h2>
            <p className="text-sm text-gray-600 mt-1">Track progress and manage environmental improvement targets</p>
          </div>

          {objectives.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No objectives yet</h3>
              <p className="mt-1 text-sm text-gray-500">Create environmental objectives from high-risk aspect-impact assessments or set new targets.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {objectives.map((objective) => (
                <div key={objective.id} className="p-4 sm:p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">{objective.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(objective.status)}`}>
                          {objective.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{objective.description}</p>

                      {/* Target and Progress */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <span className="text-xs font-medium text-gray-700">Target:</span>
                            <p className="text-sm text-gray-900">{objective.target}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-700">Progress:</span>
                            <p className="text-sm text-gray-900">
                              {objective.currentValue} → {objective.targetValue} {objective.unit}
                            </p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">Achievement</span>
                            <span className="text-xs text-gray-500">{getProgressPercentage(objective.currentValue, objective.targetValue)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(objective.currentValue, objective.targetValue)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Category: {objective.category}</span>
                        <span>Responsible: {objective.responsible}</span>
                        <span>Deadline: {objective.deadline}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="px-3 py-1 text-xs font-medium text-white rounded transition-opacity hover:opacity-80" style={{ backgroundColor: '#3d3a72' }}>
                        Update Progress
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-white rounded transition-opacity hover:opacity-80" style={{ backgroundColor: '#e77726' }}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}