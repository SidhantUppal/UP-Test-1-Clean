// Sections 3-12 for PAS79 Fire Risk Assessment
// This file contains the remaining section components

import React from 'react';

// Section 3: Occupancy Profile
export const Section3OccupancyProfile = ({ occupancyProfile, setOccupancyProfile }: any) => (
  <div className="space-y-6">
    {/* Occupancy Numbers */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Section 3: Occupancy Profile</h2>
      <h3 className="text-md font-medium mb-4 text-gray-700">Occupancy Numbers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Maximum Occupancy <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={occupancyProfile.maxOccupancy}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, maxOccupancy: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Typical Day Occupancy</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={occupancyProfile.typicalDayOccupancy}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, typicalDayOccupancy: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Typical Night Occupancy</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={occupancyProfile.typicalNightOccupancy}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, typicalNightOccupancy: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Staff Numbers</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={occupancyProfile.staffNumbers}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, staffNumbers: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Visitor Numbers</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={occupancyProfile.visitorNumbers}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, visitorNumbers: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contractor Numbers</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={occupancyProfile.contractorNumbers}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, contractorNumbers: e.target.value})}
          />
        </div>
      </div>
    </div>

    {/* Vulnerable Persons */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-md font-medium mb-4 text-gray-700">Vulnerable Persons</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 border rounded">
          <span className="text-sm font-medium">Children Present</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={occupancyProfile.childrenPresent}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, childrenPresent: e.target.checked})}
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded">
          <span className="text-sm font-medium">Elderly Present</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={occupancyProfile.elderlyPresent}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, elderlyPresent: e.target.checked})}
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded">
          <span className="text-sm font-medium">Disabled Persons Present</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={occupancyProfile.disabledPresent}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, disabledPresent: e.target.checked})}
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded">
          <span className="text-sm font-medium">Pregnant Persons</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={occupancyProfile.pregnantPersons}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, pregnantPersons: e.target.checked})}
          />
        </div>
      </div>

      {occupancyProfile.disabledPresent && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Number of Disabled Persons</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={occupancyProfile.disabledCount}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, disabledCount: e.target.value})}
            placeholder="Enter approximate number"
          />
        </div>
      )}
    </div>

    {/* Sleeping Risk */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-md font-medium mb-4 text-gray-700">Sleeping Risk</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border rounded">
          <span className="text-sm font-medium">Sleeping Accommodation Present</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={occupancyProfile.sleepingAccommodation}
            onChange={(e) => setOccupancyProfile({...occupancyProfile, sleepingAccommodation: e.target.checked})}
          />
        </div>

        {occupancyProfile.sleepingAccommodation && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Sleeping Occupancy</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={occupancyProfile.sleepingOccupancy}
                onChange={(e) => setOccupancyProfile({...occupancyProfile, sleepingOccupancy: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Night Staff Numbers</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={occupancyProfile.nightStaff}
                onChange={(e) => setOccupancyProfile({...occupancyProfile, nightStaff: e.target.value})}
              />
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

// Section 5: Means of Escape
export const Section5MeansOfEscape = ({ meansOfEscape, setMeansOfEscape, travelDistances, setTravelDistances }: any) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Section 5: Means of Escape & Evacuation</h2>
      
      {/* Evacuation Strategy */}
      <h3 className="text-md font-medium mb-4 text-gray-700">Evacuation Strategy</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Evacuation Strategy <span className="text-red-500">*</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={meansOfEscape.evacuationStrategy}
            onChange={(e) => setMeansOfEscape({...meansOfEscape, evacuationStrategy: e.target.value})}
          >
            <option value="simultaneous">Simultaneous</option>
            <option value="phased">Phased</option>
            <option value="progressive">Progressive Horizontal</option>
            <option value="defend-in-place">Defend in Place</option>
            <option value="stay-put">Stay Put</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estimated Evacuation Time (minutes)</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={meansOfEscape.evacuationTime}
            onChange={(e) => setMeansOfEscape({...meansOfEscape, evacuationTime: e.target.value})}
          />
        </div>
      </div>

      {/* Travel Distances */}
      <h3 className="text-md font-medium mb-4 text-gray-700">Travel Distances</h3>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            setTravelDistances([...travelDistances, {
              location: '',
              occupancy: 0,
              actual: '',
              acceptable: '',
              compliant: true,
              deadEnd: false,
              alternativeRoutes: 2
            }]);
          }}
          className="btn btn-sm btn-outline btn-primary"
        >
          + Add Travel Distance Measurement
        </button>
      </div>

      {travelDistances.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Location</th>
                <th>Occupancy</th>
                <th>Actual (m)</th>
                <th>Acceptable (m)</th>
                <th>Compliant</th>
                <th>Dead End</th>
                <th>Alt Routes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {travelDistances.map((td: any, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-32"
                      value={td.location}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].location = e.target.value;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-20"
                      value={td.occupancy}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].occupancy = parseInt(e.target.value) || 0;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-20"
                      value={td.actual}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].actual = e.target.value;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-20"
                      value={td.acceptable}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].acceptable = e.target.value;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={td.compliant}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].compliant = e.target.checked;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={td.deadEnd}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].deadEnd = e.target.checked;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-16"
                      value={td.alternativeRoutes}
                      onChange={(e) => {
                        const updated = [...travelDistances];
                        updated[index].alternativeRoutes = parseInt(e.target.value) || 0;
                        setTravelDistances(updated);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setTravelDistances(travelDistances.filter((_: any, i: number) => i !== index))}
                      className="btn btn-xs btn-error"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Exit Provision */}
      <h3 className="text-md font-medium mb-4 mt-6 text-gray-700">Exit Provision</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Number of Exits</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={meansOfEscape.numberOfExits}
            onChange={(e) => setMeansOfEscape({...meansOfEscape, numberOfExits: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Exit Capacity</label>
          <select
            className="select select-bordered w-full"
            value={meansOfEscape.exitCapacity}
            onChange={(e) => setMeansOfEscape({...meansOfEscape, exitCapacity: e.target.value})}
          >
            <option value="adequate">Adequate</option>
            <option value="marginal">Marginal</option>
            <option value="inadequate">Inadequate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Exit Signage</label>
          <select
            className="select select-bordered w-full"
            value={meansOfEscape.exitSignage}
            onChange={(e) => setMeansOfEscape({...meansOfEscape, exitSignage: e.target.value})}
          >
            <option value="compliant">Compliant</option>
            <option value="partial">Partial</option>
            <option value="non-compliant">Non-compliant</option>
          </select>
        </div>
      </div>

      {/* Disabled Evacuation */}
      <h3 className="text-md font-medium mb-4 mt-6 text-gray-700">Disabled Persons Evacuation</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={meansOfEscape.disabledProvision.refugeAreas}
            onChange={(e) => setMeansOfEscape({
              ...meansOfEscape,
              disabledProvision: {
                ...meansOfEscape.disabledProvision,
                refugeAreas: e.target.checked
              }
            })}
          />
          <span className="text-sm">Refuge Areas</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={meansOfEscape.disabledProvision.evacChairs}
            onChange={(e) => setMeansOfEscape({
              ...meansOfEscape,
              disabledProvision: {
                ...meansOfEscape.disabledProvision,
                evacChairs: e.target.checked
              }
            })}
          />
          <span className="text-sm">Evac Chairs</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={meansOfEscape.disabledProvision.visualAlarms}
            onChange={(e) => setMeansOfEscape({
              ...meansOfEscape,
              disabledProvision: {
                ...meansOfEscape.disabledProvision,
                visualAlarms: e.target.checked
              }
            })}
          />
          <span className="text-sm">Visual Alarms</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={meansOfEscape.disabledProvision.tactileSignage}
            onChange={(e) => setMeansOfEscape({
              ...meansOfEscape,
              disabledProvision: {
                ...meansOfEscape.disabledProvision,
                tactileSignage: e.target.checked
              }
            })}
          />
          <span className="text-sm">Tactile Signage</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={meansOfEscape.disabledProvision.assistanceAvailable}
            onChange={(e) => setMeansOfEscape({
              ...meansOfEscape,
              disabledProvision: {
                ...meansOfEscape.disabledProvision,
                assistanceAvailable: e.target.checked
              }
            })}
          />
          <span className="text-sm">Assistance Available</span>
        </label>
      </div>
    </div>
  </div>
);

// Section 10: Action Plan
export const Section10ActionPlan = ({ remediActions, setRemediActions }: any) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Section 10: Action Plan</h2>
      
      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            const newAction = {
              id: Date.now().toString(),
              action: '',
              priority: 3,
              timescale: '3 months',
              hazardAddressed: '',
              recommendationType: 'best-practice',
              responsiblePerson: '',
              targetDate: '',
              costEstimate: '',
              status: 'not-started',
              category: ''
            };
            setRemediActions([...remediActions, newAction]);
          }}
          className="btn btn-primary"
        >
          + Add Remedial Action
        </button>
      </div>

      {remediActions.length > 0 && (
        <div className="space-y-4">
          {remediActions.map((action: any, index: number) => (
            <div key={action.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Action Required</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    value={action.action}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].action = e.target.value;
                      setRemediActions(updated);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    className="select select-bordered w-full"
                    value={action.priority}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].priority = parseInt(e.target.value);
                      setRemediActions(updated);
                    }}
                  >
                    <option value="1">1 - Critical</option>
                    <option value="2">2 - High</option>
                    <option value="3">3 - Medium</option>
                    <option value="4">4 - Low</option>
                    <option value="5">5 - Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Timescale</label>
                  <select
                    className="select select-bordered w-full"
                    value={action.timescale}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].timescale = e.target.value;
                      setRemediActions(updated);
                    }}
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="1 week">1 week</option>
                    <option value="1 month">1 month</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="select select-bordered w-full"
                    value={action.category}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].category = e.target.value;
                      setRemediActions(updated);
                    }}
                  >
                    <option value="">Select category</option>
                    <option value="means-of-escape">Means of Escape</option>
                    <option value="fire-detection">Fire Detection</option>
                    <option value="fire-fighting">Fire Fighting</option>
                    <option value="emergency-lighting">Emergency Lighting</option>
                    <option value="fire-doors">Fire Doors</option>
                    <option value="compartmentation">Compartmentation</option>
                    <option value="external-walls">External Walls</option>
                    <option value="management">Fire Safety Management</option>
                    <option value="training">Training</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Responsible Person</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={action.responsiblePerson}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].responsiblePerson = e.target.value;
                      setRemediActions(updated);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Target Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={action.targetDate}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].targetDate = e.target.value;
                      setRemediActions(updated);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cost Estimate</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={action.costEstimate}
                    onChange={(e) => {
                      const updated = [...remediActions];
                      updated[index].costEstimate = e.target.value;
                      setRemediActions(updated);
                    }}
                    placeholder="£"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRemediActions(remediActions.filter((_: any, i: number) => i !== index))}
                className="btn btn-sm btn-error mt-3"
              >
                Remove Action
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);