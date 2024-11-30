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

    // Clean up nested tags
    formattedText = cleanupNestedTags(formattedText);

    // Sanitize HTML output
    return sanitizeHtml(formattedText, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  if (outputFormat === 'markdown') {
    // Apply markdown formatting
    const formatOrder = ['overline', 'superscript', 'subscript', 'strikethrough', 'underline', 'italic', 'bold'];
    
    formatOrder.forEach(format => {
      if (formats.has(format)) {
        const marker = getMarkdownMarker(format);
        if (marker) {
          formattedText = `${marker}${formattedText}${marker}`;
        }
      }
    });

    // Clean up nested markers
    formattedText = cleanupNestedMarkers(formattedText);
  }

  return formattedText;
}

function cleanupNestedTags(html: string): string {
  let cleanedHtml = html;
  ALLOWED_TAGS.forEach(tag => {
    const regex = new RegExp(`<${tag}>(<${tag}>.*?<\\/${tag}>)<\\/${tag}>`, 'g');
    while (regex.test(cleanedHtml)) {
      cleanedHtml = cleanedHtml.replace(regex, '$1');
    }
  });
  return cleanedHtml;
}

function cleanupNestedMarkers(markdown: string): string {
  const markers = ['**', '_', '~~'];
  let cleanedMarkdown = markdown;
  markers.forEach(marker => {
    const regex = new RegExp(`\\${marker}\\${marker}(.*?)\\${marker}\\${marker}`, 'g');
    while (regex.test(cleanedMarkdown)) {
      cleanedMarkdown = cleanedMarkdown.replace(regex, `${marker}$1${marker}`);
    }
  });
  return cleanedMarkdown;
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
    case 'underline': return '__';
    case 'subscript': return '~';
    case 'superscript': return '^';
    case 'overline': return '‾';
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