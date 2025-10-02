"use client";

interface QuickReportModalProps {
  onClose: () => void;
  onCategorySelect: (category: any) => void;
}

const categories = [
  {
    id: 'intervention',
    name: 'Intervention',
    description: 'I stopped unsafe behavior',
    points: 20,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    id: 'quick-training',
    name: 'Quick Training',
    description: 'I coached someone on safety',
    points: 30,
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
    textColor: 'text-green-700'
  },
  {
    id: 'save',
    name: 'Save',
    description: 'I prevented an incident',
    points: 50,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-300',
    textColor: 'text-purple-700',
    isHighValue: true
  },
  {
    id: 'hazard',
    name: 'Hazard',
    description: 'I spotted a hazard',
    points: 10,
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
    textColor: 'text-yellow-700'
  },
  {
    id: 'near-miss',
    name: 'Near Miss',
    description: 'Close call happened',
    points: 15,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    textColor: 'text-orange-700'
  },
  {
    id: 'good-behavior',
    name: 'Good Behavior',
    description: 'I saw excellent safety behavior',
    points: 15,
    color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
    textColor: 'text-teal-700'
  }
];

export default function QuickReportModal({ onClose, onCategorySelect }: QuickReportModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Quick Report</h2>
              <p className="text-sm text-gray-600 mt-1">Select the type of safety observation to report</p>
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
          
          {/* Modal Body - Category Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category)}
                  className={`
                    relative p-6 rounded-lg border-2 transition-all
                    ${category.color}
                    ${category.isHighValue ? 'ring-2 ring-purple-400 ring-offset-2' : ''}
                  `}
                >
                  {category.isHighValue && (
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      High Value
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className={`text-lg font-semibold mb-1 ${category.textColor}`}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full ${category.color} ${category.textColor}`}>
                      <span className="text-sm font-medium">+{category.points} points</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">
                    Your reports help create a safer workplace. Points earned contribute to your team's safety score and unlock recognition badges.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
            <button 
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
        </div>
      </div>
    </div>
  );
}