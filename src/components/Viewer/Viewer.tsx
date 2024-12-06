import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { parseFormattedText } from "../../utils/parsers";
import type { ViewerProps } from "../../types";

export function Viewer({
  content,
  inputFormat = "html",
  style,
  textStyle,
  sanitize = true,
}: ViewerProps) {
  const parsedContent = sanitize
    ? parseFormattedText(content, inputFormat)
    : content;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>
        {parsedContent || "No content to display"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
