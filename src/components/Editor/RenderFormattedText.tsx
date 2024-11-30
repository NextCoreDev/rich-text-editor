import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";

interface RenderFormattedTextProps {
  value: string;
  style?: TextStyle;
}

export function RenderFormattedText({
  value,
  style,
}: RenderFormattedTextProps) {
  const parts = value.split(/(<[^>]*>.*?<\/[^>]*>)/g);

  return (
    <Text style={[styles.formattedText, style]}>
      {parts.map((part, index) => {
        if (part.startsWith("<")) {
          const textStyle: TextStyle = {
            fontWeight: part.includes("<b>") ? "bold" : "normal",
            fontStyle: part.includes("<i>") ? "italic" : "normal",
            textDecorationLine: part.includes("<u>")
              ? "underline"
              : part.includes("<s>")
                ? "line-through"
                : "none",
          };

          const text = part.replace(/<[^>]*>/g, "");
          return (
            <Text key={index} style={textStyle}>
              {text}
            </Text>
          );
        }
        return part || null;
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  formattedText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    fontSize: 16,
    color: "transparent",
    backgroundColor: "transparent",
  },
});
