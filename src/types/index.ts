import type { ViewStyle, TextStyle } from 'react-native';

export type OutputFormat = 'html' | 'markdown';
export type InputFormat = OutputFormat;

export interface FormatOptions {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
}

export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  outputFormat?: OutputFormat;
  formatOptions?: FormatOptions;
  style?: ViewStyle;
  textStyle?: TextStyle;
  placeholder?: string;
  maxLength?: number;
  minHeight?: number;
  autoFocus?: boolean;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface ViewerProps {
  content: string;
  inputFormat?: InputFormat;
  style?: ViewStyle;
  textStyle?: TextStyle;
  sanitize?: boolean;
}

export interface FormatBarProps {
  options: FormatOptions;
  selectedFormats: Set<string>;
  onFormatChange: (format: string) => void;
}
export interface FormatButtonProps {
  format: string; 
  icon: string; 
  isActive: boolean;
  onPress: () => void;
  tooltip?: string;
}

export interface EditorContentProps {
  value: string; 
  onChange: (value: string) => void; 
  selectedFormats: Set<string>; 
  outputFormat: OutputFormat;
  placeholder?: string;
  maxLength?: number;
  minHeight?: number; 
  autoFocus?: boolean; 
  readOnly?: boolean; 
  onFocus?: () => void; 
  onBlur?: () => void; 
  textStyle?: TextStyle; 
}
