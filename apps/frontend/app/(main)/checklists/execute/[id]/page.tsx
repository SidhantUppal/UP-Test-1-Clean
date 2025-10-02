'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { checklistService, ChecklistAssignment } from '@/services/checklistService';

interface Question {
  id: string;
  text: string;
  type: string;
  sectionId?: string;
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
    killAction?: 'stop-process' | 'stop-until-fixed' | 'report-to';
    killReportTo?: string;
  };
  media: {
    questionImage?: string;
    requireAnswerImage: boolean;
  };
  children?: Question[];
}

interface Section {
  id: string;
  title: string;
  description?: string;
  displayOrder: number;
  questions: Question[];
  completionMode?: 'sequential' | 'any-order';
}

export default function ExecuteChecklistPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id ? parseInt(params.id as string) : null;

  const [assignment, setAssignment] = useState<ChecklistAssignment | null>(null);
  const [checklistTitle, setChecklistTitle] = useState('');
  const [checklistDescription, setChecklistDescription] = useState('');
  const [category, setCategory] = useState('');
  const [completionMethod, setCompletionMethod] = useState<'all-at-once' | 'one-section-at-time' | 'one-question-at-time'>('all-at-once');
  const [sections, setSections] = useState<Section[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [advancedFeatures, setAdvancedFeatures] = useState<any>({
    enableScoring: true,
    passScoreEnabled: true,
    passingScore: 70,
    enableKillScore: true,
    killScoreThreshold: 60
  });
  
  // Answer tracking
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  
  // Score tracking
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  
  // Navigation state for different completion modes
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  useEffect(() => {
    if (assignmentId) {
      loadAssignment();
    } else {
      // Handle undefined ID
      router.push('/checklists/my');
    }
  }, [assignmentId]);

  const loadAssignment = async () => {
    try {
      setLoading(true);
      
      // Mock data matching the preview modal structure
      const mockChecklistTitle = 'Daily Safety Check';
      const mockChecklistDescription = 'Complete daily safety inspection of work area';
      const mockCategory = 'Safety';
      const mockCompletionMethod = 'all-at-once';
      
      const mockAssignment: ChecklistAssignment = {
        ChecklistTemplateAssignmentID: assignmentId!,
        ChecklistTemplateID: 1,
        AssignedToUserID: 1,
        AssignedByUserID: 2,
        Status: 'In Progress',
        ChecklistName: mockChecklistTitle,
        ChecklistDescription: mockChecklistDescription,
        CategoryName: mockCategory,
        DueDate: '2024-01-15',
        AssignedByName: 'Safety Manager'
      };

      // Mock questions matching preview modal structure
      const mockQuestions: Question[] = [
        {
          id: 'q1',
          text: 'Is your hard hat in good condition?',
          type: 'checkbox',
          sectionId: 's1',
          comments: {
            enabled: true,
            required: false,
            placeholder: 'Add any notes about the hard hat condition'
          },
          scoring: {
            enabled: true,
            weight: 10,
            isKillQuestion: false
          },
          media: {
            requireAnswerImage: false
          }
        },
        {
          id: 'q2',
          text: 'Are safety glasses available and clean?',
          type: 'yn-na',
          sectionId: 's1',
          comments: {
            enabled: false,
            required: false,
            placeholder: ''
          },
          scoring: {
            enabled: true,
            weight: 10,
            isKillQuestion: true,
            killAction: 'stop-process'
          },
          media: {
            requireAnswerImage: false
          }
        },
        {
          id: 'q3',
          text: 'Rate the overall condition of PPE',
          type: 'score-5',
          sectionId: 's1',
          comments: {
            enabled: true,
            required: false,
            placeholder: 'Describe any PPE issues'
          },
          scoring: {
            enabled: true,
            weight: 15,
            isKillQuestion: false
          },
          media: {
            requireAnswerImage: true
          }
        },
        {
          id: 'q4',
          text: 'Is the floor clear of obstacles?',
          type: 'pass-fail',
          sectionId: 's2',
          comments: {
            enabled: false,
            required: false,
            placeholder: ''
          },
          scoring: {
            enabled: true,
            weight: 20,
            isKillQuestion: false
          },
          media: {
            requireAnswerImage: false
          }
        },
        {
          id: 'q5',
          text: 'Are all emergency exits accessible?',
          type: 'checkbox',
          sectionId: 's2',
          comments: {
            enabled: true,
            required: true,
            placeholder: 'List any blocked exits'
          },
          scoring: {
            enabled: true,
            weight: 25,
            isKillQuestion: true,
            killAction: 'stop-until-fixed'
          },
          media: {
            requireAnswerImage: false
          },
          children: [
            {
              id: 'q5a',
              text: 'Have you reported blocked exits?',
              type: 'checkbox',
              comments: {
                enabled: false,
                required: false,
                placeholder: ''
              },
              scoring: {
                enabled: true,
                weight: 5,
                isKillQuestion: false
              },
              media: {
                requireAnswerImage: false
              }
            }
          ]
        },
        {
          id: 'q6',
          text: 'Lighting condition',
          type: 'dropdown',
          sectionId: 's2',
          options: ['Excellent', 'Good', 'Adequate', 'Poor'],
          comments: {
            enabled: false,
            required: false,
            placeholder: ''
          },
          scoring: {
            enabled: true,
            weight: 10,
            isKillQuestion: false
          },
          media: {
            requireAnswerImage: false
          }
        },
        {
          id: 'q7',
          text: 'Equipment serial number',
          type: 'text',
          sectionId: 's3',
          comments: {
            enabled: false,
            required: false,
            placeholder: ''
          },
          scoring: {
            enabled: false,
            weight: 0,
            isKillQuestion: false
          },
          media: {
            requireAnswerImage: false
          }
        },
        {
          id: 'q8',
          text: 'Equipment condition rating',
          type: 'score-10',
          sectionId: 's3',
          comments: {
            enabled: true,
            required: false,
            placeholder: 'Describe any equipment issues'
          },
          scoring: {
            enabled: true,
            weight: 15,
            isKillQuestion: false
          },
          media: {
            requireAnswerImage: false
          }
        }
      ];

      // Organize into sections
      const mockSections: Section[] = [
        {
          id: 's1',
          title: 'Personal Protective Equipment',
          description: 'Verify all PPE is available and in good condition',
          displayOrder: 1,
          questions: mockQuestions.filter(q => q.sectionId === 's1')
        },
        {
          id: 's2',
          title: 'Work Area Inspection',
          description: 'Check the work area for hazards',
          displayOrder: 2,
          questions: mockQuestions.filter(q => q.sectionId === 's2')
        },
        {
          id: 's3',
          title: 'Equipment Check',
          description: 'Verify equipment is safe to operate',
          displayOrder: 3,
          questions: mockQuestions.filter(q => q.sectionId === 's3')
        }
      ];

      setAssignment(mockAssignment);
      setChecklistTitle(mockChecklistTitle);
      setChecklistDescription(mockChecklistDescription);
      setCategory(mockCategory);
      setCompletionMethod(mockCompletionMethod as any);
      setSections(mockSections);
      setQuestions(mockQuestions);
      
      // Calculate max score
      const max = mockQuestions.reduce((sum, q) => {
        const questionMax = q.scoring.enabled ? q.scoring.weight : 0;
        const childrenMax = q.children?.reduce((childSum, child) => 
          childSum + (child.scoring.enabled ? child.scoring.weight : 0), 0) || 0;
        return sum + questionMax + childrenMax;
      }, 0);
      setMaxScore(max);
      
    } catch (error) {
      console.error('Failed to load assignment:', error);
      router.push('/checklists/my');
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection (from preview modal)
  const handleAnswer = (questionId: string, value: any, weight?: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Update score if scoring is enabled
    if (advancedFeatures?.enableScoring && weight !== undefined) {
      const question = findQuestion(questionId);
      if (question?.scoring.enabled) {
        // Calculate score based on answer
        let scoreValue = 0;
        if (value === true || value === 'yes' || value === 'pass') {
          scoreValue = weight;
        } else if (value === 'partial') {
          scoreValue = weight * 0.5;
        }
        // Update current score
        setCurrentScore(prev => {
          const oldValue = answers[questionId] ? 
            (answers[questionId] === true || answers[questionId] === 'yes' || answers[questionId] === 'pass' ? weight : 0) : 0;
          return prev - oldValue + scoreValue;
        });
      }
    }
  };

  const findQuestion = (id: string): Question | undefined => {
    for (const q of questions) {
      if (q.id === id) return q;
      if (q.children) {
        const child = q.children.find(c => c.id === id);
        if (child) return child;
      }
    }
    return undefined;
  };

  // Render answer interface based on question type (from preview modal)
  const renderAnswerInterface = (question: Question) => {
    const value = answers[question.id];
    
    switch (question.type) {
      case 'checkbox':
        return (
          <div className="flex space-x-3">
            <button
              onClick={() => handleAnswer(question.id, true, question.scoring.weight)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === true 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✓ Yes
            </button>
            <button
              onClick={() => handleAnswer(question.id, false, question.scoring.weight)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === false 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✗ No
            </button>
          </div>
        );

      case 'yn-na':
        return (
          <div className="flex space-x-3">
            <button
              onClick={() => handleAnswer(question.id, 'yes', question.scoring.weight)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === 'yes' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'no', question.scoring.weight)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === 'no' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'na', 0)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === 'na' 
                  ? 'bg-gray-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              N/A
            </button>
          </div>
        );

      case 'yn-na-dk':
        return (
          <div className="flex space-x-3">
            <button
              onClick={() => handleAnswer(question.id, 'yes', question.scoring.weight)}
              className={`px-3 py-2 rounded-md font-medium transition-all ${
                value === 'yes' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'no', question.scoring.weight)}
              className={`px-3 py-2 rounded-md font-medium transition-all ${
                value === 'no' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'na', 0)}
              className={`px-3 py-2 rounded-md font-medium transition-all ${
                value === 'na' 
                  ? 'bg-gray-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              N/A
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'dk', 0)}
              className={`px-3 py-2 rounded-md font-medium transition-all ${
                value === 'dk' 
                  ? 'bg-yellow-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Don't Know
            </button>
          </div>
        );

      case 'pass-fail':
        return (
          <div className="flex space-x-3">
            <button
              onClick={() => handleAnswer(question.id, 'pass', question.scoring.weight)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === 'pass' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✓ Pass
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'fail', 0)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                value === 'fail' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✗ Fail
            </button>
          </div>
        );

      case 'score-5':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(score => (
              <button
                key={score}
                onClick={() => handleAnswer(question.id, score, (score / 5) * question.scoring.weight)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  value === score 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        );

      case 'score-10':
        return (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
              <button
                key={score}
                onClick={() => handleAnswer(question.id, score, (score / 10) * question.scoring.weight)}
                className={`w-10 h-10 rounded-md font-bold transition-all ${
                  value === score 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Enter your answer..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Enter number..."
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case 'dropdown':
      case 'multiple-single':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value, question.scoring.weight)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'multiple-multi':
        return (
          <div className="space-y-2">
            {question.options?.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(value as string[] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleAnswer(question.id, newValues);
                  }}
                  className="rounded text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'photo':
        return (
          <div className="space-y-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Take Photo</span>
            </button>
            {uploadedImages[question.id] && (
              <div className="text-sm text-green-600">✓ Photo uploaded</div>
            )}
          </div>
        );

      case 'signature':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <div className="text-gray-500">Signature Pad</div>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
              Click to sign
            </button>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 italic">
            Answer interface for {question.type} type
          </div>
        );
    }
  };

  // Render question with answer interface (from preview modal)
  const renderQuestion = (question: Question, index: number, isSubQuestion = false) => {
    const isAnswered = answers.hasOwnProperty(question.id);
    const hasFailedKillQuestion = question.scoring.isKillQuestion && 
      (answers[question.id] === false || answers[question.id] === 'no' || answers[question.id] === 'fail');

    return (
      <div key={question.id} className={`${isSubQuestion ? 'ml-8 mt-3' : 'mt-4'}`}>
        <div className={`bg-white rounded-lg border-2 ${
          hasFailedKillQuestion ? 'border-red-500 bg-red-50' : 
          isAnswered ? 'border-green-500' : 'border-gray-200'
        } p-5 transition-all`}>
          
          {/* Question Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  isAnswered ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {isSubQuestion ? String.fromCharCode(97 + index) : index + 1}
                </span>
                <span className="font-medium text-gray-900 text-lg">
                  {question.text || 'Untitled Question'}
                </span>
                {question.scoring.isKillQuestion && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-semibold">
                    ⚠️ Kill Question
                  </span>
                )}
                {question.scoring.enabled && advancedFeatures?.enableScoring && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {question.scoring.weight} pts
                  </span>
                )}
              </div>
              
              {/* Question Image */}
              {question.media.questionImage && (
                <div className="mt-3">
                  <img 
                    src={question.media.questionImage} 
                    alt="Question" 
                    className="max-w-xs rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Answer Interface */}
          <div className="mb-4">
            {renderAnswerInterface(question)}
          </div>

          {/* Kill Question Warning */}
          {hasFailedKillQuestion && (
            <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-md">
              <div className="flex items-center space-x-2 text-red-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Checklist Failed!</span>
              </div>
              <p className="text-sm mt-1 text-red-700">
                This is a kill question. Action: {question.scoring.killAction === 'stop-process' ? 'Process Stopped' :
                  question.scoring.killAction === 'stop-until-fixed' ? 'Stopped Until Fixed' :
                  `Report sent to ${question.scoring.killReportTo}`}
              </p>
            </div>
          )}

          {/* Photo Upload Required */}
          {question.media.requireAnswerImage && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-md">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-yellow-700">Photo Required</span>
                <button className="ml-auto px-3 py-1 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700">
                  Upload Photo
                </button>
              </div>
            </div>
          )}

          {/* Comments Section */}
          {question.comments.enabled && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments {question.comments.required ? '(Required)' : '(Optional)'}
              </label>
              <textarea
                value={comments[question.id] || ''}
                onChange={(e) => setComments(prev => ({ ...prev, [question.id]: e.target.value }))}
                placeholder={question.comments.placeholder || 'Add your comments...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                rows={2}
              />
            </div>
          )}

          {/* Sub-questions */}
          {question.children && question.children.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-3">Follow-up Questions:</div>
              {question.children.map((child, idx) => renderQuestion(child, idx, true))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSaveProgress = async () => {
    setSaving(true);
    try {
      // Save progress to service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock save
      alert('Progress saved successfully!');
    } catch (error) {
      console.error('Failed to save progress:', error);
      alert('Failed to save progress. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    setShowCompletionDialog(true);
  };

  const confirmSubmit = async () => {
    setSaving(true);
    try {
      // Submit to service
      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock submit
      
      // Update assignment status
      if (assignment) {
        await checklistService.updateAssignmentStatus(
          assignment.ChecklistTemplateAssignmentID!,
          'Completed'
        );
      }
      
      router.push('/checklists/my');
    } catch (error) {
      console.error('Failed to submit checklist:', error);
      alert('Failed to submit checklist. Please try again.');
    } finally {
      setSaving(false);
      setShowCompletionDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checklist...</p>
        </div>
      </div>
    );
  }

  const scorePercentage = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;
  const isPassing = advancedFeatures?.passScoreEnabled && scorePercentage >= (advancedFeatures?.passingScore || 70);
  const isKillScore = advancedFeatures?.enableKillScore && scorePercentage < (advancedFeatures?.killScoreThreshold || 60);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - matching preview modal */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Complete Checklist</h2>
              <p className="text-sm text-gray-500 mt-1">Fill out all required questions to submit</p>
            </div>
            <Link href="/checklists/my">
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Checklist Info Bar - matching preview modal */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
        <h3 className="text-2xl font-bold mb-1">
          {checklistTitle || 'Untitled Checklist'}
        </h3>
        {checklistDescription && (
          <p className="text-blue-100">{checklistDescription}</p>
        )}
        <div className="flex items-center space-x-4 mt-3 text-sm">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            {category || 'General'}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {questions.length} Questions
          </span>
          {assignment?.DueDate && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Due: {new Date(assignment.DueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Score Display - matching preview modal */}
      {advancedFeatures?.enableScoring && (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Score:</span>
              <div className="flex items-center space-x-2">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      isKillScore ? 'bg-red-600' : isPassing ? 'bg-green-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${scorePercentage}%` }}
                  />
                </div>
                <span className={`font-bold ${
                  isKillScore ? 'text-red-600' : isPassing ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {scorePercentage}%
                </span>
                <span className="text-sm text-gray-500">
                  ({currentScore}/{maxScore} points)
                </span>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center space-x-3">
              {advancedFeatures?.passScoreEnabled && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isPassing ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  Pass: {advancedFeatures.passingScore}%
                </span>
              )}
              {advancedFeatures?.enableKillScore && isKillScore && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium animate-pulse">
                  ⚠️ Kill Score Triggered
                </span>
              )}
              <button
                onClick={handleSaveProgress}
                disabled={saving}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 text-sm"
              >
                {saving ? 'Saving...' : 'Save Progress'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
              >
                Submit Checklist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Questions */}
          <div>
            {questions.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                No questions added yet
              </div>
            ) : (
              <>
                {/* Progress indicator for section/question modes */}
                {(completionMethod === 'one-section-at-time' || completionMethod === 'one-question-at-time') && (
                  <div className="mb-4 bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        {completionMethod === 'one-section-at-time' ? (
                          <span className="text-sm font-medium text-gray-700">
                            Section {currentSectionIndex + 1} of {sections.length}: {sections[currentSectionIndex]?.title}
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-gray-700">
                            Question {currentQuestionIndex + 1} of {questions.length}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            if (completionMethod === 'one-section-at-time') {
                              setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1));
                            } else {
                              setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                            }
                          }}
                          disabled={completionMethod === 'one-section-at-time' ? currentSectionIndex === 0 : currentQuestionIndex === 0}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            (completionMethod === 'one-section-at-time' ? currentSectionIndex === 0 : currentQuestionIndex === 0)
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => {
                            if (completionMethod === 'one-section-at-time') {
                              setCurrentSectionIndex(Math.min(sections.length - 1, currentSectionIndex + 1));
                            } else {
                              setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
                            }
                          }}
                          disabled={completionMethod === 'one-section-at-time' 
                            ? currentSectionIndex === sections.length - 1 
                            : currentQuestionIndex === questions.length - 1}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            (completionMethod === 'one-section-at-time' 
                              ? currentSectionIndex === sections.length - 1 
                              : currentQuestionIndex === questions.length - 1)
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Render questions based on completion mode */}
                <div className="space-y-4">
                  {completionMethod === 'all-at-once' && 
                    questions.map((question, index) => renderQuestion(question, index))
                  }
                  
                  {completionMethod === 'one-section-at-time' && sections[currentSectionIndex] && (
                    <>
                      {sections[currentSectionIndex].description && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <p className="text-sm text-blue-800">{sections[currentSectionIndex].description}</p>
                        </div>
                      )}
                      {sections[currentSectionIndex].questions.map((question, index) => 
                        renderQuestion(question, index)
                      )}
                    </>
                  )}
                  
                  {completionMethod === 'one-question-at-time' && questions[currentQuestionIndex] && 
                    renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <span className="text-sm text-gray-500">
            {completionMethod === 'one-section-at-time' ? (
              <>Section {currentSectionIndex + 1} of {sections.length} - {Object.keys(answers).length} questions answered</>
            ) : completionMethod === 'one-question-at-time' ? (
              <>Question {currentQuestionIndex + 1} of {questions.length} - {answers[questions[currentQuestionIndex]?.id] ? 'Answered' : 'Not answered'}</>
            ) : (
              <>{Object.keys(answers).length} of {questions.length + questions.reduce((sum, q) => sum + (q.children?.length || 0), 0)} answered</>
            )}
          </span>
          <div className="text-sm text-gray-500">
            Assigned by: {assignment?.AssignedByName || 'System'}
          </div>
        </div>
      </div>

      {/* Completion Dialog */}
      {showCompletionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Submit Checklist</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this checklist? Once submitted, you cannot make any more changes.
            </p>
            <div className="bg-gray-50 p-4 rounded mb-6">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-2">
                  <span>Checklist:</span>
                  <span className="font-medium">{checklistTitle}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Score:</span>
                  <span className={`font-medium ${isPassing ? 'text-green-600' : 'text-yellow-600'}`}>
                    {scorePercentage}% {isPassing ? '(Passing)' : '(Not Passing)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <span className="font-medium">
                    {Object.keys(answers).length} of {questions.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCompletionDialog(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? 'Submitting...' : 'Confirm Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}