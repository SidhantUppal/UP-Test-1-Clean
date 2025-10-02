"use client";

import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";

// Environmental issue categories organized by condition with unique prefix letters
const environmentalIssues = {
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

// Mock data for locations and organization groups
const locations = [
  'Head Office - London',
  'Manufacturing Plant - Birmingham',
  'Warehouse - Manchester',
  'Regional Office - Edinburgh',
  'Service Center - Cardiff',
  'Distribution Hub - Bristol'
];

const organizationGroups = [
  'Corporate Management',
  'Manufacturing Operations',
  'Logistics & Distribution',
  'Facilities Management',
  'Health & Safety',
  'Environmental Team',
  'Quality Assurance',
  'Maintenance Department'
];

// Create meaningful prefix mapping for each issue using initials from issue names
const issuePrefixMap = {
  // Normal Conditions - using key words from each issue
  "Supply and use of materials": "SM",
  "Supply and use of utilities": "SU",
  "Generation and disposal of wastes": "W",
  "Generation and release of atmospheric emissions": "AE",
  "Release of liquid effluent": "LE",
  "Water wastage": "WW",
  "Electricity wastage": "EW",
  "Mains gas and gas oil wastage": "GW",
  "Petrol and diesel wastage": "PW",
  "Indirect aspects related to decisions": "ID",
  "Contractor activities": "CA",

  // Abnormal Conditions - using AB prefix for abnormal
  "Use of uncommon hazardous materials": "AH",
  "Abnormal disposal of waste materials": "AW",
  "Abnormal atmospheric emissions": "AA",
  "Abnormal release of liquids": "AL",
  "Abnormal creation of nuisance": "AN",

  // Emergency Conditions - using E prefix for emergency
  "Emergency situations": "ES",
  "Historic legacy": "HL"
};

export default function AspectImpactAnalysisPage() {
  const router = useRouter();
  const [isCreatingObjective, setIsCreatingObjective] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOrgGroup, setSelectedOrgGroup] = useState('');
  const [tableData, setTableData] = useState(() => {
    // Initialize table with all environmental issues as rows using unique prefix letters
    const initialData = [];

    Object.entries(environmentalIssues).forEach(([condition, issues]) => {
      issues.forEach(issue => {
        const prefix = issuePrefixMap[issue];
        initialData.push({
          id: `${condition}-${issue}-1`,
          condition,
          issue,
          number: `${prefix}1`,
          location: "",
          orgGroup: "",
          aspects: "",
          impacts: "",
          legislation: "",
          severity: "",
          amount: "",
          interestedParties: "",
          costBenefit: "",
          likelihood: "",
          controls: "",
          total: "",
        });
      });
    });

    return initialData;
  });

  const updateTableItem = (id, field, value) => {
    setTableData(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Calculate total when all numeric scores are entered
        const numericFields = ['legislation', 'severity', 'amount', 'interestedParties', 'costBenefit', 'likelihood', 'controls'];
        const scores = numericFields.map(f => parseInt(updated[f]) || 0);
        if (scores.some(s => s > 0)) {
          updated.total = scores.reduce((sum, score) => sum + score, 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const createObjectiveFromScore = async (item) => {
    if (item.total >= 20) {
      setIsCreatingObjective(true);

      try {
        // Navigate to objectives page with pre-filled data
        const objectiveData = {
          title: `Environmental Objective: ${item.issue} (${item.number})`,
          description: `Address high-risk environmental aspect: ${item.aspects || 'Not specified'}`,
          impact: item.impacts || 'Not specified',
          score: item.total,
          category: item.condition,
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 days from now
        };

        // Store in sessionStorage for the objectives page to pick up
        sessionStorage.setItem('newObjectiveFromAspect', JSON.stringify(objectiveData));

        // Navigate to objectives page using Next.js router
        router.push('/incidents/environmental/objectives');
      } catch (error) {
        console.error('Error creating objective:', error);
        setIsCreatingObjective(false);
      }
    }
  };

  const addNewRow = (issueCategory, condition) => {
    const prefix = issuePrefixMap[issueCategory];
    const existingCount = tableData.filter(item => item.issue === issueCategory).length;
    const nextNumber = existingCount + 1;

    const newRow = {
      id: `new_${Date.now()}`,
      issue: issueCategory,
      number: `${prefix}${nextNumber}`,
      condition: condition,
      location: "",
      orgGroup: "",
      aspects: "",
      impacts: "",
      legislation: "",
      severity: "",
      amount: "",
      interestedParties: "",
      costBenefit: "",
      likelihood: "",
      controls: "",
      total: "",
    };

    setTableData(prev => [...prev, newRow]);
  };

  const deleteRow = (id) => {
    setTableData(prev => {
      const filtered = prev.filter(item => item.id !== id);

      // Renumber items within each issue group to maintain sequential numbering
      const renumbered = filtered.map(item => {
        const sameIssueItems = filtered.filter(i => i.issue === item.issue);
        const itemIndex = sameIssueItems.findIndex(i => i.id === item.id);
        const prefix = issuePrefixMap[item.issue];

        return {
          ...item,
          number: `${prefix}${itemIndex + 1}`
        };
      });

      return renumbered;
    });
  };

  // Filter table data based on selected location and organization group
  const filteredTableData = tableData.filter(item => {
    const locationMatch = !selectedLocation || item.location === selectedLocation;
    const orgGroupMatch = !selectedOrgGroup || item.orgGroup === selectedOrgGroup;
    return locationMatch && orgGroupMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>
                Environmental Aspect & Impact Analysis
              </h1>
              <p className="text-gray-600 mt-1">
                Identify and assess environmental aspects and their impacts
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Export Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Compact Scoring Guides - Sticky */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border p-3 sticky top-4 z-10 shadow-lg">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Environmental Impact Scoring Guide</h3>

          {/* Legislation - Special Red Alert for Score 5 */}
          <div className="mb-2">
            <div className="text-sm font-medium text-green-800 mb-1">🟢 Legislation</div>
            <div className="flex flex-wrap gap-1 text-xs">
              <span className="bg-white px-2 py-1 rounded border">1: No leg./harm</span>
              <span className="bg-white px-2 py-1 rounded border">2: No leg./some harm</span>
              <span className="bg-white px-2 py-1 rounded border">3: Leg./no breach</span>
              <span className="bg-white px-2 py-1 rounded border">4: Leg./pot. breach</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded border font-medium">5: Leg./actual breach</span>
            </div>
          </div>

          {/* Other Categories - Each on Individual Lines */}
          <div className="space-y-2 text-xs">
            <div className="pb-2 border-b border-gray-100">
              <div className="text-sm font-medium text-green-800 mb-1">🟢 Severity</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-1.5 py-0.5 rounded">1: No detriment</span>
                <span className="bg-white px-1.5 py-0.5 rounded">2: Limited</span>
                <span className="bg-white px-1.5 py-0.5 rounded">3: Local</span>
                <span className="bg-white px-1.5 py-0.5 rounded">4: Regional</span>
                <span className="bg-white px-1.5 py-0.5 rounded">5: Global</span>
              </div>
            </div>

            <div className="pb-2 border-b border-gray-100">
              <div className="text-sm font-medium text-green-800 mb-1">🟢 Amount</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-1.5 py-0.5 rounded">1: Negligible</span>
                <span className="bg-white px-1.5 py-0.5 rounded">2: Low</span>
                <span className="bg-white px-1.5 py-0.5 rounded">3: Moderate</span>
                <span className="bg-white px-1.5 py-0.5 rounded">4: High</span>
                <span className="bg-white px-1.5 py-0.5 rounded">5: Extreme</span>
              </div>
            </div>

            <div className="pb-2 border-b border-gray-100">
              <div className="text-sm font-medium text-green-800 mb-1">🟢 Interested Parties</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-1.5 py-0.5 rounded">1: No interest</span>
                <span className="bg-white px-1.5 py-0.5 rounded">2: Little</span>
                <span className="bg-white px-1.5 py-0.5 rounded">3: Moderate</span>
                <span className="bg-white px-1.5 py-0.5 rounded">4: High</span>
                <span className="bg-white px-1.5 py-0.5 rounded">5: Maximum</span>
              </div>
            </div>

            <div className="pb-2 border-b border-gray-100">
              <div className="text-sm font-medium text-green-800 mb-1">🟢 Cost Benefit</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-1.5 py-0.5 rounded">1: Negligible</span>
                <span className="bg-white px-1.5 py-0.5 rounded">2: Small</span>
                <span className="bg-white px-1.5 py-0.5 rounded">3: Moderate</span>
                <span className="bg-white px-1.5 py-0.5 rounded">4: High</span>
                <span className="bg-white px-1.5 py-0.5 rounded">5: Extreme</span>
              </div>
            </div>

            <div className="pb-2 border-b border-gray-100">
              <div className="text-sm font-medium text-green-800 mb-1">🟢 Likelihood of Occurrence</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-1.5 py-0.5 rounded">1: Negligible</span>
                <span className="bg-white px-1.5 py-0.5 rounded">2: Low</span>
                <span className="bg-white px-1.5 py-0.5 rounded">3: Moderate</span>
                <span className="bg-white px-1.5 py-0.5 rounded">4: High</span>
                <span className="bg-white px-1.5 py-0.5 rounded">5: Certain</span>
              </div>
            </div>

            <div className="pb-2 border-b border-gray-100">
              <div className="text-sm font-medium text-green-800 mb-1">🟢 Controls for Emergencies</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-1.5 py-0.5 rounded">1: Effective</span>
                <span className="bg-white px-1.5 py-0.5 rounded">2: Mainly effective</span>
                <span className="bg-white px-1.5 py-0.5 rounded">3: Some effect</span>
                <span className="bg-white px-1.5 py-0.5 rounded">4: Low effect</span>
                <span className="bg-white px-1.5 py-0.5 rounded">5: Ineffective</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aspect Impact Analysis Matrix */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">Aspect & Impact Analysis Matrix</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Environmental aspects and impacts assessment table
                </p>
              </div>

              {/* Location and Organization Group Filters */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-700 mb-1">Filter by Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-700 mb-1">Filter by Organization Group</label>
                  <select
                    value={selectedOrgGroup}
                    onChange={(e) => setSelectedOrgGroup(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
                  >
                    <option value="">All Groups</option>
                    {organizationGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-3 py-3 text-left font-medium text-gray-700 border border-gray-300 min-w-32">
                    Issue
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-16">
                    Ref
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700 border border-gray-300 min-w-40">
                    Aspects
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700 border border-gray-300 min-w-40">
                    Impacts
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700 border border-gray-300 min-w-32">
                    Location
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700 border border-gray-300 min-w-32">
                    Org Group
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-20">
                    Legislation
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-20">
                    Severity
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-20">
                    Amount
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-24">
                    Interested Parties
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-20">
                    Cost Benefit
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-24">
                    Likelihood
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-24">
                    Controls
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-20">
                    Total
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300 w-16">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Group table data by issue */}
                {Object.entries(
                  filteredTableData.reduce((grouped, item) => {
                    if (!grouped[item.issue]) {
                      grouped[item.issue] = [];
                    }
                    grouped[item.issue].push(item);
                    return grouped;
                  }, {})
                ).map(([issue, issueItems]) => (
                  <Fragment key={issue}>
                    {issueItems.map((item, index) => (
                      <tr key={item.id} className={`hover:bg-gray-50 ${
                        item.condition === 'Emergency' ? 'border-l-4 border-red-500' :
                        item.condition === 'Abnormal' ? 'border-l-4 border-orange-500' :
                        'border-l-4 border-green-500'
                      }`}>
                        <td className="px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50">
                          {index === 0 ? item.issue : ''}
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center text-sm font-medium">
                          {item.number}
                        </td>
                        <td className="px-3 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={item.aspects}
                            onChange={(e) => updateTableItem(item.id, 'aspects', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="Environmental aspect..."
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={item.impacts}
                            onChange={(e) => updateTableItem(item.id, 'impacts', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="Environmental impact..."
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300">
                          <select
                            value={item.location}
                            onChange={(e) => updateTableItem(item.id, 'location', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          >
                            <option value="">Select location...</option>
                            {locations.map(location => (
                              <option key={location} value={location}>{location}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2 border border-gray-300">
                          <select
                            value={item.orgGroup}
                            onChange={(e) => updateTableItem(item.id, 'orgGroup', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          >
                            <option value="">Select group...</option>
                            {organizationGroups.map(group => (
                              <option key={group} value={group}>{group}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={item.legislation}
                            onChange={(e) => updateTableItem(item.id, 'legislation', e.target.value)}
                            className={`w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center ${
                              item.legislation === '5' ? 'bg-red-500 text-white' : ''
                            }`}
                            placeholder=""
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={item.severity}
                            onChange={(e) => updateTableItem(item.id, 'severity', e.target.value)}
                            className="w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center"
                            placeholder=""
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={item.amount}
                            onChange={(e) => updateTableItem(item.id, 'amount', e.target.value)}
                            className="w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center"
                            placeholder=""
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={item.interestedParties}
                            onChange={(e) => updateTableItem(item.id, 'interestedParties', e.target.value)}
                            className="w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center"
                            placeholder=""
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={item.costBenefit}
                            onChange={(e) => updateTableItem(item.id, 'costBenefit', e.target.value)}
                            className="w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center"
                            placeholder=""
                          />
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          {item.condition === 'Normal' ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={item.likelihood}
                              onChange={(e) => updateTableItem(item.id, 'likelihood', e.target.value)}
                              className="w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center"
                              placeholder=""
                            />
                          )}
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          {item.condition === 'Normal' ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={item.controls}
                              onChange={(e) => updateTableItem(item.id, 'controls', e.target.value)}
                              className="w-12 px-1 py-1 border border-gray-300 rounded text-xs text-center"
                              placeholder=""
                            />
                          )}
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900">{item.total}</span>
                            {item.total >= 20 && (
                              <>
                                <span className="text-xs text-red-600 font-medium">HIGH</span>
                                <button
                                  onClick={() => createObjectiveFromScore(item)}
                                  disabled={isCreatingObjective}
                                  className="mt-1 px-2 py-1 text-xs text-white rounded transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: '#3d3a72' }}
                                  title="Create Environmental Objective"
                                >
                                  {isCreatingObjective ? 'Creating...' : 'Create Obj'}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-300 text-center">
                          {item.id.toString().startsWith('new_') && (
                            <button
                              onClick={() => deleteRow(item.id)}
                              className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
                              title="Delete this row"
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Add Row button for each issue group */}
                    <tr className={`${
                      issueItems[0].condition === 'Emergency' ? 'border-l-4 border-red-500' :
                      issueItems[0].condition === 'Abnormal' ? 'border-l-4 border-orange-500' :
                      'border-l-4 border-green-500'
                    }`}>
                      <td className="px-3 py-2 border border-gray-300 bg-gray-50"></td>
                      <td className="px-3 py-2 border border-gray-300 text-center">
                        <button
                          onClick={() => addNewRow(issue, issueItems[0].condition)}
                          className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                          title={`Add new aspect/impact for ${issue}`}
                        >
                          + Add
                        </button>
                      </td>
                      <td className="px-3 py-2 border border-gray-300 bg-gray-50 text-xs text-gray-500 italic" colSpan="9">
                        Add another aspect/impact for this issue
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}