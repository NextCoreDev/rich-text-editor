import React, { useCallback, useRef, useEffect } from "react";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { formatText, getSelectedText, parseFormattedText } from "../../utils";
import type { EditorContentProps } from "../../types";
import { editorStyles } from "../../styles";

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
  const isFormattingRef = useRef(false);

  const handleSelectionChange = useCallback(
    (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      if (!isFormattingRef.current) {
        selectionRef.current = event.nativeEvent.selection;
      }
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
      if (
        start !== end &&
        selectedFormats.size > 0 &&
        !isFormattingRef.current
      ) {
        isFormattingRef.current = true;
        const selectedText = getSelectedText(text, start, end);
        const formattedSelection = formatText(
          selectedText,
          selectedFormats,
          outputFormat
        );
        const newText =
          text.slice(0, start) + formattedSelection + text.slice(end);
        onChange(newText);

        // Update cursor position after formatting
        setTimeout(() => {
          if (inputRef.current) {
            const newPosition = start + formattedSelection.length;
            inputRef.current.setNativeProps({
              selection: { start: newPosition, end: newPosition },
            });
          }
          isFormattingRef.current = false;
        }, 0);
      } else if (!isFormattingRef.current) {
        onChange(text);
      }
    },
    [maxLength, selectedFormats, outputFormat, onChange]
  );

  // Update text formatting when formats change
  useEffect(() => {
    const { start, end } = selectionRef.current;
    if (start !== end && !isFormattingRef.current) {
      isFormattingRef.current = true;
      const selectedText = getSelectedText(value, start, end);
      const formattedSelection = formatText(
        selectedText,
        selectedFormats,
        outputFormat
      );
      const newText =
        value.slice(0, start) + formattedSelection + value.slice(end);
      onChange(newText);
      isFormattingRef.current = false;
    }
  }, [selectedFormats, outputFormat, value, onChange]);

  // Parse and display formatted content
  const displayValue = parseFormattedText(value, outputFormat);

  return (
    <TextInput
      ref={inputRef}
      style={[editorStyles.input, { minHeight }, textStyle]}
      value={displayValue}
      placeholder={placeholder}
      editable={!readOnly}
      onChangeText={handleTextChange}
      onSelectionChange={handleSelectionChange}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      multiline
      textAlignVertical="top"
    />
  );
}
