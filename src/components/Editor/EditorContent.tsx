import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import {
  formatText,
  getSelectedText,
  checkExistingFormat,
  parseFormattedText,
} from "../../utils";
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
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [displayValue, setDisplayValue] = useState("");
  const isFormattingRef = useRef(false);

  // Update display value when the actual value changes
  useEffect(() => {
    setDisplayValue(parseFormattedText(value, "html"));
  }, [value]);

  // Handle text selection changes
  const handleSelectionChange = useCallback(
    (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      if (!isFormattingRef.current) {
        const newSelection = event.nativeEvent.selection;
        setSelection(newSelection);

        // Check for existing formats in selection
        if (newSelection.start !== newSelection.end) {
          const selectedText = getSelectedText(
            value,
            newSelection.start,
            newSelection.end
          );
          selectedFormats.forEach((format) => {
            if (!checkExistingFormat(selectedText, format)) {
              selectedFormats.delete(format);
            }
          });
        }
      }
    },
    [value, selectedFormats]
  );

  // Handle text changes
  const handleTextChange = useCallback(
    (text: string) => {
      if (maxLength && text.length > maxLength) return;

      // Apply active formats to new text if any format is selected
      if (selectedFormats.size > 0) {
        const formattedText = formatText(text, selectedFormats, outputFormat);
        onChange(formattedText);
      } else {
        onChange(text);
      }
    },
    [maxLength, onChange, selectedFormats, outputFormat]
  );

  // Apply formatting when format buttons are clicked
  useEffect(() => {
    if (selection.start !== selection.end && !isFormattingRef.current) {
      isFormattingRef.current = true;

      const selectedText = getSelectedText(
        value,
        selection.start,
        selection.end
      );
      const formattedText = formatText(
        selectedText,
        selectedFormats,
        outputFormat
      );

      const newText =
        value.slice(0, selection.start) +
        formattedText +
        value.slice(selection.end);
      onChange(newText);

      // Update cursor position
      setTimeout(() => {
        if (inputRef.current) {
          const newPosition = selection.start + formattedText.length;
          inputRef.current.setNativeProps({
            selection: { start: newPosition, end: newPosition },
          });
        }
        isFormattingRef.current = false;
      }, 0);
    }
  }, [selectedFormats, outputFormat, selection, value, onChange]);

  return (
    <View style={editorStyles.inputContainer}>
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
    </View>
  );
}
