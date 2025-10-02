// Walks Module Theme Configuration
// Consistent theming across all walk subsections

export const walksTheme = {
  colors: {
    primary: '#3d3a72',     // Purple theme matching Risk Assessments
    secondary: '#e77726',   // Orange accent
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },

  cards: {
    base: 'bg-white rounded-lg shadow-sm border border-gray-200',
    statistics: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center',
    quickAction: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow',
    active: 'border-l-4 border-purple-500',
    hover: 'hover:shadow-lg transition-shadow cursor-pointer'
  },

  buttons: {
    primary: {
      backgroundColor: '#3d3a72',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'opacity 0.2s'
    },
    secondary: {
      backgroundColor: '#e77726',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'opacity 0.2s'
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#3d3a72',
      border: '2px solid #3d3a72',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s'
    }
  },

  typography: {
    pageTitle: 'text-2xl sm:text-3xl font-bold text-gray-900',
    pageSubtitle: 'text-gray-600 mt-1 text-sm sm:text-base',
    sectionTitle: 'text-lg sm:text-xl font-semibold text-gray-900',
    cardTitle: 'text-base md:text-lg font-semibold',
    statValue: 'text-2xl md:text-3xl font-bold',
    statLabel: 'text-xs md:text-sm text-gray-500 mt-1'
  },

  spacing: {
    page: 'px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16',
    header: 'px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
    section: 'space-y-6',
    grid: 'gap-4 md:gap-6'
  },

  responsive: {
    mobileCard: 'min-h-[120px]',
    desktopCard: 'md:min-h-[140px]',
    touchTarget: 'min-h-[44px]' // Mobile touch target size
  }
};

// Status colors for walk states
export const walkStatusColors = {
  'not-started': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-green-100 text-green-700',
  'paused': 'bg-yellow-100 text-yellow-700',
  'completed': 'bg-blue-100 text-blue-700',
  'cancelled': 'bg-red-100 text-red-700',
  'overdue': 'bg-orange-100 text-orange-700'
};

// Walk type colors
export const walkTypeColors = {
  security: 'bg-blue-100 text-blue-700 border-blue-200',
  housekeeping: 'bg-green-100 text-green-700 border-green-200',
  fire: 'bg-red-100 text-red-700 border-red-200',
  hygiene: 'bg-purple-100 text-purple-700 border-purple-200',
  equipment: 'bg-orange-100 text-orange-700 border-orange-200',
  general: 'bg-gray-100 text-gray-700 border-gray-200'
};