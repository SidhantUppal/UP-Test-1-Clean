'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ChecklistPreviewModal from '../../components/ChecklistPreviewModal';
import { checklistService } from '@/services/checklistService';

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
    weight: number; // Default 3 on 1-5 scale
    isKillQuestion: boolean;
    killAction?: 'stop-process' | 'stop-until-fixed' | 'report-to';
    killReportTo?: string;
  };
  media: {
    questionImage?: string; // Image URL for the question
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

interface QuestionType {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

interface QuestionTypes {
  basic: QuestionType[];
  advanced: {
    selection: QuestionType[];
    data: QuestionType[];
    media: QuestionType[];
    technical: QuestionType[];
  };
}


function QuestionComponent({
  question,
  questionNumber,
  parentId,
  updateQuestion,
  deleteQuestion,
  addQuestion,
  handleDragStart,
  handleDragOver,
  handleDrop,
  openAdvancedModal,
  advancedFeaturesEnabled,
  perQuestionScoring,
  scoringEnabled,
  questionTypes
}: {
  question: Question;
  questionNumber: number | string;
  parentId?: string;
  updateQuestion: (id: string, updates: Partial<Question>, parentId?: string) => void;
  deleteQuestion: (id: string, parentId?: string) => void;
  addQuestion: (parentId?: string) => void;
  handleDragStart: (e: React.DragEvent, questionId: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, targetId: string) => void;
  openAdvancedModal: (questionId: string, feature?: 'scoring' | 'kill' | 'media' | 'photo-required' | 'tasks') => void;
  advancedFeaturesEnabled: boolean;
  perQuestionScoring: boolean;
  scoringEnabled: boolean;
  questionTypes: QuestionTypes;
}) {
  return (
    <div 
      className={`border rounded-lg p-6 shadow-sm ${
        parentId 
          ? 'border-blue-200 bg-slate-50' 
          : 'border-gray-200 bg-white'
      }`}
      draggable={!parentId}
      onDragStart={(e) => handleDragStart(e, question.id)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, question.id)}
    >
      {/* Main Question Content */}
      <div className="flex items-start space-x-3">
        {/* Question Number */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          parentId ? 'bg-slate-200 text-slate-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {questionNumber}
        </div>

        {/* Drag Handle */}
        {!parentId && (
          <div className="mt-2 cursor-move text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        )}

        <div className="flex-1 space-y-3">
          {/* Question Text */}
          <div>
            <input
              type="text"
              value={question.text}
              onChange={(e) => updateQuestion(question.id, { text: e.target.value }, parentId)}
              placeholder={`Enter ${parentId ? 'sub-' : ''}question text...`}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                parentId ? 'text-sm' : ''
              }`}
            />
          </div>

          {/* Question Image Preview */}
          {question.media.questionImage && (
            <div className="relative">
              <img 
                src={question.media.questionImage} 
                alt="Question image" 
                className="w-32 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => updateQuestion(question.id, { 
                  media: { ...question.media, questionImage: undefined }
                }, parentId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* Answer Image Upload Area (when required) */}
          {question.media.requireAnswerImage && (
            <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-green-600 mt-1">
                  📸 <strong>Image Required</strong> - Users will need to upload/take a photo to answer this question
                </p>
                <div className="mt-2 flex justify-center space-x-2">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded border hover:bg-green-200">
                    📁 Upload Image
                  </button>
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded border hover:bg-green-200">
                    📷 Take Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Question Options - Row 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              {/* Question Type Selector */}
              <div className="flex items-center space-x-2">
                <label htmlFor={`type-${question.id}`} className={`font-medium ${parentId ? 'text-xs text-slate-600' : 'text-sm text-gray-600'}`}>
                  Type:
                </label>
                <select
                  id={`type-${question.id}`}
                  value={question.type}
                  onChange={(e) => {
                    const newType = e.target.value as Question['type'];
                    const isScoreType = newType === 'score-5' || newType === 'score-10';
                    updateQuestion(question.id, { 
                      type: newType,
                      scoring: { 
                        ...question.scoring, 
                        enabled: isScoreType 
                      },
                      // Initialize options for multiple choice
                      options: (newType === 'multiple-single' || newType === 'multiple-multi' || newType === 'dropdown') 
                        ? (question.options?.length > 0 ? question.options : ['Option 1', 'Option 2', 'Option 3'])
                        : question.options
                    }, parentId);
                  }}
                  className={`px-3 py-1 border border-gray-300 rounded ${parentId ? 'text-xs' : 'text-sm'}`}
                >
                  <optgroup label="Basic Types">
                    {questionTypes.basic.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </optgroup>
                  {advancedFeaturesEnabled && (
                    <>
                      <optgroup label="Selection Types">
                        {questionTypes.advanced.selection.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Data Types">
                        {questionTypes.advanced.data.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Media Types">
                        {questionTypes.advanced.media.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Technical Types">
                        {questionTypes.advanced.technical.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </optgroup>
                    </>
                  )}
                </select>
              </div>

              {/* Score Selector for scoring question types OR when per-question scoring is enabled */}
              {(scoringEnabled && perQuestionScoring) || (question.type === 'score-5' || question.type === 'score-10') ? (
                <div className="flex items-center space-x-2">
                  <label htmlFor={`score-${question.id}`} className={`font-medium ${parentId ? 'text-xs text-slate-600' : 'text-sm text-gray-600'}`}>
                    Score:
                  </label>
                  <select
                    id={`score-${question.id}`}
                    value={question.scoring.weight}
                    onChange={(e) => updateQuestion(question.id, { 
                      scoring: { ...question.scoring, enabled: true, weight: parseInt(e.target.value) }
                    }, parentId)}
                    className={`px-3 py-1 border border-gray-300 rounded ${parentId ? 'text-xs' : 'text-sm'}`}
                  >
                    <option value={1}>1 point</option>
                    <option value={2}>2 points</option>
                    <option value={3}>3 points</option>
                    <option value={4}>4 points</option>
                    <option value={5}>5 points</option>
                  </select>
                </div>
              ) : null}
              
              {/* Kill Question Indicator and Toggle */}
              {advancedFeaturesEnabled && (
                <div className="flex items-center space-x-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={question.scoring.isKillQuestion}
                      onChange={(e) => updateQuestion(question.id, { 
                        scoring: { ...question.scoring, isKillQuestion: e.target.checked, killAction: 'stop-process' }
                      }, parentId)}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className={`ml-2 font-medium ${question.scoring.isKillQuestion ? 'text-red-600' : 'text-gray-600'} ${parentId ? 'text-xs' : 'text-sm'}`}>
                      Kill Question
                    </span>
                  </label>
                  
                  {question.scoring.isKillQuestion && (
                    <select
                      value={question.scoring.killAction || 'stop-process'}
                      onChange={(e) => updateQuestion(question.id, { 
                        scoring: { ...question.scoring, killAction: e.target.value as any }
                      }, parentId)}
                      className={`px-2 py-1 border border-red-300 rounded bg-red-50 text-red-700 ${parentId ? 'text-xs' : 'text-sm'}`}
                    >
                      <option value="stop-process">Stop Process</option>
                      <option value="stop-until-fixed">Stop Until Fixed</option>
                      <option value="report-to">Report To</option>
                    </select>
                  )}
                </div>
              )}
            </div>

            {/* Kill Question Report To Field - Row 2 */}
            {advancedFeaturesEnabled && question.scoring.isKillQuestion && question.scoring.killAction === 'report-to' && (
              <div className="flex items-center space-x-2 mt-2">
                <label className={`font-medium text-red-600 ${parentId ? 'text-xs' : 'text-sm'}`}>
                  Report To:
                </label>
                <input
                  type="text"
                  value={question.scoring.killReportTo || ''}
                  onChange={(e) => updateQuestion(question.id, { 
                    scoring: { ...question.scoring, killReportTo: e.target.value }
                  }, parentId)}
                  placeholder="e.g., supervisor@example.com"
                  className={`flex-1 px-2 py-1 border border-red-300 rounded bg-red-50 ${parentId ? 'text-xs' : 'text-sm'}`}
                />
              </div>
            )}

            {/* Advanced Image Options - Row 3 */}
            {advancedFeaturesEnabled && (
              <div className="flex items-center space-x-4 mt-2">
                {/* Add Image to Question */}
                <div className="flex items-center space-x-2">
                  <label className={`text-xs font-medium ${parentId ? 'text-slate-600' : 'text-gray-600'}`}>
                    📷 Question Image:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In a real app, you'd upload this file and get a URL back
                        const imageUrl = URL.createObjectURL(file);
                        updateQuestion(question.id, { 
                          media: { ...question.media, questionImage: imageUrl }
                        }, parentId);
                      }
                    }}
                    className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Require Image in Answer */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`require-image-${question.id}`}
                    checked={question.media.requireAnswerImage}
                    onChange={(e) => updateQuestion(question.id, { 
                      media: { ...question.media, requireAnswerImage: e.target.checked }
                    }, parentId)}
                    className="rounded text-green-600"
                  />
                  <label htmlFor={`require-image-${question.id}`} className={`text-xs font-medium ${parentId ? 'text-slate-600' : 'text-gray-600'}`}>
                    📸 Require Image in Answer
                  </label>
                  {/* TODO: In the actual checklist completion page, when this is checked,
                      clicking on the image area should open a file uploader/camera interface
                      to allow users to easily upload or take a photo as their answer */}
                </div>
              </div>
            )}

            {/* Multiple Choice Options */}
            {(question.type === 'multiple-single' || question.type === 'multiple-multi' || question.type === 'dropdown') && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className={`font-medium ${parentId ? 'text-xs text-slate-600' : 'text-sm text-gray-600'}`}>
                    Answer Options:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
                      updateQuestion(question.id, { options: newOptions }, parentId);
                    }}
                    className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    + Add Option
                  </button>
                </div>
                <div className="space-y-2">
                  {(question.options || []).map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-4">{optionIndex + 1}.</span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(question.options || [])];
                          newOptions[optionIndex] = e.target.value;
                          updateQuestion(question.id, { options: newOptions }, parentId);
                        }}
                        placeholder={`Option ${optionIndex + 1}`}
                        className={`flex-1 px-2 py-1 border border-gray-300 rounded ${parentId ? 'text-xs' : 'text-sm'}`}
                      />
                      {(question.options?.length || 0) > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newOptions = question.options?.filter((_, i) => i !== optionIndex) || [];
                            updateQuestion(question.id, { options: newOptions }, parentId);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {!parentId && (
              <button
                onClick={() => addQuestion(question.id)}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                + Add Sub-Question
              </button>
            )}
            <button
              onClick={() => deleteQuestion(question.id, parentId)}
              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Questions Section - Below main question */}
      {question.children && question.children.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-4 h-0.5 bg-blue-400"></div>
            <div className="text-sm text-blue-600 font-medium">Sub-questions</div>
            <div className="flex-1 h-0.5 bg-blue-400"></div>
          </div>
          <div className="space-y-4">
            {question.children.map((child, childIndex) => (
              <div key={child.id} className="relative">
                {/* Connector line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-300"></div>
                <div className="absolute left-0 top-6 w-4 h-0.5 bg-blue-300"></div>
                
                {/* Sub-question container */}
                <div className="ml-6">
                  <QuestionComponent 
                    question={child} 
                    questionNumber={String.fromCharCode(97 + childIndex)} // a, b, c, etc.
                    parentId={question.id}
                    updateQuestion={updateQuestion}
                    deleteQuestion={deleteQuestion}
                    addQuestion={addQuestion}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    openAdvancedModal={openAdvancedModal}
                    advancedFeaturesEnabled={advancedFeaturesEnabled}
                    perQuestionScoring={perQuestionScoring}
                    scoringEnabled={scoringEnabled}
                    questionTypes={questionTypes}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default function BasicChecklistBuilder() {
  const router = useRouter();
  const [checklistTitle, setChecklistTitle] = useState('');
  const [checklistDescription, setChecklistDescription] = useState('');
  const [category, setCategory] = useState('');
  const [completionMethod, setCompletionMethod] = useState<'one-at-a-time' | 'all-at-once'>('all-at-once');
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Use a ref to track question ID counter to avoid hydration issues
  const questionIdCounterRef = useRef(1);
  
  const generateQuestionId = useCallback(() => {
    return `q_${questionIdCounterRef.current++}`;
  }, []);
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q_0',
      text: '',
      type: 'checkbox',
      comments: {
        enabled: false,
        required: false,
        placeholder: 'Add any additional comments...'
      },
      scoring: {
        enabled: false,
        weight: 3,
        isKillQuestion: false,
        killAction: 'stop-process'
      },
      media: {
        requireAnswerImage: false
      },
      tasks: {
        enabled: false,
        triggerOn: 'fail',
        taskDescription: '',
        assignTo: ''
      },
      children: []
    }
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [advancedFeaturesEnabled, setAdvancedFeaturesEnabled] = useState(false);
  
  // Global checklist settings
  const [scoringEnabled, setScoringEnabled] = useState(false);
  const [perQuestionScoring, setPerQuestionScoring] = useState(false);
  const [passScoreEnabled, setPassScoreEnabled] = useState(false);
  const [passingScore, setPassingScore] = useState(70); // Percentage
  const [showScoreToUser, setShowScoreToUser] = useState(true);
  const [scoreCalculation, setScoreCalculation] = useState<'percentage' | 'points'>('percentage');
  const [killScoreEnabled, setKillScoreEnabled] = useState(false);
  const [killScoreThreshold, setKillScoreThreshold] = useState(60); // Percentage
  const [killScoreAction, setKillScoreAction] = useState<'stop-process' | 'stop-until-fixed' | 'report-to'>('stop-process');
  const [killScoreReportTo, setKillScoreReportTo] = useState('');
  const [advancedModalOpen, setAdvancedModalOpen] = useState(false);
  const [currentEditingQuestion, setCurrentEditingQuestion] = useState<string | null>(null);
  const [currentModalFeature, setCurrentModalFeature] = useState<'scoring' | 'kill' | 'media' | 'photo-required' | 'tasks' | null>(null);

  // Load extracted checklist data if coming from document/paste builder
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    
    if (source === 'document') {
      const extractedData = sessionStorage.getItem('extractedChecklist');
      if (extractedData) {
        try {
          const data = JSON.parse(extractedData);
          
          // Set basic information
          if (data.title) setChecklistTitle(data.title);
          if (data.description) setChecklistDescription(data.description);
          if (data.category) setCategory(data.category);
          if (data.completionMethod) setCompletionMethod(data.completionMethod);
          
          // Set questions - ensure they have all required fields
          if (data.questions && data.questions.length > 0) {
            const processedQuestions = data.questions.map((q: any) => ({
              ...q,
              // Ensure all required fields exist
              children: q.children || [],
              tasks: q.tasks || {
                enabled: false,
                triggerOn: 'fail',
                taskDescription: '',
                assignTo: ''
              }
            }));
            setQuestions(processedQuestions);
          }
          
          // Clear the session storage
          sessionStorage.removeItem('extractedChecklist');
          
          // Show a notification
          alert('Checklist imported successfully! You can now add advanced features like scoring, kill questions, media requirements, and more.');
        } catch (error) {
          console.error('Error loading extracted checklist:', error);
        }
      }
    }
  }, []);

  const questionTypes = {
    basic: [
      { value: 'checkbox', label: 'Yes/No' },
      { value: 'yn-na', label: 'Yes/No/N/A' },
      { value: 'yn-na-dk', label: 'Yes/No/N/A/Don\'t Know' },
      { value: 'score-5', label: '1-5 Score' },
      { value: 'score-10', label: '1-10 Rating' },
      { value: 'pass-fail', label: 'Pass/Fail' },
      { value: 'custom-scale', label: 'Custom Scale' },
      { value: 'likert', label: 'Likert Scale' },
      { value: 'percentage', label: 'Percentage' },
      { value: 'text', label: 'Text Input' },
      { value: 'number', label: 'Number' },
      { value: 'dropdown', label: 'Dropdown' }
    ],
    advanced: {
      selection: [
        { value: 'multiple-single', label: 'Multiple Choice (Single)' },
        { value: 'multiple-multi', label: 'Multiple Choice (Multi)' },
        { value: 'ranking', label: 'Ranking' }
      ],
      data: [
        { value: 'date-time', label: 'Date/Time' },
        { value: 'duration', label: 'Duration' },
        { value: 'number-units', label: 'Number with Units' },
        { value: 'currency', label: 'Currency' }
      ],
      media: [
        { value: 'photo', label: 'Photo Upload' },
        { value: 'file', label: 'File Upload' },
        { value: 'signature', label: 'Signature' },
        { value: 'audio', label: 'Audio Recording' }
      ],
      technical: [
        { value: 'qr-scan', label: 'QR/Barcode Scan' },
        { value: 'gps', label: 'GPS/Location' },
        { value: 'equipment', label: 'Equipment Picker' },
        { value: 'contact', label: 'Contact Picker' }
      ]
    }
  };


  const handleSave = async (isPublished: boolean) => {
    if (!checklistTitle.trim()) {
      alert('Please enter a checklist title');
      return;
    }

    try {
      setIsSaving(true);

      // Transform questions to API format
      const sections = [{
        title: 'Main Section',
        description: '',
        questions: questions.map(q => ({
          text: q.text,
          type: q.type,
          options: q.options,
          comments: q.comments,
          scoring: q.scoring,
          media: q.media,
          required: q.scoring?.isKillQuestion || false
        }))
      }];

      const checklistData = {
        name: checklistTitle,
        description: checklistDescription,
        categoryTypeId: category ? parseInt(category) : undefined,
        sections,
        isActive: isPublished
      };

      const result = await checklistService.createChecklist(checklistData);
      
      // Redirect to checklist management page
      router.push('/checklists/manage');
      
    } catch (error) {
      console.error('Error saving checklist:', error);
      alert('Failed to save checklist. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addQuestion = (parentId?: string) => {
    const newQuestion: Question = {
      id: generateQuestionId(),
      text: '',
      type: 'checkbox',
      comments: {
        enabled: false,
        required: false,
        placeholder: 'Add any additional comments...'
      },
      scoring: {
        enabled: false,
        weight: 3, // Default weight of 3 on 1-5 scale
        isKillQuestion: false,
        killAction: 'stop-process'
      },
      media: {
        requireAnswerImage: false
      },
      tasks: {
        enabled: false,
        triggerOn: 'fail',
        taskDescription: '',
        assignTo: ''
      },
      children: []
    };

    if (parentId) {
      // Add as child question
      setQuestions(prev => prev.map(q => {
        if (q.id === parentId) {
          return {
            ...q,
            children: [...(q.children || []), newQuestion]
          };
        }
        return q;
      }));
    } else {
      // Add as main question
      setQuestions(prev => [...prev, newQuestion]);
    }
  };

  const updateQuestion = useCallback((id: string, updates: Partial<Question>, parentId?: string) => {
    setQuestions(prev => prev.map(q => {
      if (parentId && q.id === parentId) {
        return {
          ...q,
          children: q.children?.map(child => 
            child.id === id ? { ...child, ...updates } : child
          )
        };
      } else if (q.id === id) {
        return { ...q, ...updates };
      }
      return q;
    }));
  }, []);

  const deleteQuestion = useCallback((id: string, parentId?: string) => {
    if (parentId) {
      setQuestions(prev => prev.map(q => {
        if (q.id === parentId) {
          return {
            ...q,
            children: q.children?.filter(child => child.id !== id)
          };
        }
        return q;
      }));
    } else {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  }, []);

  const handleDragStart = (e: React.DragEvent, questionId: string) => {
    setDraggedItem(questionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = questions.findIndex(q => q.id === draggedItem);
    const targetIndex = questions.findIndex(q => q.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newQuestions = [...questions];
    const [draggedQuestion] = newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(targetIndex, 0, draggedQuestion);

    setQuestions(newQuestions);
    setDraggedItem(null);
  };

  const openAdvancedModal = (questionId: string, feature?: 'scoring' | 'kill' | 'media' | 'photo-required' | 'tasks') => {
    setCurrentEditingQuestion(questionId);
    setCurrentModalFeature(feature || null);
    setAdvancedModalOpen(true);
  };

  const closeAdvancedModal = () => {
    setAdvancedModalOpen(false);
    setCurrentEditingQuestion(null);
    setCurrentModalFeature(null);
  };

  const getCurrentQuestion = () => {
    if (!currentEditingQuestion) return null;
    const findQuestion = (questions: Question[]): Question | null => {
      for (const q of questions) {
        if (q.id === currentEditingQuestion) return q;
        if (q.children) {
          const found = findQuestion(q.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findQuestion(questions);
  };


  // Advanced Settings Modal Component
  const AdvancedSettingsModal = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    return (
      <div className={`fixed inset-0 z-50 ${advancedModalOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeAdvancedModal}></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentModalFeature ? 
                    `Configure ${currentModalFeature.charAt(0).toUpperCase() + currentModalFeature.slice(1)}` : 
                    'Advanced Question Settings'
                  }
                </h2>
                <button
                  onClick={closeAdvancedModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Scoring Section */}
                {(!currentModalFeature || currentModalFeature === 'scoring') && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Scoring</h3>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={currentQuestion.scoring.enabled}
                          onChange={(e) => updateQuestion(currentQuestion.id, { 
                            scoring: { ...currentQuestion.scoring, enabled: e.target.checked }
                          })}
                          className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable scoring for this question</span>
                      </label>
                    </div>
                    
                    {currentQuestion.scoring.enabled && (
                      <div className="pl-4 border-l-2 border-green-200">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (1-5):</label>
                          <input
                            type="number"
                            value={currentQuestion.scoring.weight}
                            onChange={(e) => updateQuestion(currentQuestion.id, { 
                              scoring: { ...currentQuestion.scoring, weight: parseInt(e.target.value) || 3 }
                            })}
                            min="1"
                            max="5"
                            className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Higher weight = more important (1-5 scale)</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Kill Question Section */}
                {(!currentModalFeature || currentModalFeature === 'kill') && (
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-red-800">Kill Question</h3>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={currentQuestion.scoring.isKillQuestion}
                          onChange={(e) => updateQuestion(currentQuestion.id, { 
                            scoring: { ...currentQuestion.scoring, isKillQuestion: e.target.checked }
                          })}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-red-700">Make this a kill question</span>
                      </label>
                    </div>
                    
                    {currentQuestion.scoring.isKillQuestion && (
                      <div className="pl-4 border-l-2 border-red-300 space-y-2">
                        <p className="text-sm text-red-700">
                          If this question fails, the entire checklist will be marked as failed immediately.
                        </p>
                        
                        <div>
                          <label className="block text-xs font-medium text-red-700 mb-1">Action:</label>
                          <select
                            value={currentQuestion.scoring.killAction || 'stop-process'}
                            onChange={(e) => updateQuestion(currentQuestion.id, { 
                              scoring: { ...currentQuestion.scoring, killAction: e.target.value as any }
                            })}
                            className="w-full px-2 py-1 border border-red-300 rounded text-sm"
                          >
                            <option value="stop-process">Stop Process</option>
                            <option value="stop-until-fixed">Stop Until Fixed</option>
                            <option value="report-to">Report To</option>
                          </select>
                        </div>
                        
                        {currentQuestion.scoring.killAction === 'report-to' && (
                          <div>
                            <label className="block text-xs font-medium text-red-700 mb-1">Report To:</label>
                            <input
                              type="text"
                              value={currentQuestion.scoring.killReportTo || ''}
                              onChange={(e) => updateQuestion(currentQuestion.id, { 
                                scoring: { ...currentQuestion.scoring, killReportTo: e.target.value }
                              })}
                              placeholder="e.g., supervisor@example.com"
                              className="w-full px-2 py-1 border border-red-300 rounded text-sm"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Media Section - Question Image Upload */}
                {(!currentModalFeature || currentModalFeature === 'media') && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Question Image</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload image to help explain this question:
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            // Handle image upload - placeholder for now
                            console.log('Image uploaded for question', currentQuestion.id);
                            if (e.target.files && e.target.files[0]) {
                              // In a real app, you'd upload the file and get a URL back
                              updateQuestion(currentQuestion.id, { 
                                media: { ...currentQuestion.media, questionImage: 'placeholder-url' }
                              });
                            }
                          }}
                          className="w-full text-sm border border-gray-300 rounded p-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload an image that will be displayed above the question to provide visual context or instructions</p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">Best Practices:</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Use clear, high-resolution images</li>
                          <li>• Keep file size under 5MB for fast loading</li>
                          <li>• Supported formats: JPG, PNG, WebP</li>
                          <li>• Image will be automatically resized to fit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Photo Required Section - Instructions */}
                {(!currentModalFeature || currentModalFeature === 'photo-required') && (
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <h3 className="text-lg font-medium text-orange-900 mb-4">Photo Required Instructions</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-md border border-orange-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">What this means:</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          When this option is enabled, users will be required to take or upload a photo as part of their answer to this question.
                        </p>
                        
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">User Experience:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Users cannot submit their answer without a photo</li>
                          <li>• Camera access will be requested on mobile devices</li>
                          <li>• Users can take a new photo or upload from gallery</li>
                          <li>• Photos are automatically compressed for storage</li>
                        </ul>
                      </div>

                      <div className="bg-orange-100 p-3 rounded-md">
                        <h4 className="text-sm font-medium text-orange-900 mb-1">Common Use Cases:</h4>
                        <ul className="text-xs text-orange-800 space-y-1">
                          <li>• Evidence of completion (before/after photos)</li>
                          <li>• Safety compliance documentation</li>
                          <li>• Quality control verification</li>
                          <li>• Damage or issue reporting</li>
                          <li>• Equipment condition checks</li>
                        </ul>
                      </div>

                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={currentQuestion.media.requireAnswerImage}
                          onChange={(e) => updateQuestion(currentQuestion.id, { 
                            media: { ...currentQuestion.media, requireAnswerImage: e.target.checked }
                          })}
                          className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-orange-800 font-medium">
                          Enable photo requirement for this question
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Tasks Section */}
                {(!currentModalFeature || currentModalFeature === 'tasks') && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Task Creation</h3>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={currentQuestion.tasks.enabled}
                          onChange={(e) => updateQuestion(currentQuestion.id, { 
                            tasks: { ...currentQuestion.tasks, enabled: e.target.checked }
                          })}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Create tasks based on answer</span>
                      </label>
                    </div>
                    
                    {currentQuestion.tasks.enabled && (
                      <div className="pl-4 border-l-2 border-purple-200 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Trigger task when:</label>
                          <select
                            value={currentQuestion.tasks.triggerOn}
                            onChange={(e) => updateQuestion(currentQuestion.id, { 
                              tasks: { ...currentQuestion.tasks, triggerOn: e.target.value as Question['tasks']['triggerOn'] }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          >
                            <option value="fail">Answer fails</option>
                            <option value="pass">Answer passes</option>
                            <option value="specific-answer">Specific answer given</option>
                            <option value="always">Always create task</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Task description:</label>
                          <textarea
                            value={currentQuestion.tasks.taskDescription || ''}
                            onChange={(e) => updateQuestion(currentQuestion.id, { 
                              tasks: { ...currentQuestion.tasks, taskDescription: e.target.value }
                            })}
                            placeholder="Describe the task to be created..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Assign to (optional):</label>
                          <input
                            type="text"
                            value={currentQuestion.tasks.assignTo || ''}
                            onChange={(e) => updateQuestion(currentQuestion.id, { 
                              tasks: { ...currentQuestion.tasks, assignTo: e.target.value }
                            })}
                            placeholder="Role, department, or specific user..."
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeAdvancedModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Build Basic Checklist</h1>
          <p className="text-gray-600 mt-1">Create a simple checklist with questions and sub-questions.</p>
        </div>
      </div>

      <div className="max-w-none mx-auto flex">
        {/* Main Content */}
        <div className="flex-1 p-8 pr-4">

      {/* Basic Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        </div>
        
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

        {/* Completion Method Selection */}
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

      {/* Advanced Features Panel */}
      {advancedFeaturesEnabled && (
        <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Template Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Enable Scoring */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="enable-scoring"
                  checked={scoringEnabled}
                  onChange={(e) => setScoringEnabled(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <label htmlFor="enable-scoring" className="text-sm font-medium text-gray-700">
                  Enable Scoring
                </label>
              </div>
              <p className="text-xs text-gray-500 mb-2">Calculate scores for questions</p>
              
              {scoringEnabled && (
                <div className="mt-3 space-y-3 pt-3 border-t border-gray-200">
                  {/* Score Calculation Method */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Score Calculation:</label>
                    <select
                      value={scoreCalculation}
                      onChange={(e) => setScoreCalculation(e.target.value as 'percentage' | 'points')}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="points">Total Points</option>
                    </select>
                  </div>
                  
                  {/* Show Score to User */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="show-score"
                      checked={showScoreToUser}
                      onChange={(e) => setShowScoreToUser(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <label htmlFor="show-score" className="text-xs text-gray-700">
                      Show score to user
                    </label>
                  </div>
                  
                  {/* Enable Per-Question Scoring */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="per-question-scoring"
                      checked={perQuestionScoring}
                      onChange={(e) => setPerQuestionScoring(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <label htmlFor="per-question-scoring" className="text-xs text-gray-700">
                      Assign scores to questions
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Enable Pass Score */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="enable-pass-score"
                  checked={passScoreEnabled}
                  onChange={(e) => setPassScoreEnabled(e.target.checked)}
                  className="rounded text-green-600"
                />
                <label htmlFor="enable-pass-score" className="text-sm font-medium text-gray-700">
                  Enable Pass Score
                </label>
              </div>
              <p className="text-xs text-gray-500 mb-2">Set a minimum passing score threshold</p>
              {passScoreEnabled && (
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">Passing Score (%):</label>
                  <input
                    type="number"
                    value={passingScore}
                    onChange={(e) => setPassingScore(parseInt(e.target.value) || 70)}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              )}
            </div>

            {/* Enable Kill Score */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="enable-kill-score"
                  checked={killScoreEnabled}
                  onChange={(e) => setKillScoreEnabled(e.target.checked)}
                  className="rounded text-red-600"
                />
                <label htmlFor="enable-kill-score" className="text-sm font-medium text-gray-700">
                  Enable Kill Score
                </label>
              </div>
              <p className="text-xs text-gray-500 mb-2">Stop checklist if score falls below threshold</p>
              {killScoreEnabled && (
                <div className="mt-3 space-y-3 pt-3 border-t border-gray-200">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Kill Score Threshold (%):</label>
                    <input
                      type="number"
                      value={killScoreThreshold}
                      onChange={(e) => setKillScoreThreshold(parseInt(e.target.value) || 60)}
                      min="0"
                      max="100"
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Action:</label>
                    <select
                      value={killScoreAction}
                      onChange={(e) => setKillScoreAction(e.target.value as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="stop-process">Stop Process</option>
                      <option value="stop-until-fixed">Stop Until Fixed</option>
                      <option value="report-to">Report To</option>
                    </select>
                  </div>
                  
                  {killScoreAction === 'report-to' && (
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Report To:</label>
                      <input
                        type="text"
                        value={killScoreReportTo}
                        onChange={(e) => setKillScoreReportTo(e.target.value)}
                        placeholder="e.g., supervisor@example.com"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enable QR Code Generator */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="enable-qr-generator"
                  className="rounded text-purple-600"
                />
                <label htmlFor="enable-qr-generator" className="text-sm font-medium text-gray-700">
                  Enable QR Code Generator
                </label>
              </div>
              <p className="text-xs text-gray-500">Generate QR codes for quick checklist access</p>
              
              {/* TODO: IMPORTANT - Implement QR Code URL Generation with Time Limits
                  
                  Two distinct modes when QR Code is enabled:
                  
                  1. "Without Login" Mode (requires name input):
                     - Generate URL: /checklists/complete/public/{checklistId}/{accessToken}?requireName=true
                     - User must enter their name before starting checklist
                     - Name is tracked with responses
                  
                  2. "Anonymous" Mode (no name required):
                     - Generate URL: /checklists/complete/public/{checklistId}/{accessToken}?requireName=false
                     - User proceeds directly to checklist
                     - Responses tracked as "Anonymous"
                  
                  Both modes MUST have time limits:
                  - Add time limit selector: 1 hour, 24 hours, 7 days, 30 days, custom
                  - URLs expire after selected time period
                  - Show expiration countdown in UI
                  
                  Implementation requirements:
                  - Generate cryptographically secure access tokens
                  - Store in database: checklist_id, access_token, access_type, expires_at, require_name
                  - Create public completion page that checks token validity
                  - Display QR code image and copyable URL when options selected
                  - Add download QR code button
                  - Consider single-use token option for extra security
                  
                  Security: Rate limiting, access logging, token expiration enforcement
              */}
            </div>

            {/* Enable Anonymous Completion */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="enable-anonymous"
                  className="rounded text-green-600"
                />
                <label htmlFor="enable-anonymous" className="text-sm font-medium text-gray-700">
                  Enable Anonymous Completion
                </label>
              </div>
              <p className="text-xs text-gray-500">Allow users to complete checklists without login</p>
            </div>

            {/* Enable Without Login */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="enable-without-login"
                  className="rounded text-blue-600"
                />
                <label htmlFor="enable-without-login" className="text-sm font-medium text-gray-700">
                  Enable Without Login
                </label>
              </div>
              <p className="text-xs text-gray-500">Allow checklist completion without user authentication</p>
            </div>

          </div>
        </div>
      )}

      {/* Questions Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
          
          <button
            onClick={() => addQuestion()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Question</span>
          </button>
        </div>


        {questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p>No questions added yet. Click &quot;Add Question&quot; to get started.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <QuestionComponent 
                key={question.id} 
                question={question}
                questionNumber={index + 1}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
                addQuestion={addQuestion}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                openAdvancedModal={openAdvancedModal}
                advancedFeaturesEnabled={advancedFeaturesEnabled}
                perQuestionScoring={perQuestionScoring}
                scoringEnabled={scoringEnabled}
                questionTypes={questionTypes}
              />
            ))}
          </div>
        )}
      </div>

      {/* Save Actions */}
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
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button 
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isSaving ? 'Publishing...' : 'Publish Checklist'}
          </button>
        </div>
      </div>

        {/* Advanced Settings Modal */}
        <AdvancedSettingsModal />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 min-h-screen">
          <div className="p-6 space-y-6">
            {/* Checklist Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Checklist Overview</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Title:</span>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2">{checklistTitle || 'Untitled Checklist'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2">{category || 'Not Set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion:</span>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2">
                    {completionMethod === 'all-at-once' ? 'All at Once' : 'One at a Time'}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Statistics */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h4a1 1 0 011 1v18a1 1 0 01-1 1H2a1 1 0 01-1-1V1a1 1 0 011-1h4a1 1 0 011 1v3m0 0h8m-8 0V1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Question Statistics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-xs text-blue-600">Main Questions</div>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {questions.reduce((total, q) => total + (q.children?.length || 0), 0)}
                  </div>
                  <div className="text-xs text-indigo-600">Sub-Questions</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {questions.filter(q => q.text.trim() !== '').length}
                  </div>
                  <div className="text-xs text-green-600">Completed</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    {questions.filter(q => q.text.trim() === '').length}
                  </div>
                  <div className="text-xs text-amber-600">Incomplete</div>
                </div>
              </div>
            </div>

            {/* Advanced Features Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Advanced Features</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={advancedFeaturesEnabled}
                    onChange={() => setAdvancedFeaturesEnabled(!advancedFeaturesEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Scoring Questions:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {questions.filter(q => q.scoring.enabled).length + 
                     questions.reduce((total, q) => total + (q.children?.filter(c => c.scoring.enabled).length || 0), 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Kill Questions:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {questions.filter(q => q.scoring.isKillQuestion).length + 
                     questions.reduce((total, q) => total + (q.children?.filter(c => c.scoring.isKillQuestion).length || 0), 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Photo Required:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {questions.filter(q => q.media.requireAnswerImage).length + 
                     questions.reduce((total, q) => total + (q.children?.filter(c => c.media.requireAnswerImage).length || 0), 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Task Triggers:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {questions.filter(q => q.tasks.enabled).length + 
                     questions.reduce((total, q) => total + (q.children?.filter(c => c.tasks.enabled).length || 0), 0)}
                  </span>
                </div>
              </div>
            </div>


            {/* Progress Indicator */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Completion Progress</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Basic Info</span>
                    <span className="text-sm font-medium text-gray-900">
                      {checklistTitle && category ? '100%' : checklistTitle ? '50%' : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#3d3a72] h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: checklistTitle && category ? '100%' : checklistTitle ? '50%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Questions</span>
                    <span className="text-sm font-medium text-gray-900">
                      {questions.length > 0 ? 
                        `${Math.round((questions.filter(q => q.text.trim() !== '').length / questions.length) * 100)}%` : 
                        '0%'
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#3d3a72] h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: questions.length > 0 ? 
                          `${Math.round((questions.filter(q => q.text.trim() !== '').length / questions.length) * 100)}%` : 
                          '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <ChecklistPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        checklistTitle={checklistTitle}
        checklistDescription={checklistDescription}
        category={category}
        completionMethod={completionMethod}
        questions={questions}
        advancedFeatures={{
          enableScoring: scoringEnabled,
          passScoreEnabled: passScoreEnabled,
          passingScore: passingScore,
          enableKillScore: killScoreEnabled,
          killScoreThreshold: killScoreThreshold,
          killScoreAction: killScoreAction,
          enableQrCode: false,
          enableAnonymous: false,
          enableWithoutLogin: false
        }}
      />
    </div>
  );
}