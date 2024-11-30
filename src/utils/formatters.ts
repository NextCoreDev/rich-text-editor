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
  
  // Remove any existing formatting first
  let formattedText = text.replace(/<[^>]*>/g, '');

  if (outputFormat === 'html') {
    // Apply formatting in a specific order
    if (formats.has('bold')) formattedText = `<b>${formattedText}</b>`;
    if (formats.has('italic')) formattedText = `<i>${formattedText}</i>`;
    if (formats.has('underline')) formattedText = `<u>${formattedText}</u>`;
    if (formats.has('strikethrough')) formattedText = `<s>${formattedText}</s>`;
    if (formats.has('subscript')) formattedText = `<sub>${formattedText}</sub>`;
    if (formats.has('superscript')) formattedText = `<sup>${formattedText}</sup>`;
    if (formats.has('overline')) {
      formattedText = `<span style="text-decoration: overline">${formattedText}</span>`;
    }

    // Sanitize the output
    return sanitizeHtml(formattedText, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
    });
  }

  // Handle markdown formatting
  if (outputFormat === 'markdown') {
    if (formats.has('bold')) formattedText = `**${formattedText}**`;
    if (formats.has('italic')) formattedText = `*${formattedText}*`;
    if (formats.has('strikethrough')) formattedText = `~~${formattedText}~~`;
    if (formats.has('underline')) formattedText = `__${formattedText}__`;
    if (formats.has('subscript')) formattedText = `~${formattedText}~`;
    if (formats.has('superscript')) formattedText = `^${formattedText}^`;
    if (formats.has('overline')) formattedText = `‾${formattedText}‾`;
  }

  return formattedText;
}