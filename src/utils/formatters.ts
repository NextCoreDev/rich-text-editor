import sanitizeHtml from 'sanitize-html';
import type { OutputFormat, FormatOptions } from '../types';

const ALLOWED_TAGS = ['b', 'i', 'u', 's', 'span', 'sub', 'sup'];
const ALLOWED_ATTRIBUTES = {
  span: ['style'],
};

export function getSelectedText(text: string, start: number, end: number): string {
  return text.slice(start, end);
}

export function formatText(
  text: string,
  formats: Set<string>,
  outputFormat: OutputFormat,
  options?: FormatOptions
): string {
  if (!text) return text;
  
  let formattedText = text;

  // Remove existing formatting first
  formattedText = sanitizeHtml(formattedText, {
    allowedTags: [],
    allowedAttributes: {},
  });

  if (outputFormat === 'html') {
    // Apply formatting in a specific order to prevent nesting issues
    const formatOrder = ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'overline'];
    
    formatOrder.forEach(format => {
      if (formats.has(format)) {
        const tag = getHtmlTag(format);
        if (tag) {
          formattedText = wrapWithTag(formattedText, tag);
        }
      }
    });

    // Sanitize HTML output
    return sanitizeHtml(formattedText, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  if (outputFormat === 'markdown') {
    // Apply markdown formatting in reverse order to handle nested formats correctly
    const formatOrder = ['overline', 'superscript', 'subscript', 'strikethrough', 'underline', 'italic', 'bold'];
    
    formatOrder.forEach(format => {
      if (formats.has(format)) {
        const marker = getMarkdownMarker(format);
        if (marker) {
          formattedText = `${marker}${formattedText}${marker}`;
        }
      }
    });
  }

  return formattedText;
}

function getHtmlTag(format: string): string | null {
  switch (format) {
    case 'bold': return 'b';
    case 'italic': return 'i';
    case 'underline': return 'u';
    case 'strikethrough': return 's';
    case 'subscript': return 'sub';
    case 'superscript': return 'sup';
    case 'overline': return 'span style="text-decoration: overline"';
    default: return null;
  }
}

function getMarkdownMarker(format: string): string | null {
  switch (format) {
    case 'bold': return '**';
    case 'italic': return '_';
    case 'strikethrough': return '~~';
    case 'underline': return '<u>';
    case 'subscript': return '<sub>';
    case 'superscript': return '<sup>';
    case 'overline': return '<span style="text-decoration: overline">';
    default: return null;
  }
}

function wrapWithTag(text: string, tag: string): string {
  const hasStyle = tag.includes('style=');
  if (hasStyle) {
    const [tagName, ...attributes] = tag.split(' ');
    return `<${tag}>${text}</${tagName}>`;
  }
  return `<${tag}>${text}</${tag}>`;
}