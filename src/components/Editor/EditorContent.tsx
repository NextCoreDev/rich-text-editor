import React, { useCallback, useRef, useEffect } from "react";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { formatText, getSelectedText } from "../../utils/formatters";
import type { EditorContentProps } from "../../types";
import { editorStyles } from "./styles";

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
  const inputRef = useRef<TextInput>(null);
  const selectionRef = useRef({ start: 0, end: 0 });

  const handleSelectionChange = useCallback(
    (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      selectionRef.current = event.nativeEvent.selection;
    },
    []
  );

  const handleTextChange = useCallback(
    (text: string) => {
      if (maxLength && text.length > maxLength) {
        return;
      }

      // Only format the selected text if there's a selection
      const { start, end } = selectionRef.current;
      if (start !== end && selectedFormats.size > 0) {
        const selectedText = getSelectedText(text, start, end);
        const formattedSelection = formatText(
          selectedText,
          selectedFormats,
          outputFormat
        );
        const newText =
          text.slice(0, start) + formattedSelection + text.slice(end);
        onChange(newText);
      } else {
        onChange(text);
      }
    },
    [maxLength, selectedFormats, outputFormat, onChange]
  );

  // Update text formatting when formats change
  useEffect(() => {
    const { start, end } = selectionRef.current;
    if (start !== end) {
      const selectedText = getSelectedText(value, start, end);
      const formattedSelection = formatText(
        selectedText,
        selectedFormats,
        outputFormat
      );
      const newText =
        value.slice(0, start) + formattedSelection + value.slice(end);
      onChange(newText);
    }
  }, [selectedFormats, outputFormat]);

  return (
    <TextInput
      ref={inputRef}
      style={[editorStyles.input, { minHeight }, textStyle]}
      value={value}
      placeholder={placeholder}
      editable={!readOnly}
      onChangeText={handleTextChange}
      onSelectionChange={handleSelectionChange}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      multiline
    />
  );
}
