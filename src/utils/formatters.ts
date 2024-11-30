import sanitizeHtml from 'sanitize-html';
import type { OutputFormat, FormatOptions } from '../types';

const ALLOWED_TAGS = ['b', 'i', 'u', 's', 'span'];
const ALLOWED_ATTRIBUTES = {
  span: ['style'],
};

export function formatText(
  text: string,
  formats: Set<string>,
  outputFormat: OutputFormat,
  options?: FormatOptions
): string {
  let formattedText = text;

  if (outputFormat === 'html') {
    formats.forEach((format) => {
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
        case 'overline':
          formattedText = `<span style="text-decoration: overline">${formattedText}</span>`;
          break;
        case 'subscript':
          formattedText = `<sub>${formattedText}</sub>`;
          break;
        case 'superscript':
          formattedText = `<sup>${formattedText}</sup>`;
          break;
      }
    });

    // Sanitize HTML output
    formattedText = sanitizeHtml(formattedText, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  } else if (outputFormat === 'markdown') {
    formats.forEach((format) => {
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
        // Note: Markdown doesn't have native underline, overline, subscript, or superscript
        case 'underline':
        case 'overline':
        case 'subscript':
        case 'superscript':
          // Keep HTML for unsupported markdown formats
          formattedText = format === 'underline'
            ? `<u>${formattedText}</u>`
            : format === 'subscript'
            ? `<sub>${formattedText}</sub>`
            : format === 'superscript'
            ? `<sup>${formattedText}</sup>`
            : `<span style="text-decoration: overline">${formattedText}</span>`;
          break;
      }
    });
  }

  return formattedText;
}