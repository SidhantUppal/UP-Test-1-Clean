import { SaaSFunction } from '../types/process.types';

// SaaS function definitions for the palette
export const saasfunctions: SaaSFunction[] = [
  {
    id: 'checklist',
    label: 'Checklist',
    icon: '✅',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Execute a predefined checklist with task generation'
  },
  {
    id: 'action',
    label: 'Action',
    icon: '⚡',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Create a basic task with assignment and due date'
  },
  {
    id: 'escalation',
    label: 'Escalation',
    icon: '📈',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Escalate to higher authority in the hierarchy'
  },
  {
    id: 'risk-assessment',
    label: 'Risk Assessment',
    icon: '⚠️',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Complete a risk assessment from templates'
  },
  {
    id: 'confirm',
    label: 'Confirm',
    icon: '✔️',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Simple confirmation to continue process'
  },
  {
    id: 'authorise',
    label: 'Authorise',
    icon: '🔐',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Approval gate requiring specific permissions'
  },
  {
    id: 'alert',
    label: 'Alert',
    icon: '🔔',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Send notification without blocking flow'
  },
  {
    id: 'failure-procedure',
    label: 'Failure Procedure',
    icon: '❌',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Handle process failure with cleanup tasks'
  },
  {
    id: 'check',
    label: 'Check',
    icon: '❓',
    color: '#f5f5f5',
    borderColor: '#d1d5db',
    description: 'Decision point with multiple output paths'
  },
];