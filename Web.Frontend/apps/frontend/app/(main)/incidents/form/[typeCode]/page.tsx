"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { incidentService } from "@/services/incidentService";
import type { IncidentType, FormTemplate } from "@/services/incidentService";
import dynamic from "next/dynamic";

// Dynamically import BodyPartPicker to avoid SSR issues
const BodyPartPicker = dynamic(
  () => import("@/components/incidents/BodyPartPicker"),
  { ssr: false }
);

interface DynamicIncidentFormProps {
  params: Promise<{ typeCode: string }>;
}

export default function DynamicIncidentForm({ params }: DynamicIncidentFormProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [incidentType, setIncidentType] = useState<IncidentType | null>(null);
  const [formTemplate, setFormTemplate] = useState<FormTemplate | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadFormData();
  }, [resolvedParams.typeCode]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const { type, formTemplate } = await incidentService.getIncidentTypeWithForm(resolvedParams.typeCode);
      
      setIncidentType(type);
      setFormTemplate(formTemplate);
      
      // Initialize form data with default values
      if (formTemplate) {
        const initialData: any = {
          dateTime: new Date().toISOString().slice(0, 16),
          witnessExists: '',
          witnessRelationship: '',
          witnessEmployee: '',
          witnessOtherRelationship: '',
          witnessTitle: '',
          witnessFirstName: '',
          witnessLastName: '',
          witnessJobTitle: '',
          witnessPhone: '',
          witnessEmail: '',
          witnessAddress: '',
          witnessActivity: '',
          additionalWitnesses: '',
          otherWitnessDetails: ''
        };
        
        // Parse form definition and set defaults
        if (formTemplate.FormDefinition?.sections) {
          formTemplate.FormDefinition.sections.forEach((section: any) => {
            section.fields?.forEach((field: any) => {
              if (field.defaultValue !== undefined) {
                initialData[field.id] = field.defaultValue;
              }
            });
          });
        }
        
        setFormData(initialData);
      }
    } catch (err) {
      console.error('Error loading form data:', err);
      setError('Failed to load incident form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!incidentType) return;
    
    try {
      setSubmitting(true);
      
      const incident = await incidentService.createIncident({
        incidentTypeId: incidentType.IncidentTypeID!,
        incidentDate: formData.dateTime || new Date().toISOString(),
        formData: formData,
        severity: formData.severity || 'Medium',
        priority: formData.priority || 'Medium',
        locationId: formData.locationId,
        customLocation: formData.customLocation
      });
      
      // Navigate to incident details page
      router.push(`/incidents/${incident.IncidentID}`);
    } catch (err) {
      console.error('Error submitting incident:', err);
      alert('Failed to submit incident. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // Save to localStorage as draft
    const draftKey = `incident_draft_${resolvedParams.typeCode}_${Date.now()}`;
    localStorage.setItem(draftKey, JSON.stringify({
      typeCode: resolvedParams.typeCode,
      formData: formData,
      savedAt: new Date().toISOString()
    }));
    
    router.push("/incidents/incomplete");
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      
      case 'textarea':
        return (
          <>
            <textarea
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={field.rows || 4}
              required={field.required}
              placeholder={field.placeholder}
            />
            {field.showCharCount && (
              <p className="text-sm text-gray-500 mt-1 text-right">
                {(formData[field.id] || '').length} characters
              </p>
            )}
          </>
        );
      
      case 'datetime':
        return (
          <div className="relative">
            <input
              type="datetime-local"
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required={field.required}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div className="relative">
            <select
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
              required={field.required}
            >
              <option value="">Select {field.label}...</option>
              {field.options?.map((option: string) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option: string) => (
              <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  required={field.required}
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={formData[field.id] || false}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{field.checkboxLabel || field.label}</span>
          </label>
        );
      
      case 'bodyPartPicker':
        return (
          <BodyPartPicker
            value={formData[field.id] || []}
            onChange={(injuries) => handleFieldChange(field.id, injuries)}
            required={field.required}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required={field.required}
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required={field.required}
            placeholder={field.placeholder || 'email@example.com'}
          />
        );
      
      case 'checkbox-group':
        return (
          <div className="space-y-2 border border-gray-200 rounded-lg p-4">
            {field.options?.map((option: string) => (
              <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={(formData[field.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleFieldChange(field.id, newValues);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required={field.required}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const shouldShowField = (field: any) => {
    if (!field.conditional) return true;
    
    const { field: conditionalField, value } = field.conditional;
    return formData[conditionalField] === value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !incidentType) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16 max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error Loading Form</h3>
                <p className="text-red-600 mt-1">{error || 'Incident type not found'}</p>
              </div>
            </div>
            <Link href="/incidents/form" className="inline-flex items-center mt-4 text-red-700 hover:text-red-800 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Selection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If no form template, show a basic form
  if (!formTemplate) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/incidents" className="hover:text-gray-700 transition-colors">Incidents</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/incidents/form" className="hover:text-gray-700 transition-colors">New Incident</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700 font-medium">{incidentType.Title}</span>
            </nav>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{incidentType.Title}</h1>
                  <p className="mt-2 text-gray-600">{incidentType.Description || 'Report an incident'}</p>
                </div>
                <div className="hidden sm:block">
                  <svg className="w-16 h-16 text-orange-500 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
            <svg className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-amber-800 font-medium">No form template configured</p>
              <p className="text-amber-700 text-sm mt-1">Using basic form. Contact your administrator to set up a custom form for this incident type.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                <p className="text-gray-600 text-sm mt-1">Provide essential details about the incident</p>
              </div>
              <div className="p-6 space-y-6">
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date and Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={formData.dateTime || ''}
                        onChange={(e) => handleFieldChange('dateTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity Level <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.severity || 'Medium'}
                        onChange={(e) => handleFieldChange('severity', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                      >
                        <option value="Low">🟢 Low - Minor incident</option>
                        <option value="Medium">🟡 Medium - Moderate impact</option>
                        <option value="High">🟠 High - Significant impact</option>
                        <option value="Critical">🔴 Critical - Emergency</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                      placeholder="e.g., Warehouse B, Production Floor, Main Office"
                      className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Specify the exact location where the incident occurred</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    placeholder="Please provide a detailed description of what happened, including:&#10;• What led to the incident&#10;• Exactly what occurred&#10;• Any immediate actions taken&#10;• Current status"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={6}
                    required
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">Be as detailed as possible</p>
                    <p className="text-sm text-gray-500">{(formData.description || '').length} characters</p>
                  </div>
                </div>
            </div>
          </div>

          {/* Witness Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Witness Information</h2>
              <p className="text-gray-600 text-sm mt-1">Provide details of any witnesses to the incident</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Was there a witness to this incident? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="witnessExists" 
                      value="yes"
                      checked={formData.witnessExists === "yes"}
                      onChange={(e) => handleFieldChange('witnessExists', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="witnessExists" 
                      value="no"
                      checked={formData.witnessExists === "no"}
                      onChange={(e) => handleFieldChange('witnessExists', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {formData.witnessExists === "yes" && (
                <>
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Witness Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relationship to company/organisation
                        </label>
                        <select 
                          value={formData.witnessRelationship || ''}
                          onChange={(e) => handleFieldChange('witnessRelationship', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                        >
                          <option value="">Select relationship...</option>
                          <option value="Employee">Employee</option>
                          <option value="Contractor">Contractor</option>
                          <option value="Visitor">Visitor</option>
                          <option value="Client/Customer">Client/Customer</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select employee
                        </label>
                        <input 
                          type="text" 
                          placeholder="Type employee name or ID"
                          value={formData.witnessEmployee || ''}
                          onChange={(e) => handleFieldChange('witnessEmployee', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Other relationship
                        </label>
                        <input 
                          type="text" 
                          value={formData.witnessOtherRelationship || ''}
                          onChange={(e) => handleFieldChange('witnessOtherRelationship', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input 
                          type="text" 
                          value={formData.witnessTitle || ''}
                          onChange={(e) => handleFieldChange('witnessTitle', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <input 
                          type="text" 
                          value={formData.witnessFirstName || ''}
                          onChange={(e) => handleFieldChange('witnessFirstName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input 
                          type="text" 
                          value={formData.witnessLastName || ''}
                          onChange={(e) => handleFieldChange('witnessLastName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job title (if appropriate)
                        </label>
                        <input 
                          type="text" 
                          value={formData.witnessJobTitle || ''}
                          onChange={(e) => handleFieldChange('witnessJobTitle', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telephone number
                        </label>
                        <input 
                          type="tel" 
                          value={formData.witnessPhone || ''}
                          onChange={(e) => handleFieldChange('witnessPhone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail address
                        </label>
                        <input 
                          type="email" 
                          value={formData.witnessEmail || ''}
                          onChange={(e) => handleFieldChange('witnessEmail', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea 
                          rows={3}
                          value={formData.witnessAddress || ''}
                          onChange={(e) => handleFieldChange('witnessAddress', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What activity were they engaged in at the time of the incident?
                        </label>
                        <input 
                          type="text" 
                          value={formData.witnessActivity || ''}
                          onChange={(e) => handleFieldChange('witnessActivity', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Were there any additional witnesses?
                </label>
                <div className="flex gap-6 mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="additionalWitnesses" 
                      value="yes"
                      checked={formData.additionalWitnesses === "yes"}
                      onChange={(e) => handleFieldChange('additionalWitnesses', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="additionalWitnesses" 
                      value="no"
                      checked={formData.additionalWitnesses === "no"}
                      onChange={(e) => handleFieldChange('additionalWitnesses', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">No</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Details of other witnesses
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details of any additional witnesses..."
                    value={formData.otherWitnessDetails || ''}
                    onChange={(e) => handleFieldChange('otherWitnessDetails', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
              <button
                type="button"
                onClick={handleSaveDraft}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{ 
                  backgroundColor: submitting ? '#9ca3af' : '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className={submitting ? '' : 'hover:opacity-80'}
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render form based on template
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 py-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/incidents" className="hover:text-gray-700 transition-colors">Incidents</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/incidents/form" className="hover:text-gray-700 transition-colors">New Incident</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">{incidentType.Title}</span>
          </nav>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{incidentType.Title}</h1>
                <p className="mt-2 text-gray-600">{incidentType.Description || formTemplate.Description}</p>
              </div>
              <div className="hidden sm:block">
                <svg className="w-16 h-16 text-orange-500 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {formTemplate.FormDefinition?.sections?.map((section: any, sectionIndex: number) => (
            <div key={section.id || sectionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                {section.description && (
                  <p className="text-gray-600 text-sm mt-1">{section.description}</p>
                )}
              </div>
              <div className="p-6">
                <div className="space-y-4">
                {section.fields?.map((field: any, fieldIndex: number) => {
                  if (!shouldShowField(field)) return null;
                  
                  return (
                    <div key={field.id || fieldIndex} className={field.type === 'bodyPartPicker' ? 'col-span-full' : ''}>
                      {field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'checkbox-group' && (
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                      )}
                      {(field.type === 'radio' || field.type === 'checkbox-group') && (
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                      )}
                      {renderField(field)}
                      {field.helpText && (
                        <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                      )}
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={handleSaveDraft}
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-80"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{ 
                backgroundColor: submitting ? '#9ca3af' : '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              className={submitting ? '' : 'hover:opacity-80'}
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}