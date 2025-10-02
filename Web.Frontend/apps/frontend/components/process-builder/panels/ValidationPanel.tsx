import React from 'react';
import { ValidationResult } from '../types/process.types';

interface ValidationPanelProps {
  validationResult: ValidationResult | null;
  onValidate: () => void;
}

export default function ValidationPanel({ validationResult, onValidate }: ValidationPanelProps) {
  return (
    <div className="card bg-base-200 p-4">
      <h3 className="text-xl font-bold mb-4">Process Validation</h3>

      <button className="btn btn-outline btn-xs w-full" onClick={onValidate}>
        Validate Process Chain
      </button>

      {validationResult && (
        <div className="space-y-3 mt-4">
          {/* Validation Status */}
          <div
            className={`alert ${
              validationResult.isValid
                ? 'alert-success'
                : validationResult.errors.length > 0
                ? 'alert-error'
                : 'alert-warning'
            }`}
          >
            <span className="text-sm font-medium">
              {validationResult.isValid
                ? '✓ Process is valid'
                : validationResult.errors.length > 0
                ? '✗ Process has errors'
                : '⚠ Process has warnings'}
            </span>
          </div>

          {/* Errors */}
          {validationResult.errors.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-error mb-2">
                Errors ({validationResult.errors.length})
              </h4>
              <ul className="space-y-1">
                {validationResult.errors.map((error, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-error flex items-start gap-2"
                  >
                    <span className="text-error mt-0.5">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {validationResult.warnings.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-warning mb-2">
                Warnings ({validationResult.warnings.length})
              </h4>
              <ul className="space-y-1">
                {validationResult.warnings.map((warning, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-warning flex items-start gap-2"
                  >
                    <span className="text-warning mt-0.5">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {validationResult.suggestions && validationResult.suggestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-info mb-2">
                Suggestions
              </h4>
              <ul className="space-y-1">
                {validationResult.suggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-base-content/70 flex items-start gap-2"
                  >
                    <span className="text-info mt-0.5">💡</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}