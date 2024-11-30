export const FORMAT_ICONS = {
  bold: 'B',
  italic: 'I',
  underline: 'U',
  strikethrough: 'S',
  overline: 'O',
  subscript: '₍ᵢ₎',
  superscript: '⁽ⁱ⁾',
} as const;

export const FORMAT_LABELS = {
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  overline: 'Overline',
  subscript: 'Subscript',
  superscript: 'Superscript',
} as const;

export const DEFAULT_FORMAT_OPTIONS = {
  bold: true,
  italic: true,
  underline: true,
  strikethrough: true,
  overline: true,
  subscript: true,
  superscript: true,
} as const;