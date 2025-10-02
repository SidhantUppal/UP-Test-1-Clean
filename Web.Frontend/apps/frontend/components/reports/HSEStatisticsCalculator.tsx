"use client";

import React, { useState, useEffect } from 'react';

interface HSEStatisticsProps {
  totalIncidents?: number;
  lostTimeInjuries?: number;
  className?: string;
}

export const HSEStatisticsCalculator: React.FC<HSEStatisticsProps> = ({
  totalIncidents = 0,
  lostTimeInjuries = 0,
  className = ""
}) => {
  const [employees, setEmployees] = useState<number>(5000);
  const [totalHoursWorked, setTotalHoursWorked] = useState<number>(2000000);
  
  // Calculated statistics
  const [incidenceRate, setIncidenceRate] = useState<number>(0);
  const [ltifr, setLtifr] = useState<number>(0);

  useEffect(() => {
    // Calculate Incidence rate per 100,000 workers
    if (employees > 0) {
      const rate = (totalIncidents / employees) * 100000;
      setIncidenceRate(Number(rate.toFixed(2)));
    }
  }, [totalIncidents, employees]);

  useEffect(() => {
    // Calculate LTIFR per 1,000,000 hours worked
    if (totalHoursWorked > 0) {
      const rate = (lostTimeInjuries / totalHoursWorked) * 1000000;
      setLtifr(Number(rate.toFixed(2)));
    }
  }, [lostTimeInjuries, totalHoursWorked]);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">HSE Statistics Calculator</h3>
        <p className="text-sm text-gray-600">
          Calculate key safety metrics based on HSE reporting standards
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
              Total Number of Employees
            </label>
            <input
              type="number"
              id="employees"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter number of employees"
            />
          </div>

          <div>
            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700 mb-1">
              Total Hours Worked
            </label>
            <input
              type="number"
              id="hoursWorked"
              value={totalHoursWorked}
              onChange={(e) => setTotalHoursWorked(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter total hours worked"
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incidence Rate Card */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-semibold text-purple-900">
                Incidence Rate per 100,000 Workers
              </h4>
              <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                HSE Standard
              </div>
            </div>
            
            <div className="text-3xl font-bold text-purple-800 mb-2">
              {incidenceRate.toLocaleString()}
            </div>
            
            <div className="text-sm text-purple-700 mb-3">
              incidents per 100,000 workers
            </div>
            
            {/* Formula Display */}
            <div className="bg-white border border-purple-200 rounded p-3 text-xs">
              <div className="font-medium text-gray-700 mb-1">Formula:</div>
              <div className="text-gray-600 mb-2">
                (Number of incidents ÷ Number of employees) × 100,000
              </div>
              <div className="text-purple-800">
                ({totalIncidents.toLocaleString()} ÷ {employees.toLocaleString()}) × 100,000 = {incidenceRate.toLocaleString()}
              </div>
            </div>
          </div>

          {/* LTIFR Card */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-semibold text-orange-900">
                Lost Time Injury Frequency Rate
              </h4>
              <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                Per 1M Hours
              </div>
            </div>
            
            <div className="text-3xl font-bold text-orange-800 mb-2">
              {ltifr.toLocaleString()}
            </div>
            
            <div className="text-sm text-orange-700 mb-3">
              LTIs per 1,000,000 hours worked
            </div>
            
            {/* Formula Display */}
            <div className="bg-white border border-orange-200 rounded p-3 text-xs">
              <div className="font-medium text-gray-700 mb-1">Formula:</div>
              <div className="text-gray-600 mb-2">
                (Number of lost-time injuries ÷ Total hours worked) × 1,000,000
              </div>
              <div className="text-orange-800">
                ({lostTimeInjuries.toLocaleString()} ÷ {totalHoursWorked.toLocaleString()}) × 1,000,000 = {ltifr.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Worked Examples */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Worked Examples</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Incidence Rate Example:</div>
              <div className="text-gray-600">
                120 incidents ÷ 5,000 employees = 0.024<br />
                0.024 × 100,000 = 2,400 incidents per 100,000 workers
              </div>
            </div>
            
            <div>
              <div className="font-medium text-gray-700 mb-1">LTIFR Example:</div>
              <div className="text-gray-600">
                10 LTIs ÷ 2,000,000 hours = 0.000005<br />
                0.000005 × 1,000,000 = 5 LTIs per 1,000,000 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};