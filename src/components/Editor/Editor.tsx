import React from "react";
import { View } from "react-native";
import { FormatBar } from "./FormatBar";
import { EditorContent } from "./EditorContent";
import { useFormatState } from "../../hooks";
import { DEFAULT_FORMAT_OPTIONS } from "../../constants";
import { editorStyles } from "../../styles";
import type { EditorProps } from "../../types";

export function Editor({
  value,
  onChange,
  outputFormat = "html",
  style,
  formatOptions = DEFAULT_FORMAT_OPTIONS,
  placeholder = "Start typing...",
  maxLength,
  minHeight = 150,
  autoFocus = false,
  readOnly = false,
  onFocus,
  onBlur,
}: EditorProps) {
  const { selectedFormats, toggleFormat } = useFormatState();

  return (
    <View style={[editorStyles.container, style]}>
      <FormatBar
        options={formatOptions}
        selectedFormats={selectedFormats}
        onFormatChange={toggleFormat}
      />
      <EditorContent
        value={value}
        onChange={onChange}
        selectedFormats={selectedFormats}
        outputFormat={outputFormat}
        placeholder={placeholder}
        maxLength={maxLength}
        minHeight={minHeight}
        autoFocus={autoFocus}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}
