import { StyleSheet } from 'react-native';

export const editorStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  formatBar: {
    flexDirection: "row",
    backgroundColor: "#eaeaea",
    padding: 8,
    borderRadius: 8,
  },
  formatButton: {
    marginHorizontal: 4,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  formatButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#005BBB",
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    padding: 10,
    minHeight: 150,
    textAlignVertical: "top",
  },
  viewer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  viewerText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  formatButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  formatButtonTextActive: {
    color: "white",
  },
});
