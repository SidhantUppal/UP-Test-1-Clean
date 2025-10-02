'use client';

import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: string;
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

interface ChecklistPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklistTitle: string;
  checklistDescription: string;
  category: string;
  completionMethod: string;
  questions: Question[];
  advancedFeatures?: {
    enableScoring: boolean;
    passScoreEnabled: boolean;
    passingScore: number;
    enableKillScore: boolean;
    killScoreThreshold: number;
    killScoreAction: string;
    enableQrCode: boolean;
    enableAnonymous: boolean;
    enableWithoutLogin: boolean;
  };
}

export default function ChecklistPreviewModal({
  isOpen,
  onClose,
  checklistTitle,
  checklistDescription,
  category,
  completionMethod,
  questions,
  advancedFeatures
}: ChecklistPreviewModalProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Calculate max score on mount
  React.useEffect(() => {
    if (advancedFeatures?.enableScoring) {
      const max = questions.reduce((sum, q) => {
        const questionMax = q.scoring.enabled ? q.scoring.weight : 0;
        const childrenMax = q.children?.reduce((childSum, child) => 
          childSum + (child.scoring.enabled ? child.scoring.weight : 0), 0) || 0;
        return sum + questionMax + childrenMax;
      }, 0);
      setMaxScore(max);
    }
  }, [questions, advancedFeatures]);

  // Handle answer selection
  const handleAnswer = (questionId: string, value: any, weight?: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Update score if scoring is enabled
    if (advancedFeatures?.enableScoring && weight) {
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
          const oldValue = answers[questionId] ? (answers[questionId] === true || answers[questionId] === 'yes' || answers[questionId] === 'pass' ? weight : 0) : 0;
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

  // Render answer interface based on question type
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

  // Render question with answer interface
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

  const scorePercentage = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;
  const isPassing = advancedFeatures?.passScoreEnabled && scorePercentage >= (advancedFeatures?.passingScore || 70);
  const isKillScore = advancedFeatures?.enableKillScore && scorePercentage < (advancedFeatures?.killScoreThreshold || 60);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Checklist Completion Preview</h2>
              <p className="text-sm text-gray-500 mt-1">This shows how users will complete your checklist</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Checklist Info Bar */}
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
          </div>
        </div>

        {/* Score Display */}
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
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Questions */}
          <div>
            {questions.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                No questions added yet
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => renderQuestion(question, index))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors">
                Pause & Resume Later
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {Object.keys(answers).length} of {questions.length + questions.reduce((sum, q) => sum + (q.children?.length || 0), 0)} answered
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
              >
                Close Preview
              </button>
              <button className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors font-medium">
                Submit Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}