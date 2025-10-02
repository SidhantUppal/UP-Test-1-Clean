'use client';

import React, { useState, useCallback } from 'react';
import ChecklistPreviewModal from '../../components/ChecklistPreviewModal';

interface Question {
  id: string;
  text: string;
  type: 'checkbox' | 'yn-na' | 'yn-na-dk' | 'score-5' | 'score-10' | 'pass-fail' | 'custom-scale' | 'likert' | 'percentage' | 'text' | 'number' | 'dropdown' | 'multiple-single' | 'multiple-multi' | 'ranking' | 'date-time' | 'duration' | 'number-units' | 'currency' | 'photo' | 'file' | 'signature' | 'audio' | 'qr-scan' | 'gps' | 'equipment' | 'contact';
  options?: string[];
  comments: {
    enabled: boolean;
    required: boolean;
    placeholder: string;
  };
  scoring: {
    enabled: boolean;
    weight: number;
    isKillQuestion: boolean;
  };
  media: {
    questionImage?: string;
    requireAnswerImage: boolean;
  };
  tasks: {
    enabled: boolean;
    triggerOn: 'fail' | 'pass' | 'specific-answer' | 'always';
    taskDescription?: string;
    assignTo?: string;
  };
  typeConfig?: {
    scaleLabels?: string[];
    units?: string;
    min?: number;
    max?: number;
    currency?: string;
  };
  children?: Question[];
}

export default function DocumentChecklistBuilder() {
  const [checklistTitle, setChecklistTitle] = useState('');
  const [checklistDescription, setChecklistDescription] = useState('');
  const [category, setCategory] = useState('');
  const [completionMethod, setCompletionMethod] = useState<'one-at-a-time' | 'all-at-once'>('all-at-once');
  
  // Input method state
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState('');
  
  // Document processing states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [extractedQuestions, setExtractedQuestions] = useState<Question[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [processingError, setProcessingError] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  // LLM Processing configuration
  const [llmSettings, setLlmSettings] = useState({
    extractionPrompt: 'Extract all checkable items, procedures, and verification steps from this document as a structured checklist.',
    questionStyle: 'clear-and-specific',
    includeContext: true,
    autoDetectSections: true
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setProcessingError('');
      setExtractedQuestions([]);
      setShowEditor(false);
    }
  };

  const processDocument = async () => {
    const hasContent = inputMethod === 'upload' ? uploadedFile : pastedText.trim();
    if (!hasContent) return;

    setIsProcessing(true);
    setProcessingError('');
    setProcessingStatus('Preparing content...');

    try {
      const formData = new FormData();
      
      if (inputMethod === 'upload' && uploadedFile) {
        // File upload method
        setProcessingStatus('Uploading document...');
        formData.append('file', uploadedFile);
        formData.append('category', category);
        formData.append('completionMethod', completionMethod);
        formData.append('extractionStyle', llmSettings.questionStyle);
        formData.append('includeContext', String(llmSettings.includeContext));
        formData.append('autoDetectSections', String(llmSettings.autoDetectSections));
        
        const response = await fetch('/api/checklists/import/document', {
          method: 'POST',
          headers: {
            'x-user-id': '1',
            'x-user-area-id': '1'
          },
          body: formData
        });
        
        setProcessingStatus('Analyzing document with AI...');
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to process document');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          // Convert API response to component format
          const questions = result.data.questions || [];
          setExtractedQuestions(questions);
          setChecklistTitle(result.data.title || checklistTitle);
          setChecklistDescription(result.data.description || checklistDescription);
          setShowEditor(true);
        }
        
      } else if (inputMethod === 'paste' && pastedText) {
        // Text paste method
        setProcessingStatus('Processing text with AI...');
        
        const response = await fetch('/api/checklists/import/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': '1',
            'x-user-area-id': '1'
          },
          body: JSON.stringify({
            text: pastedText,
            category,
            completionMethod,
            extractionStyle: llmSettings.questionStyle,
            includeContext: llmSettings.includeContext,
            autoDetectSections: llmSettings.autoDetectSections
          })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to process text');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const questions = result.data.questions || [];
          setExtractedQuestions(questions);
          setChecklistTitle(result.data.title || checklistTitle);
          setChecklistDescription(result.data.description || checklistDescription);
          setShowEditor(true);
        }
      }
      
      setProcessingStatus('');
      
    } catch (error: any) {
      console.error('Processing error:', error);
      setProcessingError(error.message || 'Failed to process content. Please try again.');
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  const updateQuestion = useCallback((id: string, updates: Partial<Question>) => {
    setExtractedQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  }, []);

  const deleteQuestion = useCallback((id: string) => {
    setExtractedQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `manual_${Date.now()}`,
      text: '',
      type: 'checkbox',
      comments: { enabled: false, required: false, placeholder: 'Add any additional comments...' },
      scoring: { enabled: false, weight: 3, isKillQuestion: false },
      media: { requireAnswerImage: false },
      tasks: { enabled: false, triggerOn: 'fail' }
    };
    setExtractedQuestions(prev => [...prev, newQuestion]);
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Checklist from Document</h1>
        <p className="text-gray-600">Upload a document and let AI extract a comprehensive checklist from its content.</p>
      </div>

      {/* Basic Information - Same as basic builder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Checklist Title *
            </label>
            <input
              type="text"
              id="title"
              value={checklistTitle}
              onChange={(e) => setChecklistTitle(e.target.value)}
              placeholder="Enter checklist title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="safety">Safety</option>
              <option value="quality">Quality</option>
              <option value="maintenance">Maintenance</option>
              <option value="compliance">Compliance</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={checklistDescription}
            onChange={(e) => setChecklistDescription(e.target.value)}
            placeholder="Enter checklist description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Completion Method Selection - Same as basic builder */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            How should this checklist be completed?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                completionMethod === 'all-at-once' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setCompletionMethod('all-at-once')}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="completion-method"
                  value="all-at-once"
                  checked={completionMethod === 'all-at-once'}
                  onChange={(e) => setCompletionMethod(e.target.value as 'all-at-once')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">All questions on one page</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Traditional form style - users see all questions at once and can complete them in any order
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                completionMethod === 'one-at-a-time' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setCompletionMethod('one-at-a-time')}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="completion-method"
                  value="one-at-a-time"
                  checked={completionMethod === 'one-at-a-time'}
                  onChange={(e) => setCompletionMethod(e.target.value as 'one-at-a-time')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">One question at a time</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Step-by-step wizard style - users progress through questions one by one with navigation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Checklist Source</h2>
        
        {/* Input Method Toggle */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setInputMethod('upload');
                setPastedText('');
                setProcessingError('');
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                inputMethod === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Document
            </button>
            <button
              onClick={() => {
                setInputMethod('paste');
                setUploadedFile(null);
                setProcessingError('');
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                inputMethod === 'paste'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Paste Text
            </button>
          </div>
        </div>
        
        {/* Upload Method */}
        {inputMethod === 'upload' && !uploadedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="space-y-2">
              <div className="text-lg font-medium text-gray-900">Upload your document</div>
              <p className="text-sm text-gray-500">PDF, Word, or text files up to 10MB</p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        ) : inputMethod === 'upload' ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">{uploadedFile!.name}</div>
                <div className="text-xs text-green-700">{(uploadedFile!.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-green-600 hover:text-green-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
        
        {/* Paste Method */}
        {inputMethod === 'paste' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-2">
              Paste your checklist text below. Supports checklists from Word, Claude, ChatGPT, or any text source.
            </div>
            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder={`Paste your checklist here. Examples:

Safety Checklist:
□ Check emergency exits
□ Verify fire extinguishers
□ Test alarm systems

Or numbered format:
1. Complete safety inspection
2. Document findings
3. Submit report`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              rows={12}
            />
            <div className="text-xs text-gray-500">
              Supported formats: Checkboxes (□, ☐), bullets (•, -, *), numbers (1., 2.), or plain text items
            </div>
          </div>
        )}

        {/* LLM Processing Settings */}
        {((uploadedFile || pastedText) && !showEditor) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">AI Processing Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Extraction Prompt</label>
                <textarea
                  value={llmSettings.extractionPrompt}
                  onChange={(e) => setLlmSettings(prev => ({ ...prev, extractionPrompt: e.target.value }))}
                  placeholder="Describe what you want to extract from the document..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Style</label>
                  <select
                    value={llmSettings.questionStyle}
                    onChange={(e) => setLlmSettings(prev => ({ ...prev, questionStyle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="clear-and-specific">Clear and Specific</option>
                    <option value="detailed">Detailed</option>
                    <option value="concise">Concise</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-context"
                    checked={llmSettings.includeContext}
                    onChange={(e) => setLlmSettings(prev => ({ ...prev, includeContext: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="include-context" className="text-sm text-gray-700">Include Context</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="auto-detect-sections"
                    checked={llmSettings.autoDetectSections}
                    onChange={(e) => setLlmSettings(prev => ({ ...prev, autoDetectSections: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="auto-detect-sections" className="text-sm text-gray-700">Auto-detect Sections</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Process Button */}
        {((uploadedFile || pastedText) && !showEditor) && (
          <div className="mt-6">
            <button
              onClick={processDocument}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{processingStatus || 'Processing...'}</span>
                </>
              ) : (
                <span>🤖 Process Document with AI</span>
              )}
            </button>
          </div>
        )}

        {/* Processing Error */}
        {processingError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm text-red-700">{processingError}</span>
            </div>
          </div>
        )}
      </div>

      {/* Extracted Questions Editor */}
      {showEditor && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Extracted Checklist</h2>
              <p className="text-sm text-gray-600 mt-1">Review and edit the AI-generated checklist items</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={addQuestion}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Question</span>
              </button>
              <button
                onClick={() => {
                  setShowEditor(false);
                  setUploadedFile(null);
                  setExtractedQuestions([]);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Start Over
              </button>
            </div>
          </div>

          {extractedQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p>No questions extracted. Try uploading a different document or adjust the processing settings.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {extractedQuestions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <input
                          type="text"
                          value={question.text}
                          onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                          placeholder="Enter question text..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <label className="text-sm font-medium text-gray-600">Type:</label>
                          <select
                            value={question.type}
                            onChange={(e) => updateQuestion(question.id, { type: e.target.value as Question['type'] })}
                            className="px-3 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="checkbox">Yes/No</option>
                            <option value="yn-na">Yes/No/N/A</option>
                            <option value="score-5">1-5 Rating</option>
                            <option value="score-10">1-10 Rating</option>
                            <option value="text">Text Input</option>
                            <option value="dropdown">Dropdown</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`comments-${question.id}`}
                            checked={question.comments.enabled}
                            onChange={(e) => updateQuestion(question.id, { 
                              comments: { ...question.comments, enabled: e.target.checked }
                            })}
                            className="rounded"
                          />
                          <label htmlFor={`comments-${question.id}`} className="text-sm text-gray-600">Comments</label>
                        </div>
                      </div>
                      
                      {question.comments.enabled && (
                        <input
                          type="text"
                          value={question.comments.placeholder}
                          onChange={(e) => updateQuestion(question.id, { 
                            comments: { ...question.comments, placeholder: e.target.value }
                          })}
                          placeholder="Comment placeholder..."
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                    
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Save Actions */}
      {showEditor && (
        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview Checklist</span>
          </button>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                // Store the extracted data in sessionStorage
                const checklistData = {
                  title: checklistTitle,
                  description: checklistDescription,
                  category: category,
                  completionMethod: completionMethod,
                  questions: extractedQuestions
                };
                sessionStorage.setItem('extractedChecklist', JSON.stringify(checklistData));
                
                // Navigate to the basic builder
                window.location.href = '/checklists/create/basic?source=document';
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Continue in Advanced Builder</span>
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Quick Publish
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <ChecklistPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        checklistTitle={checklistTitle}
        checklistDescription={checklistDescription}
        category={category}
        completionMethod={completionMethod}
        questions={extractedQuestions}
      />
    </div>
  );
}