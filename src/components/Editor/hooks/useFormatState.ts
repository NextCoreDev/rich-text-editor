import { useState, useCallback } from 'react';

export function useFormatState() {
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set());

  const toggleFormat = useCallback((format: string) => {
    setSelectedFormats(prev => {
      const newFormats = new Set(prev);
      if (newFormats.has(format)) {
        newFormats.delete(format);
      } else {
        newFormats.add(format);
      }
      return newFormats;
    });
  }, []);

  return {
    selectedFormats,
    toggleFormat,
  };
}