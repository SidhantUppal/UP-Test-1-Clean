"use client";

import { useState, useEffect } from "react";

interface Attachment {
  IncidentAttachmentID: number;
  IncidentCaseID: number;
  AttachmentID: number;
  FormType: string | null;
  FileName: string;
  DisplayName: string;
  FileSizeBytes: number;
  ContentType: string;
  IsPublic: boolean;
  LinkedDate: string;
  AttachmentCreatedDate: string;
  LinkedByName: string;
  AttachmentCreatedByName: string;
}

interface AttachmentsTabProps {
  incidentId: number;
}

export default function AttachmentsTab({ incidentId }: AttachmentsTabProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingAttachment, setViewingAttachment] = useState<Attachment | null>(null);

  // Load attachments when component mounts
  useEffect(() => {
    if (incidentId) {
      loadAttachments();
    }
  }, [incidentId]);

  const loadAttachments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:3014/api/incident/${incidentId}/attachments`, {
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Current User',
          'x-user-email': 'user@example.com',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to load attachments');
      }
      
      const data = await response.json();
      setAttachments(data.data || []);
    } catch (err) {
      console.error('Error loading attachments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load attachments');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number | null | undefined) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteAttachment = async (attachmentId: number) => {
    if (!confirm('Are you sure you want to remove this attachment?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3014/api/incident/attachments/${attachmentId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete attachment');
      }
      
      // Reload attachments
      await loadAttachments();
    } catch (err) {
      console.error('Error deleting attachment:', err);
      alert('Failed to delete attachment. Please try again.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    try {
      // Create FormData to send files
      const formData = new FormData();
      
      // Add all selected files
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      
      // Add form type if needed
      formData.append('formType', 'general');
      
      console.log(`Uploading ${files.length} file(s) for incident ${incidentId}...`);
      
      const response = await fetch(`http://localhost:3014/api/incident/${incidentId}/attachments`, {
        method: 'POST',
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Current User',
          'x-user-email': 'user@example.com',
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Upload successful:', result);
        
        // Show success message
        if (result.data.summary) {
          const { total, successful, failed } = result.data.summary;
          if (failed > 0) {
            alert(`Upload completed: ${successful}/${total} files uploaded successfully. Check console for error details.`);
          } else {
            alert(`All ${successful} file(s) uploaded successfully!`);
          }
        } else {
          alert('Files uploaded successfully!');
        }
        
        // Reload attachments to show the new ones
        await loadAttachments();
      } else {
        throw new Error(result.error || 'Upload failed');
      }
      
    } catch (err) {
      console.error('Error uploading files:', err);
      alert(`Failed to upload files: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
      setShowUploadModal(false);
      // Clear the file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleViewAttachment = (attachment: Attachment) => {
    setViewingAttachment(attachment);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewingAttachment(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading attachments: {error}</p>
        <button 
          onClick={loadAttachments}
          className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="text-gray-500 hover:text-gray-700"
            title="Upload files"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </button>
          <button
            onClick={loadAttachments}
            className="text-gray-500 hover:text-gray-700"
            title="Refresh"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Attachments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attached By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Form Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attachments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                  No attachments have been uploaded yet.
                </td>
              </tr>
            ) : (
              attachments.map((attachment) => (
                <tr key={attachment.IncidentAttachmentID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attachment.DisplayName || attachment.FileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(attachment.FileSizeBytes)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attachment.ContentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attachment.LinkedByName || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attachment.FormType || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(attachment.LinkedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteAttachment(attachment.IncidentAttachmentID)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="bg-orange-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upload Files</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX;
                  const y = e.clientY;
                  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
                    setDragActive(false);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                  
                  const files = e.dataTransfer.files;
                  if (files && files.length > 0) {
                    // Create a fake event to reuse the handleFileUpload function
                    const fakeEvent = {
                      target: {
                        files: files
                      }
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleFileUpload(fakeEvent);
                  }
                }}
              >
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select Files</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop files here or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </label>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF, DOC, DOCX, XLS, XLSX, TXT, ZIP, CSV (max 10MB per file)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Attachment Modal */}
      {showViewModal && viewingAttachment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">View Attachment</h2>
              <button
                onClick={closeViewModal}
                className="text-white hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {/* Attachment Details */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Attachment Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">File Name:</span>
                    <p className="text-gray-900">{viewingAttachment.DisplayName || viewingAttachment.FileName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">File Size:</span>
                    <p className="text-gray-900">{formatFileSize(viewingAttachment.FileSizeBytes)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">File Type:</span>
                    <p className="text-gray-900">{viewingAttachment.ContentType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Attached By:</span>
                    <p className="text-gray-900">{viewingAttachment.LinkedByName || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date Added:</span>
                    <p className="text-gray-900">{formatDate(viewingAttachment.LinkedDate)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Form Type:</span>
                    <p className="text-gray-900">{viewingAttachment.FormType || '-'}</p>
                  </div>
                </div>
              </div>

              {/* File Preview */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">File Preview</h3>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  {viewingAttachment.ContentType?.startsWith('image/') ? (
                    <div>
                      <p className="text-gray-600 mb-4">Image Preview:</p>
                      <div className="text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">Image preview not available in simulation mode</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium">File: {viewingAttachment.FileName}</p>
                        <p className="text-sm text-gray-600">Preview not available for this file type</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}