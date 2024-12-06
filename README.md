# **rich-textify**

A powerful and flexible rich text editor component for React and React Native applications. It supports both HTML and Markdown, features real-time previews, and offers extensive customization options.

---

## **Features**

- 📝 Smart text formatting with selection-based editing.
- 🎨 Visual formatting toolbar with active state indicators.
- 🔄 Supports both HTML and Markdown outputs.
- 🧹 Automatic cleanup of nested tags and invalid formatting.
- 🔒 Built-in HTML sanitization for enhanced security.
- 📱 Cross-platform support for React Native and Web.
- 🎯 Full TypeScript support for type safety.
- 💅 Extensive styling options for easy customization.
- ♿ Accessibility support for inclusive design.

---

## **Installation**

```bash
npm install rich-textify
```

---

## **Quick Start**

```tsx
import { Editor, Viewer } from "rich-textify";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

function App() {
  const [content, setContent] = useState("");

  return (
    <View style={styles.container}>
      {/* Rich Text Editor */}
      <Editor
        value={content}
        onChange={setContent}
        outputFormat="html"
        placeholder="Start typing..."
      />

      {/* Content Preview */}
      <Viewer content={content} inputFormat="html" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

---

## **Components**

### **Editor Component**

The main rich text editor component with smart formatting capabilities.

```tsx
<Editor
  value={content}
  onChange={setContent}
  outputFormat="html" // or "markdown"
  formatOptions={{
    bold: true,
    italic: true,
    underline: true,
    strikethrough: true,
    overline: true,
    subscript: true,
    superscript: true,
  }}
  style={styles.editor}
  textStyle={styles.editorText}
  placeholder="Type something..."
  maxLength={1000}
  minHeight={150}
  autoFocus={false}
  readOnly={false}
/>
```

#### **Editor Props**

| Prop            | Type                    | Default   | Description                   |
| --------------- | ----------------------- | --------- | ----------------------------- |
| `value`         | string                  | required  | Current content               |
| `onChange`      | (value: string) => void | required  | Callback for content changes  |
| `outputFormat`  | 'html' \| 'markdown'    | 'html'    | Output format                 |
| `formatOptions` | FormatOptions           | All true  | Text formatting options       |
| `style`         | ViewStyle               | undefined | Styles for the container      |
| `textStyle`     | TextStyle               | undefined | Styles for the text           |
| `placeholder`   | string                  | undefined | Placeholder text              |
| `maxLength`     | number                  | undefined | Maximum length of content     |
| `minHeight`     | number                  | 100       | Minimum height for the editor |
| `autoFocus`     | boolean                 | false     | Focus the editor on render    |
| `readOnly`      | boolean                 | false     | Enable read-only mode         |

---

### **Viewer Component**

Displays formatted content.

```tsx
<Viewer
  content={content}
  inputFormat="html" // or "markdown"
  style={styles.viewer}
  textStyle={styles.viewerText}
  sanitize={true}
/>
```

#### **Viewer Props**

| Prop          | Type                 | Default   | Description                 |
| ------------- | -------------------- | --------- | --------------------------- |
| `content`     | string               | required  | Content to display          |
| `inputFormat` | 'html' \| 'markdown' | 'html'    | Format of the input content |
| `style`       | ViewStyle            | undefined | Styles for the container    |
| `textStyle`   | TextStyle            | undefined | Styles for the text         |
| `sanitize`    | boolean              | true      | Enable content sanitization |

---

## **Formatting Options**

Define the text formatting capabilities in your app.

```typescript
interface FormatOptions {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  overline?: boolean;
  subscript?: boolean;
  superscript?: boolean;
}
```

---

## **Styling**

Easily customize the appearance of `Editor` and `Viewer` components.

```tsx
const styles = StyleSheet.create({
  editor: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editorText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  viewer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 16,
  },
  viewerText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
```

---

## **Usage Guide**

### **Text Selection and Formatting**

1. Select text in the editor.
2. Click format buttons in the toolbar to apply formatting.
3. The selected text will be visually formatted.
4. The underlying content maintains clean HTML/Markdown.

### **Best Practices**

#### Text Selection

- Select text before applying formatting.
- Use format toolbar buttons for consistent formatting.
- Clear selection to start fresh formatting.

#### Content Management

- Store formatted content as HTML or Markdown.
- Use the Viewer component for displaying formatted content.
- Implement proper content validation.
- Consider content length limits.

#### Formatting

- Use consistent format options across your app.
- Consider platform-specific formatting needs.
- Test formatting in both HTML and Markdown modes.

#### Styling

- Follow platform design guidelines.
- Ensure proper contrast ratios.
- Test different content lengths.

#### Performance

- Handle large content efficiently.
- Implement proper error boundaries.
- Consider debouncing content updates.

---

## **Security**

- HTML sanitization with `sanitize-html`.
- XSS protection for safer content rendering.
- Configurable allowed tags and attributes.
- Nested tag cleanup for consistent output.

---

## **TypeScript Support**

Rich type definitions are provided for enhanced development experience.

```typescript
import type { EditorProps, ViewerProps, FormatOptions } from "rich-textify";
```

---

## **Tutorial: Building a Simple Note-Taking App**

### **Step 1: Install the Package**

```bash
npm install rich-textify
```

### **Step 2: Create the App Component**

```tsx
import { Editor, Viewer } from "rich-textify";
import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

function NoteApp() {
  const [note, setNote] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <View style={styles.container}>
      {previewMode ? (
        <Viewer content={note} inputFormat="html" />
      ) : (
        <Editor
          value={note}
          onChange={setNote}
          outputFormat="html"
          placeholder="Write your note here..."
        />
      )}
      <Button
        title={previewMode ? "Edit Note" : "Preview Note"}
        onPress={() => setPreviewMode(!previewMode)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default NoteApp;
```

### **Step 3: Customize Styling**

You can customize the styles in the `StyleSheet` object to match your application's design.

### **Step 4: Add More Features**

- Save notes to local storage or a database.
- Enable sharing of formatted notes.
- Add categories or tags to organize notes.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes and commit (`git commit -m "Added a feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## **License**

MIT © NextCoreDev

---

## **Support**

- GitHub Issues: [Report a Bug](https://github.com/nextcoredev/rich-textify/issues)
- Documentation: [Learn More](https://github.com/nextcoredev/rich-textify#readme)
