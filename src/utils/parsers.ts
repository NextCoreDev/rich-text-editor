import sanitizeHtml from 'sanitize-html';
import type { InputFormat } from '../types';

const ALLOWED_TAGS = ['b', 'i', 'u', 's', 'span', 'sub', 'sup'];
const ALLOWED_ATTRIBUTES = {
  span: ['style'],
};

export function parseFormattedText(
  content: string,
  inputFormat: InputFormat
): string {
  if (!content) return content;

  if (inputFormat === 'html') {
    // Remove nested duplicate tags
    let cleanedContent = content;
    ALLOWED_TAGS.forEach(tag => {
      const regex = new RegExp(`<${tag}>(<${tag}>.*?<\\/${tag}>)<\\/${tag}>`, 'g');
      while (regex.test(cleanedContent)) {
        cleanedContent = cleanedContent.replace(regex, '<$1>');
      }
    });

    // Sanitize HTML input
    return sanitizeHtml(cleanedContent, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  if (inputFormat === 'markdown') {
    // Convert markdown to HTML with proper nesting prevention
    let html = content
      .replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<b>$1</b>') // Handle double-nested bold
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*\*\*(.*?)\*\*\*/g, '<i>$1</i>') // Handle double-nested italic
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace(/~~~~(.*?)~~~~/g, '<s>$1</s>') // Handle double-nested strikethrough
      .replace(/~~(.*?)~~/g, '<s>$1</s>')
      .replace(/<u><u>(.*?)<\/u><\/u>/g, '<u>$1</u>') // Handle nested underline
      .replace(/<sub><sub>(.*?)<\/sub><\/sub>/g, '<sub>$1</sub>') // Handle nested subscript
      .replace(/<sup><sup>(.*?)<\/sup><\/sup>/g, '<sup>$1</sup>') // Handle nested superscript
      .replace(/<span style="text-decoration: overline"><span style="text-decoration: overline">(.*?)<\/span><\/span>/g, '<span style="text-decoration: overline">$1</span>');

    // Sanitize the converted HTML
    return sanitizeHtml(html, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  return content;
}