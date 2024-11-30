import { StyleSheet } from 'react-native';

export const editorStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  formatBar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  formatButton: {
    margin: 4,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 4,
  },
  formatButtonActive: {
    backgroundColor: '#007AFF',
  },
  formatButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  formatButtonTextActive: {
    color: 'white',
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});