import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { formatText, getSelectedText, checkExistingFormat } from "../../utils";
import type { EditorContentProps } from "../../types";
import { editorStyles } from "../../styles";
import { RenderFormattedText } from "./RenderFormattedText";

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
  const isFormattingRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

  // Update display value when value prop changes
  useEffect(() => {
    setDisplayValue(value);
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
            displayValue,
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
    [displayValue, selectedFormats]
  );

  // Handle text changes
  const handleTextChange = useCallback(
    (text: string) => {
      if (maxLength && text.length > maxLength) return;

      setDisplayValue(text);
      onChange(text);
    },
    [maxLength, onChange]
  );

  // Apply formatting when format buttons are clicked
  useEffect(() => {
    if (
      selection.start !== selection.end &&
      selectedFormats.size > 0 &&
      !isFormattingRef.current
    ) {
      isFormattingRef.current = true;

      const selectedText = getSelectedText(
        displayValue,
        selection.start,
        selection.end
      );
      const formattedText = formatText(
        selectedText,
        selectedFormats,
        outputFormat
      );

      const newText =
        displayValue.slice(0, selection.start) +
        formattedText +
        displayValue.slice(selection.end);
      handleTextChange(newText);

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
  }, [
    selectedFormats,
    outputFormat,
    selection,
    displayValue,
    handleTextChange,
  ]);

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
      <RenderFormattedText value={displayValue} style={textStyle} />
    </View>
  );
}
