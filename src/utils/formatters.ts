import sanitizeHtml from 'sanitize-html';
import type { OutputFormat } from '../types';

const ALLOWED_TAGS = ['b', 'i', 'u', 's', 'sub', 'sup'];
const ALLOWED_ATTRIBUTES = {
  span: ['style'],
};

export function getSelectedText(text: string, start: number, end: number): string {
  return text.slice(start, end);
}

export function checkExistingFormat(text: string, format: string): boolean {
  const tagMap: Record<string, string> = {
    bold: 'b',
    italic: 'i',
    underline: 'u',
    strikethrough: 's',
    subscript: 'sub',
    superscript: 'sup',
  };

  const tag = tagMap[format];
  if (!tag) return false;

  const regex = new RegExp(`<${tag}>[^<]*</${tag}>`, 'g');
  return regex.test(text);
}

export function removeFormat(text: string, format: string): string {
  const tagMap: Record<string, string> = {
    bold: 'b',
    italic: 'i',
    underline: 'u',
    strikethrough: 's',
    subscript: 'sub',
    superscript: 'sup',
  };

  const tag = tagMap[format];
  if (!tag) return text;

  return text.replace(new RegExp(`<${tag}>(.*?)</${tag}>`, 'g'), '$1');
}

export function formatText(
  text: string,
  formats: Set<string>,
  outputFormat: OutputFormat
): string {
  if (!text) return text;

  let formattedText = text;

  formats.forEach((format) => {
    const hasFormat = checkExistingFormat(formattedText, format);
    if (hasFormat) {
      formattedText = removeFormat(formattedText, format);
    } else {
      switch (format) {
        case 'bold':
          formattedText = `<b>${formattedText}</b>`;
          break;
        case 'italic':
          formattedText = `<i>${formattedText}</i>`;
          break;
        case 'underline':
          formattedText = `<u>${formattedText}</u>`;
          break;
        case 'strikethrough':
          formattedText = `<s>${formattedText}</s>`;
          break;
        case 'subscript':
          formattedText = `<sub>${formattedText}</sub>`;
          break;
        case 'superscript':
          formattedText = `<sup>${formattedText}</sup>`;
          break;
      }
    }
  });

  return sanitizeHtml(formattedText, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  });
}
