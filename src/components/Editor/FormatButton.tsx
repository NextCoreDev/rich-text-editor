import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import type { FormatButtonProps } from '../../types';
import { editorStyles } from './styles';

export function FormatButton({
  format,
  icon,
  isActive,
  onPress,
  tooltip,
}: FormatButtonProps) {
  return (
    <TouchableOpacity
      style={[
        editorStyles.formatButton,
        isActive && editorStyles.formatButtonActive,
      ]}
      onPress={onPress}
      accessibilityLabel={tooltip}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
    >
      <Text style={[
        editorStyles.formatButtonText,
        isActive && editorStyles.formatButtonTextActive,
      ]}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
}