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
    // Clean up nested tags first
    let cleanedContent = content;
    ALLOWED_TAGS.forEach(tag => {
      const regex = new RegExp(`<${tag}>(<${tag}>.*?<\\/${tag}>)<\\/${tag}>`, 'g');
      while (regex.test(cleanedContent)) {
        cleanedContent = cleanedContent.replace(regex, '$1');
      }
    });

    // Convert HTML to visible formatting
    return sanitizeHtml(cleanedContent, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
      transformTags: {
        'b': 'strong',
        'i': 'em',
        'u': 'u',
        's': 'del',
        'sub': 'sub',
        'sup': 'sup',
        'span': 'span',
      },
    });
  }

  if (inputFormat === 'markdown') {
    // Convert markdown to visible formatting
    let html = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/~(.*?)~/g, '<sub>$1</sub>')
      .replace(/\^(.*?)\^/g, '<sup>$1</sup>')
      .replace(/‾(.*?)‾/g, '<span style="text-decoration: overline">$1</span>');

    return sanitizeHtml(html, {
      allowedTags: [...ALLOWED_TAGS, 'strong', 'em', 'del'],
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  return content;
}