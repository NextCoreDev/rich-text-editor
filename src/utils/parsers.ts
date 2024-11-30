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

    // Replace HTML tags with their actual formatted text
    cleanedContent = cleanedContent
      .replace(/<b>(.*?)<\/b>/g, '$1')
      .replace(/<i>(.*?)<\/i>/g, '$1')
      .replace(/<u>(.*?)<\/u>/g, '$1')
      .replace(/<s>(.*?)<\/s>/g, '$1')
      .replace(/<sub>(.*?)<\/sub>/g, '$1')
      .replace(/<sup>(.*?)<\/sup>/g, '$1')
      .replace(/<span[^>]*>(.*?)<\/span>/g, '$1');

    return sanitizeHtml(cleanedContent, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  if (inputFormat === 'markdown') {
    return content
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/~(.*?)~/g, '$1')
      .replace(/\^(.*?)\^/g, '$1')
      .replace(/‾(.*?)‾/g, '$1');
  }

  return content;
}