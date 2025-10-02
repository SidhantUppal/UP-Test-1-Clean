import mammoth from 'mammoth';

// Dynamic import for PDF.js to avoid server-side issues
let pdfjsLib: typeof import('pdfjs-dist') | null = null;
if (typeof window !== 'undefined') {
  // Client-side PDF processing
  import('pdfjs-dist').then((pdfjs) => {
    pdfjsLib = pdfjs;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  });
}

interface ProcessedDocument {
  content: string;
  metadata: {
    fileName: string;
    fileSize: number;
    fileType: string;
    pageCount?: number;
    wordCount: number;
    extractedAt: string;
  };
  success: boolean;
  error?: string;
}

export class DocumentProcessor {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly SUPPORTED_TYPES = [
    // 'application/pdf', // Temporarily disabled due to server-side issues
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/msword', // .doc
    'text/plain',
    'text/markdown'
  ];

  static async processFile(file: File): Promise<ProcessedDocument> {
    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        content: '',
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          wordCount: 0,
          extractedAt: new Date().toISOString()
        },
        success: false,
        error: `File size exceeds maximum limit of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`
      };
    }

    // Validate file type
    if (!this.SUPPORTED_TYPES.includes(file.type)) {
      return {
        content: '',
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          wordCount: 0,
          extractedAt: new Date().toISOString()
        },
        success: false,
        error: `Unsupported file type: ${file.type}. Supported types: PDF, Word (.docx, .doc), Text (.txt), Markdown (.md)`
      };
    }

    try {
      let content: string;
      let pageCount: number | undefined;

      switch (file.type) {
        case 'application/pdf':
          throw new Error('PDF processing is temporarily disabled. Please use Word (.docx) or text files.');
        
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          content = await this.processWordDocx(file);
          break;
        
        case 'application/msword':
          content = await this.processWordDoc(file);
          break;
        
        case 'text/plain':
        case 'text/markdown':
          content = await this.processTextFile(file);
          break;
        
        default:
          throw new Error(`Unsupported file type: ${file.type}`);
      }

      // Clean and validate content
      const cleanedContent = this.cleanContent(content);
      if (!cleanedContent || cleanedContent.trim().length === 0) {
        throw new Error('No readable content found in document');
      }

      return {
        content: cleanedContent,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          pageCount,
          wordCount: this.countWords(cleanedContent),
          extractedAt: new Date().toISOString()
        },
        success: true
      };

    } catch (error) {
      return {
        content: '',
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          wordCount: 0,
          extractedAt: new Date().toISOString()
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error processing document'
      };
    }
  }

  private static async processPDF(file: File): Promise<{ content: string; pageCount: number }> {
    if (!pdfjsLib) {
      throw new Error('PDF processing not available on server-side. Please process PDF files on the client.');
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pageCount = pdf.numPages;
    
    let fullText = '';
    
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter(item => 'str' in item)
        .map(item => (item as any).str)
        .join(' ');
      
      fullText += pageText + '\n';
    }
    
    return {
      content: fullText,
      pageCount
    };
  }

  private static async processWordDocx(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  private static async processWordDoc(file: File): Promise<string> {
    // For .doc files, we'll use mammoth as well (it has some support)
    // In a production environment, you might want to use a different library
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  private static async processTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content || '');
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  }

  private static cleanContent(content: string): string {
    return content
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove excessive line breaks
      .replace(/\n{3,}/g, '\n\n')
      // Trim each line
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      // Remove empty lines at start and end
      .trim();
  }

  private static countWords(content: string): number {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  // Helper method to get file extension from filename
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  // Helper method to validate file before processing
  static validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`
      };
    }

    // Allow empty mime type for some text files
    const fileExt = this.getFileExtension(file.name);
    const isTextFile = ['txt', 'md', 'text'].includes(fileExt);
    
    if (!this.SUPPORTED_TYPES.includes(file.type) && !isTextFile) {
      return {
        valid: false,
        error: `Unsupported file type: ${file.type || 'unknown'} (${fileExt})`
      };
    }

    return { valid: true };
  }

  // Helper method to get human-readable file type
  static getFileTypeDescription(mimeType: string): string {
    const typeMap: Record<string, string> = {
      // 'application/pdf': 'PDF Document', // Temporarily disabled
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document (.docx)',
      'application/msword': 'Word Document (.doc)',
      'text/plain': 'Text File',
      'text/markdown': 'Markdown File'
    };

    return typeMap[mimeType] || 'Unknown Document Type';
  }
}

// Export types for use in other modules
export type { ProcessedDocument };