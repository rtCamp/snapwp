# Overloading WordPress behaviour

This tutorial explains how to overload default WordPress behavior using SnapWP, focusing on customizing blocks, creating custom frontend routes and `html-react-parser` component mapping.

## Overloading Blocks

SnapWP allows you to customize the rendering of individual WordPress blocks. This is useful for modifying the default appearance or behavior of a block to better suit your design.

**1. Identifying the Block:**

First, you need to identify the block you want to overload. Each block has a unique name (e.g., `CoreParagraph`, `CoreImage`). You can find this name in the block's data when fetched via WPGraphQL.

**2. Creating a Custom Component:**

Create a new React component that will represent your custom block rendering. This component will receive the block's attributes as props.

```javascript
import React from 'react';

function MyCustomParagraph( { attributes } ) {
	return (
		<div className="my-custom-paragraph">
			<p>{ attributes.content }</p> { /* Access block attributes */ }
			{ /* Add any additional JSX or logic here */ }
			<span className="custom-attribution"> - My Custom Rendering</span>
		</div>
	);
}

export default MyCustomParagraph;
```

**3. Mapping the Block:**

```javascript
import { TemplateRenderer } from '@snapwp/next';
import MyCustomParagraph from './components/MyCustomParagraph';
import { EditorBlocksRenderer } from '@snapwp/blocks';

const blockDefinitions = {
	CoreParagraph: MyCustomParagraph, // Overload CoreParagraph
	CoreImage: null, // Use default rendering for CoreImage
};

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => (
				<EditorBlocksRenderer
					editorBlocks={ editorBlocks }
					blockDefinitions={ blockDefinitions }
				/>
			) }
		</TemplateRenderer>
	);
}
```

Now, whenever a core/paragraph block is encountered, your `MyCustomParagraph` component will be used to render it. Any other blocks will use the default rendering unless you provide a custom component in blockDefinitions. Setting the value to `null` will use the [default block rendering](#default-block-rendering).

## Creating Custom Frontend Routes

This tutorial explains how to create custom frontend routes in your SnapWP-powered Next.js application using the App Router.

1. To create a custom frontend route, in the `app` directory, on the same level as the [[...path]] directory, create a directory with the name of the route,

2. Inside the directory, create a `page.tsx` file. Inside `page.tsx`, you can create a standard Next.js page component. Even these custom pages have access to your global styles and theme styles (defined in your `theme.json` and global CSS).

```javascript
import styles from './styles.module.css'; // Import local styles if needed

export default function Page() {
	return (
		<div className={ styles.container }>
			{ ' ' }
			{ /* Use local styles if needed */ }
			<h1 className="wp-block-heading has-text-align-center has-x-large-font-size">
				This is a test override page
			</h1>
			<p className="has-text-align-center">This page has access to global styles and theme.json styles.</p>
		</div>
	);
}
```

### Styling:

-   **Local Styles**: Use CSS Modules (as shown with styles.module.css) or any other CSS-in-JS solution for component-specific styling.

-   **Global and Theme Styles**: Classes like `wp-block-heading`, `has-text-align-center`, and `has-x-large-font-size` (likely from your WordPress theme.json and/or global CSS) are automatically available.

# Default Block Rendering

This tutorial covers how SnapWP uses the `Parse` component to render HTML content. The `Parse` component converts HTML strings into React components, which is essential for displaying default WordPress blocks.

## Using `Parse`

The `Parse` component takes an HTML string (`renderedHtml`) and converts it into React components. Here's a basic example:

```javascript
import React from 'react';
import { Parse } from '@snapwp/next';
import { type BlockData } from '@snapwp/core';

/**
 * Renders the default block.
 * @param props - The props for the component.
 * @param props.renderedHtml - The rendered HTML.
 * @return The rendered default block.
 */
export default function Default( { renderedHtml }: BlockData ) {
	return <Parse html={ renderedHtml || '' } />;
}

```
