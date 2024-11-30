import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  Text,
  TextStyle,
} from "react-native";
import { formatText, getSelectedText } from "../../utils";
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
  const isFormattingRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

  // Handle text selection changes
  const handleSelectionChange = useCallback(
    (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      if (!isFormattingRef.current) {
        setSelection(event.nativeEvent.selection);
      }
    },
    []
  );

  // Handle text changes
  const handleTextChange = useCallback(
    (text: string) => {
      if (maxLength && text.length > maxLength) return;

      setDisplayValue(text);

      // Store the raw text without formatting
      const rawText = text.replace(/<[^>]*>/g, "");
      onChange(rawText);
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
      setDisplayValue(newText);

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
  }, [selectedFormats, outputFormat, selection, displayValue]);

  // Render formatted text
  const renderFormattedText = useCallback(() => {
    return displayValue.split(/(<[^>]*>.*?<\/[^>]*>)/g).map((part, index) => {
      if (part.startsWith("<")) {
        const style: TextStyle = {
          fontWeight: part.includes("<b>") ? "bold" : "normal",
          fontStyle: part.includes("<i>") ? "italic" : "normal",
          textDecorationLine: part.includes("<u>")
            ? "underline"
            : part.includes("<s>")
              ? "line-through"
              : "none",
        };
        return (
          <Text key={index} style={style}>
            {part.replace(/<[^>]*>/g, "")}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  }, [displayValue]);

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
    >
      {renderFormattedText()}
    </TextInput>
  );
}
