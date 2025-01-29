# SnapWP Template Rendering System - Reference

This section covers the core components of SnapWP's template rendering system: `RootLayout`, `TemplateRenderer`, and `EditorBlocksRenderer`, and how they are used together.

## `RootLayout`

The `RootLayout` component provides the basic HTML structure for your Next.js application, including the `<html>`, `<head>`, and `<body>` tags. It also handles the rendering of global styles and fonts. The `TemplateRenderer` component is placed *inside* the `RootLayout`.

**Usage:**

```javascript
import { RootLayout } from '@snapwp/next';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RootLayout>
            {children}
        </RootLayout>
    );
}
```

**Props:**

*   `getGlobalStyles`: (Optional) A function that fetches global styles. Defaults to `QueryEngine.getGlobalStyles`. Should return an object containing `customCss`, `globalStylesheet`, and `renderedFontFaces`.
*   `children`: (Required) The content to be rendered within the layout.  This is where the `TemplateRenderer` is placed.

**Returns:** JSX representing the basic HTML document structure.

## `TemplateRenderer`

The `TemplateRenderer` component is the core of SnapWP's templating system. It fetches template data (styles, blocks, scripts) and renders the block content. The `EditorBlocksRenderer` is  used *within* the `TemplateRenderer` to render the actual content blocks.

**Usage:**

```javascript
import { TemplateRenderer } from '@snapwp/next';
import {
	EditorBlocksRenderer,
	blocks as blockDefinitions,
} from '@snapwp/blocks';

export default function Page() {
    return (
        <TemplateRenderer>
            {(editorBlocks) => (
                // Render function for editor blocks
                <EditorBlocksRenderer
                  editorBlocks={editorBlocks}
                  blockDefinitions={blockDefinitions}
                />
            )}
        </TemplateRenderer>
    );
}
```

**Props:**

*   `getTemplateData`: (Optional) A function that fetches the template data. Defaults to `QueryEngine.getTemplateData`. This function should accept a pathname (string) and return a Promise that resolves to an object containing `editorBlocks`, `bodyClasses`, `stylesheets`, `scripts`, and `scriptModules`.
*   `children`: (Required) A render function that receives an array of `BlockData` and returns the JSX to render the block content.  This is where you would typically use the `EditorBlocksRenderer`.

**Returns:** JSX representing the content to be rendered within the `RootLayout`.

## `EditorBlocksRenderer`

The `EditorBlocksRenderer` component is responsible for rendering the actual content blocks. It receives block data and block definitions, and renders the blocks accordingly.

**Usage:**

```javascript
import { EditorBlocksRenderer } from '@snapwp/blocks';
import {
	EditorBlocksRenderer,
	blocks as blockDefinitions,
} from '@snapwp/blocks';

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => {
				return (
					<EditorBlocksRenderer
						editorBlocks={ editorBlocks }
						blockDefinitions={ blockDefinitions }
					/>
				);
			} }
		</TemplateRenderer>
	);
}
```

**Props:**

*   `editorBlocks`: (Required) An array of block data objects.
*   `blockDefinitions`: (Required) An object mapping block names to React components.

**Returns:** JSX representing the rendered blocks.

## How They Are Used Together

The typical flow is as follows:

1.  The `RootLayout` provides the overall HTML structure.

2.  Inside the `RootLayout`, the `TemplateRenderer` fetches template data and manages the `<head>` section (using `TemplateHead` and `TemplateScripts` internally).

3.  The `TemplateRenderer`'s `children` function uses the `EditorBlocksRenderer` to render the blocks.

## Other Components (For Advanced Usage)

The following components are used internally by `TemplateRenderer` and `RootLayout` and are documented here for completeness in case a more advanced user needs to customize them:

*   `TemplateHead`: Manages template-specific stylesheets.
*   `TemplateScripts`: Manages template-specific scripts.
*   `GlobalHead`: Manages global styles and fonts.
