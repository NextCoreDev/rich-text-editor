import React from 'react';
import { View } from 'react-native';
import { FormatButton } from './FormatButton';
import { FORMAT_ICONS, FORMAT_LABELS } from './constants';
import type { FormatBarProps } from '../../types';
import { editorStyles } from './styles';

export function FormatBar({
  options,
  selectedFormats,
  onFormatChange,
}: FormatBarProps) {
  return (
    <View style={editorStyles.formatBar}>
      {Object.entries(options).map(([format, enabled]) => 
        enabled && (
          <FormatButton
            key={format}
            format={format}
            icon={FORMAT_ICONS[format as keyof typeof FORMAT_ICONS]}
            isActive={selectedFormats.has(format)}
            onPress={() => onFormatChange(format)}
            tooltip={FORMAT_LABELS[format as keyof typeof FORMAT_LABELS]}
          />
        )
      )}
    </View>
  );
}