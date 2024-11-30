import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { parseFormattedText } from '../../utils/parsers';
import type { ViewerProps } from '../../types';

export function Viewer({
  content,
  inputFormat = 'html',
  style,
  textStyle,
  className,
  sanitize = true,
}: ViewerProps) {
  const parsedContent = sanitize 
    ? parseFormattedText(content, inputFormat)
    : content;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{parsedContent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});