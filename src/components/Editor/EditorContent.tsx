import React, { useCallback } from 'react';
import { TextInput } from 'react-native';
import { formatText } from '../../utils/formatters';
import type { EditorContentProps } from '../../types';
import { editorStyles } from './styles';

export function EditorContent({
  value,
  onChange,
  selectedFormats,
  outputFormat,
  placeholder,
  maxLength,
  minHeight = 100,
  autoFocus,
  readOnly,
  onFocus,
  onBlur,
  textStyle,
}: EditorContentProps) {
  const handleTextChange = useCallback((text: string) => {
    if (maxLength && text.length > maxLength) {
      return;
    }
    const formattedText = formatText(text, selectedFormats, outputFormat);
    onChange(formattedText);
  }, [maxLength, selectedFormats, outputFormat, onChange]);

  return (
    <TextInput
      style={[editorStyles.input, { minHeight }, textStyle]}
      value={value}
      placeholder={placeholder}
      editable={!readOnly}
      onChangeText={handleTextChange}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      multiline
    />
  );
}