// Document Parser Service
// This service handles document parsing with GPT integration and local demo support

export interface ParsedDocument {
  originalContent: string;
  parsedContent: string;
  extractedTags: ExtractedTag[];
  documentType: string;
  confidence: number;
}

export interface ExtractedTag {
  tag: string;
  cleanName: string;
  value: string;
  count: number;
  description?: string;
  dataType?: 'text' | 'date' | 'number' | 'email' | 'phone';
  required?: boolean;
}

// Sample document templates for demos
export const DEMO_TEMPLATES = {
  employmentContract: {
    title: 'Employment Contract',
    content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of <start_date>, between <company_name> ("Company"), a corporation organized under the laws of <company_state>, and <employee_name> ("Employee").

1. POSITION AND DUTIES
The Company hereby employs the Employee as <position_title>. The Employee shall report to <supervisor_name> and shall perform such duties as are customarily associated with this position.

2. COMPENSATION
The Employee shall receive an annual salary of $<salary_amount>, payable in accordance with the Company's standard payroll practices. The Employee shall also be eligible for <benefits_description>.

3. WORK LOCATION
The Employee's principal place of work shall be at <work_location>. The Employee may be required to work <remote_days> days per week remotely.

4. START DATE
The Employee's employment shall commence on <start_date> and continue until terminated in accordance with this Agreement.

5. CONFIDENTIALITY
The Employee agrees to maintain the confidentiality of all proprietary information belonging to the Company.

Signed on <signature_date>

_____________________                    _____________________
<company_representative>                  <employee_name>
Company Representative                    Employee`,
    tags: [
      { tag: '<start_date>', cleanName: 'Start Date', dataType: 'date', required: true },
      { tag: '<company_name>', cleanName: 'Company Name', dataType: 'text', required: true },
      { tag: '<company_state>', cleanName: 'Company State', dataType: 'text', required: true },
      { tag: '<employee_name>', cleanName: 'Employee Name', dataType: 'text', required: true },
      { tag: '<position_title>', cleanName: 'Position Title', dataType: 'text', required: true },
      { tag: '<supervisor_name>', cleanName: 'Supervisor Name', dataType: 'text', required: true },
      { tag: '<salary_amount>', cleanName: 'Salary Amount', dataType: 'number', required: true },
      { tag: '<benefits_description>', cleanName: 'Benefits Description', dataType: 'text', required: false },
      { tag: '<work_location>', cleanName: 'Work Location', dataType: 'text', required: true },
      { tag: '<remote_days>', cleanName: 'Remote Days', dataType: 'number', required: false },
      { tag: '<signature_date>', cleanName: 'Signature Date', dataType: 'date', required: true },
      { tag: '<company_representative>', cleanName: 'Company Representative', dataType: 'text', required: true }
    ]
  },
  
  nda: {
    title: 'Non-Disclosure Agreement',
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is entered into as of {{date}} by and between:

Disclosing Party: {{disclosing_party}}
Address: {{disclosing_address}}

Receiving Party: {{receiving_party}}
Address: {{receiving_address}}

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any and all information disclosed by the Disclosing Party to the Receiving Party, including but not limited to {{confidential_items}}.

2. OBLIGATIONS
The Receiving Party agrees to:
- Hold the Confidential Information in strict confidence
- Not disclose the Confidential Information to any third parties
- Use the Confidential Information solely for {{purpose}}

3. TERM
This Agreement shall remain in effect for {{term_years}} years from the date first written above.

4. RETURN OF INFORMATION
Upon request, the Receiving Party shall return all Confidential Information within {{return_days}} days.

AGREED AND ACCEPTED:

_____________________                    _____________________
{{disclosing_signature}}                  {{receiving_signature}}
Disclosing Party                         Receiving Party
Date: {{signature_date}}                 Date: {{signature_date}}`,
    tags: [
      { tag: '{{date}}', cleanName: 'Agreement Date', dataType: 'date', required: true },
      { tag: '{{disclosing_party}}', cleanName: 'Disclosing Party', dataType: 'text', required: true },
      { tag: '{{disclosing_address}}', cleanName: 'Disclosing Party Address', dataType: 'text', required: true },
      { tag: '{{receiving_party}}', cleanName: 'Receiving Party', dataType: 'text', required: true },
      { tag: '{{receiving_address}}', cleanName: 'Receiving Party Address', dataType: 'text', required: true },
      { tag: '{{confidential_items}}', cleanName: 'Confidential Items', dataType: 'text', required: true },
      { tag: '{{purpose}}', cleanName: 'Purpose', dataType: 'text', required: true },
      { tag: '{{term_years}}', cleanName: 'Term (Years)', dataType: 'number', required: true },
      { tag: '{{return_days}}', cleanName: 'Return Days', dataType: 'number', required: true },
      { tag: '{{disclosing_signature}}', cleanName: 'Disclosing Party Signature', dataType: 'text', required: true },
      { tag: '{{receiving_signature}}', cleanName: 'Receiving Party Signature', dataType: 'text', required: true },
      { tag: '{{signature_date}}', cleanName: 'Signature Date', dataType: 'date', required: true }
    ]
  },

  purchaseOrder: {
    title: 'Purchase Order',
    content: `PURCHASE ORDER

PO Number: ${`{po_number}`}
Date: ${`{order_date}`}
Delivery Date: ${`{delivery_date}`}

VENDOR INFORMATION:
${`{vendor_name}`}
${`{vendor_address}`}
Contact: ${`{vendor_contact}`}
Email: ${`{vendor_email}`}

SHIP TO:
${`{company_name}`}
${`{shipping_address}`}
Attention: ${`{attention_to}`}

ITEMS:
[item_description] - Quantity: [item_quantity] - Unit Price: $[unit_price] - Total: $[line_total]

SUBTOTAL: $[subtotal]
TAX ([tax_rate]%): $[tax_amount]
SHIPPING: $[shipping_cost]
TOTAL: $[total_amount]

PAYMENT TERMS: [payment_terms]
SPECIAL INSTRUCTIONS: [special_instructions]

Authorized By: [authorized_signature]
Date: [authorization_date]`,
    tags: [
      { tag: '${po_number}', cleanName: 'PO Number', dataType: 'text', required: true },
      { tag: '${order_date}', cleanName: 'Order Date', dataType: 'date', required: true },
      { tag: '${delivery_date}', cleanName: 'Delivery Date', dataType: 'date', required: true },
      { tag: '${vendor_name}', cleanName: 'Vendor Name', dataType: 'text', required: true },
      { tag: '${vendor_address}', cleanName: 'Vendor Address', dataType: 'text', required: true },
      { tag: '${vendor_contact}', cleanName: 'Vendor Contact', dataType: 'text', required: true },
      { tag: '${vendor_email}', cleanName: 'Vendor Email', dataType: 'email', required: true },
      { tag: '${company_name}', cleanName: 'Company Name', dataType: 'text', required: true },
      { tag: '${shipping_address}', cleanName: 'Shipping Address', dataType: 'text', required: true },
      { tag: '${attention_to}', cleanName: 'Attention To', dataType: 'text', required: false },
      { tag: '[item_description]', cleanName: 'Item Description', dataType: 'text', required: true },
      { tag: '[item_quantity]', cleanName: 'Item Quantity', dataType: 'number', required: true },
      { tag: '[unit_price]', cleanName: 'Unit Price', dataType: 'number', required: true },
      { tag: '[line_total]', cleanName: 'Line Total', dataType: 'number', required: true },
      { tag: '[subtotal]', cleanName: 'Subtotal', dataType: 'number', required: true },
      { tag: '[tax_rate]', cleanName: 'Tax Rate', dataType: 'number', required: true },
      { tag: '[tax_amount]', cleanName: 'Tax Amount', dataType: 'number', required: true },
      { tag: '[shipping_cost]', cleanName: 'Shipping Cost', dataType: 'number', required: true },
      { tag: '[total_amount]', cleanName: 'Total Amount', dataType: 'number', required: true },
      { tag: '[payment_terms]', cleanName: 'Payment Terms', dataType: 'text', required: true },
      { tag: '[special_instructions]', cleanName: 'Special Instructions', dataType: 'text', required: false },
      { tag: '[authorized_signature]', cleanName: 'Authorized Signature', dataType: 'text', required: true },
      { tag: '[authorization_date]', cleanName: 'Authorization Date', dataType: 'date', required: true }
    ]
  },

  certificateOfCompletion: {
    title: 'Certificate of Completion',
    content: `CERTIFICATE OF COMPLETION

This is to certify that

<participant_name>

has successfully completed the

<course_title>

conducted by <organisation_name>

Duration: <course_duration>
Date: <completion_date>

Grade/Score: <final_score>%

This certificate is awarded in recognition of the successful completion of all course requirements.

_____________________              _____________________
<instructor_name>                   <director_name>
Course Instructor                   Training Director

Certificate ID: <certificate_id>
Issued on: <issue_date>
Valid until: <expiry_date>`,
    tags: [
      { tag: '<participant_name>', cleanName: 'Participant Name', dataType: 'text', required: true },
      { tag: '<course_title>', cleanName: 'Course Title', dataType: 'text', required: true },
      { tag: '<organisation_name>', cleanName: 'Organisation Name', dataType: 'text', required: true },
      { tag: '<course_duration>', cleanName: 'Course Duration', dataType: 'text', required: true },
      { tag: '<completion_date>', cleanName: 'Completion Date', dataType: 'date', required: true },
      { tag: '<final_score>', cleanName: 'Final Score', dataType: 'number', required: true },
      { tag: '<instructor_name>', cleanName: 'Instructor Name', dataType: 'text', required: true },
      { tag: '<director_name>', cleanName: 'Director Name', dataType: 'text', required: true },
      { tag: '<certificate_id>', cleanName: 'Certificate ID', dataType: 'text', required: true },
      { tag: '<issue_date>', cleanName: 'Issue Date', dataType: 'date', required: true },
      { tag: '<expiry_date>', cleanName: 'Expiry Date', dataType: 'date', required: false }
    ]
  }
};

// Extract tags from document content
export function extractTagsFromContent(content: string): ExtractedTag[] {
  const tagPatterns = [
    /<([^>]+)>/g,           // <tag>
    /\{\{([^}]+)\}\}/g,    // {{tag}}
    /\$\{([^}]+)\}/g,       // ${tag}
    /\[([^\]]+)\]/g        // [tag]
  ];
  
  const foundTags = new Map<string, { count: number, cleanName: string }>();
  
  tagPatterns.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const tag = match[0];
      const cleanName = match[1].trim();
      if (foundTags.has(tag)) {
        foundTags.get(tag)!.count++;
      } else {
        foundTags.set(tag, { count: 1, cleanName });
      }
    }
  });
  
  const tags: ExtractedTag[] = [];
  foundTags.forEach((data, tag) => {
    tags.push({
      tag,
      cleanName: formatCleanName(data.cleanName),
      value: '',
      count: data.count,
      dataType: inferDataType(data.cleanName)
    });
  });
  
  return tags.sort((a, b) => a.cleanName.localeCompare(b.cleanName));
}

// Format clean name from tag
function formatCleanName(name: string): string {
  return name
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Infer data type from tag name
function inferDataType(name: string): 'text' | 'date' | 'number' | 'email' | 'phone' {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('date') || lowerName.includes('time')) return 'date';
  if (lowerName.includes('email')) return 'email';
  if (lowerName.includes('phone') || lowerName.includes('tel')) return 'phone';
  if (lowerName.includes('amount') || lowerName.includes('price') || 
      lowerName.includes('cost') || lowerName.includes('quantity') ||
      lowerName.includes('number') || lowerName.includes('count') ||
      lowerName.includes('rate') || lowerName.includes('score')) return 'number';
  
  return 'text';
}

// Parse document with GPT (mock for demo)
export async function parseDocumentWithGPT(content: string): Promise<ParsedDocument> {
  // In production, this would call your GPT API
  // For demo, we'll use local pattern matching
  
  const extractedTags = extractTagsFromContent(content);
  
  // Determine document type based on content
  let documentType = 'general';
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('employment') && lowerContent.includes('agreement')) {
    documentType = 'employment_contract';
  } else if (lowerContent.includes('non-disclosure') || lowerContent.includes('nda')) {
    documentType = 'nda';
  } else if (lowerContent.includes('purchase order') || lowerContent.includes('po number')) {
    documentType = 'purchase_order';
  } else if (lowerContent.includes('certificate') && lowerContent.includes('completion')) {
    documentType = 'certificate';
  } else if (lowerContent.includes('invoice')) {
    documentType = 'invoice';
  } else if (lowerContent.includes('contract')) {
    documentType = 'contract';
  }
  
  return {
    originalContent: content,
    parsedContent: content,
    extractedTags,
    documentType,
    confidence: 0.95 // Mock confidence score
  };
}

// Generate document from template
export function generateDocumentFromTemplate(
  template: string, 
  tagValues: Record<string, string>
): string {
  let result = template;
  
  // Replace all tag formats
  Object.entries(tagValues).forEach(([tag, value]) => {
    if (value) {
      // Escape special regex characters in tag
      const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(escapedTag, 'g'), value);
    }
  });
  
  return result;
}

// Validate tag values
export function validateTagValues(
  tags: ExtractedTag[], 
  values: Record<string, string>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  tags.forEach(tag => {
    const value = values[tag.tag];
    
    // Check required fields
    if (tag.required && (!value || value.trim() === '')) {
      errors.push(`${tag.cleanName} is required`);
      return;
    }
    
    // Skip validation if not required and empty
    if (!value || value.trim() === '') return;
    
    // Validate data types
    switch (tag.dataType) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push(`${tag.cleanName} must be a valid email address`);
        }
        break;
        
      case 'phone':
        if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
          errors.push(`${tag.cleanName} must be a valid phone number`);
        }
        break;
        
      case 'number':
        if (isNaN(Number(value))) {
          errors.push(`${tag.cleanName} must be a number`);
        }
        break;
        
      case 'date':
        if (isNaN(Date.parse(value))) {
          errors.push(`${tag.cleanName} must be a valid date`);
        }
        break;
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Export demo functionality
export const DocumentParserDemo = {
  templates: DEMO_TEMPLATES,
  
  loadTemplate(templateKey: keyof typeof DEMO_TEMPLATES) {
    return DEMO_TEMPLATES[templateKey];
  },
  
  getAllTemplates() {
    return Object.entries(DEMO_TEMPLATES).map(([key, template]) => ({
      key,
      title: template.title,
      tagCount: template.tags.length
    }));
  }
};