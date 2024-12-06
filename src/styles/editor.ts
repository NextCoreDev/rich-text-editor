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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  formatButton: {
    margin: 4,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 4,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatButtonActive: {
    backgroundColor: '#007AFF',
  },
  formatButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  formatButtonTextActive: {
    color: 'white',
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
  },
  input: {
    padding: 12,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 150,
  },
  
});