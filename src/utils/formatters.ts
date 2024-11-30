import sanitizeHtml from 'sanitize-html';
import type { OutputFormat, FormatOptions } from '../types';

const ALLOWED_TAGS = ['b', 'i', 'u', 's', 'span', 'sub', 'sup'];
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

  const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');
  return text.replace(regex, '$1');
}

export function formatText(
  text: string,
  formats: Set<string>,
  outputFormat: OutputFormat,
  options?: FormatOptions
): string {
  if (!text) return text;

  let formattedText = text;

  if (outputFormat === 'html') {
    // Check each format and toggle if already present
    formats.forEach(format => {
      if (checkExistingFormat(formattedText, format)) {
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
          case 'overline':
            formattedText = `<span style="text-decoration: overline">${formattedText}</span>`;
            break;
        }
      }
    });

    // Sanitize the output
    return sanitizeHtml(formattedText, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  // Handle markdown formatting
  if (outputFormat === 'markdown') {
    formats.forEach(format => {
      const hasFormat = (
        format === 'bold' && /\*\*(.*?)\*\*/g.test(formattedText) ||
        format === 'italic' && /\*(.*?)\*/g.test(formattedText) ||
        format === 'strikethrough' && /~~(.*?)~~/g.test(formattedText) ||
        format === 'underline' && /__(.*?)__/g.test(formattedText)
      );

      if (hasFormat) {
        switch (format) {
          case 'bold':
            formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '$1');
            break;
          case 'italic':
            formattedText = formattedText.replace(/\*(.*?)\*/g, '$1');
            break;
          case 'strikethrough':
            formattedText = formattedText.replace(/~~(.*?)~~/g, '$1');
            break;
          case 'underline':
            formattedText = formattedText.replace(/__(.*?)__/g, '$1');
            break;
        }
      } else {
        switch (format) {
          case 'bold':
            formattedText = `**${formattedText}**`;
            break;
          case 'italic':
            formattedText = `*${formattedText}*`;
            break;
          case 'strikethrough':
            formattedText = `~~${formattedText}~~`;
            break;
          case 'underline':
            formattedText = `__${formattedText}__`;
            break;
          case 'subscript':
            formattedText = `~${formattedText}~`;
            break;
          case 'superscript':
            formattedText = `^${formattedText}^`;
            break;
          case 'overline':
            formattedText = `‾${formattedText}‾`;
            break;
        }
      }
    });
  }

  return formattedText;
}