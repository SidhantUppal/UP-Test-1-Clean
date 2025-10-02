// Investigation PDF Generator - Professional formatting for investigation summaries
// Handles conversion of investigation summaries to well-formatted PDF documents

import { InvestigationData } from '../services/investigationService';

export interface PdfGenerationOptions {
  includeCompanyBranding: boolean;
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includeBarrierDiagrams: boolean;
  includeTimeline: boolean;
  includeActionPlan: boolean;
  watermark?: string;
  confidentialityLevel?: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  customFooter?: string;
  documentTemplate: 'standard' | 'executive' | 'regulatory' | 'brief';
}

export interface PdfSection {
  id: string;
  title: string;
  content: string;
  pageBreakBefore?: boolean;
  includeInToc?: boolean;
}

export interface CompanyBranding {
  companyName: string;
  logo?: string; // Base64 or URL
  primaryColor: string;
  secondaryColor: string;
  address?: string;
  website?: string;
  phone?: string;
}

class InvestigationPdfGenerator {
  private defaultBranding: CompanyBranding = {
    companyName: 'Your Company Name',
    primaryColor: '#2563eb', // Blue
    secondaryColor: '#64748b', // Gray
    address: '123 Business Street, City, State 12345',
    website: 'www.yourcompany.com',
    phone: '+1 (555) 123-4567'
  };

  // Generate PDF from investigation data and summary content
  async generateInvestigationSummaryPdf(
    investigation: InvestigationData,
    summaryContent: string,
    options: PdfGenerationOptions = this.getDefaultOptions()
  ): Promise<{ pdfBlob: Blob; filename: string }> {

    // CURRENT: Mock implementation - returns placeholder
    console.log('[Mock] Generating PDF for investigation:', investigation.investigationId);
    console.log('[Mock] PDF options:', options);

    // Create mock PDF blob
    const mockPdfContent = this.generateMockPdfContent(investigation, summaryContent, options);
    const pdfBlob = new Blob([mockPdfContent], { type: 'application/pdf' });

    const filename = this.generateFilename(investigation, options.documentTemplate);

    return { pdfBlob, filename };

    // FUTURE: Real PDF generation implementation
    /*
    try {
      // Generate HTML content with professional styling
      const htmlContent = this.generateHtmlContent(investigation, summaryContent, options);

      // Convert HTML to PDF using chosen library (puppeteer, jsPDF, etc.)
      const pdfBuffer = await this.convertHtmlToPdf(htmlContent, options);

      // Create blob and filename
      const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const filename = this.generateFilename(investigation, options.documentTemplate);

      return { pdfBlob, filename };
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF document');
    }
    */
  }

  // Generate professional HTML content for PDF conversion
  private generateHtmlContent(
    investigation: InvestigationData,
    summaryContent: string,
    options: PdfGenerationOptions
  ): string {
    const sections = this.parseSummaryIntoSections(summaryContent);

    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Investigation Summary - ${investigation.incidentDetails?.reference || 'New Investigation'}</title>
    <style>
        ${this.generatePdfStyles(options)}
    </style>
</head>
<body>
`;

    // Add cover page
    if (options.includeCoverPage) {
      html += this.generateCoverPage(investigation, options);
    }

    // Add table of contents
    if (options.includeTableOfContents) {
      html += this.generateTableOfContents(sections);
    }

    // Add main content sections
    sections.forEach((section, index) => {
      html += this.generateSectionHtml(section, index, options);
    });

    // Add appendices
    if (options.includeActionPlan && investigation.correctiveActions?.length) {
      html += this.generateActionPlanAppendix(investigation);
    }

    if (options.includeTimeline && investigation.timeline) {
      html += this.generateTimelineAppendix(investigation);
    }

    if (options.includeBarrierDiagrams && investigation.barrierAnalysis) {
      html += this.generateBarrierAnalysisAppendix(investigation);
    }

    html += `
    </body>
</html>`;

    return html;
  }

  // Generate CSS styles for PDF
  private generatePdfStyles(options: PdfGenerationOptions): string {
    const branding = this.defaultBranding;

    return `
        @page {
            size: A4;
            margin: 2cm 2cm 3cm 2cm;
            @top-center {
                content: "${options.confidentialityLevel || 'Internal'}";
                font-size: 10pt;
                color: #666;
            }
            @bottom-left {
                content: "${branding.companyName}";
                font-size: 9pt;
                color: #666;
            }
            @bottom-center {
                content: "${options.customFooter || 'Investigation Summary'}";
                font-size: 9pt;
                color: #666;
            }
            @bottom-right {
                content: "Page " counter(page) " of " counter(pages);
                font-size: 9pt;
                color: #666;
            }
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .cover-page {
            page-break-after: always;
            text-align: center;
            padding-top: 3cm;
        }

        .company-logo {
            max-width: 200px;
            max-height: 100px;
            margin-bottom: 2cm;
        }

        .cover-title {
            font-size: 28pt;
            font-weight: bold;
            color: ${branding.primaryColor};
            margin-bottom: 1cm;
        }

        .cover-subtitle {
            font-size: 16pt;
            color: ${branding.secondaryColor};
            margin-bottom: 2cm;
        }

        .cover-details {
            font-size: 12pt;
            line-height: 1.8;
            text-align: left;
            max-width: 400px;
            margin: 0 auto;
        }

        .toc {
            page-break-after: always;
            page-break-before: always;
        }

        .toc-title {
            font-size: 20pt;
            font-weight: bold;
            color: ${branding.primaryColor};
            margin-bottom: 1cm;
            border-bottom: 2px solid ${branding.primaryColor};
            padding-bottom: 10px;
        }

        .toc-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dotted #ccc;
        }

        .toc-item:last-child {
            border-bottom: none;
        }

        .section {
            page-break-inside: avoid;
            margin-bottom: 2cm;
        }

        .section-title {
            font-size: 18pt;
            font-weight: bold;
            color: ${branding.primaryColor};
            margin-bottom: 1cm;
            border-bottom: 2px solid ${branding.primaryColor};
            padding-bottom: 10px;
        }

        .section-content {
            font-size: 11pt;
            line-height: 1.6;
        }

        .section-content h3 {
            font-size: 14pt;
            font-weight: bold;
            color: ${branding.secondaryColor};
            margin-top: 1cm;
            margin-bottom: 0.5cm;
        }

        .section-content h4 {
            font-size: 12pt;
            font-weight: bold;
            color: #555;
            margin-top: 0.8cm;
            margin-bottom: 0.3cm;
        }

        .section-content ul, .section-content ol {
            margin-left: 1cm;
            margin-bottom: 0.5cm;
        }

        .section-content li {
            margin-bottom: 0.3cm;
        }

        .key-findings {
            background-color: #f8f9fa;
            border-left: 4px solid ${branding.primaryColor};
            padding: 1cm;
            margin: 1cm 0;
        }

        .critical-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 4px;
            padding: 0.8cm;
            margin: 0.8cm 0;
        }

        .action-item {
            background-color: #f1f8e9;
            border: 1px solid #c8e6c9;
            border-radius: 4px;
            padding: 0.5cm;
            margin: 0.5cm 0;
        }

        .barrier-diagram {
            text-align: center;
            margin: 1cm 0;
            page-break-inside: avoid;
        }

        .barrier-box {
            display: inline-block;
            border: 2px solid #333;
            padding: 10px;
            margin: 5px;
            background-color: #f9f9f9;
            min-width: 150px;
        }

        .barrier-failed {
            border-color: #dc3545;
            background-color: #f8d7da;
            color: #721c24;
        }

        .barrier-effective {
            border-color: #28a745;
            background-color: #d4edda;
            color: #155724;
        }

        .timeline-container {
            margin: 1cm 0;
        }

        .timeline-item {
            display: flex;
            margin-bottom: 0.5cm;
            align-items: flex-start;
        }

        .timeline-date {
            min-width: 100px;
            font-weight: bold;
            color: ${branding.primaryColor};
        }

        .timeline-content {
            flex: 1;
            margin-left: 1cm;
            padding-left: 1cm;
            border-left: 2px solid ${branding.primaryColor};
        }

        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 72pt;
            color: rgba(0, 0, 0, 0.1);
            z-index: -1;
        }

        .confidentiality-header {
            text-align: center;
            font-weight: bold;
            color: #dc3545;
            font-size: 14pt;
            margin-bottom: 1cm;
        }

        .page-break {
            page-break-before: always;
        }

        @media print {
            .no-print {
                display: none;
            }
        }
    `;
  }

  // Generate cover page
  private generateCoverPage(investigation: InvestigationData, options: PdfGenerationOptions): string {
    const branding = this.defaultBranding;
    const currentDate = new Date().toLocaleDateString();

    return `
    <div class="cover-page">
        ${options.includeCompanyBranding ? `
            <img src="${branding.logo || '/default-logo.png'}" alt="${branding.companyName}" class="company-logo">
        ` : ''}

        <h1 class="cover-title">Investigation Summary</h1>
        <h2 class="cover-subtitle">${investigation.incidentDetails?.reference || 'Investigation Report'}</h2>

        ${options.confidentialityLevel ? `
            <div class="confidentiality-header">${options.confidentialityLevel.toUpperCase()}</div>
        ` : ''}

        <div class="cover-details">
            <table>
                <tr>
                    <td><strong>Incident Date:</strong></td>
                    <td>${investigation.incidentDetails?.date ? new Date(investigation.incidentDetails.date).toLocaleDateString() : 'Not specified'}</td>
                </tr>
                <tr>
                    <td><strong>Location:</strong></td>
                    <td>${investigation.incidentDetails?.location || 'Not specified'}</td>
                </tr>
                <tr>
                    <td><strong>Report Generated:</strong></td>
                    <td>${currentDate}</td>
                </tr>
                <tr>
                    <td><strong>Investigation Team:</strong></td>
                    <td>${investigation.investigationTeam?.join(', ') || 'Not assigned'}</td>
                </tr>
                <tr>
                    <td><strong>Status:</strong></td>
                    <td>${investigation.status || 'In Progress'}</td>
                </tr>
            </table>
        </div>

        ${options.includeCompanyBranding ? `
            <div style="position: absolute; bottom: 2cm; left: 50%; transform: translateX(-50%); text-align: center; color: #666;">
                <p>${branding.companyName}<br>
                ${branding.address}<br>
                ${branding.phone} | ${branding.website}</p>
            </div>
        ` : ''}
    </div>
    `;
  }

  // Generate table of contents
  private generateTableOfContents(sections: PdfSection[]): string {
    const tocItems = sections
      .filter(section => section.includeInToc !== false)
      .map((section, index) => `
        <div class="toc-item">
            <span>${section.title}</span>
            <span>${index + 1}</span>
        </div>
      `).join('');

    return `
    <div class="toc">
        <h1 class="toc-title">Table of Contents</h1>
        ${tocItems}
    </div>
    `;
  }

  // Parse summary content into sections
  private parseSummaryIntoSections(content: string): PdfSection[] {
    const lines = content.split('\n');
    const sections: PdfSection[] = [];
    let currentSection: PdfSection | null = null;

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        // New section
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          id: line.replace('## ', '').toLowerCase().replace(/\s+/g, '_'),
          title: line.replace('## ', ''),
          content: '',
          includeInToc: true
        };
      } else if (currentSection) {
        // Add to current section content
        currentSection.content += line + '\n';
      }
    });

    // Add final section
    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }

  // Generate HTML for a section
  private generateSectionHtml(section: PdfSection, index: number, options: PdfGenerationOptions): string {
    // Convert markdown-like content to HTML
    let htmlContent = section.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '');

    return `
    <div class="section ${section.pageBreakBefore ? 'page-break' : ''}">
        <h2 class="section-title">${section.title}</h2>
        <div class="section-content">
            ${htmlContent}
        </div>
    </div>
    `;
  }

  // Generate action plan appendix
  private generateActionPlanAppendix(investigation: InvestigationData): string {
    if (!investigation.correctiveActions?.length) return '';

    const actionItems = investigation.correctiveActions.map(action => `
        <div class="action-item">
            <h4>${action.description}</h4>
            <p><strong>Assigned to:</strong> ${action.assignedTo}</p>
            <p><strong>Due Date:</strong> ${action.dueDate ? new Date(action.dueDate).toLocaleDateString() : 'Not set'}</p>
            <p><strong>Status:</strong> ${action.status}</p>
            ${action.notes ? `<p><strong>Notes:</strong> ${action.notes}</p>` : ''}
        </div>
    `).join('');

    return `
    <div class="section page-break">
        <h2 class="section-title">Appendix A: Action Plan</h2>
        <div class="section-content">
            ${actionItems}
        </div>
    </div>
    `;
  }

  // Generate timeline appendix
  private generateTimelineAppendix(investigation: InvestigationData): string {
    const timelineItems = [
      { date: investigation.timeline?.start, event: 'Investigation Started' },
      { date: investigation.incidentDetails?.date ? new Date(investigation.incidentDetails.date) : null, event: 'Incident Occurred' },
      { date: investigation.timeline?.target, event: 'Target Completion' },
      { date: investigation.timeline?.actual, event: 'Investigation Completed' }
    ].filter(item => item.date);

    const timelineHtml = timelineItems.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">${item.date?.toLocaleDateString()}</div>
            <div class="timeline-content">${item.event}</div>
        </div>
    `).join('');

    return `
    <div class="section page-break">
        <h2 class="section-title">Appendix B: Investigation Timeline</h2>
        <div class="section-content">
            <div class="timeline-container">
                ${timelineHtml}
            </div>
        </div>
    </div>
    `;
  }

  // Generate barrier analysis appendix
  private generateBarrierAnalysisAppendix(investigation: InvestigationData): string {
    if (!investigation.barrierAnalysis) return '';

    const failedBarriers = investigation.barrierAnalysis.failedBarriers?.map(barrier => `
        <div class="barrier-box barrier-failed">
            <strong>${barrier.name}</strong><br>
            Failed: ${barrier.failureReason}
        </div>
    `).join('') || '';

    const effectiveBarriers = investigation.barrierAnalysis.effectiveBarriers?.map(barrier => `
        <div class="barrier-box barrier-effective">
            <strong>${barrier.name}</strong><br>
            Effective: Prevented escalation
        </div>
    `).join('') || '';

    return `
    <div class="section page-break">
        <h2 class="section-title">Appendix C: Barrier Analysis</h2>
        <div class="section-content">
            <h3>Failed Barriers</h3>
            <div class="barrier-diagram">
                ${failedBarriers}
            </div>

            <h3>Effective Barriers</h3>
            <div class="barrier-diagram">
                ${effectiveBarriers}
            </div>
        </div>
    </div>
    `;
  }

  // Generate filename for PDF
  private generateFilename(investigation: InvestigationData, template: string): string {
    const reference = investigation.incidentDetails?.reference || 'INV';
    const date = new Date().toISOString().split('T')[0];
    const templateSuffix = template !== 'standard' ? `_${template}` : '';

    return `Investigation_Summary_${reference}_${date}${templateSuffix}.pdf`;
  }

  // Get default PDF generation options
  private getDefaultOptions(): PdfGenerationOptions {
    return {
      includeCompanyBranding: true,
      includeCoverPage: true,
      includeTableOfContents: true,
      includeBarrierDiagrams: true,
      includeTimeline: true,
      includeActionPlan: true,
      confidentialityLevel: 'Internal',
      documentTemplate: 'standard'
    };
  }

  // Mock PDF content generation (for current implementation)
  private generateMockPdfContent(
    investigation: InvestigationData,
    summaryContent: string,
    options: PdfGenerationOptions
  ): string {
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

5 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
72 720 Td
(Investigation Summary - ${investigation.incidentDetails?.reference || 'Mock Document'}) Tj
0 -20 Td
(Generated: ${new Date().toLocaleDateString()}) Tj
0 -40 Td
(This is a mock PDF document.) Tj
0 -20 Td
(In production, this would contain the full investigation summary.) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f
0000000010 00000 n
0000000053 00000 n
0000000110 00000 n
0000000252 00000 n
0000000329 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
620
%%EOF`;
  }

  // FUTURE: Real PDF conversion implementation
  /*
  private async convertHtmlToPdf(htmlContent: string, options: PdfGenerationOptions): Promise<Buffer> {
    // Option 1: Using Puppeteer (server-side)
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '3cm',
        left: '2cm'
      }
    });

    await browser.close();
    return pdfBuffer;

    // Option 2: Using jsPDF (client-side)
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();

    // Convert HTML to PDF using jsPDF
    doc.html(htmlContent, {
      callback: function (doc) {
        return doc.output('arraybuffer');
      },
      x: 10,
      y: 10
    });

    // Option 3: Using html2pdf.js (client-side)
    const html2pdf = require('html2pdf.js');

    const opt = {
      margin: 1,
      filename: 'investigation-summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    return html2pdf().set(opt).from(htmlContent).outputPdf('arraybuffer');
  }
  */
}

// Export singleton instance
export const investigationPdfGenerator = new InvestigationPdfGenerator();

// ==================== USAGE EXAMPLES ====================
/*
// Basic PDF generation
const { pdfBlob, filename } = await investigationPdfGenerator.generateInvestigationSummaryPdf(
  investigation,
  summaryContent
);

// Advanced PDF generation with custom options
const { pdfBlob, filename } = await investigationPdfGenerator.generateInvestigationSummaryPdf(
  investigation,
  summaryContent,
  {
    includeCompanyBranding: true,
    includeCoverPage: true,
    includeTableOfContents: true,
    includeBarrierDiagrams: true,
    includeTimeline: true,
    includeActionPlan: true,
    watermark: 'CONFIDENTIAL',
    confidentialityLevel: 'Confidential',
    customFooter: 'Investigation Report - Internal Use Only',
    documentTemplate: 'executive'
  }
);

// Download generated PDF
const url = URL.createObjectURL(pdfBlob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();
URL.revokeObjectURL(url);
*/

export type { PdfGenerationOptions, PdfSection, CompanyBranding };