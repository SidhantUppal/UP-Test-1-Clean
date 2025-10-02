"use client";

import { useState } from 'react';
import FeedCard from './FeedCard';

interface BehaviourFeedProps {
  filterCategory?: string;
}

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    category: 'save',
    categoryName: 'Save',
    points: 50,
    user: 'John Smith',
    userInitials: 'JS',
    timestamp: '2 minutes ago',
    location: 'Warehouse B - Loading Bay',
    description: 'Prevented forklift collision by stopping driver who couldn\'t see pedestrian in blind spot. Immediately implemented new mirror placement.',
    kudos: 24,
    comments: 8,
    isHighValue: true
  },
  {
    id: 2,
    category: 'intervention',
    categoryName: 'Intervention',
    points: 20,
    user: 'Sarah Johnson',
    userInitials: 'SJ',
    timestamp: '15 minutes ago',
    location: 'Production Floor - Line 3',
    description: 'Stopped team member from bypassing machine guard. Discussed importance of safety procedures and documented for training.',
    kudos: 12,
    comments: 3,
    isHighValue: false
  },
  {
    id: 3,
    category: 'quick-training',
    categoryName: 'Quick Training',
    points: 30,
    user: 'Mike Chen',
    userInitials: 'MC',
    timestamp: '1 hour ago',
    location: 'Office - Conference Room A',
    description: 'Conducted impromptu training on proper lifting techniques after observing poor posture. 5 team members participated.',
    kudos: 15,
    comments: 2,
    isHighValue: false
  },
  {
    id: 4,
    category: 'hazard',
    categoryName: 'Hazard',
    points: 10,
    user: 'Emily Davis',
    userInitials: 'ED',
    timestamp: '2 hours ago',
    location: 'Parking Lot - North Entrance',
    description: 'Identified and reported ice formation on walkway. Maintenance applied salt treatment immediately.',
    kudos: 8,
    comments: 1,
    isHighValue: false
  },
  {
    id: 5,
    category: 'near-miss',
    categoryName: 'Near Miss',
    points: 15,
    user: 'Robert Taylor',
    userInitials: 'RT',
    timestamp: '3 hours ago',
    location: 'Storage Area - Rack 12',
    description: 'Box nearly fell from top shelf when retrieving items. No injury occurred. Reorganized storage to prevent future incidents.',
    kudos: 10,
    comments: 4,
    isHighValue: false
  },
  {
    id: 6,
    category: 'good-behavior',
    categoryName: 'Good Behavior',
    points: 15,
    user: 'Lisa Anderson',
    userInitials: 'LA',
    timestamp: '4 hours ago',
    location: 'Workshop - Tool Storage',
    description: 'Recognized Tom Wilson for consistently wearing all required PPE and maintaining clean, organized workspace.',
    kudos: 18,
    comments: 5,
    isHighValue: false
  },
  {
    id: 7,
    category: 'save',
    categoryName: 'Save',
    points: 50,
    user: 'David Martinez',
    userInitials: 'DM',
    timestamp: '5 hours ago',
    location: 'Chemical Storage',
    description: 'Noticed incompatible chemicals stored together. Immediate separation prevented potential reaction. Retrained storage team.',
    kudos: 32,
    comments: 11,
    isHighValue: true
  },
  {
    id: 8,
    category: 'intervention',
    categoryName: 'Intervention',
    points: 20,
    user: 'Jennifer White',
    userInitials: 'JW',
    timestamp: '6 hours ago',
    location: 'Maintenance Shop',
    description: 'Stopped work on electrical panel - lockout/tagout procedure not followed. Reviewed LOTO requirements with team.',
    kudos: 14,
    comments: 6,
    isHighValue: false
  }
];

export default function BehaviourFeed({ filterCategory = 'all' }: BehaviourFeedProps) {
  const [reports, setReports] = useState(mockReports);

  const handleKudos = (reportId: number) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, kudos: report.kudos + 1 }
        : report
    ));
  };

  const filteredReports = filterCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === filterCategory);

  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <h2 className="text-base sm:text-lg font-semibold">Live Feed</h2>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {filteredReports.length} reports
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <span>Auto-refresh in 30s</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <FeedCard 
            key={report.id} 
            report={report} 
            onKudos={handleKudos}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <button 
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
          Load More Reports
        </button>
      </div>
    </div>
  );
}