// Environmental Management Service
// Handles all environmental data operations and API calls

import {
  AspectImpactItem,
  EnvironmentalIssueCategory,
  EnvironmentalIncident,
  EnvironmentalStats,
  EnvironmentalObjective,
  EnvironmentalCategory
} from '../types/environmental';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

class EnvironmentalService {
  // Aspect Impact Analysis Methods
  async getAspectImpactData(): Promise<AspectImpactItem[]> {
    try {
      const response = await fetch(`${API_BASE}/environmental/aspect-impact`);
      if (!response.ok) {
        throw new Error('Failed to fetch aspect impact data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching aspect impact data:', error);
      return this.getFallbackAspectImpactData();
    }
  }

  async updateAspectImpactItem(id: string, item: Partial<AspectImpactItem>): Promise<AspectImpactItem> {
    try {
      const response = await fetch(`${API_BASE}/environmental/aspect-impact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to update aspect impact item');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating aspect impact item:', error);
      throw error;
    }
  }

  async createAspectImpactItem(item: Omit<AspectImpactItem, 'id'>): Promise<AspectImpactItem> {
    try {
      const response = await fetch(`${API_BASE}/environmental/aspect-impact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to create aspect impact item');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating aspect impact item:', error);
      throw error;
    }
  }

  async deleteAspectImpactItem(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/environmental/aspect-impact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete aspect impact item');
      }
    } catch (error) {
      console.error('Error deleting aspect impact item:', error);
      throw error;
    }
  }

  // Environmental Categories Methods
  async getEnvironmentalCategories(): Promise<EnvironmentalIssueCategory[]> {
    try {
      const response = await fetch(`${API_BASE}/environmental/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch environmental categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching environmental categories:', error);
      return this.getFallbackEnvironmentalCategories();
    }
  }

  async createEnvironmentalCategory(category: Omit<EnvironmentalIssueCategory, 'id'>): Promise<EnvironmentalIssueCategory> {
    try {
      const response = await fetch(`${API_BASE}/environmental/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error('Failed to create environmental category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating environmental category:', error);
      throw error;
    }
  }

  async deleteEnvironmentalCategory(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/environmental/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete environmental category');
      }
    } catch (error) {
      console.error('Error deleting environmental category:', error);
      throw error;
    }
  }

  // Environmental Incidents Methods
  async getIncidents(category?: string): Promise<EnvironmentalIncident[]> {
    try {
      const url = category && category !== 'all'
        ? `${API_BASE}/environmental/incidents?category=${category}`
        : `${API_BASE}/environmental/incidents`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch environmental incidents');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching environmental incidents:', error);
      return this.getFallbackIncidents();
    }
  }

  async createIncident(incident: Omit<EnvironmentalIncident, 'id'>): Promise<EnvironmentalIncident> {
    try {
      const response = await fetch(`${API_BASE}/environmental/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incident),
      });
      if (!response.ok) {
        throw new Error('Failed to create environmental incident');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating environmental incident:', error);
      throw error;
    }
  }

  // Environmental Stats Methods
  async getEnvironmentalStats(): Promise<EnvironmentalStats> {
    try {
      const response = await fetch(`${API_BASE}/environmental/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch environmental stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching environmental stats:', error);
      return this.getFallbackStats();
    }
  }

  // Environmental Objectives Methods
  async getEnvironmentalObjectives(): Promise<EnvironmentalObjective[]> {
    try {
      const response = await fetch(`${API_BASE}/environmental/objectives`);
      if (!response.ok) {
        throw new Error('Failed to fetch environmental objectives');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching environmental objectives:', error);
      return this.getFallbackObjectives();
    }
  }

  // Fallback data methods (minimal data for when API is unavailable)
  private getFallbackAspectImpactData(): AspectImpactItem[] {
    return [
      // Normal Operations - Supply and use of utilities
      {
        id: 'U1',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Supply and use of utilities',
        aspect: 'Supply and use of mains water (domestic)',
        impact: 'Supply impacts of treatment and distribution',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Water meter monitoring', 'Leak detection system', 'Usage reporting'],
        responsible: 'Facilities Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },
      {
        id: 'U2',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Supply and use of utilities',
        aspect: 'Supply and use of mains water (industrial)',
        impact: 'Supply impacts of treatment and distribution',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Water meter monitoring', 'Leak detection system', 'Usage reporting'],
        responsible: 'Facilities Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },
      {
        id: 'U3',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Supply and use of utilities',
        aspect: 'Supply and use of electricity',
        impact: 'Supply impacts at the power station',
        significanceScores: {
          legal: 3,
          severity: 5,
          amount: 4,
          interest: 3,
          capability: 4,
          likelihood: 0,
          control: 0,
          total: 19
        },
        controls: ['Energy monitoring', 'Efficient equipment', 'Regular maintenance'],
        responsible: 'Facilities Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },
      {
        id: 'U4',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Supply and use of utilities',
        aspect: 'Supply and use of petrol and diesel',
        impact: 'Supply impacts of extraction, refining and distribution',
        significanceScores: {
          legal: 3,
          severity: 5,
          amount: 4,
          interest: 4,
          capability: 4,
          likelihood: 0,
          control: 0,
          total: 20
        },
        controls: ['Fuel monitoring', 'Efficient vehicles', 'Route optimization'],
        responsible: 'Fleet Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Normal Operations - Supply and use of materials
      {
        id: 'M1',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Supply and use of materials',
        aspect: 'Raw material consumption',
        impact: 'Resource depletion and extraction impacts',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Material tracking', 'Supplier assessment', 'Waste reduction'],
        responsible: 'Production Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Normal Operations - Generation and disposal of wastes
      {
        id: 'W1',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Generation and disposal of wastes',
        aspect: 'General waste generation',
        impact: 'Landfill impacts and resource consumption',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Waste segregation', 'Recycling programs', 'Waste reduction'],
        responsible: 'Facilities Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Normal Operations - Generation and release of atmospheric emissions
      {
        id: 'A1',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Generation and release of atmospheric emissions',
        aspect: 'Process emissions',
        impact: 'Air quality impacts',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Emission monitoring', 'Filtration systems', 'Regular maintenance'],
        responsible: 'Environmental Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Normal Operations - Release of liquid effluent
      {
        id: 'E1',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Release of liquid effluent',
        aspect: 'Process wastewater discharge',
        impact: 'Water quality impacts',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Effluent monitoring', 'Treatment systems', 'Discharge permits'],
        responsible: 'Environmental Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Normal Operations - Water wastage
      {
        id: 'U5',
        process: 'Manufacturing Operations',
        area: 'Production Floor A',
        condition: 'Normal',
        issueCategory: 'Water wastage',
        aspect: 'Inefficient water usage',
        impact: 'Resource depletion',
        significanceScores: {
          legal: 2,
          severity: 2,
          amount: 2,
          interest: 1,
          capability: 2,
          likelihood: 0,
          control: 0,
          total: 9
        },
        controls: ['Water meters', 'Leak detection', 'Efficiency programs'],
        responsible: 'Facilities Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Abnormal Operations
      {
        id: 'Ab1',
        process: 'Maintenance Operations',
        area: 'All Areas',
        condition: 'Abnormal',
        issueCategory: 'Use of uncommon hazardous materials',
        aspect: 'Specialty cleaning chemicals',
        impact: 'Potential soil and water contamination',
        significanceScores: {
          legal: 3,
          severity: 3,
          amount: 2,
          interest: 2,
          capability: 3,
          likelihood: 3,
          control: 3,
          total: 19
        },
        controls: ['Proper storage', 'Training', 'Emergency procedures', 'PPE'],
        responsible: 'Maintenance Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      {
        id: 'Ab2',
        process: 'Operations',
        area: 'All Areas',
        condition: 'Abnormal',
        issueCategory: 'Abnormal disposal of waste materials',
        aspect: 'Hazardous waste disposal',
        impact: 'Soil and groundwater contamination',
        significanceScores: {
          legal: 4,
          severity: 4,
          amount: 3,
          interest: 3,
          capability: 2,
          likelihood: 2,
          control: 2,
          total: 20
        },
        controls: ['Licensed disposal', 'Tracking systems', 'Staff training'],
        responsible: 'Waste Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      // Emergency Situations
      {
        id: 'Ab3',
        process: 'All Operations',
        area: 'All Areas',
        condition: 'Emergency',
        issueCategory: 'Emergency situations',
        aspect: 'Major chemical spill',
        impact: 'Severe environmental contamination',
        significanceScores: {
          legal: 5,
          severity: 5,
          amount: 4,
          interest: 5,
          capability: 2,
          likelihood: 1,
          control: 2,
          total: 24
        },
        controls: ['Emergency response plan', 'Spill kits', 'Training', 'Containment systems'],
        responsible: 'Emergency Response Team',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      },

      {
        id: 'Ab4',
        process: 'All Operations',
        area: 'All Areas',
        condition: 'Emergency',
        issueCategory: 'Historic legacy',
        aspect: 'Past contamination discovery',
        impact: 'Long-term environmental degradation',
        significanceScores: {
          legal: 5,
          severity: 4,
          amount: 3,
          interest: 4,
          capability: 1,
          likelihood: 1,
          control: 1,
          total: 19
        },
        controls: ['Site assessment', 'Remediation plan', 'Regulatory compliance'],
        responsible: 'Environmental Manager',
        reviewDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isCustom: false
      }
    ];
  }

  private getFallbackEnvironmentalCategories(): EnvironmentalIssueCategory[] {
    return [
      // Normal Operations Categories
      {
        id: 'M',
        name: 'Supply and use of materials',
        description: 'Raw materials, consumables and supplies used in normal operations',
        condition: 'Normal',
        isCore: true,
        examples: ['Raw materials', 'Consumables', 'Office supplies', 'Packaging materials']
      },
      {
        id: 'U',
        name: 'Supply and use of utilities',
        description: 'Water, electricity, gas, and other utility consumption during normal operations',
        condition: 'Normal',
        isCore: true,
        examples: ['Mains water usage', 'Industrial water', 'Electricity consumption', 'Gas usage']
      },
      {
        id: 'W',
        name: 'Generation and disposal of wastes',
        description: 'Normal waste streams generated during operations',
        condition: 'Normal',
        isCore: true,
        examples: ['General waste', 'Recyclable materials', 'Process waste', 'Packaging waste']
      },
      {
        id: 'A',
        name: 'Generation and release of atmospheric emissions',
        description: 'Normal atmospheric emissions from operations',
        condition: 'Normal',
        isCore: true,
        examples: ['Combustion emissions', 'Process emissions', 'Vehicle emissions', 'HVAC emissions']
      },
      {
        id: 'E',
        name: 'Release of liquid effluent',
        description: 'Normal liquid discharge and effluent release',
        condition: 'Normal',
        isCore: true,
        examples: ['Process wastewater', 'Cooling water', 'Stormwater runoff', 'Cleaning water']
      },
      {
        id: 'U-wastage',
        name: 'Water wastage',
        description: 'Inefficient water use and wastage during normal operations',
        condition: 'Normal',
        isCore: true,
        examples: ['Leaks', 'Inefficient processes', 'Unnecessary usage', 'Poor maintenance']
      },
      {
        id: 'U-electricity-wastage',
        name: 'Electricity wastage',
        description: 'Inefficient electricity use and wastage during normal operations',
        condition: 'Normal',
        isCore: true,
        examples: ['Lighting left on', 'Inefficient equipment', 'Standby power', 'Poor insulation']
      },
      {
        id: 'U-gas-wastage',
        name: 'Mains gas and gas oil wastage',
        description: 'Inefficient gas and gas oil use during normal operations',
        condition: 'Normal',
        isCore: true,
        examples: ['Heating inefficiencies', 'Leaks', 'Poor maintenance', 'Inefficient processes']
      },
      {
        id: 'U-fuel-wastage',
        name: 'Petrol and diesel wastage',
        description: 'Inefficient fuel use in vehicles and equipment',
        condition: 'Normal',
        isCore: true,
        examples: ['Vehicle idling', 'Poor maintenance', 'Inefficient routing', 'Equipment misuse']
      },

      // Abnormal Operations Categories
      {
        id: 'Ab-hazardous',
        name: 'Use of uncommon hazardous materials',
        description: 'Infrequent or unusual use of hazardous substances',
        condition: 'Abnormal',
        isCore: true,
        examples: ['Specialty chemicals', 'Maintenance chemicals', 'Cleaning solvents', 'Laboratory reagents']
      },
      {
        id: 'Ab-waste',
        name: 'Abnormal disposal of waste materials',
        description: 'Unusual or non-routine waste disposal activities',
        condition: 'Abnormal',
        isCore: true,
        examples: ['Hazardous waste', 'Large equipment disposal', 'Chemical waste', 'Construction debris']
      },
      {
        id: 'Ab-emissions',
        name: 'Abnormal atmospheric emissions',
        description: 'Unusual or elevated atmospheric emissions',
        condition: 'Abnormal',
        isCore: true,
        examples: ['Equipment malfunction', 'Process upsets', 'Maintenance activities', 'Start-up emissions']
      },
      {
        id: 'Ab-liquids',
        name: 'Abnormal release of liquids',
        description: 'Unusual or unplanned liquid releases',
        condition: 'Abnormal',
        isCore: true,
        examples: ['Minor spills', 'Equipment leaks', 'Process upsets', 'Maintenance discharge']
      },
      {
        id: 'Ab-nuisance',
        name: 'Abnormal creation of nuisance',
        description: 'Unusual noise, dust, odor or other nuisance conditions',
        condition: 'Abnormal',
        isCore: true,
        examples: ['Excessive noise', 'Dust generation', 'Odors', 'Vibration']
      },

      // Emergency Situations Categories
      {
        id: 'Ab-emergency',
        name: 'Emergency situations',
        description: 'Emergency incidents with potential environmental impact',
        condition: 'Emergency',
        isCore: true,
        examples: ['Major spills', 'Fire incidents', 'Equipment failure', 'Natural disasters']
      },
      {
        id: 'Ab-historic',
        name: 'Historic legacy',
        description: 'Historical environmental issues and legacy contamination',
        condition: 'Emergency',
        isCore: true,
        examples: ['Past contamination', 'Legacy waste sites', 'Historical spills', 'Inherited issues']
      },

      // Indirect Aspects
      {
        id: 'M-indirect',
        name: 'Indirect aspects related to decisions',
        description: 'Environmental impacts from organisational decisions and policies',
        condition: 'Normal',
        isCore: true,
        examples: ['Supplier selection', 'Product design', 'Transport decisions', 'Investment choices']
      },
      {
        id: 'Ab-contractor',
        name: 'Contractor activities',
        description: 'Environmental aspects from contractor and third-party activities',
        condition: 'Normal',
        isCore: true,
        examples: ['Construction work', 'Maintenance services', 'Delivery activities', 'Waste management']
      }
    ];
  }

  private getFallbackIncidents(): EnvironmentalIncident[] {
    return [];
  }

  private getFallbackStats(): EnvironmentalStats {
    return {
      todaysReports: 0,
      todaysChange: 0,
      activeIncidents: 0,
      complianceScore: 0,
      participationRate: 0,
      monthlyTrend: 0
    };
  }

  private getFallbackObjectives(): EnvironmentalObjective[] {
    return [];
  }
}

export const environmentalService = new EnvironmentalService();
export default environmentalService;