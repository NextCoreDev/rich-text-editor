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
  if (inputFormat === 'html') {
    // Sanitize HTML input
    return sanitizeHtml(content, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  // Convert markdown to HTML
  if (inputFormat === 'markdown') {
    let html = content
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace(/~~(.*?)~~/g, '<s>$1</s>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
      .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
      .replace(/<span style="text-decoration: overline">(.*?)<\/span>/g, '<span style="text-decoration: overline">$1</span>');

    // Sanitize the converted HTML
    return sanitizeHtml(html, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  return content;
}