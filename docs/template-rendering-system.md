# SnapWP Template Rendering System

This section covers the core components of SnapWP's template rendering system: `RootLayout`, `TemplateRenderer`, and `EditorBlocksRenderer`, and how they are used together.

## How SnapWP Renders Content

The typical flow is as follows:

1.  The `RootLayout` provides the overall HTML structure.

2.  Inside the `RootLayout`, the `TemplateRenderer` fetches template data and manages the `<head>` section (using `TemplateHead` and `TemplateScripts` internally).

3.  The `TemplateRenderer`'s `children` function uses the `EditorBlocksRenderer` to render the blocks.

## Other Components (For Advanced Usage)

The following components are used internally by `TemplateRenderer` and `RootLayout` and are documented here for completeness in case a more advanced user needs to customize them:

-   `TemplateHead`: Manages template-specific stylesheets.
-   `TemplateScripts`: Manages template-specific scripts.
-   `GlobalHead`: Manages global styles and fonts.

## `RootLayout`

The `RootLayout` component provides the basic HTML structure for your Next.js application, including the `<html>`, `<head>`, and `<body>` tags. It also handles the rendering of global styles and fonts.

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

-   `getGlobalStyles`: (Optional) A function that fetches global styles. Defaults to [`QueryEngine.getGlobalStyles`](https://github.com/rtCamp/snapwp/blob/82877410582419b939300d4afc659ace166dd2a0/packages/query/src/query-engine/index.ts#L57-L69). Should return an object containing `customCss`, `globalStylesheet`, and `renderedFontFaces`.
-   `children`: (Required) The content to be rendered within the layout. This is where the `TemplateRenderer` is placed.

## `TemplateRenderer`

The `TemplateRenderer` component is the core of SnapWP's templating system. It fetches template data (styles, blocks, scripts) and renders the block content. Use `TemplateRenderer` inside `RootLayout` to get global styles, custom CSS and fontfaces of the WP FSE theme in use.

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
			{ ( editorBlocks ) => (
				// Render function for editor blocks
				<EditorBlocksRenderer
					editorBlocks={ editorBlocks }
					blockDefinitions={ blockDefinitions }
				/>
			) }
		</TemplateRenderer>
	);
}
```

**Props:**

-   `getTemplateData`: (Optional) A function that fetches the template data. Defaults to [`QueryEngine.getTemplateData`](https://github.com/rtCamp/snapwp/blob/82877410582419b939300d4afc659ace166dd2a0/packages/query/src/query-engine/index.ts#L76-L90). This function should accept a pathname (string) and return a Promise that resolves to an object containing `editorBlocks`, `bodyClasses`, `stylesheets`, `scripts`, and `scriptModules`.
-   `children`: (Required) A render function that receives an array of `BlockData` and returns the JSX to render the block content. This is where you would typically use the `EditorBlocksRenderer`.

## `EditorBlocksRenderer`

The `EditorBlocksRenderer` component is responsible for rendering the actual content blocks. It receives block data and block definitions, and renders the blocks accordingly. The `EditorBlocksRenderer` should be used _within_ the `TemplateRenderer` to render the block data fetched by `TemplateRenderer`.

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

-   `editorBlocks`: (Required) An array of block data objects.
-   `blockDefinitions`: (Required) An object mapping block names to React components.
