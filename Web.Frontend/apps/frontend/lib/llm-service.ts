import Anthropic from '@anthropic-ai/sdk';

interface ChecklistQuestion {
  text: string;
  type: 'yn-na' | 'yn-na-dk' | 'checkbox' | 'score-5' | 'score-10' | 'pass-fail' | 'text' | 'number' | 'dropdown';
  required?: boolean;
  options?: string[];
  helpText?: string;
  category?: string;
}

interface ExtractedChecklist {
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  questions: ChecklistQuestion[];
}

export class LLMService {
  private anthropic: Anthropic | null = null;
  private useMockMode: boolean = true; // FORCE MOCK MODE - NO EXTERNAL API CALLS

  constructor() {
    // COMMENTED OUT FOR DEVELOPER TEST - NO EXTERNAL API CONNECTIONS
    // if (!process.env.ANTHROPIC_API_KEY) {
    //   console.warn('Anthropic API key not configured. Using mock mode for demonstration.');
    //   this.useMockMode = true;
    // } else {
    //   this.anthropic = new Anthropic({
    //     apiKey: process.env.ANTHROPIC_API_KEY,
    //   });
    // }
    console.info('🔒 LLM Service: Running in mock mode (no external API calls)');
  }

  async extractChecklistFromDocument(
    documentContent: string,
    options?: {
      extractionPrompt?: string;
      questionStyle?: 'clear-and-specific' | 'detailed' | 'concise';
      includeContext?: boolean;
      maxQuestions?: number;
    }
  ): Promise<ExtractedChecklist> {
    const {
      extractionPrompt = 'Convert this checklist to T100 format',
      questionStyle = 'clear-and-specific',
      includeContext = true,
      maxQuestions = 50
    } = options || {};

    const systemPrompt = `You are a T100 Platform checklist converter. Your task is to convert existing checklists into the T100 format.

IMPORTANT: The documents you receive are ALREADY CHECKLISTS - not procedures or manuals. Simply convert the existing checklist items into T100 format.

CONVERSION RULES:
1. If an item is already a question → keep it as-is
2. If an item is a statement (e.g., "Check oil level") → convert to question (e.g., "Is the oil level checked?")
3. If an item has ☐ or checkbox → use yn-na type
4. If an item has multiple choice options → use dropdown type
5. If an item asks for a rating/score → use score-5 or score-10
6. If an item asks for text/numbers → use text or number type
7. Preserve the original checklist structure and order

QUESTION CONVERSION EXAMPLES:
- "Fire extinguisher inspection" → "Has the fire extinguisher been inspected?"
- "☐ PPE worn" → "Is PPE being worn?"
- "Rate cleanliness (1-5)" → Keep as-is, use score-5 type
- "Serial number: _____" → "Enter the serial number", use text type
- "Emergency exits clear" → "Are the emergency exits clear?"

QUESTION TYPE SELECTION:
- yn-na: Default for yes/no items (most common)
- checkbox: Simple checkbox items
- pass-fail: Items marked as Pass/Fail
- score-5: 1-5 rating scales
- score-10: 1-10 rating scales
- text: Fill-in-the-blank text items
- number: Numeric entries (counts, measurements)
- dropdown: Multiple choice items

RESPONSE FORMAT - RETURN ONLY THIS JSON:
{
  "title": "Use the checklist title from the document",
  "description": "Brief description or purpose from the document",
  "category": "safety|quality|maintenance|compliance|operations",
  "estimatedTime": "15 minutes",
  "questions": [
    {
      "text": "The converted question text",
      "type": "yn-na|checkbox|pass-fail|score-5|score-10|text|number|dropdown",
      "required": true,
      "category": "Section heading from original checklist if present"
    }
  ]
}

IMPORTANT NOTES:
- Keep ALL items from the original checklist
- Maintain the original order
- Use section headings as question categories
- Don't add extra questions or explanations
- This is a FORMAT CONVERSION, not content creation`;

    const userPrompt = `Convert this existing checklist into T100 format. This document is already a checklist - just reformat the items.

Checklist Document:
${documentContent}

Convert each checklist item into the T100 format, preserving all original items and their order.`;

    try {
      let extractedChecklist: ExtractedChecklist;

      if (this.useMockMode) {
        // Mock implementation for demonstration
        extractedChecklist = await this.mockExtractChecklist(documentContent);
      } else {
        // Real API call
        const response = await this.anthropic!.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          temperature: 0.3,
          system: systemPrompt,
          messages: [
            { 
              role: 'user', 
              content: userPrompt 
            }
          ]
        });

        const content = response.content[0];
        if (content.type !== 'text') {
          throw new Error('Unexpected response type from Claude');
        }

        // Extract JSON from the response (Claude sometimes adds explanation text)
        console.log('Claude response:', content.text);
        
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error('Claude response did not contain valid JSON:', content.text);
          throw new Error('No valid JSON found in Claude response. Please try again.');
        }

        try {
          extractedChecklist = JSON.parse(jsonMatch[0]) as ExtractedChecklist;
        } catch (parseError) {
          console.error('Failed to parse JSON:', jsonMatch[0]);
          throw new Error('Failed to parse checklist data. Please try again.');
        }
      }
      
      // Validate and clean the response
      return this.validateAndCleanChecklist(extractedChecklist);
      
    } catch (error) {
      console.error('Error extracting checklist:', error);
      throw new Error(`Failed to extract checklist: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private validateAndCleanChecklist(checklist: ExtractedChecklist): ExtractedChecklist {
    // Ensure required fields exist
    if (!checklist.title || !checklist.questions || !Array.isArray(checklist.questions)) {
      throw new Error('Invalid checklist structure: missing required fields');
    }

    // Clean and validate questions
    const cleanedQuestions = checklist.questions
      .filter(q => q.text && q.text.trim().length > 0)
      .map(q => ({
        text: q.text.trim(),
        type: this.validateQuestionType(q.type),
        required: q.required !== false, // Default to true
        helpText: q.helpText?.trim(),
        category: q.category?.trim(),
        options: q.type === 'dropdown' ? q.options?.filter(opt => opt.trim().length > 0) : undefined
      }))
      .slice(0, 25); // Limit to 25 questions

    // Ensure at least one question exists
    if (cleanedQuestions.length === 0) {
      throw new Error('No valid questions found in document');
    }

    return {
      title: checklist.title.trim(),
      description: checklist.description?.trim() || 'Checklist extracted from document',
      category: this.validateCategory(checklist.category),
      estimatedTime: checklist.estimatedTime?.trim() || '15 minutes',
      questions: cleanedQuestions
    };
  }

  private validateQuestionType(type: string): ChecklistQuestion['type'] {
    const validTypes: ChecklistQuestion['type'][] = [
      'yn-na', 'yn-na-dk', 'checkbox', 'score-5', 'score-10', 'pass-fail', 'text', 'number', 'dropdown'
    ];
    
    return validTypes.includes(type as ChecklistQuestion['type']) 
      ? type as ChecklistQuestion['type']
      : 'yn-na'; // Default fallback
  }

  private validateCategory(category: string): string {
    const validCategories = ['safety', 'quality', 'maintenance', 'compliance', 'operations'];
    return validCategories.includes(category?.toLowerCase()) 
      ? category.toLowerCase()
      : 'compliance'; // Default fallback
  }

  private async mockExtractChecklist(documentContent: string): Promise<ExtractedChecklist> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Parse the document content to extract checklist items
    const lines = documentContent.split('\n').filter(line => line.trim());
    const questions: ChecklistQuestion[] = [];
    
    // Try to find title
    let title = 'Imported Checklist';
    const titleMatch = lines.find(line => 
      line.toLowerCase().includes('checklist') || 
      line.toLowerCase().includes('inspection') ||
      line.toLowerCase().includes('audit')
    );
    if (titleMatch) {
      title = titleMatch.replace(/[:\-]/g, '').trim();
    }

    // Extract questions from common checklist patterns
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and headers
      if (!trimmedLine || trimmedLine.length < 5) continue;
      
      // Detect checklist items
      const checklistPatterns = [
        /^[\u2610\u2611\u2612☐☑☒]\s*(.+)/, // Checkbox symbols
        /^[-*•]\s*(.+)/, // Bullet points
        /^\d+\.\s*(.+)/, // Numbered lists
        /^[a-z]\)\s*(.+)/i, // Letter lists
        /^\[[\s\]]\s*(.+)/, // Bracket checkboxes
      ];

      let itemText = '';
      let matched = false;

      for (const pattern of checklistPatterns) {
        const match = trimmedLine.match(pattern);
        if (match) {
          itemText = match[1].trim();
          matched = true;
          break;
        }
      }

      // If no pattern matched but line looks like a checklist item
      if (!matched && (
        trimmedLine.endsWith('?') || 
        trimmedLine.includes('check') ||
        trimmedLine.includes('verify') ||
        trimmedLine.includes('ensure') ||
        trimmedLine.includes('inspect')
      )) {
        itemText = trimmedLine;
      }

      if (itemText) {
        // Convert statements to questions if needed
        let questionText = itemText;
        if (!itemText.endsWith('?')) {
          // Common conversions
          const conversions = [
            { pattern: /^(check|verify|ensure|inspect)\s+/i, prefix: 'Have you checked ' },
            { pattern: /^(.+)\s+(completed|done|finished)$/i, prefix: 'Has ', suffix: ' been completed?' },
            { pattern: /^(.+)\s+(available|present|ready)$/i, prefix: 'Is ', suffix: ' available?' },
          ];

          let converted = false;
          for (const conv of conversions) {
            if (conv.pattern.test(itemText)) {
              if (conv.prefix) {
                questionText = conv.prefix + itemText.toLowerCase() + '?';
              } else if (conv.suffix) {
                questionText = itemText.replace(conv.pattern, '$1') + conv.suffix;
              }
              converted = true;
              break;
            }
          }

          if (!converted) {
            // Generic conversion
            questionText = `Is "${itemText}" completed?`;
          }
        }

        // Determine question type based on content
        let type: ChecklistQuestion['type'] = 'yn-na';
        if (itemText.match(/rate|rating|score|1-5|1-10/i)) {
          type = itemText.includes('1-10') ? 'score-10' : 'score-5';
        } else if (itemText.match(/pass.*fail/i)) {
          type = 'pass-fail';
        } else if (itemText.match(/serial|number|count|quantity/i)) {
          type = 'number';
        } else if (itemText.match(/name|describe|explain|notes/i)) {
          type = 'text';
        }

        questions.push({
          text: questionText.charAt(0).toUpperCase() + questionText.slice(1),
          type,
          required: true
        });
      }
    }

    // If no questions found, create some based on the content
    if (questions.length === 0) {
      questions.push(
        { text: 'Has the safety inspection been completed?', type: 'yn-na', required: true },
        { text: 'Are all required PPE items available and in good condition?', type: 'yn-na', required: true },
        { text: 'Have all equipment checks been performed?', type: 'yn-na', required: true },
        { text: 'Rate the overall condition of the work area', type: 'score-5', required: true },
        { text: 'Any additional comments or observations?', type: 'text', required: false }
      );
    }

    // Determine category based on content
    let category = 'compliance';
    const contentLower = documentContent.toLowerCase();
    if (contentLower.includes('safety') || contentLower.includes('ppe') || contentLower.includes('hazard')) {
      category = 'safety';
    } else if (contentLower.includes('quality') || contentLower.includes('defect')) {
      category = 'quality';
    } else if (contentLower.includes('maintenance') || contentLower.includes('equipment')) {
      category = 'maintenance';
    } else if (contentLower.includes('operation') || contentLower.includes('procedure')) {
      category = 'operations';
    }

    return {
      title,
      description: `Checklist imported from document containing ${questions.length} items`,
      category,
      estimatedTime: `${Math.max(5, questions.length * 2)} minutes`,
      questions
    };
  }

  // Test the service with a sample document
  async testExtraction(): Promise<ExtractedChecklist> {
    const sampleDocument = `
DAILY SAFETY INSPECTION CHECKLIST

Date: _______ Inspector: _______ Location: _______

PPE CHECK:
☐ Hard hats worn by all personnel
☐ Safety glasses/goggles available and used
☐ High-visibility vests worn
☐ Safety boots in good condition
☐ Gloves appropriate for task

EQUIPMENT INSPECTION:
☐ Ladder inspection completed
☐ Power tools grounded properly
☐ Guards in place on all equipment
☐ Emergency stops functional
☐ Fire extinguisher present and tagged
Rate overall equipment condition (1-5): ____

WORK AREA:
☐ Walkways clear of obstacles
☐ Adequate lighting in all areas
☐ Spill kit available
☐ First aid kit stocked
☐ Emergency exits marked and clear

DOCUMENTATION:
☐ Permits displayed
☐ Safety data sheets available
☐ Previous inspection issues addressed

Inspector Signature: _____________
    `;

    return this.extractChecklistFromDocument(sampleDocument);
  }
}

// Export a singleton instance
export const llmService = new LLMService();

// Export types for use in other modules
export type { ChecklistQuestion, ExtractedChecklist };