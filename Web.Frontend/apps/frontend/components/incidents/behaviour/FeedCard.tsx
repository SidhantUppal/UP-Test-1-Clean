"use client";

interface FeedCardProps {
  report: {
    id: number;
    category: string;
    categoryName: string;
    points: number;
    user: string;
    userInitials: string;
    timestamp: string;
    location: string;
    description: string;
    kudos: number;
    comments: number;
    isHighValue?: boolean;
  };
  onKudos: (id: number) => void;
}

export default function FeedCard({ report, onKudos }: FeedCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'save':
        return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' };
      case 'intervention':
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
      case 'quick-training':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      case 'hazard':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
      case 'near-miss':
        return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' };
      case 'good-behavior':
        return { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  const colors = getCategoryColor(report.category);

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${report.isHighValue ? 'border-purple-300' : 'border-gray-200'} overflow-hidden`}>
      {report.isHighValue && (
        <div className="bg-purple-50 px-4 py-2 border-b border-purple-200">
          <span className="text-purple-700 font-semibold text-sm">High Value Save - Incident Prevented</span>
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs sm:text-sm font-semibold">
              {report.userInitials}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">{report.user}</p>
              <p className="text-xs sm:text-sm text-gray-500">{report.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 sm:px-3 py-1 ${colors.bg} ${colors.text} border ${colors.border} rounded-full text-xs font-medium`}>
              {report.categoryName}
            </span>
            <span className="px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-medium">
              +{report.points} pts
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {report.location}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-700 mb-4">{report.description}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-3 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => onKudos(report.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">{report.kudos}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">{report.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
              <span className="text-xs sm:text-sm">Share</span>
            </button>
          </div>
          <button 
            className="px-3 py-1.5 text-xs font-medium text-white rounded-md transition-opacity hover:opacity-80 w-full sm:w-auto"
            style={{ 
              backgroundColor: '#3d3a72',
              fontSize: '12px'
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}