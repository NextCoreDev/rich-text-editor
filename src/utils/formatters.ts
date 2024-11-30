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
  const appliedTags = new Set<string>();

  if (outputFormat === 'html') {
    formats.forEach((format) => {
      // Prevent duplicate tags
      if (appliedTags.has(format)) return;

      const tag = getHtmlTag(format);
      if (tag) {
        formattedText = wrapWithTag(formattedText, tag);
        appliedTags.add(format);
      }
    });

    // Sanitize HTML output
    return sanitizeHtml(formattedText, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  if (outputFormat === 'markdown') {
    formats.forEach((format) => {
      if (appliedTags.has(format)) return;
      
      const marker = getMarkdownMarker(format);
      if (marker) {
        formattedText = `${marker}${formattedText}${marker}`;
        appliedTags.add(format);
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
    // HTML tags for unsupported markdown formats
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