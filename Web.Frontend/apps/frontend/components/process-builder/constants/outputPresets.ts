import { OutputPresetKey, OutputPreset } from '../types/process.types';

// Output preset configurations for check nodes
export const OUTPUT_PRESETS: Record<OutputPresetKey, OutputPreset> = {
  'yes-no': { label: 'Yes/No', options: ['Yes', 'No'] },
  'complete': { label: 'Complete/Incomplete', options: ['Complete', 'Incomplete'] },
  'in-place': { label: 'In Place/Not In Place', options: ['In Place', 'Not In Place'] },
  'pass-fail': { label: 'Pass/Fail', options: ['Pass', 'Fail'] },
  'approved': { label: 'Approved/Rejected', options: ['Approved', 'Rejected'] },
  'custom': { label: 'Custom', options: [] }
};