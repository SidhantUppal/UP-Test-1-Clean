import { useState, useCallback, useEffect } from 'react';
import { Node, Edge } from 'reactflow';
import { CustomNodeData, CustomEdgeData, ValidationResult } from '../types/process.types';
import { saveProcessToStorage, loadProcessFromStorage } from '../utils/processUtils';

interface UseProcessStateProps {
  processId: number;
  initialWorkflowTitle: string;
}

export function useProcessState({ processId, initialWorkflowTitle }: UseProcessStateProps) {
  const [workflowTitle, setWorkflowTitle] = useState(initialWorkflowTitle);
  const [isDraft, setIsDraft] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Save draft to local storage
  const saveDraft = useCallback((nodes: Node<CustomNodeData>[], edges: Edge<CustomEdgeData>[]) => {
    saveProcessToStorage(nodes, edges, workflowTitle);
    setLastSaved(new Date());
  }, [workflowTitle]);

  // Load draft from local storage on mount
  useEffect(() => {
    const saved = loadProcessFromStorage();
    if (saved && saved.workflowTitle) {
      setWorkflowTitle(saved.workflowTitle);
    }
  }, []);

  // Save process chain to API
  const saveProcessChain = useCallback(async (nodes: Node<CustomNodeData>[], edges: Edge<CustomEdgeData>[]) => {
    setIsSaving(true);
    try {
      const chainData = {
        nodes,
        edges,
        metadata: { processName: workflowTitle }
      };

      const response = await fetch(`http://localhost:3009/api/processes/${processId}/chain`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-area-id': '1'
        },
        body: JSON.stringify(chainData)
      });

      if (!response.ok) {
        throw new Error(`Save failed: ${response.status}`);
      }

      const result = await response.json();
      setIsDraft(false);
      setLastSaved(new Date());
      saveDraft(nodes, edges);

      console.log('✅ Process chain saved successfully', result);
      return true;
    } catch (error) {
      console.error('❌ Save failed:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [processId, workflowTitle, saveDraft]);

  return {
    workflowTitle,
    setWorkflowTitle,
    isDraft,
    isPublished,
    isSaving,
    lastSaved,
    validationResult,
    setValidationResult,
    saveProcessChain,
    saveDraft,
    setIsPublished
  };
}