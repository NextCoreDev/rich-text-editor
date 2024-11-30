# rich-textify

A powerful and flexible rich text editor component for React and React Native applications. Features HTML and Markdown support, real-time preview, and extensive customization options.

## Features

- 📝 Smart text formatting with selection-based editing
- 🎨 Visual formatting toolbar with active state indicators
- 🔄 Support for both HTML and Markdown output
- 🧹 Automatic cleanup of nested tags and formatting
- 🔒 Built-in HTML sanitization for security
- 📱 Cross-platform (React Native & Web)
- 🎯 Full TypeScript support
- 💅 Extensive styling options
- ♿ Accessibility support

## Installation

```bash
npm install rich-textify
```

## Quick Start

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

## Smart Formatting Features

- **Selection-Based Formatting**: Format only selected text instead of the entire content
- **Format State Tracking**: Visual feedback for active formatting options
- **Nested Tag Prevention**: Automatically prevents and cleans up nested formatting tags
- **Smart Tag Handling**: Proper handling of HTML tags and Markdown syntax

## Components

### Editor Component

The main rich text editor component with smart formatting capabilities:

```tsx
<Editor
  value={content}
  onChange={setContent}
  outputFormat="html" // or 'markdown'
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
  placeholder="Start typing..."
  maxLength={1000}
  minHeight={150}
  autoFocus={true}
  readOnly={false}
  onFocus={() => console.log("Editor focused")}
  onBlur={() => console.log("Editor blurred")}
/>
```

#### Editor Props

| Prop            | Type                    | Default   | Description            |
| --------------- | ----------------------- | --------- | ---------------------- |
| `value`         | string                  | required  | Current content        |
| `onChange`      | (value: string) => void | required  | Content change handler |
| `outputFormat`  | 'html' \| 'markdown'    | 'html'    | Output format          |
| `formatOptions` | FormatOptions           | All true  | Available formats      |
| `style`         | ViewStyle               | undefined | Container styles       |
| `textStyle`     | TextStyle               | undefined | Text styles            |
| `placeholder`   | string                  | undefined | Placeholder text       |
| `maxLength`     | number                  | undefined | Maximum length         |
| `minHeight`     | number                  | 100       | Minimum height         |
| `autoFocus`     | boolean                 | false     | Auto focus on mount    |
| `readOnly`      | boolean                 | false     | Read-only mode         |
| `onFocus`       | () => void              | undefined | Focus handler          |
| `onBlur`        | () => void              | undefined | Blur handler           |

### Viewer Component

A component to display formatted content:

```tsx
<Viewer
  content={formattedContent}
  inputFormat="html" // or 'markdown'
  style={styles.viewer}
  textStyle={styles.viewerText}
  sanitize={true}
/>
```

#### Viewer Props

| Prop          | Type                 | Default   | Description         |
| ------------- | -------------------- | --------- | ------------------- |
| `content`     | string               | required  | Content to display  |
| `inputFormat` | 'html' \| 'markdown' | 'html'    | Input format        |
| `style`       | ViewStyle            | undefined | Container styles    |
| `textStyle`   | TextStyle            | undefined | Text styles         |
| `sanitize`    | boolean              | true      | Enable sanitization |

## Format Options

Available text formatting options:

```tsx
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

## Styling Guide

Example styles for customizing the components:

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  editor: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  viewerText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
```

## Best Practices

1. Text Selection

   - Select text before applying formatting
   - Use format toolbar buttons for consistent formatting
   - Clear selection to start fresh formatting

2. Content Management

   - Handle content changes through the `onChange` prop
   - Implement proper content validation
   - Consider content length limits

3. Formatting

   - Use consistent format options across your app
   - Consider platform-specific formatting needs
   - Test formatting in both HTML and Markdown modes

4. Styling

   - Follow platform design guidelines
   - Ensure proper contrast ratios
   - Test different content lengths

5. Performance
   - Handle large content efficiently
   - Implement proper error boundaries
   - Consider debouncing content updates

## Security

Built-in security features:

- HTML sanitization using `sanitize-html`
- XSS attack prevention
- Configurable allowed tags and attributes
- Safe content parsing and rendering
- Nested tag cleanup

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  EditorProps,
  ViewerProps,
  FormatOptions,
  OutputFormat,
  InputFormat,
} from "rich-textify";
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © NextCoreDev

## Support

- GitHub Issues: [Report a bug](https://github.com/nextcoredev/rich-text-editor/issues)
- Documentation: [View full documentation](https://github.com/nextcoredev/rich-text-editor#readme)
